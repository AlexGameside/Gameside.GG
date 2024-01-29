import {
  useMediaQuery,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Typography,
  Grid,
  Alert,
  CircularProgress,
  Skeleton,
  Tooltip,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/NewStoreContext";
import createTheme from "../../utils/theme";
import CloseIcon from "@mui/icons-material/Close";
import riotGames from "../../assets/riot-games.svg";
import twitter from "../../assets/twitter.svg";
import twitch from "../../assets/twitch.svg";
import youtube from "../../assets/youtube.svg";
import discord from "../../assets/discord.svg";
import { getUserProfile } from "../../utils/API";
import Avatar from "avataaars";
import { FiExternalLink } from "react-icons/fi";
import SectionHeader from "../../custom_components/SectionHeader";
import {
  FaCrown,
  FaPiggyBank,
  FaSkullCrossbones,
  FaTrophy,
} from "react-icons/fa";
import BoxContainer from "../../custom_components/BoxContainer";
import BadgeItem from "../match/components/badges/BadgeItem";

const UserProfileModal = (props) => {
  // variables
  const { open, onClose, username } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const isMobile = useMediaQuery("(max-width:500px)");
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // state
  const [closeHovered, setCloseHovered] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [youtubeHovered, setYoutubeHovered] = useState(false);
  const [twitchHovered, setTwitchHovered] = useState(false);
  const [twitterHovered, setTwitterHovered] = useState(false);

  // methods
  const handleClose = () => {
    setError(null);
    setLoading(true);
    setUser(null);
    setCloseHovered(false);
    setYoutubeHovered(false);
    onClose();
  };

  const handleGetUser = () => {
    setLoading(true);
    getUserProfile(username, store?.user?.username).then((res) => {
      if (!res?.error) {
        setUser(res?.user);
      }
      if (res?.error) {
        setError(res?.message);
      }
      setLoading(false);
    });
  };

  // effects
  useEffect(() => {
    if (open) {
      if (!user) {
        handleGetUser();
      }
    }
  }, [open, username]);

  // styles
  const styles = {
    card: {
      backgroundColor: theme.card(),
      minWidth: isDesktop ? 450 : isMobile ? "95%" : 0,
      maxWidth: 450,
      padding: 4,
      borderRadius: 16,
    },
    title: {
      fontSize: 32,
      fontWeight: 600,
      color: theme.text(),
    },
    subtitle: {
      fontSize: 16,
      fontWeight: 400,
      color: theme.metaText(),
      marginBottom: 4,
    },
    closeButton: {
      color: theme.icon(),
      backgroundColor: "transparent",
      borderRadius: 100,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      right: 10,
      top: 10,
      transition: "all .2s ease-in-out",
    },
    value: {
      fontSize: 15,
      fontWeight: 600,
      color: theme.text(),
    },
    label: {
      fontSize: 13,
      color: theme.subText(),
      fontWeight: 400,
    },
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ style: styles.card }}
    >
      {loading ? (
        <>
          <DialogTitle sx={styles.title}>
            <Skeleton
              variant="circular"
              sx={{
                bgcolor: theme.border(),
                height: 80,
                width: 80,
                marginBottom: 2,
              }}
            />
            <Skeleton
              variant="text"
              sx={{
                height: 40,
                width: 200,
                marginBottom: 1,
                bgcolor: theme.border(),
              }}
            />
            <Skeleton
              variant="text"
              sx={{ height: 25, width: 250, bgcolor: theme.border() }}
            />
            {handleClose ? (
              <IconButton
                aria-label="close"
                onClick={handleClose}
                style={styles.closeButton}
                onMouseEnter={() => setCloseHovered(true)}
                onMouseLeave={() => setCloseHovered(false)}
              >
                <CloseIcon
                  sx={{
                    color: closeHovered ? theme.text() : theme.metaText(),
                    fontSize: 18,
                  }}
                />
              </IconButton>
            ) : null}
            {error ? (
              <Alert severity="error" onClose={() => setError("")}>
                {error}
              </Alert>
            ) : null}
          </DialogTitle>
          <DialogContent>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              gap={{ xs: 4 }}
            >
              <CircularProgress size={50} sx={{ color: theme.primary() }} />
            </Grid>
          </DialogContent>
        </>
      ) : (
        <>
          <DialogTitle sx={styles.title}>
            <Avatar
              style={{ width: 100, height: 100 }}
              avatarStyle="Circle"
              {...user?.userData?.avatar[0]}
            />

            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                gap={{ xs: 1 }}
                justifyContent="start"
                alignItems="center"
              >
                <Grid item>
                  <Typography style={styles.title}>
                    <span
                      style={{
                        textShadow: user?.userData?.premium
                          ? theme.glow(
                              user?.userData?.badges?.isPremium?.extras ??
                                theme.primary()
                            )
                          : null,
                      }}
                    >
                      {user?.userData?.username}
                    </span>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid>
              <Typography sx={styles.subtitle}>
                <span style={{ color: theme.primary() }}>
                  {user?.userData?.views ?? 0}
                </span>{" "}
                profile views
              </Typography>
            </Grid>

            {handleClose ? (
              <IconButton
                aria-label="close"
                onClick={handleClose}
                style={styles.closeButton}
                onMouseEnter={() => setCloseHovered(true)}
                onMouseLeave={() => setCloseHovered(false)}
              >
                <CloseIcon
                  sx={{
                    color: closeHovered ? theme.text() : theme.metaText(),
                    fontSize: 18,
                  }}
                />
              </IconButton>
            ) : null}
            {error ? (
              <Alert severity="error" onClose={() => setError("")}>
                {error}
              </Alert>
            ) : null}
          </DialogTitle>
          <DialogContent>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              gap={{ xs: 2 }}
            >
              <Grid item sx={{ width: "100%" }}>
                <Grid
                  container
                  direction="column"
                  alignItems="start"
                  justifyContent="center"
                  gap={{ xs: 1 }}
                >
                  <Grid item>
                    <SectionHeader label="Stats" />
                  </Grid>

                  <Grid
                    container
                    justifyContent="start"
                    alignItems="center"
                    gap={{ xs: 1 }}
                    sx={{ width: "100%" }}
                    wrap="nowrap"
                  >
                    <BoxContainer label="Wins" value={user?.earningsData?.wins}>
                      <FaTrophy
                        style={{ fontSize: 24, color: theme.metaText() }}
                      />
                    </BoxContainer>

                    <BoxContainer
                      label="Losses"
                      value={user?.earningsData?.losses}
                    >
                      <FaSkullCrossbones
                        style={{ fontSize: 24, color: theme.metaText() }}
                      />
                    </BoxContainer>

                    <BoxContainer
                      label="Earnings"
                      value={numFormatter.format(user?.earningsData?.total)}
                    >
                      <FaPiggyBank
                        style={{ fontSize: 24, color: theme.metaText() }}
                      />
                    </BoxContainer>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item sx={{ width: "100%" }}>
                <Grid
                  container
                  direction="column"
                  alignItems="start"
                  justifyContent="center"
                  gap={{ xs: 1 }}
                >
                  <Grid item>
                    <SectionHeader label="Badges" />
                  </Grid>

                  <Grid
                    container
                    justifyContent="start"
                    alignItems="center"
                    gap={{ xs: 1 }}
                    sx={{ width: "100%" }}
                  >
                    {user?.userData?.badges == null ||
                    Object.keys(user?.userData?.badges)?.length < 1 ? (
                      <Grid item>
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 400,
                            color: theme.metaText(),
                          }}
                        >
                          No badges yet
                        </Typography>
                      </Grid>
                    ) : (
                      <>
                        {Object.keys(user?.userData?.badges)?.map(
                          (badge, i) => {
                            const badges = user?.userData?.badges;
                            if (badges[badge]?.hasBadge) {
                              if (badges[badge]?.isHidden) {
                                return null;
                              }
                              return (
                                <BadgeItem
                                  type={badge}
                                  key={i}
                                  badge={badges[badge]}
                                />
                              );
                            }
                            return null;
                          }
                        )}
                      </>
                    )}
                  </Grid>
                </Grid>
              </Grid>

              <Grid item sx={{ width: "100%" }}>
                <Grid
                  container
                  direction="column"
                  alignItems="start"
                  justifyContent="center"
                  gap={{ xs: 1 }}
                >
                  <Grid item>
                    <SectionHeader label="Socials" />
                  </Grid>

                  <Grid item sx={{ width: "100%" }}>
                    <Grid
                      container
                      justifyContent="start"
                      alignItems="center"
                      gap={{ xs: 2 }}
                    >
                      <Grid item>
                        <img src={riotGames} />
                      </Grid>

                      <Grid item>
                        <Grid
                          container
                          direction="column"
                          alignItems="start"
                          justifyContent="center"
                        >
                          <Grid item>
                            <Typography sx={styles.value}>
                              {user?.userData?.valId
                                ? user?.userData?.valId?.valId
                                : "Not Connected"}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography sx={styles.label}>Riot Id</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item sx={{ width: "100%" }}>
                    <Grid
                      container
                      justifyContent="start"
                      alignItems="center"
                      gap={{ xs: 2 }}
                    >
                      <Grid item>
                        <img src={twitter} />
                      </Grid>

                      <Grid item>
                        <Grid
                          container
                          direction="column"
                          alignItems="start"
                          justifyContent="center"
                        >
                          <Grid item>
                            {user?.userData?.twitter ? (
                              <Grid
                                container
                                justifyContent="start"
                                alignItems="center"
                                gap={{ xs: 1 }}
                              >
                                <Grid
                                  item
                                  onMouseEnter={() => setTwitterHovered(true)}
                                  onMouseLeave={() => setTwitterHovered(false)}
                                  sx={{
                                    cursor: twitterHovered
                                      ? "pointer"
                                      : "default",
                                  }}
                                  onClick={() =>
                                    window.open(
                                      `https://www.twitter.com/${user?.userData?.twitter}`,
                                      "_blank"
                                    )
                                  }
                                >
                                  <Typography
                                    sx={{
                                      ...styles.value,
                                      color: twitterHovered
                                        ? theme.primary()
                                        : theme.text(),
                                    }}
                                  >
                                    {user?.userData?.twitter}
                                  </Typography>
                                </Grid>

                                <Grid item>
                                  <FiExternalLink
                                    style={{
                                      fontSize: 18,
                                      color: theme.white(),
                                    }}
                                  />
                                </Grid>
                              </Grid>
                            ) : (
                              <Typography sx={styles.value}>
                                Not Connected
                              </Typography>
                            )}
                          </Grid>
                          <Grid item>
                            <Typography sx={styles.label}>Twitter</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item sx={{ width: "100%" }}>
                    <Grid
                      container
                      justifyContent="start"
                      alignItems="center"
                      gap={{ xs: 2 }}
                    >
                      <Grid item>
                        <img src={twitch} />
                      </Grid>

                      <Grid item>
                        <Grid
                          container
                          direction="column"
                          alignItems="start"
                          justifyContent="center"
                        >
                          <Grid item>
                            {user?.userData?.twitch ? (
                              <Grid
                                container
                                justifyContent="start"
                                alignItems="center"
                                gap={{ xs: 1 }}
                              >
                                <Grid
                                  item
                                  onMouseEnter={() => setTwitchHovered(true)}
                                  onMouseLeave={() => setTwitchHovered(false)}
                                  sx={{
                                    cursor: twitchHovered
                                      ? "pointer"
                                      : "default",
                                  }}
                                  onClick={() =>
                                    window.open(
                                      `https://www.twitch.tv/${user?.userData?.twitch}`,
                                      "_blank"
                                    )
                                  }
                                >
                                  <Typography
                                    sx={{
                                      ...styles.value,
                                      color: twitchHovered
                                        ? theme.primary()
                                        : theme.text(),
                                    }}
                                  >
                                    {user?.userData?.twitch}
                                  </Typography>
                                </Grid>

                                <Grid item>
                                  <FiExternalLink
                                    style={{
                                      fontSize: 18,
                                      color: theme.white(),
                                    }}
                                  />
                                </Grid>
                              </Grid>
                            ) : (
                              <Typography sx={styles.value}>
                                Not Connected
                              </Typography>
                            )}
                          </Grid>
                          <Grid item>
                            <Typography sx={styles.label}>Twitch</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item sx={{ width: "100%" }}>
                    <Grid
                      container
                      justifyContent="start"
                      alignItems="center"
                      gap={{ xs: 2 }}
                    >
                      <Grid item>
                        <img src={youtube} />
                      </Grid>

                      <Grid item>
                        <Grid
                          container
                          direction="column"
                          alignItems="start"
                          justifyContent="center"
                        >
                          <Grid item>
                            {user?.userData?.youtube ? (
                              <Grid
                                container
                                justifyContent="start"
                                alignItems="center"
                                gap={{ xs: 1 }}
                              >
                                <Grid
                                  item
                                  onMouseEnter={() => setYoutubeHovered(true)}
                                  onMouseLeave={() => setYoutubeHovered(false)}
                                  sx={{
                                    cursor: youtubeHovered
                                      ? "pointer"
                                      : "default",
                                  }}
                                  onClick={() =>
                                    window.open(
                                      user?.userData?.youtube,
                                      "_blank"
                                    )
                                  }
                                >
                                  <Typography
                                    sx={{
                                      ...styles.value,
                                      color: youtubeHovered
                                        ? theme.primary()
                                        : theme.text(),
                                    }}
                                  >
                                    Visit Channel
                                  </Typography>
                                </Grid>

                                <Grid item>
                                  <FiExternalLink
                                    style={{
                                      fontSize: 18,
                                      color: theme.white(),
                                    }}
                                  />
                                </Grid>
                              </Grid>
                            ) : (
                              <Typography sx={styles.value}>
                                Not Connected
                              </Typography>
                            )}
                          </Grid>
                          <Grid item>
                            <Typography sx={styles.label}>Youtube</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item sx={{ width: "100%" }}>
                    <Grid
                      container
                      justifyContent="start"
                      alignItems="center"
                      gap={{ xs: 2 }}
                    >
                      <Grid item>
                        <img src={discord} />
                      </Grid>

                      <Grid item>
                        <Grid
                          container
                          direction="column"
                          alignItems="start"
                          justifyContent="center"
                        >
                          <Grid item>
                            <Typography sx={styles.value}>
                              {user?.userData?.discordName
                                ? user?.userData?.discordName?.discordName
                                : "Not Connected"}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography sx={styles.label}>Discord</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default UserProfileModal;
