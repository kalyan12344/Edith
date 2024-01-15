import React, { useEffect } from "react";
import { useState } from "react";
import "../styling/chat.css";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Button } from "@mui/material";
import { Avatar } from "@mui/material";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      content: "Hello! This is Edith. How can I assist you?",
      role: "assistant",
    },
  ]);
  const [typedMessage, setTypedMessage] = useState("");
  const [sendDisabled, setSendDisabled] = useState(true);
  const handleSend = () => {
    console.log(
      typedMessage.toLowerCase() == "what is your name",
      typeof typedMessage
    );

    setMessages((prev) => [...prev, { content: typedMessage, role: "user" }]);
    if (
      typedMessage.toLowerCase() == "what is your name" ||
      typedMessage.toLowerCase() == "what's your name"
    ) {
      setMessages((prev) => [
        ...prev,
        {
          content:
            "I'm Edith, a chat bot assistant, built by Kalyan using OpenAI api",
          role: "assistant",
        },
      ]);
    } else {
      axios
        .post("http://localhost:8080/chat", {
          messages: [{ content: typedMessage, role: "user" }],
        })
        .then((res) => setMessages((prev) => [...prev, res.data]))
        .catch((err) => {
          console.log(err);
        });
    }
    setTypedMessage("");
    console.log(messages);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !sendDisabled) {
      handleSend();
    }
  };

  const getAvatar = (type) => {
    if (type === "user") {
      return <Avatar alt="User" src="shs" />;
    } else if (type === "assistant") {
      return (
        <Avatar
          alt="Bot"
          src="data:image/jpeg;base64,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"
        />
      );
    }
    return null;
  };
  useEffect(() => {
    if (typedMessage.trim().length == 0) {
      setSendDisabled(true);
    } else {
      setSendDisabled(false);
    }
  }, [typedMessage]);

  return (
    <div className="container">
      <div className="title">EDITH</div>
      <div className="chatwindow">
        <div className="chat">
          <div className="display-messages">
            {messages.map((message, index) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  maxWidth: "400px",
                  // justifyContent: "baseline",
                  height: "fitcontent",
                  marginBottom: "10px",
                  alignItems: "baseline",
                  padding: "10px",
                  borderRadius: "5px",
                }}
                key={index}
                className={`message ${
                  message.role === "user" ? "user-message" : "bot-message"
                }`}
              >
                {message.role !== "user" ? (
                  <div className="">{getAvatar(message.role)}</div>
                ) : (
                  <div>{getAvatar(message.role)}</div>
                )}
                <div
                  className={` ${
                    message.role === "user" ? "user-message" : "bot-message"
                  }`}
                >
                  {message.content}
                </div>
                {/* {message.type == "user" && (
                <div className="avatar">{getAvatar(message.type)}</div>
              )} */}
              </div>
            ))}
          </div>

          <div className="message-button">
            {" "}
            <input
              type="text"
              className="messagebox"
              placeholder="Type here..."
              value={typedMessage}
              onChange={(e) => {
                setTypedMessage(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            ></input>
            <Button
              variant="contained"
              className="send-button"
              onClick={handleSend}
              disabled={sendDisabled}
              sx={{ background: "white", borderRadius: "30px" }}
            >
              <DoubleArrowIcon
                color="primary"
                sx={{ fontSize: "30px", width: "50px" }}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
