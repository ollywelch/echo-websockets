package handlers

import (
	"fmt"

	"github.com/labstack/echo/v4"
	"github.com/ollywelch/echo-websockets/pkg/websockets"
	"github.com/ollywelch/echo-websockets/types"
)

func (s *Server) HandleWebSockets(c echo.Context) error {
	ws, err := s.upgrader.Upgrade(c.Response(), c.Request(), nil)

	if err != nil {
		return err
	}

	conn := websockets.NewActiveConn(ws)

	s.wsStore.Add(conn)

	defer s.wsStore.Remove(conn)

	for {
		// Read
		var msg types.WebsocketMessage
		if err := conn.ReadJSON(&msg); err != nil {
			c.Logger().Errorf("error reading message: %+v", err)
			break
		}
		payload := fmt.Sprintf("%s sent %s", conn.Id, string(msg.Payload))
		s.wsStore.Broadcast(&types.WebsocketMessage{Payload: payload})
	}
	return nil
}
