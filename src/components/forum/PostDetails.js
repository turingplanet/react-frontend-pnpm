import {
  Alert,
  Button,
  Container,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";

import Comment from "./Comment";
import gql from "graphql-tag";
import { useParams } from "react-router-dom";

const GET_POST_BY_ID = gql`
  query GetPostById($postId: String!) {
    post(id: $postId) {
      postTitle
      content
      postDate
      posterUserInfo {
        userId
        userName
      }
      postUrl
      upvote
      commentIds
      allCommentIds
    }
  }
`;

const GET_COMMENTS = gql`
  query GetComments($ids: [String!]!) {
    comments(ids: $ids) {
      id
      content
      commenterInfo {
        userId
        userName
      }
      commentIds
    }
  }
`;

const GET_COMMENT = gql`
  query GetComment($id: String!) {
    comment(id: $id) {
      id
      content
      commenterInfo {
        userId
        userName
      }
      commentIds
    }
  }
`;

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

function PostDetails(props) {
  const client = useApolloClient();

  const { postId } = useParams();
  const stringPostId = String(postId);
  const {
    loading,
    error,
    data,
    refetch: refetchPost,
  } = useQuery(GET_POST_BY_ID, {
    variables: { postId: stringPostId },
  });

  const [comments, setComments] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [commentValue, setCommentValue] = useState("");
  const [createComment] = useMutation(CREATE_COMMENT);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    if (data && data.post) {
      let isCancelled = false;
      Promise.all(
        data.post.commentIds.map((id) =>
          client.query({ query: GET_COMMENT, variables: { id } }),
        ),
      ).then((results) => {
        if (!isCancelled) {
          setComments(results.map((result) => result.data.comment));
        }
      });

      client
        .query({
          query: GET_COMMENTS,
          variables: { ids: data.post.allCommentIds },
        })
        .then((result) => {
          if (!isCancelled) {
            setAllComments(result.data.comments);
            console.log("result.data.comments", result.data.comments);
          }
        });

      return () => {
        isCancelled = true;
      };
    }
  }, [data, client]);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error("Post Error:", error);
    return <p>Error :(</p>;
  }

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting comment with variables:", {
      userInfo: { userId: "user1", userName: "User 1" },
      content: commentValue,
      targetId: postId,
    });
    if (!commentValue) return;
    try {
      await createComment({
        variables: {
          userInfo: {
            userId: props.globalUserInfo.userId,
            userName: props.globalUserInfo.name,
          },
          content: commentValue,
          targetId: postId,
          postId: postId,
        },
      });
      setCommentValue("");
      refetchPost();
    } catch (error) {
      console.error("Error posting comment:", error);
      console.error(
        "Error details:",
        error.networkError?.result || error.graphQLErrors,
      );
      setSnackbarMessage("Unable to post a comment: You need to log in first");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const post = data.post;

  return (
    <Container maxWidth="md">
      <Typography
        variant="h4"
        align="left"
        gutterBottom
        sx={{ paddingTop: "10px" }}
      >
        <a
          href={post.postUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {post.postTitle}
        </a>
        <br />
        <Typography
          variant="subtitle1"
          align="left"
          display="inline"
          sx={{ paddingLeft: "10px", color: "grey" }}
        >
          by {post.posterUserInfo.userName}
        </Typography>
      </Typography>
      <Typography
        variant="body1"
        align="left"
        sx={{ paddingBottom: "10px", wordWrap: "break-word" }}
      >
        {post.content}
      </Typography>
      <form
        onSubmit={handleCommentSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginTop: "20px",
        }}
      >
        <TextField
          name="comment"
          label="Add a comment"
          variant="outlined"
          multiline={true}
          fullWidth
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ marginTop: "10px" }}
          style={{ backgroundColor: "#0077be" }}
        >
          Submit Comment
        </Button>
      </form>
      <div style={{ paddingTop: "10px" }}>
        {comments.length === 0 ? (
          <Typography
            variant="body1"
            align="center"
            sx={{ paddingTop: "20px" }}
          >
            There are 0 comments.
          </Typography>
        ) : (
          comments.map((comment) => (
            <Comment
              key={comment.id}
              id={comment.id}
              allComments={allComments}
              postId={postId}
              refetchPost={refetchPost}
              globalUserInfo={props.globalUserInfo}
            />
          ))
        )}
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
    </Container>
  );
}

export default PostDetails;
