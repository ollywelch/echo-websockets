package handlers

import (
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/ollywelch/echo-websockets/pkg/websockets"
)

type Server struct {
	upgrader websocket.Upgrader
	wsStore  websockets.Store
}

func NewServer() *Server {
	return &Server{
		upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool { return true },
		},
		wsStore: websockets.NewInMemoryStore(),
	}
}
