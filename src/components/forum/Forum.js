import { List, ListItem, ListItemText, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { Link } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUpOffAlt";
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

const GET_POSTS = gql`
  query {
    posts {
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

const UPVOTE_POST = gql`
  mutation UpvotePost($postId: String!) {
    upvotePost(postId: $postId) {
      post {
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
  }
`;

function Forum() {
  const { loading, error, data, refetch } = useQuery(GET_POSTS);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const [upvotePost] = useMutation(UPVOTE_POST, {
    update(cache, { data: { upvotePost } }) {
      const existingPosts = cache.readQuery({ query: GET_POSTS });

      const newPosts = existingPosts.posts.map((post) => {
        return post.id === upvotePost.post.id ? upvotePost.post : post;
      });

      cache.writeQuery({
        query: GET_POSTS,
        data: { posts: newPosts },
      });
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleThumbUpClick = (id) => {
    upvotePost({ variables: { postId: id } });
  };

  const posts = data.posts;

  return (
    <div>
      <Typography
        style={{ marginTop: "20px" }}
        variant="h4"
        align="center"
        gutterBottom
      >
        Forum
      </Typography>
      <List sx={styles.root} style={{ maxWidth: "800px", margin: "auto" }}>
        {posts.map((post) => (
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
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                    style={{ marginLeft: "auto", cursor: "pointer" }}
                    onClick={() => handleThumbUpClick(post.id)}
                  >
                    <ThumbUpIcon /> {post.upvote}
                  </Typography>
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
        ))}
      </List>
    </div>
  );
}

export default Forum;
