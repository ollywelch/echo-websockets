package websockets

type Store interface {
	Add(ActiveConn)
	Remove(ActiveConn)
	Broadcast(interface{})
	SendMessage(interface{}, ...ActiveConn)
}
