import { useContext, useRef, useEffect } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import {
  useMediaQuery,
  Grid,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import NewChatInput from "./NewChatInput";
import Avatar from "avataaars";
import { FaDiscord } from "react-icons/fa";
import MinimizeIcon from "@mui/icons-material/Minimize";
import filter from "leo-profanity";

const NewTokenChat = (props) => {
  // variables
  const {
    getDateForMatch,
    messages,
    isBlueTeam,
    isRedTeam,
    token,
    newMessage,
    setUnreadMessages,
    setUnreadCount,
    handleClose,
    hidden,
    handleSendMessage,
  } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const isMobile = useMediaQuery("(max-width:500px)");
  const messagesEnd = useRef();

  // methods
  const isValidHttpUrl = (string) => {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === "https:";
  };

  const isClashLink = (link) => {
    if (isValidHttpUrl(link)) {
      const clashLinkArr = link?.split(".");
      if (clashLinkArr) {
        if (clashLinkArr[1] === "clashroyale") {
          return true;
        }
      }
    }
    return false;
  };

  const getBackgroundColor = (name, message) => {
    if (token?.game === "CLASH") {
      if (isClashLink(message)) {
        return "#00ffff";
      }
    }

    if (!isBlueTeam(name, token) && !isRedTeam(name, token)) {
      if (name === "Game" || name === "[GAME]") {
        return theme.green();
      }
      return theme.purple();
    }

    if (isBlueTeam(name, token)) {
      return theme.blue();
    }

    return theme.red();
  };

  const getClashLink = (message) => {
    filter.remove(["suck"]);
    if (token?.game === "CLASH") {
      if (isClashLink(message)) {
        return (
          <Typography>
            <a
              href={message}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.clashLink}
            >
              Add me on Clash Royale!
            </a>
          </Typography>
        );
      }
    }
    return (
      <Typography style={styles.chatMessage}>
        {store?.user?.role >= 100 ? message : filter.clean(message, "*", 2)}
      </Typography>
    );
  };

  // effects
  useEffect(() => {
    setUnreadMessages(false);
  }, [newMessage]);

  useEffect(() => {
    messagesEnd?.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [messages]);

  useEffect(() => {
    if (!hidden) {
      setUnreadCount(0);
    }
  }, [hidden]);

  // styles
  const styles = {
    card: {
      backgroundColor: theme.card(),
      borderRadius: 2,
      boxShadow: theme.shadow(),
      width: 350,
      height: 600,
    },
    divider: {
      backgroundColor: theme.subText(),
      marginBottom: 2,
    },
    discord: {
      color: theme.white(),
      fontSize: 18,
      textTransform: "none",
      fontWeight: 900,
      borderRadius: 50,
      boxShadow: "0 0",
      transition: "all .3s ease-in-out",
      backgroundColor: theme.blue(),
      "&:hover": {
        backgroundColor: theme.blue(),
        color: theme.white(),
        boxShadow: theme.shadow(),
        transform: "scale(1.1)",
      },
    },
    chatBox: {
      height: 465,
      overflowY: "auto",
      overflowX: "hidden",
      overflowWrap: "break-word",
      minWidth: "100%",
      inlineSize: 250,
      padding: "3%",
    },
    chatName: {
      fontSize: 14,
      color: theme.text(),
      fontWeight: 600,
    },
    chatTime: {
      fontSize: 14,
      color: theme.metaText(),
      fontWeight: 400,
    },
    chatMessage: {
      fontSize: 15,
      color: theme.white(),
      maxWidth: 275,
    },
    clashLink: {
      fontSize: 16,
      color: "#4a4b5e",
      textDecoration: "underline",
    },
    new: {
      fontSize: 20,
      fontWeight: 900,
      color: theme?.red(),
    },
    closeButton: {
      color: theme.icon(),
      backgroundColor: theme.iconButton(),
      borderRadius: 100,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transition: "all .3s ease-in-out",
      position: "absolute",
      height: 35,
      width: 35,
      top: 15,
      right: 10,
      "&:hover": {
        transform: "scale(1.1)",
        backgroundColor: theme.iconButton(),
      },
    },
  };

  return (
    <Grid
      item
      sx={{
        width: 350,
        position: "fixed",
        bottom: isMobile ? 0 : isDesktop ? 0 : 59,
        right: isMobile ? 10 : 120,
        height: 600,
        zIndex: 1000000000000000,
      }}
    >
      <Paper sx={styles.card}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="start"
          rowSpacing={{ xs: 1 }}
          sx={{
            minHeight: "100%",
            paddingLeft: "3%",
            paddingRight: "3%",
            paddingBottom: "1%",
          }}
        >
          <Grid
            item
            sx={{
              width: "100%",
              borderBottom: `2px solid ${theme.skeleton()}`,
              boxShadow: theme.chatShadow(),
            }}
          >
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid
                item
                sx={{
                  minWidth: isDesktop ? 0 : "100%",
                  paddingBottom: 1,
                }}
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="start"
                >
                  <Grid item>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: 18,
                        color: theme.text(),
                      }}
                    >
                      Messages
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: 14,
                      color: theme.metaText(),
                      textAlign: isDesktop ? "none" : "center",
                    }}
                  >
                    {getDateForMatch(token?.wagerid)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  style={styles.closeButton}
                >
                  <MinimizeIcon
                    sx={{ fontSize: 28, position: "absolute", top: -5 }}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>

          <div style={styles.chatBox} id="chat-box">
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="start"
              rowSpacing={{ xs: 0.5 }}
              sx={{ width: "100%" }}
            >
              {messages?.map((message, i) => {
                return (
                  <Grid
                    item
                    alignSelf={
                      isBlueTeam(message?.name, token) ? "start" : "end"
                    }
                    sx={{ width: "100%" }}
                    key={i}
                  >
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems={
                        isBlueTeam(message?.name, token)
                          ? "start"
                          : isRedTeam(message?.name, token)
                          ? "end"
                          : message?.name === "[GAME]" ||
                            message?.name === "Game"
                          ? "center"
                          : "start"
                      }
                    >
                      <Grid item>
                        <Grid
                          container
                          justifyContent="center"
                          alignItems="center"
                          columnSpacing={{ xs: 1 }}
                        >
                          <Grid item>
                            <Typography style={styles.chatName}>
                              {message?.name}
                            </Typography>
                          </Grid>

                          <Grid item>
                            <Typography style={styles.chatTime}>
                              {message?.time}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item ref={messagesEnd} id="last-message">
                        <Grid
                          container
                          justifyContent="center"
                          alignItems="center"
                        >
                          {isRedTeam(message?.name, token) ? (
                            <Grid
                              item
                              sx={{
                                maxWidth: 400,
                                minWidth: 50,
                                paddingLeft: 1,
                                paddingRight: 1,
                                paddingTop: 0.5,
                                paddingBottom: 0.5,
                                textAlign: "center",
                                backgroundColor: getBackgroundColor(
                                  message?.name,
                                  message?.body
                                ),
                                borderRadius: 2,
                              }}
                            >
                              {getClashLink(message?.body)}
                            </Grid>
                          ) : !isRedTeam(message?.name, token) &&
                            !isBlueTeam(message?.name, token) ? (
                            <Grid
                              item
                              sx={{
                                maxWidth: 400,
                                minWidth: 50,
                                paddingLeft: 1,
                                paddingRight: 1,
                                paddingTop: 0.5,
                                paddingBottom: 0.5,
                                textAlign: "center",
                                backgroundColor: getBackgroundColor(
                                  message?.name,
                                  message?.body
                                ),
                                borderRadius: 2,
                              }}
                            >
                              <Typography style={styles.chatMessage}>
                                {getClashLink(message?.body)}
                              </Typography>
                            </Grid>
                          ) : null}
                          <Grid item sx={{ marginRight: 1 }} alignSelf="start">
                            {message?.name !== "[GAME]" &&
                            message?.name != "Game" ? (
                              !token?.userSet ||
                              !token?.userSet[message?.name]?.avatar ? null : (
                                <Grid item>
                                  <Avatar
                                    style={{ width: 40, height: 40 }}
                                    avatarStyle="Circle"
                                    {...token?.userSet[message?.name]
                                      ?.avatar[0]}
                                  />
                                </Grid>
                              )
                            ) : null}
                          </Grid>

                          {isBlueTeam(message?.name, token) ? (
                            <Grid
                              item
                              sx={{
                                maxWidth: 400,
                                minWidth: 50,
                                paddingLeft: 1,
                                paddingRight: 1,
                                paddingTop: 0.5,
                                paddingBottom: 0.5,
                                textAlign: "center",
                                backgroundColor: getBackgroundColor(
                                  message?.name,
                                  message?.body
                                ),
                                borderRadius: 2,
                              }}
                            >
                              {getClashLink(message?.body)}
                            </Grid>
                          ) : null}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </div>

          <Grid
            item
            sx={{ width: "100%", borderTop: `2px solid ${theme.skeleton()}` }}
          >
            <Grid
              container
              justifyContent="start"
              alignItems="center"
              columnSpacing={{ xs: 1 }}
            >
              {newMessage == null || newMessage == "" ? (
                <Grid
                  item
                  sx={{
                    transition: "all .2s ease-in-out",
                    "&:hover": {
                      cursor: "pointer",
                      transform: "scale(1.1)",
                    },
                    paddingTop: 1,
                    backgroundColor: theme.skeleton(),
                    borderRadius: 50,
                    height: 40,
                    width: 40,
                    marginLeft: 1,
                  }}
                  onClick={() =>
                    window.open("https://discord.gg/tknsgg", "_blank")
                  }
                >
                  <FaDiscord
                    style={{
                      fontSize: 25,
                      color: theme.text(),
                    }}
                  />
                </Grid>
              ) : null}
              <Grid
                item
                sx={{
                  minWidth:
                    newMessage == null || newMessage == "" ? 287 : "100%",
                  marginTop: 0.3,
                }}
              >
                <NewChatInput
                  placeholder="Type to chat, enter to send"
                  handleSendMessage={handleSendMessage}
                  disabled={
                    isRedTeam(store?.user?.username, token) ||
                    isBlueTeam(store?.user?.username, token) ||
                    store?.user?.role >= 100
                      ? false
                      : true
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default NewTokenChat;
