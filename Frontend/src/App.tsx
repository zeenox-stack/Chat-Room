import "./App.css";
import React, { createContext, useEffect, useState } from "react";
import Chat, { MessageType } from "./Components/Chats/Chats";
import MessageBox from "./Components/MessageBox/MessageBox"; 
import Header from "./Components/Header/Header";

const Prompt = React.lazy(() => import("./Components/Prompt/Prompt"));

export interface ChatContext {
  chats: MessageType[];
  setChats: React.Dispatch<React.SetStateAction<MessageType[]>>;
}
export interface CredsType {
  name: string;
}

export const ChatContext = createContext<ChatContext | undefined>(undefined);

function App() {
  const [chats, setChats] = useState<MessageType[]>([]);
  const [creds, setCreds] = useState<CredsType>({ name: "" });
  const [close, setClose] = useState<boolean>(false); 
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (creds.name.trim() !== '') {
     const socket = new WebSocket(`wss://chat-room-go-backend.up.railway.app/join?name=${creds.name}`); 
      setWs(p => {
        if (p) p.close(); 
        return socket;
      }); 

      return () => {
        console.log("Logging out"); 
        socket.close();
      }
    }
  }, [creds.name]);

  return (
    <main className="flex justify-center items-center h-[100vh]">
      {close && ws ? (
        <ChatContext.Provider value={{ chats, setChats }}>
          <Header ws={ws}/>
          <Chat ws={ws} name={creds.name}>
            <MessageBox ws={ws} name={creds.name} />
          </Chat>
        </ChatContext.Provider>
      ) : (
        <Prompt
          setClose={setClose}
          setName={(value: string) => setCreds((n) => ({ ...n, name: value }))}
         
        />
      )}
    </main>
  );
}

export default App;
