import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import { Add as AddIcon, Remove } from "@mui/icons-material";

function UserItem({ user, handler, handlerIsLoading, isAdded = false ,styling={}}) {
  const { name, _id, avatar } = user;
  return (
    <ListItem>
      <Stack
        direction={"row"}
        spacing={"1rem"}
        width={"100%"}
        alignItems={"center"}
        {...styling}
      >
        <Avatar />
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
          {name}
        </Typography>
        <IconButton
          size="small"
          sx={{
            bgcolor: isAdded ? "error.main" : "primary.main",
            color: "white",
            "&:hover": {
              bgcolor: isAdded?"error.dark":"primary.dark",

            },
          }}
          onClick={() => handler(_id)}
          disabled={handlerIsLoading}
        >
          {isAdded ? <Remove /> : <AddIcon />}
        </IconButton>
      </Stack>
    </ListItem>
  );
}

export default memo(UserItem);
