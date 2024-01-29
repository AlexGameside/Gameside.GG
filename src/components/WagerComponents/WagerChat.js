import { Grid, Paper, Typography, Divider, Button } from "@mui/material";

import { useContext, useEffect, useState, useRef } from "react";

import constants from "../../utils/constants";
import { FaDiscord } from "react-icons/fa";
import { IconContext } from "react-icons";

const WagerChat = (props) => {
  const styles = {
    chatBox: {
      height: 500,
      paddingRight: 2,
      overflowY: "auto",
      overflowX: "hidden",
      overflowWrap: "break-word",
      marginTop: 4,
      marginBottom: 12,
      minWidth: "90%",
      inlineSize: 250,
      overflowWrap: "break-word",
    },
    messageInput: {
      backgroundColor: "#F2F3F8",
      padding: 10,
      border: "none",
      borderRadius: 15,
      outline: "none",
      width: "100%",
      color: constants.newGray,
    },
    discord: {
      backgroundColor: "#32333B",
      width: "100%",
      marginTop: 1,
      borderRadius: 3,
      "&:hover": {
        backgroundColor: "#32333B",
        opacity: 0.9,
        color: constants.white,
      },
      transition: "0.3s",
    },
  };

  const {
    messages,
    getDateForMatch,
    getTimeForMatch,
    currentWagerStatus,
    user,
    handleMessageChange,
    handleKeyPressEnter,
    newMessage,
  } = props;
  const messagesEnd = useRef(null);

  // update the chat to scroll down on new messages
  useEffect(() => {
    messagesEnd?.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [messages]);

  return (
    <Grid item xs={12} sm={12} md={12} lg={3} sx={{ minHeight: "100%" }}>
      <Paper
        elevation={1}
        sx={{
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          padding: 2,
          flexDirection: "column",
          flexWrap: "wrap",
          minHeight: "50%",
        }}
      >
        <Typography
          sx={{
            alignSelf: "center",
            fontWeight: 900,
            color: constants.newGray,
            fontSize: 28,
          }}
        >
          Messages
        </Typography>
        <Typography
          sx={{
            alignSelf: "center",
            fontWeight: 200,
            color: constants.newGray,
            fontSize: 18,
          }}
        >
          {getDateForMatch()} ({getTimeForMatch})
        </Typography>
        <Divider
          sx={{
            marginTop: 1,
            marginBottom: 1,
            color: constants.gray,
          }}
        />
        <div style={styles.chatBox}>
          {messages?.map((message, i) => {
            const shouldSplit = message?.name[0] === "(";
            const isBlueTeam = currentWagerStatus?.blue_users?.includes(
              shouldSplit ? message?.name?.split(" ")[2] : message?.name
            );
            const isRedTeam = currentWagerStatus?.red_users?.includes(
              shouldSplit ? message?.name?.split(" ")[2] : message?.name
            );

            return (
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 900,
                  color: isBlueTeam
                    ? constants.newBlue
                    : isRedTeam
                    ? constants.newOrange
                    : constants.newGreen,
                }}
              >
                <span
                  style={{
                    color: "#A8A9B3",
                    fontSize: 14,
                  }}
                >
                  ({message?.time}){" "}
                </span>
                {message?.name}
                <Typography
                  sx={{
                    display: "inline",
                    fontWeight: 500,
                    color: constants.gray,
                    fontSize: 16,
                  }}
                  id="chat-box"
                  ref={messagesEnd}
                >
                  {`: ${message?.body}`}
                </Typography>
              </Typography>
            );
          })}
        </div>
        <input
          onChange={handleMessageChange}
          onKeyPress={handleKeyPressEnter}
          value={newMessage}
          style={styles.messageInput}
          placeholder="Type to chat, enter to send"
        />
      </Paper>
      <Button
        href="https://discord.gg/tknsgg"
        variant="contained"
        size="large"
        sx={styles.discord}
      >
        <Typography
          sx={{
            fontWeight: 900,
            padding: 1,
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconContext.Provider value={{ color: constants.white }}>
            Join Our Discord{" "}
            <FaDiscord style={{ marginLeft: 4, fontSize: 24 }} />
          </IconContext.Provider>
        </Typography>
      </Button>
    </Grid>
  );
};

export default WagerChat;
