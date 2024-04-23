import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  Stack,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useInputValidation } from "6pp";

const NewGroup = () => {
  const groupName = useInputValidation("");
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    console.log("Select member");
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currEle) => currEle != id)
        : [...prev, id]
    );
    console.log(selectedMembers);
  };

  const onsubmitHandler = () => {
    console.log("Submit");
  };

  const closeHandler = () => {};
  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} width={"25rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"} variant="h4">
          New Group
        </DialogTitle>

        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />

        <Typography>Members</Typography>

        <Stack>
          {members.map((user) => {
            return (
              <UserItem
                user={user}
                key={user._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(user._id)}
              />
            );
          })}
        </Stack>

        <Stack direction={"row"} justifyContent={"space-between"}>
          <Button variant={"text"} color="error">
            Cancel
          </Button>
          <Button variant={"contained"} onClick={onsubmitHandler}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
