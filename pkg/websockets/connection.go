package websockets

import (
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
	"github.com/ollywelch/echo-websockets/types"
)

type ActiveConn struct {
	Id   uuid.UUID
	User types.UserRead
	ws   *websocket.Conn
}

func NewActiveConn(ws *websocket.Conn) ActiveConn {
	return ActiveConn{
		Id: uuid.New(),
		ws: ws,
	}
}

func (c *ActiveConn) ReadJSON(v interface{}) error {
	return c.ws.ReadJSON(v)
}

func (c *ActiveConn) SendJSON(v interface{}) error {
	return c.ws.WriteJSON(v)
}

func (c *ActiveConn) Close() error {
	return c.ws.Close()
}

func (c *ActiveConn) SetUser(u types.UserRead) {
	c.User = u
}
