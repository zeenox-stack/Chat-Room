import { useContext } from "react";
import { ChatContext } from "../../App";

export const getDate = () => {
  const hours = new Date().getHours() % 12;
  return `${
    hours.toString().length > 1 ? "0" + hours : hours
  }:${new Date().getMinutes()} ${hours > 12 ? "PM" : "AM"}`;
};

export const uDesign = (value: boolean) => {
  return value ? "rounded-tr-none mr-2 bg-indigo-500 self-end " : "rounded-tl-none ml-2 bg-white self-start";
};

export const useChats = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("Context Must be called within provider");
  }
  return context;
};
