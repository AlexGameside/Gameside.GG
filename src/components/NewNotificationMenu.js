import {
  Menu,
  Typography,
  Grid,
  Button,
  CircularProgress,
  Alert,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { useContext, useState } from "react";
import {
  StoreContext,
  StoreDispatch,
  SET_USER,
} from "../context/NewStoreContext";
import {
  acceptRematch,
  clearNotifs,
  dismissNotification,
  joinTeam,
  readNotification,
} from "../utils/API";
import createTheme from "../utils/theme";
import useAxios from "../utils/useAxios";
import Avatar from "avataaars";
import constants from "../utils/constants";
import { FaTrophy } from "react-icons/fa";
import NewSecondaryButton from "../custom_components/NewSecondaryButton";
import NewPrimaryButton from "../custom_components/NewPrimaryButton";
import NewOutlineButton from "../custom_components/NewOutlineButton";
import NewCustomIconButton from "../custom_components/NewCustomIconButton";
import BubbleButton from "../custom_components/BubbleButton";

const NewNotificationMenu = (props) => {
  // variables
  const { anchor, handleClose } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const api = useAxios();
  const dispatch = useContext(StoreDispatch);
  const isDesktop = useMediaQuery("(min-width:1025px)");

  // state
  const [selected, setSelected] = useState("unread");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [declineLoading, setDeclineLoading] = useState(false);
  const [clearLoading, setClearLoading] = useState(false);

  // methods

  const longEnUSFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getTime = (date) => {
    return new Date(date).toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const isToday = (otherDate) => {
    const todayDate = new Date();
    if (
      otherDate.getDate() === todayDate.getDate() &&
      otherDate.getMonth() === todayDate.getMonth() &&
      otherDate.getYear() === todayDate.getYear()
    ) {
      return true;
    } else {
      return false;
    }
  };

  const isYesterday = (otherDate) => {
    const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    if (
      otherDate.getDate() === yesterday.getDate() &&
      otherDate.getMonth() === yesterday.getMonth() &&
      otherDate.getYear() === yesterday.getYear()
    ) {
      return true;
    } else {
      return false;
    }
  };

  const getNotiDate = (date) => {
    if (isToday(date)) {
      return `Today at ${getTime(date)}`;
    }

    if (isYesterday(date)) {
      return `Yesterday at ${getTime(date)}`;
    }

    return `${longEnUSFormatter.format(new Date(date))} at ${getTime(date)}`;
  };

  const handleJoinTeam = (notification) => {
    setLoading(true);
    setAcceptLoading(true);
    joinTeam(
      api,
      notification?.attached,
      store?.user?.username,
      notification
    ).then((res) => {
      if (!res?.error) {
        setLoading(false);
        setAcceptLoading(false);
        let newUser = store?.user;
        const index = store?.user?.notifications?.indexOf(notification);
        newUser.notifications[index].read = true;
        newUser.userTeams.push(res?.team);
        dispatch({ type: SET_USER, payload: { ...newUser } });
        return;
      }
      setAcceptLoading(false);
      setLoading(false);
      setError("Could not join team");
    });
  };

  const handleAcceptRematch = (notification) => {
    setLoading(true);
    setAcceptLoading(true);
    acceptRematch(api, notification?.attached).then((res) => {
      if (!res?.error) {
        setLoading(false);
        setAcceptLoading(false);
        handleReadNoti(notification);
        window.location.href = `https://tkns.gg/token/${res?.tokenId}`;
        return;
      }
      setAcceptLoading(false);
      setLoading(false);
      setError(res?.message);
    });
  };

  const handleDeclineInvite = (notification) => {
    setLoading(true);
    setDeclineLoading(true);
    dismissNotification(api, notification).then((res) => {
      if (!res?.error) {
        setLoading(false);
        setDeclineLoading(false);
        let newUser = store?.user;
        newUser.notifications = res?.notis;
        dispatch({ type: SET_USER, payload: { ...newUser } });
        return;
      } else {
        setLoading(false);
        setDeclineLoading(false);
        setError("Could not decline notification!");
      }
    });
  };

  const handleReadNoti = (notification) => {
    setLoading(true);
    setDeclineLoading(true);
    readNotification(api, notification).then((res) => {
      if (!res?.error) {
        setLoading(false);
        setDeclineLoading(false);
        let newUser = store?.user;
        newUser.notifications = res?.notis;
        dispatch({ type: SET_USER, payload: { ...newUser } });
        return;
      } else {
        setLoading(false);
        setDeclineLoading(false);
        setError(res?.message);
      }
    });
  };

  const handleClearNotis = () => {
    setLoading(true);
    setClearLoading(true);
    clearNotifs(api).then((res) => {
      if (!res?.error) {
        let newUser = store?.user;
        newUser.notifications = [];
        dispatch({ type: SET_USER, payload: { ...newUser } });
        setLoading(false);
        setClearLoading(false);
        return;
      } else {
        setLoading(false);
        setClearLoading(false);
        setError("Could not clear notifications!");
      }
    });
  };

  const getAvatar = (avatar) => {
    if (avatar?.length == null) {
      return avatar;
    } else {
      return avatar[0];
    }
  };

  const shouldShowAvatar = (notiType) => {
    switch (notiType) {
      case "new_register":
      case "new_match":
      case "new_tournament_win":
      case "tourney":
      case "new_tournament_earned":
        return false;
      default:
        return true;
    }
  };

  // get action buttons for notis
  const getActionButtonsForNoti = (noti) => {
    if (
      noti?.type === "new_register" ||
      noti?.type === "pun" ||
      noti?.type === "tourney"
    ) {
      return (
        <Grid item sx={{ marginTop: 1, marginBottom: 1 }}>
          <Grid
            container
            justifyContent="start"
            alignItems="center"
            columnSpacing={{ xs: 1 }}
          >
            <Grid item>
              <NewSecondaryButton
                small
                label="Dismiss"
                loading={declineLoading}
                onClick={() => handleReadNoti(noti)}
              />
            </Grid>
          </Grid>
        </Grid>
      );
    }

    if (
      noti?.type === "new_tournament_win" ||
      noti?.type === "new_tournament_earned"
    ) {
      return (
        <Grid item sx={{ marginTop: 1, marginBottom: 1 }}>
          <Grid
            container
            justifyContent="start"
            alignItems="center"
            columnSpacing={{ xs: 1 }}
          >
            <Grid item>
              <NewPrimaryButton
                small
                label="View Tournament"
                loading={acceptLoading}
                onClick={() => {
                  window.location.href = `${constants.clientURL}/tournament/${noti?.attached?._id}`;
                  return;
                }}
              />
            </Grid>

            <Grid item>
              <NewSecondaryButton
                small
                label="dismiss"
                loading={declineLoading}
                onClick={() => handleReadNoti(noti)}
              />
            </Grid>
          </Grid>
        </Grid>
      );
    }

    if (noti?.type === "new_match") {
      return (
        <Grid item sx={{ marginTop: 1, marginBottom: 1 }}>
          <Grid
            container
            justifyContent="start"
            alignItems="center"
            columnSpacing={{ xs: 1 }}
          >
            <Grid item>
              <NewPrimaryButton
                small
                label="View Match"
                loading={acceptLoading}
                onClick={() => {
                  window.location.href = `${constants.clientURL}/token/${noti?.attached}`;
                  return;
                }}
              />
            </Grid>

            <Grid item>
              <NewSecondaryButton
                small
                label="Dismiss"
                onClick={() => handleReadNoti(noti)}
                loading={declineLoading}
              />
            </Grid>
          </Grid>
        </Grid>
      );
    }

    if (noti?.type === "invite" || noti?.type === "rematch") {
      return (
        <Grid item sx={{ marginTop: 1, marginBottom: 1 }}>
          <Grid
            container
            justifyContent="start"
            alignItems="center"
            columnSpacing={{ xs: 1 }}
          >
            <Grid item>
              <NewPrimaryButton
                label="Accept"
                small
                loading={acceptLoading}
                onClick={() => {
                  if (noti?.type === "invite") {
                    handleJoinTeam(noti);
                    return;
                  }
                  if (noti?.type === "rematch") {
                    handleAcceptRematch(noti);
                    return;
                  }
                }}
              />
            </Grid>
            <Grid item>
              <NewSecondaryButton
                small
                label="Decline"
                onClick={() => handleDeclineInvite(noti)}
                loading={declineLoading}
              />
            </Grid>
          </Grid>
        </Grid>
      );
    }
  };

  // styles
  const styles = {
    paper: {
      minWidth: 300,
      maxWidth: 400,
      overflowX: "hidden",
      overflowWrap: "break-word",
      borderRadius: 16,
      boxShadow: theme.shadow(),
      backgroundColor: theme.card(),
      color: theme.text(),
      paddingLeft: 12,
      paddingRight: 12,
      maxHeight: 700,
    },
    title: {
      fontSize: 22,
      fontWeight: 700,
      color: theme.text(),
    },
    selected: {
      color: theme.white(),
      fontSize: 14,
      textTransform: "none",
      fontWeight: 600,
      borderRadius: 50,
      boxShadow: "0 0",
      transition: "all .2s ease-in-out",
      backgroundColor: theme.blue(),
      "&:hover": {
        backgroundColor: theme.blue(),
        color: theme.white(),
        transform: "scale(1.1)",
        border: `2x solid ${theme.blue}`,
        boxShadow: "0 0",
      },
      border: `2x solid ${theme.blue}`,
    },
    notSelected: {
      color: theme.text(),
      fontSize: 14,
      textTransform: "none",
      fontWeight: 600,
      borderRadius: 50,
      boxShadow: "0 0",
      transition: "all .2s ease-in-out",
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: theme.blue(),
        color: theme.white(),
        transform: "scale(1.1)",
        border: `2x solid ${theme.blue}`,
        boxShadow: "0 0",
      },
      border: `2x solid ${theme.text}`,
    },
    clear: {
      color: theme.blue(),
      fontSize: 14,
      textTransform: "none",
      fontWeight: 600,
      borderRadius: 50,
      boxShadow: "0 0",
      transition: "all .2s ease-in-out",
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: "transparent",
        color: theme.blue(),
        transform: "scale(1.1)",
        boxShadow: "0 0",
      },
    },
    accept: {
      color: theme.green(),
      fontSize: 14,
      textTransform: "none",
      fontWeight: 600,
      borderRadius: 50,
      boxShadow: "0 0",
      transition: "all .2s ease-in-out",
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: "transparent",
        color: theme.green(),
        transform: "scale(1.1)",
        boxShadow: "0 0",
      },
    },
    decline: {
      color: theme.red(),
      fontSize: 14,
      textTransform: "none",
      fontWeight: 600,
      borderRadius: 50,
      boxShadow: "0 0",
      transition: "all .2s ease-in-out",
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: "transparent",
        color: theme.red(),
        transform: "scale(1.1)",
        boxShadow: "0 0",
      },
    },
    dismiss: {
      color: theme.metaText(),
      fontSize: 14,
      textTransform: "none",
      fontWeight: 600,
      borderRadius: 50,
      boxShadow: "0 0",
      transition: "all .2s ease-in-out",
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: "transparent",
        color: theme.metaText(),
        transform: "scale(1.1)",
        boxShadow: "0 0",
      },
    },
    type: {
      fontSize: 16,
      fontWeight: 600,
      color: theme.text(),
    },
    date: {
      fontSize: 14,
      fontWeight: 400,
      color: theme.blue(),
    },
    body: {
      fontSize: 18,
      fontWeight: 500,
      color: theme.text(),
    },
    readDate: {
      fontSize: 14,
      fontWeight: 400,
      color: theme.metaText(),
    },
    readBody: {
      fontSize: 18,
      fontWeight: 500,
      color: theme.subText(),
    },
    readType: {
      fontSize: 18,
      fontWeight: 900,
      color: theme.text(),
    },
  };

  return (
    <Menu
      anchorEl={anchor}
      open={Boolean(anchor)}
      onClose={handleClose}
      PaperProps={{
        style: styles.paper,
      }}
    >
      {store.user ? (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="start"
          rowSpacing={{ xs: 2 }}
        >
          <Grid item sx={{ width: "100%" }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography style={styles.title}>Notifications</Typography>
              </Grid>
              <Grid item>
                <Button
                  size="large"
                  sx={styles.clear}
                  onClick={handleClearNotis}
                  disabled={loading || store?.user?.notifications?.length < 1}
                >
                  {clearLoading ? (
                    <CircularProgress size={30} sx={{ color: theme.blue() }} />
                  ) : (
                    "Clear All"
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {error ? (
            <Grid item alignSelf="center">
              <Alert severity="error" onClose={() => setError("")}>
                {error}
              </Alert>
            </Grid>
          ) : null}

          <Grid item sx={{ width: "100%" }}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              columnSpacing={{ xs: 2 }}
            >
              <Grid item>
                <BubbleButton
                  title="Unread"
                  selected={selected === "unread"}
                  onClick={() => setSelected("unread")}
                />
              </Grid>
              <Grid item>
                <BubbleButton
                  title="Read"
                  selected={selected === "read"}
                  onClick={() => setSelected("read")}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item sx={{ width: "100%" }}>
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="start"
              rowSpacing={{ xs: 1 }}
            >
              {selected === "unread"
                ? store?.user?.notifications
                    ?.filter((noti) => noti?.read === false)
                    ?.map((noti, i) => {
                      return (
                        <Grid
                          key={i}
                          item
                          sx={{
                            padding: 1,
                            transition: ".2s ease-in-out",
                            "&:hover": {
                              cursor: "pointer",
                              backgroundColor: theme.skeleton(),
                              borderRadius: 3,
                            },
                            width: "100%",
                          }}
                        >
                          <Grid
                            container
                            justifyContent="start"
                            alignItems="start"
                            direction="row"
                            columnSpacing={{ xs: 2 }}
                            wrap="nowrap"
                          >
                            {!shouldShowAvatar(noti?.type) ? (
                              <Grid item>
                                <NewCustomIconButton>
                                  <FaTrophy
                                    style={{
                                      color: theme.text(),
                                      fontSize: 24,
                                    }}
                                  />
                                </NewCustomIconButton>
                              </Grid>
                            ) : (
                              <Grid item>
                                <Avatar
                                  style={{
                                    width: 50,
                                    height: 50,
                                    display: "inline-block",
                                  }}
                                  avatarStyle="Circle"
                                  {...getAvatar(noti?.avatar)}
                                />
                              </Grid>
                            )}
                            <Grid item xs={10}>
                              <Grid
                                container
                                direction="column"
                                alignItems="start"
                                justifyContent="center"
                              >
                                {noti?.type === "invite" ? (
                                  <Grid item>
                                    <Typography sx={styles.type}>
                                      {noti?.body?.split("to")[0]?.toString()}
                                    </Typography>
                                  </Grid>
                                ) : (
                                  <Grid item>
                                    <Typography sx={styles.type}>
                                      {noti?.body}
                                    </Typography>
                                  </Grid>
                                )}

                                {noti?.type === "invite" ? (
                                  <Grid item>
                                    <Typography sx={styles.body}>
                                      {noti?.body
                                        ?.split("to")
                                        ?.slice(1)
                                        ?.join(" ")}
                                    </Typography>
                                  </Grid>
                                ) : null}

                                <Grid item>
                                  <Typography sx={styles.date}>
                                    {isToday(new Date(noti?.timestamp))
                                      ? `Today at ${getTime(
                                          new Date(noti?.timestamp)
                                        )}`
                                      : `${longEnUSFormatter.format(
                                          new Date(noti?.timestamp)
                                        )} at ${getTime(
                                          new Date(noti?.timestamp)
                                        )}`}
                                  </Typography>
                                </Grid>

                                {getActionButtonsForNoti(noti)}
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item sx={{ width: "100%" }}>
                            <Divider sx={{ backgroundColor: theme.border() }} />
                          </Grid>
                        </Grid>
                      );
                    })
                : null}

              {selected === "read"
                ? store?.user?.notifications
                    ?.filter((noti) => noti?.read === true)
                    ?.map((noti, i) => {
                      return (
                        <Grid
                          key={i}
                          item
                          sx={{
                            padding: 1,
                            transition: ".2s ease-in-out",
                            "&:hover": {
                              cursor: "pointer",
                              backgroundColor: theme.skeleton(),
                              borderRadius: 3,
                            },
                            width: "100%",
                          }}
                        >
                          <Grid
                            container
                            justifyContent="start"
                            alignItems="start"
                            direction="row"
                            columnSpacing={{ xs: 2 }}
                            wrap="nowrap"
                          >
                            {!shouldShowAvatar(noti?.type) ? (
                              <Grid item>
                                <NewCustomIconButton>
                                  <FaTrophy
                                    style={{
                                      color: theme.text(),
                                      fontSize: 24,
                                    }}
                                  />
                                </NewCustomIconButton>
                              </Grid>
                            ) : (
                              <Grid item>
                                <Avatar
                                  style={{
                                    width: 50,
                                    height: 50,
                                    display: "inline-block",
                                  }}
                                  avatarStyle="Circle"
                                  {...getAvatar(noti?.avatar)}
                                />
                              </Grid>
                            )}
                            <Grid item xs={10}>
                              <Grid
                                container
                                direction="column"
                                alignItems="start"
                                justifyContent="center"
                              >
                                {noti?.type === "invite" ? (
                                  <Grid item>
                                    <Typography sx={styles.type}>
                                      {noti?.body?.split("to")[0]?.toString()}
                                    </Typography>
                                  </Grid>
                                ) : (
                                  <Grid item>
                                    <Typography sx={styles.type}>
                                      {noti?.body}
                                    </Typography>
                                  </Grid>
                                )}

                                {noti?.type === "invite" ? (
                                  <Grid item>
                                    <Typography sx={styles.body}>
                                      {noti?.body
                                        ?.split("to")
                                        ?.slice(1)
                                        ?.join(" ")}
                                    </Typography>
                                  </Grid>
                                ) : null}

                                <Grid item sx={{ marginBottom: 1 }}>
                                  <Typography sx={styles.readDate}>
                                    {isToday(new Date(noti?.timestamp))
                                      ? `Today at ${getTime(
                                          new Date(noti?.timestamp)
                                        )}`
                                      : `${longEnUSFormatter.format(
                                          new Date(noti?.timestamp)
                                        )} at ${getTime(
                                          new Date(noti?.timestamp)
                                        )}`}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item sx={{ width: "100%" }}>
                            <Divider sx={{ backgroundColor: theme.border() }} />
                          </Grid>
                        </Grid>
                      );
                    })
                : null}
            </Grid>
          </Grid>
        </Grid>
      ) : null}
    </Menu>
  );
};

export default NewNotificationMenu;
