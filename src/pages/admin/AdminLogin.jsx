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
import { useInputValidation, useFileHandler } from "6pp";
import { VisuallyHiddenInput } from "../../components/styles/StyledComponents";
import { Navigate } from "react-router-dom";

function AdminLogin() {
  const secretKey = useInputValidation("");
  const password = useInputValidation("");
  const isAdmin = false;


  const handleLogin = (e) => {
    e.preventDefault();
  };


  if(isAdmin) {
   return  <Navigate to="/admin/dashboard" />
  }

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
    
          <Typography variant="h5">Admin Login</Typography>

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
              label="Secret Key"
              type="password"
              margin="normal"
              variant="outlined"
              value={secretKey.value}
              // onChange={(e) => setPassword(e.target.value)}
    
              onChange={secretKey.changeHandler}
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
          </form>
        
      </Paper>
    </Container>
  );
}

export default AdminLogin;
