import React, { useEffect, useRef } from "react";
import { useChats } from "../Utils/Utils";
import ChatLoader from "../ChatLoader/ChatLoader";

export interface MessageType {
  name: string;
  message: string;
  isSender: boolean;
}

interface ChatsType
  extends React.PropsWithChildren<{ ws: WebSocket; name: string }> {}

const Chats: React.FC<ChatsType> = React.memo(({ ws, name, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { chats, setChats } = useChats();

  useEffect(() => {
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.type.trim() !== "") return;

      setChats((n) => [
        ...n,
        {
          message: data.message,
          name: data.name,
          isSender: data.name === name,
        },
      ]);
    };
  }, [ws]);

  return (
    <section className="h-full sm:w-3/4 w-full flex flex-col items-end relative">
      <section className="bg-inherit overflow-y-auto w-full h-[85%] mt-16 scroll-smooth">
        {chats.map((chat, idx) => {
          return <ChatLoader key={idx} chat={chat} />;
        })}
      </section>
      <div ref={ref} className="h-0" />
      {children}
    </section>
  );
});

export default Chats;
