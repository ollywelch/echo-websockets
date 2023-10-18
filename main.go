package main

import (
	"fmt"
	"net/http"

	"github.com/google/uuid"
	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

var (
	upgrader = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool { return true },
	}
	activeConns = []ActiveWSConn{}
)

type ActiveWSConn struct {
	id uuid.UUID
	ws *websocket.Conn
}

func Broadcast(c echo.Context, v interface{}) {
	for _, conn := range activeConns {
		conn.ws.WriteJSON(v)
	}
	c.Logger().Infof("broadcasted: %+v", v)
}

func NewActiveWSConn(c echo.Context) (*ActiveWSConn, error) {
	ws, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		return nil, err
	}
	id := uuid.New()
	conn := ActiveWSConn{
		id: id,
		ws: ws,
	}

	activeConns = append(activeConns, conn)

	return &conn, nil
}

func (c *ActiveWSConn) Close() {
	index := 0
	for _, conn := range activeConns {
		if conn.id != c.id {
			activeConns[index] = conn
			index++
		}
	}
	activeConns = activeConns[:index]
	c.ws.Close()
}

func hello(c echo.Context) error {
	conn, err := NewActiveWSConn(c)

	if err != nil {
		return err
	}

	defer conn.Close()

	for {
		// Read
		_, msg, err := conn.ws.ReadMessage()
		if err != nil {
			c.Logger().Debugf("Received %+v", err)
			break
		}
		Broadcast(c, fmt.Sprintf("%s sent %s", conn.id, string(msg)))
	}
	return nil
}

func main() {
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.GET("/ws", hello)
	e.Logger.Fatal(e.Start(":3000"))
}
