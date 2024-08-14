import { Box, Container, Typography } from "@mui/material";

import React from "react";

function About() {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h2" component="h1" gutterBottom>
          About InvestorData
        </Typography>
        <Typography variant="body1" gutterBottom>
          At InvestorData, we specialize in offering in-depth analytics and
          insights into the ever-evolving stock market. Our platform is designed
          to empower investors, financial analysts, and market enthusiasts with
          real-time data, trend analysis, and comprehensive sector overviews.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Leveraging cutting-edge technology and AI-driven algorithms, we
          provide a unique perspective on market dynamics, helping our users
          make informed investment decisions. From tracking the top market
          titans to identifying high-growth prospects and high-risk high-reward
          ventures, InvestorData is your reliable guide in the world of finance.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Our commitment to excellence is reflected in our continuous innovation
          and dedication to delivering accurate, user-friendly, and actionable
          insights. Join us at InvestorData and experience the new standard in
          financial analytics and stock market research.
        </Typography>
      </Box>
    </Container>
  );
}

export default About;
