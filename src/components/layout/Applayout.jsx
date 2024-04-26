import React from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Grid } from "@mui/material";
import ChatList from "../specific/ChatList";
import { samepleChats } from "../../constants/sampleData";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";

const Applayout = () => (WrappedComponent) => {


  return (props) => {

    const params = useParams();
    const chatId = params.chatId;

    const handleDeleteChat = (e,_id,groupChat)=>{
      e.preventDefault();
      console.log(_id,groupChat);
    }
    return (
      <>
        {/* <Title /> */}
        <Header />

        <Grid container height={"calc(100vh - 4rem)"} border="1px solid black">
          <Grid
            item
            height={"100%"}
            sm={4}
            md={3}  
            sx={{
              display: { xs: "none", sm: "block" },
              overflow: "auto",
            }}
          >
            <ChatList
              chats={samepleChats}
              chatId={chatId}
              newMessagesAlert={[
                {
                  chatId,
                  count: 4,
                },
              ]}
              onlineUsers={["1", "2", "3"]}
              handleDeleteChat={handleDeleteChat}
            />
          </Grid>
          {/* __________________________________________________________________________________ */}
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            lg={6}
            height={"100%"}
            // bgcolor="primary.main"
          >
            <WrappedComponent {...props} />
          </Grid>
          {/* __________________________________________________________________________________ */}

          <Grid
            item
            md={4}
            lg={3}
            height={"100%"}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "rgba(0,0,0,0.85)",
            }}
          >
            <Profile />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default Applayout;
