package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/ollywelch/echo-websockets/handlers"
)

func main() {
	s := handlers.NewServer()

	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.GET("/ws", s.HandleWebSockets)
	e.Logger.Fatal(e.Start(":3000"))
}
