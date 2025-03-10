import React, { useState } from "react";
import { MessageType } from "../Chats/Chats";

const MessageBox: React.FC<{ ws: WebSocket, name: string }> = React.memo(({ ws, name }) => {
  const [chat, setChat] = useState<MessageType>({ name, message: '', isSender: true }); 

  return (
    <div className="bg-white border sm:border-b-0 sm:border-l-0 sm:border-r-0 border-gray-400 absolute bottom-0 px-2 py-2 rounded-xl w-full flex items-center">
      <input
        type="text"
        placeholder="Input Message" 
        value={chat.message}
        onChange={(e) => setChat(n => ({ ...n, message: e.target.value }))} 
        className="w-[90%] h-10 px-3 font-poppins text-gray-700 border border-gray-200 rounded-3xl focus:outline-none flex-1"
      />
      <button
        onClick={() => {
          const msg = JSON.stringify({ name: chat.name, message: chat.message }); 
          ws.send(msg);
          setChat(n => ({ ...n, message: '' }));
        }}
        disabled={chat.message.trim() === ""} 
        className="py-2 px-5 bg-indigo-500 hover:bg-indigo-600 text-white font-poppins rounded-3xl ml-5"
      >
        send
      </button>
    </div>
  );
});

export default MessageBox;