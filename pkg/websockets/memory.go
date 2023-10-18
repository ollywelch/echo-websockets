package websockets

type InMemoryStore struct {
	conns []ActiveConn
}

func (s *InMemoryStore) Add(c ActiveConn) {
	s.conns = append(s.conns, c)
}

func (s *InMemoryStore) Remove(c ActiveConn) {
	// call close on the ActiveConn
	c.Close()

	// remove the Active Conn from the list
	index := 0
	for _, conn := range s.conns {
		if conn.Id != c.Id {
			s.conns[index] = conn
			index++
		}
	}
	s.conns = s.conns[:index]
}

func (s *InMemoryStore) Broadcast(v interface{}) {
	for _, conn := range s.conns {
		conn.SendJSON(v)
	}
}

func (s *InMemoryStore) SendMessage(v interface{}, conns ...ActiveConn) {
	// send a message to each receiver
	for _, receiver := range conns {
		receiver.SendJSON(v)
	}
}
