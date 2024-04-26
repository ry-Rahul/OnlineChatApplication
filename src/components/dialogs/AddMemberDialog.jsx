import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";

//   ___________________________________________________________________________________________________________
const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isLoadingAddMembers, setIsLoadingAddMembers] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [members, setMembers] = useState(sampleUsers);

  const addMemberSubmitHandler = () => {
    console.log(selectedUsers);
  };

  const closeHandler = () => {
    console.log("Close");

    setSelectedUsers([]);
    setMembers([]);

  };

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={"2rem "} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>

        <Stack spacing={"1rem"}>
          {members.length > 0 ? (
            members.map((i) => {
              return (
                <UserItem
                  user={i}
                  key={i._id}
                  handler={selectMemberHandler}
                  isAdded={selectedMembers.includes(i._id)}
                />
              );
            })
          ) : (
            <Typography textAlign={"center"}>No Users</Typography>
          )}
        </Stack>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Button color="error" onClick={closeHandler}>
            Cancel
          </Button>
          <Button
            onClick={addMemberSubmitHandler}
            variant="contained"
            disabled={isLoadingAddMembers}
          >
            Submit Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
