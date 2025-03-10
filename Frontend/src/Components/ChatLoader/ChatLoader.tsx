import React from "react";
import { MessageType } from "../Chats/Chats";
import { uDesign, getDate } from "../Utils/Utils";
import { useMessageAnimation } from "../../Hooks/Hooks";

const ChatLoader: React.FC<{ chat: MessageType }> = React.memo(({ chat }) => {
  const chatsRef = useMessageAnimation(chat.isSender);

  return (
    <div className="flex flex-col" ref={chatsRef}>
      <div
        className={
          "rounded-2xl py-2 px-4 my-2 shadow-md " + uDesign(chat.isSender)
        }
      >
        <span className="text-sm font-semibold">{chat.name}</span>
        <p className="text-lg">{chat.message}</p>
        <span className="font-sans font-thin text-gray-300">{getDate()}</span>
      </div>
    </div>
  );
});

export default ChatLoader;
