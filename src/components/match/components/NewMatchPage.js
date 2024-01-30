import {
  CircularProgress,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StoreContext } from "../../../context/NewStoreContext";
import createTheme from "../../../utils/theme";
import useAxios from "../../../utils/useAxios";
import MatchTabButton from "../MatchTabButton";
import { getMatch, isBlueTeam, isRedTeam } from "../utils/matchHelpers";
import CurrentMatchState from "./CurrentMatchState";
import CurrentMatchTab from "./CurrentMatchTab";
import DetailsMatchTab from "./DetailsMatchTab";
import VetoTab from "./VetoTab";
import useSocket from "../../../utils/useSocket";
import { BiMessageAltDetail } from "react-icons/bi";
import { getChat, sendChat } from "../../../utils/API";
import { getDateForMatch, getTimeForMatch } from "../../../utils/helperMethods";
import NewTokenChat from "../../NewTokenChat";
import StaffTools from "./StaffTools";
import NewSecondaryButton from "../../../custom_components/NewSecondaryButton";
import constants from "../../../utils/constants";
import BadgeHover from "./badges/BadgeHover";
import newMatchSoundAudio from "../../../assets/new-match.mp3";

const NewMatchPage = () => {
  // variables
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const params = useParams();
  const api = useAxios();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const { wager, messages } = useSocket(params?.id);
  const newMatchSound = new Audio(newMatchSoundAudio);

  // state
  const [dataLoading, setDataLoading] = useState(true);
  const [userPermsLoading, setUserPermsLoading] = useState(true);
  const [canUserView, setCanUserView] = useState(false);
  const [match, setMatch] = useState(null);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState("overview");
  const [showChat, setShowChat] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [newMessage, setNewMessage] = useState("");
  const [showStaffTools, setShowStaffTools] = useState(false);
  const [copied, setCopied] = useState(false);
  const [chatHovered, setChatHovered] = useState(false);

  // methods
  const handleCopyMatchURL = () => {
    if (match?.isTourneyMatch) {
      navigator.clipboard.writeText(
        `${constants.clientURL}/tournament/${match?.tourneyId}`
      );
      setCopied(true);
      return;
    }

    if (match?.state === 0) {
      if (match?.isScrimMatch) {
        navigator.clipboard.writeText(
          `${constants.clientURL}/scrims?join=${match?.wagerid}`
        );
        setCopied(true);
        return;
      } else {
        navigator.clipboard.writeText(
          `${constants.clientURL}/cash-matches?join=${match?.wagerid}`
        );
        setCopied(true);
        return;
      }
    } else {
      navigator.clipboard.writeText(
        `${constants.clientURL}/token/${match?.wagerid}`
      );
      setCopied(true);
      return;
    }
  };

  const handleSendMessage = (value) => {
    if (
      match?.state === 3 ||
      match?.state === -1 ||
      match?.state === 0 ||
      match?.state === 1
    )
      return;
    if (value === "" || value == null) return;

    if (
      isRedTeam(store?.user?.username, match) ||
      isBlueTeam(store?.user?.username, match) ||
      store?.user?.role >= 100
    ) {
      sendChat(api, value, match?.wagerid, store?.user?.username).then(
        (res) => {
          if (!res?.error) {
            setNewMessage("");
            return;
          } else {
            setNewMessage("");
            setError(res?.message);
            return;
          }
        }
      );
    }
    return;
  };

  // effects
  useEffect(() => {
    // changing background
    theme.changeWebsiteBackground();
  }, []);

  useEffect(() => {
    // changing background
    theme.changeWebsiteBackground();
  }, [store.mode]);

  useEffect(() => {
    // fetching the match
    if (!store?.user) {
      return;
    }

    if (params?.id === match?._id) {
      setDataLoading(false);
      return;
    }

    getMatch(api, params?.id, setMatch, setDataLoading, setError);
  }, [params]);

  useEffect(() => {
    // checking if the user can view the match
    if (match == null) {
      return;
    }

    if (
      !isRedTeam(store?.user?.username, match) &&
      !isBlueTeam(store?.user?.username, match) &&
      store?.user?.role < 100 &&
      !match?.isTourneyMatch
    ) {
      setUserPermsLoading(false);
      setCanUserView(false);
      return;
    }
    setUserPermsLoading(false);
    setCanUserView(true);
  }, [dataLoading]);

  useEffect(() => {
    // if user cannot view match reroute them to the home page
    if (userPermsLoading) {
      return;
    }

    if (!canUserView) {
      navigate("/valorant/");
      return;
    }
  }, [userPermsLoading]);

  useEffect(() => {
    setMatch(wager);
  }, [wager]);

  useEffect(() => {
    setCopied(false);
  }, [match?.state]);

  useEffect(() => {
    newMatchSound.volume = 0.5;
    newMatchSound.load();
    if (wager?.state === 1) {
      newMatchSound.play();
    }
  }, [wager]);

  useEffect(() => {
    if (messages?.length > 0) return;

    getChat(api, params?.id).then((res) => {
      if (!res.error) {
        const chatMessages = [];
        for (let chat of res?.chat) {
          chatMessages.push({
            body: chat?.text,
            name: chat?.username,
            time: getTimeForMatch(chat?._id),
          });
        }
        messages?.push(...chatMessages);
      } else {
        setError(res);
        return;
      }
    });
  }, []);

  useEffect(() => {
    if (showChat) {
      return;
    }
    if (messages?.length < 1) return;
    setUnreadMessages(true);
    let newUnreadCount = unreadCount;
    newUnreadCount++;
    setUnreadCount(newUnreadCount);
  }, [messages]);

  // methods

  // styles
  const styles = {
    title: {
      fontSize: 36,
      fontWeight: 700,
      color: theme.text(),
    },
    chatButtonContainer: {
      padding: 0,
      position: "fixed",
      right: 30,
      bottom: isDesktop ? 80 : 120,
      backgroundColor: showChat ? "#3c5f89" : theme.iconBackground(),
      borderRadius: 50,
      height: 48,
      width: 48,
      textAlign: "center",
      boxShadow: theme.shadow(),
      transition: "all .1s ease-in-out",
      "&:hover": {
        cursor: "pointer",
        backgroundColor: theme.iconBackground(true),
      },
      zIndex: 10,
    },
  };

  return userPermsLoading ? (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", width: "100%" }}
    >
      <Grid item>
        <CircularProgress size={50} sx={{ color: theme.primary() }} />
      </Grid>
    </Grid>
  ) : (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="start"
      sx={{
        minHeight: "100vh",
        width: "100%",
        paddingLeft: isDesktop ? "10%" : 0,
        paddingRight: isDesktop ? "10%" : 0,
        position: "relative",
      }}
      gap={{ xs: 2 }}
    >
      <Grid
        item
        sx={styles.chatButtonContainer}
        onClick={() => setShowChat(!showChat)}
        onMouseEnter={() => setChatHovered(true)}
        onMouseLeave={() => setChatHovered(false)}
      >
        {chatHovered ? <BadgeHover label="Chat" position="top" /> : null}
        <BiMessageAltDetail
          style={{
            color: showChat ? theme.primary() : theme.text(),
            fontSize: 30,
            position: "absolute",
            top: 10,
            right: 9,
          }}
        />
      </Grid>

      {unreadMessages ? (
        <Grid
          item
          sx={{
            padding: 0,
            position: "fixed",
            right: 30,
            bottom: 115,
            borderRadius: 100,
            backgroundColor: theme.red(),
            textAlign: "center",
            height: 20,
            width: 20,
            zIndex: 11,
          }}
        >
          <span
            style={{
              color: theme.white(),
              position: "absolute",
              left: 0,
              right: 0,
              fontWeight: 600,
              textAlign: "center",
              marginLeft: "auto",
              marginRight: "auto",
              top: 2,
              fontSize: 11,
            }}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        </Grid>
      ) : null}

      <Grid
        item
        sx={{
          width: "100%",
          paddingTop: 2,
          borderBottom: `1px solid ${theme.border()}`,
        }}
      >
        <Grid
          container
          direction="column"
          alignItems="start"
          justifyContent="center"
          gap={{ xs: 4 }}
        >
          <Grid item sx={{ width: "100%" }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography sx={styles.title}>{match?.title}</Typography>
              </Grid>

              <Grid item>
                <NewSecondaryButton
                  label={copied ? "Copied Match URL" : "Copy Match URL"}
                  onClick={handleCopyMatchURL}
                  disabled={copied}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item sx={{ width: "100%" }}>
            <CurrentMatchState match={match} />
          </Grid>

          <Grid
            item
            sx={{
              width: "100%",
            }}
          >
            <Grid
              container
              direction="row"
              justifyContent={isDesktop ? "start" : "center"}
              alignItems="center"
            >
              <Grid item>
                <MatchTabButton
                  label={"Match"}
                  onClick={() => {
                    setSelected("overview");
                    setShowStaffTools(false);
                  }}
                  selected={selected === "overview" && !showStaffTools}
                />
              </Grid>

              {match?.hasVoting ? (
                <Grid item>
                  <MatchTabButton
                    label={"Pick/Ban Map"}
                    onClick={() => {
                      setSelected("map");
                      setShowStaffTools(false);
                    }}
                    selected={selected === "map"}
                  />
                </Grid>
              ) : null}

              <Grid item>
                <MatchTabButton
                  label={"Settings"}
                  onClick={() => {
                    setSelected("details");
                    setShowStaffTools(false);
                  }}
                  selected={selected === "details"}
                />
              </Grid>

              {store?.user?.role >= 200 ? (
                <Grid item>
                  <MatchTabButton
                    label={"Staff Tools"}
                    onClick={() => {
                      setSelected("overview");
                      setShowStaffTools(true);
                    }}
                    selected={showStaffTools}
                  />
                </Grid>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {store?.user?.role >= 200 && showStaffTools ? (
        <StaffTools match={match} />
      ) : null}

      {selected === "overview" ? (
        <CurrentMatchTab match={match} setSelected={setSelected} />
      ) : null}

      {selected === "details" ? <DetailsMatchTab match={match} /> : null}

      {selected === "map" ? <VetoTab match={match} /> : null}

      {
        // CHAT
      }
      {showChat ? (
        <NewTokenChat
          getDateForMatch={getDateForMatch}
          messages={messages}
          isBlueTeam={isBlueTeam}
          isRedTeam={isRedTeam}
          token={match}
          newMessage={newMessage}
          setUnreadMessages={setUnreadMessages}
          setUnreadCount={setUnreadCount}
          handleClose={() => setShowChat(false)}
          hidden={!showChat}
          handleSendMessage={handleSendMessage}
        />
      ) : null}
    </Grid>
  );
};

export default NewMatchPage;
