import {
  Alert,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { gql } from "@apollo/client";
import { red } from "@mui/material/colors";
import { useMutation } from "@apollo/client";

const CREATE_COMMENT = gql`
  mutation CreateComment(
    $userInfo: UserInfoInput!
    $content: String!
    $targetId: String!
    $postId: String!
  ) {
    createComment(
      userInfo: $userInfo
      content: $content
      targetId: $targetId
      postId: $postId
    ) {
      comment {
        id
        content
        commenterInfo {
          userId
          userName
        }
      }
    }
  }
`;

const Comment = ({ id, allComments, postId, refetchPost, globalUserInfo }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [createComment] = useMutation(CREATE_COMMENT);
  const [replyValue, setReplyValue] = useState("");
  const [commentInfo, setCommentInfo] = useState({});
  const [commenterName, setCommenterName] = useState("");
  const [commentIds, setCommentIds] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const commentInfo = allComments.filter((item) => item.id === id)[0];
    if (commentInfo) {
      setCommentInfo(commentInfo);
      setCommentIds(commentInfo.commentIds);
      setCommenterName(commentInfo.commenterInfo.userName);
      console.log(commentInfo);
    }
  }, [isExpanded, allComments, id]);

  const handleReplyChange = (event) => {
    setReplyValue(event.target.value);
  };

  const handleReplySubmit = async (event) => {
    event.preventDefault();

    try {
      await createComment({
        variables: {
          userInfo: {
            userId: globalUserInfo.userId,
            userName: globalUserInfo.name,
          },
          content: replyValue,
          targetId: id,
          postId: postId,
        },
      });
      setReplyValue("");
      refetchPost();
    } catch (error) {
      console.error("Error posting reply:", error);
      console.error(
        "Error details:",
        error.networkError?.result || error.graphQLErrors,
      );
      setSnackbarMessage(error.message);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <div style={{ paddingLeft: "10px" }}>
      <ListItem button onClick={() => setIsExpanded(!isExpanded)}>
        <ListItemText
          primary={
            <div style={{ wordWrap: "break-word" }}>
              {commentInfo.content}
              <Typography
                variant="subtitle1"
                align="left"
                display="inline"
                sx={{ paddingLeft: "10px", color: "grey" }}
              >
                | by {commenterName}
              </Typography>
            </div>
          }
          secondary={
            commentIds.length > 0 ? (
              <span
                sx={{ "&:hover": { color: red[500] } }}
              >{`${commentIds.length} replies`}</span>
            ) : (
              ""
            )
          }
        />
      </ListItem>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Button
          onClick={() => setIsReplying(!isReplying)}
          style={{ color: "#0077be", paddingLeft: "15px" }}
        >
          Reply
        </Button>
        {isReplying && (
          <form
            onSubmit={handleReplySubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginTop: "10px",
            }}
          >
            <TextField
              name="reply"
              label="Add a reply"
              variant="outlined"
              multiline={true}
              fullWidth
              value={replyValue}
              onChange={handleReplyChange}
            />
            <Button
              type="submit"
              variant="contained"
              style={{ marginTop: "10px", backgroundColor: "#0077be" }}
            >
              Submit Reply
            </Button>
          </form>
        )}
        <List component="div" disablePadding>
          {commentIds.map((commentId) => (
            <div>
              <Comment
                key={commentId}
                id={commentId}
                allComments={allComments}
                postId={postId}
                refetchPost={refetchPost}
                globalUserInfo={globalUserInfo}
              />
            </div>
          ))}
        </List>
      </Collapse>
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
    </div>
  );
};

export default Comment;
