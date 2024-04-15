import React, { useState } from "react";
import {
  Avatar,
  Stack,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";

import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { useInputValidation, useFileHandler } from "6pp";
import { usernameValidator } from "../utils/validators";
function Login() {
  const [isLogin, setIsLogin] = useState(true);
  // const [name, setName] = useState("");
  // const [bio, setBio] = useState("");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");

  const avatar = useFileHandler("single");

  const handleLogin = (e) => {
    e.preventDefault();
  };

  const handleSignUp = (e) => {
    e.preventDefault();
  };

  return (
    <Container
      component={"main"}
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isLogin ? (
          <>
            <Typography variant="h5">Login</Typography>

            <form
              style={{
                width: "100%",
                marginTop: "1rem",
              }}
              onSubmit={handleLogin}
            >
              <TextField
                required
                fullWidth
                label="username"
                margin="normal"
                variant="outlined"
                // value={username}
                // onChange={(e) => setUsername(e.target.value)}
                value={username.value}
                onChange={username.changeHandler}
              />

              <TextField
                required
                fullWidth
                label="password"
                type="password"
                margin="normal"
                variant="outlined"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                value={password.value}
                onChange={password.changeHandler}
              />

              <Button
                sx={{ marginTop: "1rem" }}
                variant="contained"
                fullWidth
                color="primary"
                type="submit"
              >
                Login
              </Button>

              <Typography textAlign={"center"} m={"1rem"}>
                OR
              </Typography>

              <Button
                sx={{ marginTop: "1rem" }}
                variant="text"
                fullWidth
                onClick={() => setIsLogin(false)}
              >
                Sign Up Instead
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h5">Sign Up</Typography>

            <form
              style={{
                width: "100%",
                marginTop: "1rem",
              }}
              onSubmit={handleSignUp}
            >
              <Stack position={"relative"} widht={"10rem"} margin={"auto"}>
                <Avatar
                  sx={{
                    width: "10rem",
                    height: "10rem",
                    ObjectFit: "contain",
                    margin: "auto",
                  }}
                  src={avatar.preview}
                />

                <IconButton
                  aria-label=""
                  sx={{
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    bgcolor: "rgba(255, 255, 255,0.2)",
                    "&:hover": {
                      bgcolor: "rgba(0, 0, 0, 0.2)",
                    },
                  }}
                  component="label"
                >
                  <>
                    <CameraAltIcon />
                    <VisuallyHiddenInput
                      type="file"
                      onChange={avatar.changeHandler}
                    />
                  </>
                </IconButton>
              </Stack>
              <TextField
                required
                fullWidth
                label="Name"
                margin="normal"
                variant="outlined"
                // value={name}
                // onChange={(e) => setName(e.target.value)}
                value={name.value}
                onChange={name.changeHandler}
              />
              <TextField
                required
                fullWidth
                label="Bio"
                margin="normal"
                variant="outlined"
                // value={bio}
                // onChange={(e) => setBio(e.target.value)}
                value={bio.value}
                onChange={bio.changeHandler}
              />
              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
                // value={username}
                // onChange={(e) => setUsername(e.target.value)}
                value={username.value}
                onChange={username.changeHandler}
              />
              {username.error && (
                <Typography variant="caption" color="error">
                  {username.error}
                </Typography>
              )}

              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
                // value={password}
                // onChange={(e)=> setPassword(e.target.value)}
                value={password.value}
                onChange={password.changeHandler}
              />

              <Button
                sx={{ marginTop: "1rem" }}
                variant="contained"
                fullWidth
                color="primary"
                type="submit"
              >
                Sign Up
              </Button>

              <Typography textAlign={"center"} m={"1rem"}>
                OR
              </Typography>

              <Button
                sx={{ marginTop: "1rem" }}
                variant="text"
                fullWidth
                onClick={() => setIsLogin(true)}
              >
                Login Instead
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
  );
}

export default Login;
