import { Directions } from "@mui/icons-material";
import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import moment from "moment";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
  GitHub as GitHubIcon,
  Instagram as InstagramIcon,
} from "@mui/icons-material";

function Profile() {
  return (
    <Stack spacing={"2rem"} directions={"column"} alignItems={"center"}>
      <Avatar
        sx={{
          width: 200,
          height: 200,
          objectFit: "cover",
          scrollMarginBottom: "1rem",
          border: "1px solid white",
        }}
      />

      <ProfileCard
        heading={"bla bla bla"}
        text={"Rahul yadav"}
        Icon={<FaceIcon />}
      />
      <ProfileCard heading={"Insta"} text={"Insta"} Icon={<InstagramIcon />} />
      <ProfileCard
        heading={"bla bla bla"}
        text={"GitHub"}
        Icon={<GitHubIcon />}
      />
      <ProfileCard
        heading={"Joined"}
        text={moment('2024-10-10').fromNow()}
        Icon={<CalendarIcon />}
      />
    </Stack>
  );
}

const ProfileCard = ({ text, Icon, heading }) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={"1rem"}
      color={"white"}
      textAlign={"center"}
    >
      {Icon && Icon}

      <Stack>
        <Typography variant="body1">{text}</Typography>
        <Typography color={"gray"} variant="caption">
          {heading}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Profile;
