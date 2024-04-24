import React from "react";
import { transformImage } from "../../lib/features";
import { FileOpen } from "@mui/icons-material";

function RenderContent({ file, url }) {
  switch (file) {
    case "video":
      return <video src={url} controls width={"200px"} preload="none" />;
    case "image":
      return (
        <img
          src={transformImage(url, 200)}
          alt="image"
          width={"200px"}
          height={"150px"}
          style={{
            objectFit: "contain",
          }}
        />
      );
    case "audio":
      return <audio src={url} controls preload="none"/>;
    default:
        return <FileOpen />
  }
}

export default RenderContent;
