import React from "react";
import Applayout from "../components/layout/Applayout";
import { Box, Typography } from "@mui/material";


const Home = () => {
  return (
    <Box bgcolor={"rgba(0,0,0,0.1)"} height={"100%"}>
      <Typography p={"2rem"} variant="h5" textAlign={"center"}>
        Select a friend to chat
      </Typography>
    </Box>
  );
};

export default Applayout()(Home);
