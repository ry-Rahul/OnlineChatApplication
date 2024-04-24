import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { lightBlue } from "../../constants/color";
import moment from "moment";

const MessageComponent = ({ message, user }) => {
  console.log("MessageComponent");
  const { sender, content, attachments = [], createdAt } = message;
  const timeAgo = moment(createdAt).fromNow();

  const isSameSender = sender?._id === user?._id;
  return (
    <div
      style={{
        alignSelf: isSameSender ? "flex-end" : "flex-start",
        backgroundColor: isSameSender ? "#dee2e6" : "#dee2e6",
        color: isSameSender ? "#000" : "#000",
        borderRadius: "5px",
        padding: "0.5rem",
        width: "fit-content",
      }}
    >
      {!isSameSender && (
        <Typography color={lightBlue} fontWeight={600} variant="caption">
          {sender.name}
        </Typography>
      )}
      {content && <Typography>{content}</Typography>}
      {attachments.length > 0 &&
        attachments.map((attachment,index) => {
          const url = attachment.url;
          const file = "meawwww";

          return (
            <Box key={index}>
              <a
                href={url}
                target="_blank"
                download
                style={{ color: "black" }}
              ></a>
            </Box>
          );
        })}
      <Typography variant="caption" color={"text.secondary"}>
        {timeAgo}
      </Typography>
    </div>
  );
};

export default memo(MessageComponent);
