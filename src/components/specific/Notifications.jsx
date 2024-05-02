import {
  Dialog,
  DialogTitle,
  Stack,
  Typography,
  ListItem,
  Avatar,
  Button,
  Skeleton,
} from "@mui/material";
import React, { memo } from "react";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/api/api";
import { useErrors } from "../../hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotification } from "../../redux/reducers/misc";

const Notifications = () => {
  const { isLoading, data, error, isError } = useGetNotificationsQuery();
  const { isNotification } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const [acceptRequest] = useAcceptFriendRequestMutation();

  console.log(data);
  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
    console.log("Friend Request", _id);
    try {
      const res = await acceptRequest({ requestId: _id, accept });

      if (res.data?.success) {
        console.log("Request Accepted");
        toast.success(res.data.message);
      } else {
        console.log("Request Rejected");
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };
  const closeHandler = () => {
    dispatch(setIsNotification(false));
  };

  useErrors([{ error, isError }]);
  return (
    <Dialog open={isNotification} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>

        {/* ______________________________________________________________________________ */}
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.allRequests.length > 0 ? (
              data?.allRequests?.map((i) => {
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
          </>
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
        <Avatar src={sender.avatar} />
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
