import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { red } from "@mui/material/colors";

const styles = {
  root: {
    width: "100%",
  },
  inline: {
    display: "inline",
  },
  avatar: {
    backgroundColor: red[500],
  },
  thumbUpIcon: {
    float: "right",
  },
  primaryText: {
    display: "flex",
  },
  secondaryText: {
    "&:hover": {
      color: red[500],
    },
  },
};

const GET_POSTS_BY_USER = gql`
  query PostsByUser($userId: String!) {
    postsByUser(userId: $userId) {
      id
      postTitle
      content
      postDate
      postUrl
      posterUserInfo {
        userId
        userName
      }
      upvote
    }
  }
`;

const DELETE_POST = gql`
  mutation DeletePost($postId: String!, $userId: String!) {
    deletePost(postId: $postId, userId: $userId) {
      success
    }
  }
`;

function MyForumPublish(props) {
  const userId = props.globalUserInfo
    ? props.globalUserInfo.userId
    : "new_user_id";
  // const userId = 'hzheng2';

  const { loading, error, data, refetch } = useQuery(GET_POSTS_BY_USER, {
    variables: { userId },
  });
  const [deletePost] = useMutation(DELETE_POST, {
    onCompleted: () => {
      refetch();
    },
  });

  useEffect(() => {
    refetch();
    console.log(props);
    console.log(props.globalUserInfo);
  }, [refetch, props]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Typography
        style={{ marginTop: "20px" }}
        variant="h4"
        align="center"
        gutterBottom
      >
        My Posts
      </Typography>
      <List sx={styles.root} style={{ maxWidth: "800px", margin: "auto" }}>
        {data && data.postsByUser && data.postsByUser.length > 0 ? (
          [...data.postsByUser]
            .sort((a, b) => new Date(b.postDate) - new Date(a.postDate))
            .map((post) => (
              <ListItem key={post.id} alignItems="flex-start">
                <ListItemText
                  primary={
                    <div style={styles.primaryText}>
                      <Typography
                        component="span"
                        variant="subtitle1"
                        color="textPrimary"
                      >
                        <a
                          href={post.postUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          {post.postTitle}
                        </a>
                      </Typography>
                      <Button
                        color="error"
                        style={{ marginLeft: "auto", cursor: "pointer" }}
                        onClick={() =>
                          deletePost({
                            variables: { postId: post.id, userId: userId },
                          })
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  }
                  secondary={
                    <React.Fragment>
                      <Link
                        to={`/post/${post.id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {new Date(post.postDate).toLocaleDateString()} |{" "}
                        {post.content.length > 50
                          ? post.content.substring(0, 50) + "...."
                          : post.content}
                      </Link>
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))
        ) : (
          <Typography variant="h6" align="center">
            You haven't posted anything
          </Typography>
        )}
      </List>
    </div>
  );
}

export default MyForumPublish;
