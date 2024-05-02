import React from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Drawer, Grid, Skeleton } from "@mui/material";
import ChatList from "../specific/ChatList";
import { samepleChats } from "../../constants/sampleData";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";
import { useMyChatsQuery } from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobile } from "../../redux/reducers/misc";
import { useErrors } from "../../hooks/hook";
import { getSocket } from "../../../Socket";

const Applayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;
    const { isMobile } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    // socket ______________________________________________________________
    const socket = getSocket();
    // console.log("socket")
    // console.log("socketid - > " , socket.id);

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

    useErrors([{ isError, error }]);

    // handle Delete Chat ____________________________________________________
    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log(_id, groupChat);
    };

    // handle Mobile close ____________________________________________________
    const handlMobileClose = () => {
      dispatch(setIsMobile(false));
    };
    return (
      <>
        {/* <Title /> */}
        <Header />
        {/* 
        <DeleteChatMenu
          dispatch={dispatch}
          deleteMenuAnchor={deleteMenuAnchor}
        /> */}

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handlMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              // newMessagesAlert={newMessagesAlert}
              // onlineUsers={onlineUsers}
            />
          </Drawer>
        )}

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
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data.chats}
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
            )}
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
            <WrappedComponent {...props} chatId={chatId} user={user} />
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
            <Profile user={user} />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default Applayout;
