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
import React, { useEffect, useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../shared/UserItem";
import { sampleUsers } from "../../constants/sampleData";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../../redux/reducers/misc";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import toast from "react-hot-toast";
import { useAsyncMutation } from "../../hooks/hook";

// ______________________________________________________
const Search = () => {
  const search = useInputValidation("");

  const [users, setUsers] = useState([]);
  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest , isLoadingSendFriendRequest] = useAsyncMutation(useSendFriendRequestMutation);

  const { isSearch } = useSelector((state) => state.misc);
  const dispatch = useDispatch();


  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending Friend Request...", {userId:id});
  };
  const searchCloseHandler = () => {
    dispatch(setIsSearch(false));
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.message))
        .catch((e) => console.log(e));
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value]);

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack
        padding={"2rem"}
        direction={"column"}
        width={"25rem"}
        // i want to small screen to be full width and height
        // height={"100vh"}
        sx={{
          width: { xs: "20rem", sm: "25rem" },
          padding: "1rem",
        }}
      >
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
            return (
              <UserItem
                user={user}
                key={user._id}
                handler={addFriendHandler}
                handlerIsLoading={isLoadingSendFriendRequest}
              />
            );
          })}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
