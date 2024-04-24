import { Box, Drawer, Grid, Icon, IconButton, Stack, Tooltip, Typography } from "@mui/material";

import React, { useState } from "react";
import { matBlack, orange } from "../constants/color";
import { KeyboardBackspace, Menu as MenuIcon} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Groups() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const nvigateBack = () => {
    navigate(-1);
  };

  

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  }

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  }
  const IconBtn = () => {
    return (
      <>

        <IconButton
        onClick={handleMobile}
           sx={{
            display:{ xs: "block", sm: "none"},
            position: "absolute",
            alignItems: "center",
            right: "1rem",
            padding: "0.5rem",
           
           }}
        >
          <MenuIcon/>
        </IconButton>

         
        <Tooltip title="back">
          <IconButton
            sx={{
              position: "absolute",
              top: "1rem",
              left: "1rem",
              padding: "0.5rem",
              transition: "0.3s",
              backgroundColor: matBlack,
              color: "white",
              "&:hover": {
                border: "1px solid black",
                color: matBlack,
              },
            }}
            onClick={nvigateBack}
          >
            <KeyboardBackspace />
          </IconButton>
        </Tooltip>
      </>
    );
  };
  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
          bgcolor: orange,
        }}
        sm={4}
      >
          <GropuList/>
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          padding: "1rem 3rem",
          alignItems: "center",
        }}
      >
        {<IconBtn />}
      </Grid>

      <Drawer sx={{
        display: {xs: "block", sm: "none"},
        width: "80%",
        "& .MuiDrawer-paper": {
          width: "60%",
        },
      
      }} open={isMobileMenuOpen} onClose={handleMobileClose}> 
          <GropuList width={"50vw"}/>
      </Drawer>
    </Grid>
  );
}

const GropuList = ({w="100%",myGroups=[],chatId}) => {
  return (
    <Stack>
        {myGroups.length > 0 ? (
          myGroups.map((i) => {
            return (
              <GroupItem
                key={i._id}
                name={i.name}
                _id={i._id}
                chatId={chatId}
              />
            );
          })
        ) : (
          <Typography textAlign={"center"} padding={"1rem"}>No Groups</Typography>
        )}
    </Stack>
  );
}

export default Groups;
