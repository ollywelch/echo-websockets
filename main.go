package main

import (
	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/ollywelch/echo-websockets/handlers"
)

func main() {
	s := handlers.NewServer()

	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	jwtConfig := echojwt.Config{
		SigningKey: s.JWTSecret,
	}

	e.POST("/login", s.PostLogin)
	e.POST("/users", s.PostUsers)
	e.GET("/ws", s.GetWebSockets)

	protectedRoutes := e.Group("", echojwt.WithConfig(jwtConfig))

	protectedRoutes.GET("/users", s.GetUsers)
	protectedRoutes.GET("/users/me", s.GetUsersMe)
	e.Logger.Fatal(e.Start(":3000"))
}
