package main

import (
	"fmt"
	"net/http"

	"Chatroom-Backend/handlers"
); 

func main() {
go handlers.HandleMessages();
	mux := http.NewServeMux(); 

	mux.Handle("/join", http.HandlerFunc(handlers.Chat)); 

	fmt.Println("Server is running at ws://localhost:8000"); 
	if err := http.ListenAndServe(":8000", mux); err != nil {
		fmt.Printf("Error: %s", err.Error()); 
		return;
	}
}