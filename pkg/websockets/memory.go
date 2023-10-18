package websockets

import "sync"

type InMemoryStore struct {
	conns []ActiveConn
	mu    *sync.Mutex
}

func NewInMemoryStore() *InMemoryStore {
	return &InMemoryStore{
		conns: []ActiveConn{},
		mu:    &sync.Mutex{},
	}
}

func (s *InMemoryStore) Add(c ActiveConn) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.conns = append(s.conns, c)
}

func (s *InMemoryStore) Remove(c ActiveConn) {
	s.mu.Lock()
	defer s.mu.Unlock()

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
	s.mu.Lock()
	defer s.mu.Unlock()
	for _, conn := range s.conns {
		conn.SendJSON(v)
	}
}

func (s *InMemoryStore) SendMessage(v interface{}, conns ...ActiveConn) {
	s.mu.Lock()
	defer s.mu.Unlock()
	// send a message to each receiver
	for _, receiver := range conns {
		receiver.SendJSON(v)
	}
}
