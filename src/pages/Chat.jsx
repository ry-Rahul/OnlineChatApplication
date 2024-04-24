import React, { useRef } from "react";
import Applayout from "../components/layout/Applayout";
import { IconButton, Stack } from "@mui/material";
import { grayColor, orange } from "../constants/color";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../components/dialogs/FileMenu";
import { sampleMessage } from "../constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";

const user = {
  _id: "adfaasd",
  name: "Rahul yadav",
};

function Chat() {
  const containerRef = useRef(null);

  return (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {sampleMessage.map((i) => {
          return <MessageComponent key={i._id} message={i} user={user} />;
        })}
      </Stack>

      <form
        style={{
          height: "10%",
        }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          height={"100%"}
          padding={"1rem"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1rem",
              padding: "0.5rem",
              transition: "0.3s",
              "&:hover": {
                rotate: "90deg",
              },
            }}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox placeholder="Type your message here ..." />
          <IconButton
            type="submit"
            sx={{
              backgroundColor: orange,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "error.dark",
                rotate: "-45deg",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      <FileMenu />
    </>
  );
}

export default Applayout()(Chat);
