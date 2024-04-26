import {
  Backdrop,
  Button,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import React, { memo, Suspense, useEffect, useState } from "react";
import { matBlack, orange } from "../constants/color";
import {
  Delete as DeleteIcon,
  Done as DoneIcon,
  Add as AddIcon,
  Edit as EditIcon,
  KeyboardBackspace,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../components/styles/StyledComponents";
import AvatarCard from "../components/shared/AvatarCard";
import { samepleChats, sampleUsers } from "../constants/sampleData";
import AddMemberDialog from "../components/dialogs/AddMemberDialog";
import UserItem from "../components/shared/UserItem";
const ConfirmDeleteDialog = React.lazy(() =>
  import("../components/dialogs/ConfirmDeleteDialog")
);

function Groups() {
  const navigate = useNavigate();
  const chatId = useSearchParams()[0].get("group");
  console.log(chatId);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [upatedGroupName, setUpdatedGroupName] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [isAddMember, setIsAddMember] = useState(false);
  const nvigateBack = () => {
    navigate("/");
  };


  const removeMemberHandler = (id) => {
    console.log("Remove Member", id);
  };

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };

  const updateGroupName = () => {
    setIsEdit(false);
    console.log(upatedGroupName);
  };

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
    console.log("Delete Group");
  };

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };

  const deleteHandler = () => {
    console.log("Delete Group");
  };

  const openAddMemberHandler = () => {
    console.log("Add Member");
    setIsAddMember(true);
  };

  useEffect(() => {
    if(chatId){
      setGroupName(`Group ${chatId}`);
      setUpdatedGroupName(`Group ${chatId}`);
    }

    return () => {
      setGroupName("");
      setUpdatedGroupName("");
      setIsEdit(false);
    };
  }, [chatId]);

  const IconBtn = () => {
    return (
      <>
        <IconButton
          onClick={handleMobile}
          sx={{
            display: { xs: "block", sm: "none" },
            position: "absolute",
            alignItems: "center",
            right: "1rem",
            padding: "0.5rem",
          }}
        >
          <MenuIcon />
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

  const GroupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      padding={"2rem"}
      spacing={"1rem"}
    >
      {isEdit ? (
        <>
          <TextField
            value={upatedGroupName}
            onChange={(e) => setUpdatedGroupName(e.target.value)}
          />
          <DoneIcon
            sx={{
              "&:hover": {
                color: orange,
              },
            }}
            onClick={updateGroupName}
          />
        </>
      ) : (
        <>
          <Typography variant={"h4"}>{groupName}</Typography>
          <IconButton onClick={(e) => setIsEdit(true)}>
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const ButtonGroup = (
    <Stack
      direction={{
        xs: "column-reverse",
        sm: "row",
      }}
      spacing={"1rem"}
      p={{
        xs: "0",
        sm: "1rem",
        md: "1rem 4rem",
      }}
    >
      <Button
        size="large"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={openConfirmDeleteHandler}
      >
        Delete Group
      </Button>
      <Button
        size="large"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={openAddMemberHandler}
      >
        Add Member
      </Button>
    </Stack>
  );

  // _________________________________________________________________________________________________________________
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
        <GropuList myGroups={samepleChats} chatId={chatId} />
      </Grid>
      {/* _______________________________________________________________________________________________ */}
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
        {groupName && (
          <>
            {GroupName}

            <Typography
              margin={"2rem"}
              alignSelf={"flex-start"}
              variant="body1"
            >
              Members
            </Typography>

            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                sm: "1rem",
                xs: "0",
                md: "1rem 4rem",
              }}
              spacing={"2rem"}
              height={"50vh"}
              overflow={"auto"}
            >
              {/* Members */}

              {sampleUsers.map((i) => {
                return (
                  <UserItem
                    user={i}
                    key={i._id}
                    isAdded
                    styling={{
                      boxShadow: "0 0 0.5rem  rgba(0,0,0,0.2)",
                      padding: "1rem 2rem",
                      borderRadius: "1rem",
                    }}
                    handler = {removeMemberHandler}
                  />
                );
              })}

              {/* {isLoadingRemoveMember ? (
                <CircularProgress />
              ) : (
                members.map((i) => (
                  <UserItem
                    user={i}
                    key={i._id}
                    isAdded
                    styling={{
                      boxShadow: "0 0 0.5rem  rgba(0,0,0,0.2)",
                      padding: "1rem 2rem",
                      borderRadius: "1rem",
                    }}
                    handler={removeMemberHandler}
                  />
                ))
              )} */}
            </Stack>
            {/* _______________________________________________________ */}
            {ButtonGroup}
          </>
        )}
      </Grid>

      {/* Add Member ______________________________________________ */}
      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog chatId={chatId} />
        </Suspense>
      )}

      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            open={confirmDeleteDialog}
            handleClose={closeConfirmDeleteHandler}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      )}

      <Drawer
        sx={{
          display: { xs: "block", sm: "none" },
          width: "80%",
          "& .MuiDrawer-paper": {
            width: "60%",
          },
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
      >
        <GropuList width={"50%"} myGroups={samepleChats} chatId={chatId} />
      </Drawer>
    </Grid>
  );
}

const GropuList = ({ w = "100%", myGroups = [], chatId }) => {
  return (
     <Stack 
       width={w}
       height={"100vh"}
        overflow={"auto"}
    >
      {myGroups.length > 0 ? (
        myGroups.map((i) => {
          return <GroupListItem key={i._id} group={i} chatId={chatId} />;
        })
      ) : (
        <Typography textAlign={"center"} padding={"1rem"}>
          No Groups
        </Typography>
      )}
    </Stack>
  );
};

const GroupListItem = memo(({ group, chatId }) => {
  const { name, _id, avatar } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) {
          e.preventDefault();
        }
      }}
    >
      <Stack direction={"row"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Groups;
