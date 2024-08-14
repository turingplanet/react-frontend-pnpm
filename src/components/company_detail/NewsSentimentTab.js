import { Button, Link } from "@mui/material";

import React from "react";

const NewsSentimentTab = ({ newsSentimentList }) => {
  if (!Array.isArray(newsSentimentList)) {
    console.error("newsSentimentList is not an array:", newsSentimentList);
    return <p>No news sentiment data available.</p>;
  }
  return (
    <>
      {newsSentimentList &&
        newsSentimentList.map((news, index) => (
          <div
            key={index}
            style={{
              padding: "15px",
              margin: "10px 0",
              border: "1px solid #e0e0e0",
              borderRadius: "5px",
              backgroundColor: "#ffffff",
            }}
          >
            <p style={{ fontSize: "18px", marginBottom: "10px" }}>
              {news.title}
            </p>
            <p style={{ fontSize: "14px", marginBottom: "5px" }}>
              Published on: {news.time_published}
            </p>
            <p style={{ fontSize: "14px", marginBottom: "5px" }}>
              Sentiment: {news.sentiment_label}
            </p>
            <p style={{ fontSize: "16px", marginBottom: "10px" }}>
              {news.summary}
            </p>
            <Link
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
            >
              <Button size="small">Learn More</Button>
            </Link>
          </div>
        ))}
    </>
  );
};

export default NewsSentimentTab;
