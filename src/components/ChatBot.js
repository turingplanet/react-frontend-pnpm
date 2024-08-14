import "../assets/styles/Chatbot.css";

import { Button, IconButton, Paper } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import { BOT_API } from "./utils/config";
import ChatIcon from "@mui/icons-material/Chat";
import { CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

function Chatbot() {
  const initialMessage = [
    {
      text: "Sample Q&A:",
      sender: "bot",
    },
    {
      text: "Which companies are engaged in the electric car industry?",
      sender: "user",
    },
    {
      text: "The companies engaged in the electric car industry are Tesla, Inc. [TSLA] and PACCAR Inc [PCAR].",
      sender: "bot",
    },
  ];
  const [messages, setMessages] = useState(initialMessage); // Initialize with the sample Q&A

  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const bottomOfChat = useRef(null); // Ref to the bottom of the chat

  const renderMessage = (msg) => {
    if (typeof msg !== "string") return msg;
    const regex = /\[([^\]]+)\]/g; // Regex to find text within brackets
    const parts = msg.split(regex); // Split the message into parts
    return parts.map((part, index) => {
      // Assuming stock symbols are uppercase and consist of 2-5 characters
      if (part.match(/^[A-Z]{2,5}$/)) {
        return (
          <Link
            key={index}
            to={`/company_info/${part}`}
            style={{
              textDecoration: "underline",
              color: "#1976d2",
            }}
          >
            {" "}
            [{part}]
          </Link>
        );
      } else if (regex.test(`[${part}]`)) {
        // If the part is not a stock symbol but was in brackets
        return `${part}`;
      }
      return part; // Normal text
    });
  };

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages((messages) => [...messages, { text: input, sender: "user" }]);
    setInput("");
    setIsLoading(true);

    fetch(`${BOT_API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query: input }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessages((messages) => [
          ...messages,
          { text: data.response, sender: "bot" },
        ]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching response:", error);
        setIsLoading(false);
        setMessages((messages) => [
          ...messages,
          {
            text: "An error occurred while fetching the response. Please try again.",
            sender: "bot",
          },
        ]);
      });
  };
  useEffect(() => {
    if (bottomOfChat.current) {
      bottomOfChat.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleChatbot = () => {
    setIsMinimized(!isMinimized);
  };

  if (isMinimized) {
    return (
      <Paper
        className="chatbot-minimized"
        onClick={toggleChatbot}
        elevation={3}
      >
        <IconButton color="primary">
          <ChatIcon fontSize="large" />
        </IconButton>
      </Paper>
    );
  }

  return (
    <Paper className="chatbot" elevation={3}>
      <div className="chat-header">
        <IconButton onClick={toggleChatbot}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {renderMessage(msg.text)}
          </div>
        ))}
        {/* Loading indicator and the bottom ref */}
        {isLoading && (
          <div className="loading-indicator">
            <CircularProgress color="secondary" style={{ color: "#66bb6a" }} />
          </div>
        )}
        <div ref={bottomOfChat} /> {/* Empty div for scrolling to bottom */}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          classNmae="chat-button"
          variant="contained"
          style={{ fontSize: "15px" }}
          onClick={sendMessage}
          color="success"
        >
          Send
        </Button>
      </div>
    </Paper>
  );
}

export default Chatbot;
