import { Stack } from "@mui/material";
import React from "react";

function ChatList({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) {
  return (
    <Stack width={w} direction={"column"}>
        {chats?.map((chat)=>{
            return <div>{chat}</div>
        })}
    </Stack>
  )
}

export default ChatList;
