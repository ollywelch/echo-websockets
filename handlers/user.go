package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/ollywelch/echo-websockets/types"
)

func (s *Server) GetUsers(ctx echo.Context) error {
	users := s.db.GetUsers()
	return ctx.JSON(http.StatusOK, users)
}

func (s *Server) PostUsers(ctx echo.Context) error {
	u := &types.UserCreate{}
	if err := ctx.Bind(u); err != nil {
		return ctx.JSON(http.StatusBadRequest, "invalid JSON inputs")
	}
	if u.Username == "" || u.Password == "" {
		return ctx.JSON(http.StatusBadRequest, "username and password must both be specified")
	}
	user := s.db.CreateUser(*u)
	if user == nil {
		return ctx.JSON(http.StatusInternalServerError, "internal server error")
	}
	return ctx.JSON(http.StatusOK, *user)
}
