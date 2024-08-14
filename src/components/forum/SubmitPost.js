import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import Alert from "@mui/material/Alert";
import { gql } from "@apollo/client";
import { styled } from "@mui/system";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const CustomTextField = styled(TextField)({
  marginBottom: "10px",
});

const CREATE_POST_MUTATION = gql`
  mutation CreatePost(
    $userInfo: UserInfoInput!
    $postDate: String!
    $postTitle: String!
    $content: String!
    $postUrl: String!
  ) {
    createPost(
      userInfo: $userInfo
      postDate: $postDate
      postTitle: $postTitle
      content: $content
      postUrl: $postUrl
    ) {
      post {
        postTitle
        content
        postDate
        posterUserInfo {
          userId
          userName
        }
      }
    }
  }
`;

function isValidURL(string) {
  var regex = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name and extension
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?" + // port
      "(\\/[-a-z\\d%_.~+]*)*" + // path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i",
  ); // fragment locator
  return !!regex.test(string);
}

function SubmitPost(props) {
  const navigate = useNavigate();
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postUrl, setPostUrl] = useState("");
  // eslint-disable-next-line
  const [createPost, { data }] = useMutation(CREATE_POST_MUTATION);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [backdropOpen, setBackdropOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBackdropOpen(true);
    if (!isValidURL(postUrl)) {
      setSnackbarMessage("Invalid URL");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setBackdropOpen(false);
      return;
    }
    try {
      const response = await createPost({
        variables: {
          userInfo: {
            userId: props.globalUserInfo.userId,
            userName: props.globalUserInfo.name,
          },
          postTitle: postTitle,
          postDate: new Date(),
          content: postContent,
          postUrl: postUrl,
        },
      });
      console.log("response", response);
      setPostTitle("");
      setPostContent("");
      setPostUrl("");
      setSnackbarMessage("Post created successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setTimeout(() => {
        setBackdropOpen(false);
        navigate("/forum");
      }, 2000);
    } catch (err) {
      console.log("GraphQL error", err);
      setSnackbarMessage("Failed to create post");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setBackdropOpen(false);
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
      <Container maxWidth="sm">
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            mt: 4,
          }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6" gutterBottom>
            Write a Post
          </Typography>
          <CustomTextField
            label="Title"
            variant="outlined"
            multiline
            rows={1}
            fullWidth
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
          <CustomTextField
            label="URL"
            variant="outlined"
            multiline
            rows={1}
            fullWidth
            value={postUrl}
            onChange={(e) => setPostUrl(e.target.value)}
          />
          <CustomTextField
            label="Comment"
            variant="outlined"
            multiline
            rows={3}
            fullWidth
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Container>
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
  );
}

export default SubmitPost;
