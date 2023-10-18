package handlers

import (
	"fmt"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"github.com/ollywelch/echo-websockets/pkg/websockets"
	"github.com/ollywelch/echo-websockets/types"
)

func (s *Server) validateToken(token string) (string, error) {
	keyFunc := func(t *jwt.Token) (interface{}, error) {
		return s.JWTSecret, nil
	}
	parsed, err := jwt.NewParser().Parse(token, keyFunc)
	if err != nil {
		return "", err
	}
	return parsed.Claims.GetSubject()
}

func (s *Server) GetWebSockets(c echo.Context) error {
	ws, err := s.upgrader.Upgrade(c.Response(), c.Request(), nil)

	if err != nil {
		return err
	}

	conn := websockets.NewActiveConn(ws)
	defer conn.Close()

	var firstMsg types.WebsocketMessage
	if err := conn.ReadJSON(&firstMsg); err != nil {
		c.Logger().Errorf("error reading first message: %+v", err)
		return nil
	}

	name, err := s.validateToken(firstMsg.Payload)
	if err != nil {
		c.Logger().Errorf("invalid authentication message: %+v", err)
		return nil
	}

	user := s.db.GetUserByName(name)
	if user == nil {
		c.Logger().Errorf("failed to get user with name %s when authenticating websockets", name, err)
		return nil
	}

	conn.SetUser(*user)

	s.wsStore.Add(conn)

	defer s.wsStore.Remove(conn)

	for {
		// Read
		var msg types.WebsocketMessage
		if err := conn.ReadJSON(&msg); err != nil {
			c.Logger().Errorf("error reading message: %+v", err)
			break
		}
		payload := fmt.Sprintf("%s sent %s", conn.User.Username, string(msg.Payload))
		s.wsStore.Broadcast(&types.WebsocketMessage{Payload: payload})
	}
	return nil
}
