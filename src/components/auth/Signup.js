import { Backdrop, CircularProgress } from "@mui/material";
import { Button, Typography } from "@mui/material";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { IconButton, InputAdornment } from "@mui/material";
import { React, useState } from "react";

import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import { Modal } from "@mui/material";
import { Snackbar } from "@mui/material";
import TermOfService from "./TermOfService";
import ThirdPartyLogin from "./ThirdPartyLogin";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { gql } from "@apollo/client/core";
import { styled } from "@mui/system";
import { useApolloClient } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const Root = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const IS_USER_REGISTERED = gql`
  query IsUserRegistered($userId: String, $email: String) {
    isUserRegistered(userId: $userId, email: $email)
  }
`;

const REGISTER_USER = gql`
  mutation RegisterUser(
    $userId: String!
    $email: String!
    $displayName: String!
    $password: String!
  ) {
    registerUser(
      userId: $userId
      email: $email
      displayName: $displayName
      password: $password
    ) {
      user {
        userId
        email
        displayName
      }
    }
  }
`;

const Form = styled("form")({
  width: "300px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const Input = styled(TextField)({
  width: "100%",
});

const StyledButton = styled(Button)({
  width: "100%",
});

function SignUp(props) {
  const client = useApolloClient();
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // eslint-disable-next-line
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [registerUser, { error, data }] = useMutation(REGISTER_USER);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  const handleTermsOpen = () => {
    setTermsOpen(true);
  };

  const handleTermsClose = () => {
    setTermsOpen(false);
  };

  const checkUserExists = async (userId, email) => {
    if (!userId && !email) return false;
    const { data } = await client.query({
      query: IS_USER_REGISTERED,
      variables: { userId, email },
    });
    return data.isUserRegistered;
  };

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleDisplayNameChange = (event) => {
    setDisplayName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTermsAcceptedChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;
    setConfirmPassword(value);

    if (value !== password) {
      setConfirmPasswordError(true);
    } else {
      setConfirmPasswordError(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if either userId, email, displayName, password, or confirmPassword is empty
    if (!userId || !email || !displayName || !password || !confirmPassword) {
      setSnackbarMessage("Please fill out all fields");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setTimeout(() => {
        setSnackbarOpen(false);
      }, 2000); // Close the Snackbar after 2 seconds
      return;
    } else {
      if (password !== confirmPassword) {
        setConfirmPasswordError(true);
        return;
      }

      setBackdropOpen(true); // Open the backdrop

      const userIdExists = await checkUserExists(userId, null);
      if (userIdExists) {
        setSnackbarMessage("User ID already exists");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        setBackdropOpen(false); // Close the backdrop
        return;
      }

      const emailExists = await checkUserExists(null, email);
      if (emailExists) {
        setSnackbarMessage("Email already exists");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        setBackdropOpen(false); // Close the backdrop
        return;
      }

      try {
        await registerUser({
          variables: {
            userId: userId,
            email: email,
            displayName: displayName,
            password: password,
          },
        });
        setSnackbarMessage("Registration successful");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setTimeout(() => {
          setBackdropOpen(false); // Close the backdrop
          navigate("/login");
        }, 2000);
      } catch (err) {
        setSnackbarMessage("Registration failed");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        setBackdropOpen(false); // Close the backdrop
        console.log(error);
        console.log(data);
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div>
      {!termsOpen && (
        <div>
          <Typography
            style={{ marginTop: "20px" }}
            variant="h4"
            align="center"
            gutterBottom
          >
            Sign up for InvestorData
          </Typography>

          <Root>
            <Form onSubmit={handleSubmit}>
              <Input
                id="user_id"
                label="User Id"
                type="text"
                variant="outlined"
                value={userId}
                onChange={handleUserIdChange}
              />
              <br />
              <Input
                id="email"
                label="Email"
                type="email"
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
              />
              <br />
              <Input
                id="display_name"
                label="Display Name"
                type="text"
                variant="outlined"
                value={displayName}
                onChange={handleDisplayNameChange}
              />
              <br />
              <Input
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                value={password}
                onChange={handlePasswordChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={toggleShowPassword}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <br />
              <Input
                id="confirm-password"
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                error={confirmPasswordError}
                helperText={
                  confirmPasswordError ? "Passwords do not match" : ""
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={toggleShowPassword}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <br />
              <StyledButton
                variant="contained"
                style={{ backgroundColor: "#0077be" }}
                type="submit"
              >
                Sign Up
              </StyledButton>
              <FormControlLabel
                style={{
                  display: "flex",
                  float: "left",
                  width: "100%",
                  marginTop: "10px",
                }}
                control={
                  <Checkbox
                    checked={termsAccepted}
                    onChange={handleTermsAcceptedChange}
                    sx={{
                      "&.Mui-checked": {
                        color: "#0077be",
                      },
                    }}
                  />
                }
                label={
                  <>
                    <span>I accept </span>
                    <span
                      onClick={handleTermsOpen}
                      style={{ textDecoration: "underline" }}
                    >
                      Terms of Service
                    </span>
                  </>
                }
              />
              <div>
                <div
                  style={{
                    marginTop: "20px",
                    fontSize: "0.9rem",
                    width: "100%",
                  }}
                >
                  Already have an account?{" "}
                  <Link style={{ textDecoration: "underline" }} to="/login">
                    Sign in
                  </Link>
                </div>
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
            </Form>
          </Root>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert onClose={handleClose} severity={snackbarSeverity}>
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
      )}
      <Modal
        open={termsOpen}
        onClose={handleTermsClose}
        aria-labelledby="terms-of-service-title"
        aria-describedby="terms-of-service-description"
        BackdropProps={{
          style: {
            backgroundColor: "rgba(0, 0, 0, 0.05)", // Change the alpha value (0.1) to adjust the opacity
          },
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "2px solid #e0e0e0",
            padding: "30px",
            width: "80%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxHeight: "80vh",
            overflow: "auto",
            backgroundColor: "white",
          }}
        >
          <TermOfService />
          <Button onClick={handleTermsClose}>Agree</Button>
        </div>
      </Modal>
    </div>
  );
}

export default SignUp;
