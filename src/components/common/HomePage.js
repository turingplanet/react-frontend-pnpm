import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import CompareCompany from "../../assets/images/compare.png";
import ForumImage from "../../assets/images/forum.png";
import { Link } from "react-router-dom";
import React from "react";
import TopImage from "../../assets/images/top_company.png";

const cardData = [
  {
    id: 1,
    title: "Top Market Titans",
    description: "Dive into the list of top-performing companies.",
    image: TopImage,
    link: "/top",
  },
  {
    id: 2,
    title: "Compare Companies",
    description: "Analyse key financial metrics across different firms.",
    image: CompareCompany,
    link: "/compare",
  },
  {
    id: 3,
    title: "Join the Forum",
    description:
      "Discuss the latest trends and insights with fellow enthusiasts.",
    image: ForumImage,
    link: "/forum",
  },
];

function HomePage() {
  return (
    <Container>
      <Typography
        style={{ marginTop: "50px", textAlign: "center", fontWeight: "350" }}
        variant="h2"
        gutterBottom
      >
        Welcome to <span style={{ color: "#f44336" }}>Investor</span>
        <span style={{ color: "#1e88e5" }}>Data</span>
      </Typography>
      <Typography
        style={{ margin: "50px", textAlign: "center" }}
        variant="h5"
        sx={{ marginBottom: 4 }}
      >
        Explore the dynamic world of finance and investment
      </Typography>

      <Grid container spacing={4}>
        {cardData.map((card) => (
          <Grid key={card.id} item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={card.image}
                alt={card.title}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {card.title}
                </Typography>
                <Typography variant="body1">{card.description}</Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" component={Link} to={card.link}>
                  Explore
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default HomePage;
