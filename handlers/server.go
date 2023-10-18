package handlers

import (
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/ollywelch/echo-websockets/pkg/db"
	"github.com/ollywelch/echo-websockets/pkg/websockets"
)

type Server struct {
	upgrader  websocket.Upgrader
	wsStore   websockets.Store
	db        db.Store
	JWTSecret []byte
}

func NewServer() *Server {
	return &Server{
		upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool { return true },
		},
		wsStore:   websockets.NewInMemoryStore(),
		db:        &db.InMemoryStore{},
		JWTSecret: []byte("supersecret"),
	}
}
