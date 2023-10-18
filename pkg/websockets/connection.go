package websockets

import (
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

type ActiveConn struct {
	Id uuid.UUID
	ws *websocket.Conn
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
