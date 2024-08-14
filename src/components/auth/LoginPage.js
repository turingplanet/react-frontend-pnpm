import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

import { Link } from "react-router-dom";
import ThirdPartyLogin from "./ThirdPartyLogin";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const LOGIN_USER = gql`
  mutation Login($userId: String!, $password: String!) {
    login(userId: $userId, password: $password) {
      success
      user {
        userId
        email
        displayName
      }
    }
  }
`;

const StyledForm = styled("form")({
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "300px",
});

const StyledTextField = styled(TextField)({
  width: "100%",
});

const StyledButton = styled(Button)({
  width: "100%",
});

function LoginPage(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line
  const [loginUser, { error, data }] = useMutation(LOGIN_USER);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [backdropOpen, setBackdropOpen] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if either username or password is empty
    if (!username || !password) {
      setSnackbarMessage("Please fill out all fields");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setTimeout(() => {
        setSnackbarOpen(false);
      }, 2000); // Close the Snackbar after 2 seconds
      return;
    } else {
      setBackdropOpen(true); // Open the backdrop
      try {
        const { data } = await loginUser({
          variables: {
            userId: username,
            password: password,
          },
        });

        if (data.login.success) {
          setSnackbarMessage("Login successful");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
          setTimeout(() => {
            setBackdropOpen(false); // Close the backdrop
            // Set the user information in the global state and navigate to the home page
            props.setGlobalUserInfo({
              name: data.login.user.displayName,
              userId: data.login.user.userId,
            });
            props.setGlobalIsLogin(true);
            navigate("/");
          }, 2000);
        } else {
          setSnackbarMessage("Invalid user ID or password");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
          setBackdropOpen(false); // Close the backdrop
        }
      } catch (err) {
        setSnackbarMessage("Login failed");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        setBackdropOpen(false); // Close the backdrop
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Typography
        style={{ marginTop: "20px" }}
        variant="h4"
        align="center"
        gutterBottom
      >
        Sign in to InvestorData
      </Typography>
      <div>
        <StyledForm onSubmit={handleSubmit}>
          <StyledTextField
            id="username"
            label="UserId"
            variant="outlined"
            value={username}
            onChange={handleUsernameChange}
          />
          <br />
          <StyledTextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
          />
          <br />
          <StyledButton
            variant="contained"
            style={{ backgroundColor: "#0077be" }}
            type="submit"
          >
            Sign In
          </StyledButton>
          <div>
            <div
              style={{ marginTop: "20px", fontSize: "0.9rem", width: "100%" }}
            >
              Don't have an account?{" "}
              <Link style={{ textDecoration: "underline" }} to="/signup">
                Sign up
              </Link>
            </div>
            <hr
              style={{
                height: "1px",
                backgroundColor: "#CCCCCC",
                border: "none",
                width: "100%",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            />
            <ThirdPartyLogin
              globalIsLogin={props.globalIsLogin}
              setGlobalIsLogin={props.setGlobalIsLogin}
              setGlobalUserInfo={props.setGlobalUserInfo}
            />
          </div>
        </StyledForm>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default LoginPage;
