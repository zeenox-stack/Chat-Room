package handlers

import (
	"fmt"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
); 

var m sync.Mutex;

var Users = make(map[*websocket.Conn]string); 
var broadcast = make(chan MessageType);
var upgrader = websocket.Upgrader{
	CheckOrigin: func(req *http.Request) bool { return true },
}; 

type MessageType struct {
	Name string `json:"name"` 
	Message string `json:"message"` 
	Type string `json:"type"` 
	Count int `json:"count"`
}; 

type UserCountType struct {
	TotalUsers int `json:"totalUsers"`
}

func Chat(res http.ResponseWriter, req *http.Request) { 
if len(Users) >= 10 {
	http.Error(res, "Chat is full", http.StatusServiceUnavailable); 
	return;
}; 

name := req.URL.Query().Get("name"); 
if name == "" {
	http.Error(res, "Name is required", http.StatusBadRequest); 
	return;
}

ws, err := upgrader.Upgrade(res, req, nil); 
if err != nil {
	http.Error(res, "Chat is full", http.StatusServiceUnavailable);
	return;
};  
defer ws.Close();

m.Lock(); 
Users[ws] = name; 
m.Unlock();

broadcast <- MessageType{
	Type: "count", 
	Count: len(Users),
};

for {
	var msg MessageType; 

 err := ws.ReadJSON(&msg); 
if err != nil {
 fmt.Printf("Error: %s", err.Error()); 
 ws.Close();

 m.Lock();
 delete(Users, ws); 
 m.Unlock(); 
 
 break;
}; 

broadcast <- msg
}
};

func HandleMessages() {
	for {
		msg := <-broadcast
	
		m.Lock()
		for user := range Users {
			if err := user.WriteJSON(msg); err != nil {
				fmt.Printf("Error: %s", err.Error())
				delete(Users, user); 
				broadcast <- MessageType{
					Type: "count", 
					Count: len(Users),
				}
			}
		}
		m.Unlock();
	}
}