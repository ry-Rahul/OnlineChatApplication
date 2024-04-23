import { useInputValidation } from "6pp";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import React ,{useState} from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../shared/UserItem";
import { sampleUsers } from "../../constants/sampleData";




// ______________________________________________________
const Search = () => {
  const search = useInputValidation("");

  const [users, setUsers] = useState(sampleUsers);

  let isLoadingSendFriendRequest = false;

  const addFriendHandler = (id) => {
    console.log("Add friend", id);
  }
  return (
    <Dialog open>
      <Stack padding={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Search</DialogTitle>
        <TextField
          label="Search"
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List>
          {users.map((user) => {
              return <UserItem
                user={user}
                key={user._id}
                handler={addFriendHandler}
                handlerIsLoading={isLoadingSendFriendRequest}
              />
          })} 

        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
