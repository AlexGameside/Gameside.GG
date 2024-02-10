import createTheme from "../utils/theme";
import { useContext, useEffect, useState, useRef } from "react";
import {
  StoreContext,
  StoreDispatch,
  SET_USER,
} from "../context/NewStoreContext";
import { Grid, Typography } from "@mui/material";
import Header from "../custom_components/Header";
import useDraggableScroll from "use-draggable-scroll";
import ConnectionButton from "../custom_components/ConnectionButton";
import SectionHeader from "../custom_components/SectionHeader";
import riotGames from "../assets/riot-games.svg";
import twitter from "../assets/twitter.svg";
import twitch from "../assets/twitch.svg";
import discord from "../assets/discord.svg";
import paypal from "../assets/paypal.svg";
import youtube from "../assets/youtube.svg";
import ConnectionItem from "./connections/ConnectionItem";
import { GiShare } from "react-icons/gi";
import useAxios from "../utils/useAxios";
import ValorantConnectionModal from "./connections/ValorantConnectionModal";
import YoutubeConnectionModal from "./connections/YoutubeConnectionModal";
import { generateTwitterAuth, removeConnection } from "../utils/API";
import NewAlert from "../custom_components/NewAlert";
import { useLocation } from "react-router-dom";

const NewConnections = () => {
  // variables
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const dispatch = useContext(StoreDispatch);
  const location = useLocation();
  const ref = useRef(null);
  const { onMouseDown } = useDraggableScroll(ref, {
    direction: "horizontal",
  });
  const api = useAxios();

  // state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [riotOpen, setRiotOpen] = useState(false);
  const [youtubeOpen, setYoutubeOpen] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [twitterLoading, setTwitterLoading] = useState(false);
  const [twitchLoading, setTwitchLoading] = useState(false);
  const [youtubeLoading, setYoutubeLoading] = useState(false);
  const [riotLoading, setRiotLoading] = useState(false);
  const [discordLoading, setDiscordLoading] = useState(false);

  // methods
  const handleTwitterAuth = () => {
    generateTwitterAuth().then((res) => {
      if (!res?.error) {
        window.location.href = res?.url;
      }
    });
  };

  const handleRemoveConnection = (index) => {
    setRemoveLoading(true);
    switch (index) {
      case 0:
        setRiotLoading(true);
        break;
      case 3:
        setTwitterLoading(true);
        break;
      case 4:
        setTwitchLoading(true);
        break;
      case 7:
        setYoutubeLoading(true);
        break;
      case 10:
        setDiscordLoading(true);
        break;
      default:
        break;
    }

    removeConnection(api, index).then((res) => {
      setError(null);
      if (!res?.error) {
        let newUser = store?.user;
        newUser.connections[index] = null;
        dispatch({ type: SET_USER, payload: { ...newUser } });
      } else {
        setError(res?.message);
      }
      setRemoveLoading(false);
      setTwitterLoading(false);
      setTwitchLoading(false);
      setYoutubeLoading(false);
      setRiotLoading(false);
      setDiscordLoading(false);
    });
  };

  const handleOpenDiscordOAuth = () => {
    window.open(
      "https://discord.com/api/oauth2/authorize?client_id=1022275373305696356&redirect_uri=https%3A%2F%2Ftkns.gg%2Fdiscord-link&response_type=code&scope=identify%20guilds",
      "_self"
    );
  };

  // effects
  useEffect(() => {
    if (store?.user) {
      setLoading(false);
    }
  }, [store]);

  useEffect(() => {
    if (location?.state?.error) {
      setError(location?.state?.error);
    }
  }, [location]);

  // styles
  const styles = {
    teamName: {
      fontSize: 18,
      fontWeight: 500,
      color: theme.text(),
    },
    subLabel: {
      fontSize: 14,
      fontWeight: 400,
      color: theme.metaText(),
    },
    label: {
      fontSize: 14,
      fontWeight: 400,
      color: theme.primary(),
    },
  };

  return loading ? null : (
    <>
      {error ? (
        <NewAlert label={error} clearMessage={() => setError(null)} />
      ) : null}

      <Grid
        container
        direction="column"
        alignItems="start"
        justifyContent="center"
        gap={{ xs: 2 }}
      >
        <ValorantConnectionModal
          open={riotOpen}
          onClose={() => setRiotOpen(false)}
        />
        <YoutubeConnectionModal
          open={youtubeOpen}
          onClose={() => setYoutubeOpen(false)}
        />

        <Grid item sx={{ width: "100%" }}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <Grid item>
              <Header label={"Connections"} />
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          sx={{
            width: "100%",
            borderRadius: 2,
            backgroundColor: theme.cardDark(),
            padding: 2,
            border: `1px solid ${theme.border()}`,
          }}
        >
          <Grid
            container
            direction="column"
            alignItems="start"
            justifyContent="center"
            gap={{ xs: 1 }}
          >
            <Grid item>
              <SectionHeader label="Link a New Account" />
            </Grid>

            <Grid
              item
              sx={{
                width: "100%",
              }}
              onMouseDown={onMouseDown}
              overflow="auto"
            >
              <Grid
                container
                justifyContent="start"
                alignItems="center"
                gap={{ xs: 2 }}
                wrap="nowrap"
              >
                <ConnectionButton
                  isLinked={store?.user?.connections[0]}
                  canLinkAgain={true}
                  onClick={() => setRiotOpen(true)}
                >
                  <img src={riotGames} />
                </ConnectionButton>

                <ConnectionButton
                  isLinked={store?.user?.connections[3]}
                  canLinkAgain={true}
                  onClick={handleTwitterAuth}
                >
                  <img src={twitter} />
                </ConnectionButton>

                <ConnectionButton
                  isLinked={store?.user?.connections[4]}
                  canLinkAgain={!store?.user?.connections[4]}
                  onClick={() =>
                    (window.location.href =
                      "https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=bqpeb8djpwth252739f2twj4t8f2v1&redirect_uri=https://tkns.gg/twitchWebhook&scope=user:read:email")
                  }
                >
                  <img src={twitch} />
                </ConnectionButton>

                <ConnectionButton
                  isLinked={store?.user?.connections[7]}
                  canLinkAgain={true}
                  onClick={() => setYoutubeOpen(true)}
                >
                  <img src={youtube} />
                </ConnectionButton>

                {store?.user?.signedUpWithDiscord ? null : (
                  <ConnectionButton
                    isLinked={store?.user?.connections[10]}
                    canLinkAgain={!store.user?.connections[10]}
                    onClick={handleOpenDiscordOAuth}
                  >
                    <img src={discord} />
                  </ConnectionButton>
                )}

                {/* <ConnectionButton>
                <img src={paypal} />
              </ConnectionButton> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <SectionHeader label="Linked Accounts" />
        </Grid>

        {store?.user?.connections[0] ||
        store?.user?.connections[3] ||
        store?.user?.connections[4] ||
        store?.user?.connections[7] ||
        store?.user?.connections[10] ? (
          <>
            {store?.user?.connections[0] ? (
              <ConnectionItem
                value={store?.user?.connections[0]?.valId}
                canDelete={true}
                label={"Riot Games"}
                onClick={() => handleRemoveConnection(0)}
                loading={riotLoading}
              >
                <img src={riotGames} />
              </ConnectionItem>
            ) : null}

            {store?.user?.connections[3] ? (
              <ConnectionItem
                value={store?.user?.connections[3]?.displayName}
                label={"Twitter"}
                canDelete={true}
                onClick={() => handleRemoveConnection(3)}
                loading={twitterLoading}
              >
                <img src={twitter} />
              </ConnectionItem>
            ) : null}

            {store?.user?.connections[4] ? (
              <ConnectionItem
                value={store?.user?.connections[4]?.displayName}
                canDelete={true}
                label={"Twitch"}
                onClick={() => handleRemoveConnection(4)}
                loading={twitchLoading}
              >
                <img src={twitch} />
              </ConnectionItem>
            ) : null}

            {store?.user?.connections[7] ? (
              <ConnectionItem
                value={store?.user?.connections[7]?.youtubeURL}
                canDelete={true}
                label={"Youtube"}
                onClick={() => handleRemoveConnection(7)}
                loading={youtubeLoading}
              >
                <img src={youtube} />
              </ConnectionItem>
            ) : null}

            {store?.user?.connections[10] ? (
              <ConnectionItem
                value={store?.user?.connections[10]?.discordName}
                canDelete={true}
                label={"Discord"}
                onClick={() => handleRemoveConnection(10)}
                loading={discordLoading}
              >
                <img src={discord} />
              </ConnectionItem>
            ) : null}
          </>
        ) : (
          <Grid item alignSelf="center">
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <GiShare style={{ fontSize: 40, color: theme.metaText() }} />
              </Grid>

              <Grid item>
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: theme.metaText(),
                  }}
                >
                  No Connections Yet!
                </Typography>
              </Grid>

              <Grid item>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: theme.metaText(),
                  }}
                >
                  Link an account and you will see them here.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default NewConnections;
