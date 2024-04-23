import {
  Dialog,
  DialogTitle,
  Stack,
  Typography,
  ListItem,
  ListItemText,
  Avatar,
  Button,
} from "@mui/material";
import React, { memo } from "react";
import { sampleNotifications } from "../../constants/sampleData";
const Notifications = () => {
  const friendRequestHandler = ({ _id, accept }) => {
    console.log("Friend Request", _id);
  };
  return (
    <Dialog open>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>

        {/* ______________________________________________________________________________ */}
        {sampleNotifications.length > 0 ? (
          sampleNotifications.map((i) => {
            return (
              <NotificationItem
                key={i._id}
                sender={i.sender}
                _id={i._id}
                handler={friendRequestHandler}
              />
            );
          })
        ) : (
          <Typography textAlign={"center"}>No Notifications</Typography>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  return (
    <ListItem>
      <Stack
        direction={"row"}
        spacing={"1rem"}
        width={"100%"}
        alignItems={"center"}
      >
        <Avatar src={sender.avatar}/>
        <Typography
          variant="body1"
          sx={{
            flexGlow: 1,
            width: "100%",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {`${sender.name} wants to be your friend`}
        </Typography>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
