import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { lightBlue } from "../../constants/color";
import moment from "moment";
import { fileFormat } from "../../lib/features";
import RenderContent from "./RenderContent";

const MessageComponent = ({ message, user }) => {

  const { sender, content, attachments = [], createdAt } = message;

  const timeAgo = moment(createdAt).fromNow();

  const sameSender = sender?._id === user?._id;
  // console.log("Same sender", sameSender);
  return (
    <div
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: sameSender ? "#dee2e6" : "#dee2e6",
        color: sameSender ? "#000" : "#000",
        borderRadius: "5px",
        padding: "0.5rem",
        width: "fit-content",
      }}
    >
        {!sameSender && (
        <Typography color={lightBlue} fontWeight={"600"} variant="caption">
          {sender.name}
        </Typography>
      )}
      {content && <Typography>{content}</Typography>}
      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = fileFormat(url);

          return (
            <Box key={index}>
              <a href={url} target="_blank" download style={{ color: "black" }}>
                <RenderContent file={file} url={url} />
              </a>
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
