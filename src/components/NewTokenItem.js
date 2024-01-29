import {
  useMediaQuery,
  Grid,
  Typography,
  Divider,
  Button,
  Chip,
} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import {
  SET_OPEN_TOKEN_DIALOG_ID,
  StoreContext,
  StoreDispatch,
} from "../context/NewStoreContext";
import { generateRandomAvatarOptions } from "../utils/generateRandomAvatarOptions";
import createTheme from "../utils/theme";
import Avatar from "avataaars";
import { AiFillLock } from "react-icons/ai";
import NewSignupLoginModal from "./NewSignupLoginModal";
import NewTokenPasswordModal from "./NewTokenPasswordModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import Countdown from "react-countdown";
import {
  getDateForMatch,
  getTimeForMatch,
  getGame,
  getColorForGame,
  getCurrentTokenTitle,
  getTournamentCountdownDate,
  getFullDateForMatch,
} from "../utils/helperMethods";
import { shouldShowFiveM } from "../utils/gatekeeper";
import { styled } from "@mui/material/styles";

const NewTokenItem = (props) => {
  // variables
  const { token } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const isMobile = useMediaQuery("(max-width:500px)");
  const Img = styled("img")``;
  const dispatch = useContext(StoreDispatch);
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const navigate = useNavigate();
  const avatar1 = useRef();
  const avatar2 = useRef();
  const avatar3 = useRef();
  const avatar4 = useRef();
  const avatar5 = useRef();
  const avatarArr = [avatar1, avatar2, avatar3, avatar4, avatar5];

  // state
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [searchParams, _] = useSearchParams();
  const [userLoading, setUserLoading] = useState(true);

  // methods
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return null;
    } else {
      // Render a countdown
      return (
        <span style={{ color: theme.text() }}>
          {getTournamentCountdownDate(days, hours, minutes, seconds)}
        </span>
      );
    }
  };

  const handleOpenModal = () => {
    if (!store?.user) {
      setOpenLoginModal(true);
      return;
    }

    if (token?.password != "" && token?.password != null) {
      setOpenPasswordModal(true);
      return;
    }
    dispatch({ type: SET_OPEN_TOKEN_DIALOG_ID, payload: token?._id });
    return;
  };

  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
  };

  const handleClosePasswordModal = () => {
    setOpenPasswordModal(false);
  };

  const getTokenMode = (matchType) => {
    switch (matchType) {
      case "ZW":
        return "Zone Wars";
      case "BOX":
        return "Box Fights";
      case "REAL":
        return "Realistics";
      case "PG":
        return "PG/Build Fights";
      case "RACE":
        return "Kill Race";
      case "ARENA_RACE":
        return "Arena Kill Race";
      case "ASCENT":
        return "Ascent";
      case "BIND":
        return "Bind";
      case "HAVEN":
        return "Haven";
      case "SPLIT":
        return "Split";
      case "FRACTURE":
        return "Fracture";
      case "ICEBOX":
        return "Icebox";
      case "BREEZE":
        return "Breeze";
      case "BATTLE":
        return "1v1 Battle";
      case "RAMPS":
        return "Ramps";
      case "VANS":
        return "Vans";
      case "BIG_ARENA":
        return "Big Arena";
      case "STABLES":
        return "Stables";
      case "PARK":
        return "Park";
      default:
        return null;
    }
  };

  const getTokenSize = (teamSize) => {
    switch (teamSize) {
      case 1:
        return "1v1";
      case 2:
        return "2v2";
      case 3:
        return "3v3";
      case 4:
        return "4v4";
      default:
        return "";
    }
  };

  const getGame = (g) => {
    switch (g) {
      case "FN":
        return "Fortnite";
      case "VAL":
        return "Valorant";
      case "CLASH":
        return "Clash Royale";
      case "FIVEM":
        return "FiveM";
      default:
        return "Fortnite";
    }
  };

  const getTimeUntilCancel = (id) => {
    const minutesToAdd = 30;
    // console.log(new Date(getFullDateForMatch(id) + minutesToAdd * 60000));
    return new Date(getFullDateForMatch(id) + minutesToAdd * 60000);
  };

  const isMoreThan12Hours = (id) => {
    const today = new Date();
    const timestamp = id?.toString().substring(0, 8);
    const matchDate = new Date(parseInt(timestamp, 16) * 1000);
    if (today - matchDate > 60 * 60 * 12 * 1000) {
      return true;
    }
    return false;
  };

  const getZIndexForAvatar = (i) => {
    switch (i) {
      case 0:
        return 10;
      case 1:
        return 9;
      case 2:
        return 8;
      case 3:
        return 7;
      case 4:
        return 6;
    }
  };

  // effects
  useEffect(() => {
    for (let i = 0; i < token?.blueteam_users?.length; i++) {
      avatarArr[i].current = generateRandomAvatarOptions();
    }
  }, []);

  useEffect(() => {
    if (store?.user) {
      setUserLoading(false);
      if (searchParams?.get("join") === token?._id) {
        handleOpenModal();
        return;
      }
    }
  }, [store?.user]);

  // styles
  const styles = {
    fortnite: {
      fontWeight: 900,
      fontSize: 22,
      color: theme.blue(),
    },
    val: {
      fontWeight: 900,
      fontSize: 22,
      color: theme.green(),
    },
    clash: {
      fontWeight: 900,
      fontSize: 22,
      color: theme.red(),
    },
    fivem: {
      fontWeight: 900,
      fontSise: 22,
      color: theme.orange(),
    },
    text: {
      fontWeight: 900,
      fontSize: 22,
      color: theme.text(),
    },
    subText: {
      fontWeight: 900,
      fontSize: 22,
      color: theme.subText(),
    },
    fee: {
      fontWeight: 900,
      fontSize: 22,
      color: theme.green(),
    },
    join: {
      color: theme.white(),
      minWidth: 100,
      fontSize: 16,
      textTransform: "none",
      fontWeight: 900,
      borderRadius: 50,
      boxShadow: "0 0",
      transition: "all .3s ease-in-out",
      backgroundColor: theme.orange(),
      "&:hover": {
        backgroundColor: theme.orange(),
        boxShadow: "0 0",
        transform: "scale(1.1)",
      },
    },
    locked: {
      fontSize: 26,
      fontWeight: 900,
      color: theme.white(),
    },
    date: {
      fontSize: 16,
      fontWeight: 900,
      color: theme.subText(),
    },
    old: {
      fontSize: 16,
      fontWeight: 900,
      color: theme.red(),
    },
    view: {
      fontSize: 16,
      fontWeight: 900,
      color: theme.metaText(),
    },
    value: {
      fontSize: 20,
      fontWeight: 900,
      color: theme.text(),
    },
    timeLabel: {
      fontSize: 18,
      fontWeight: 500,
      color: theme.text(),
    },
    label: {
      fontSize: 18,
      fontWeight: 900,
      color: theme.metaText(),
    },
    starts: {
      fontSize: 18,
      fontWeight: 500,
      color: theme.metaText(),
    },
  };

  if (store?.currentTokenId) {
    if (token?._id === store?.currentTokenId) {
      return null;
    }
  }

  if (token?.game === "FIVEM") {
    if (!shouldShowFiveM(store.user)) {
      return null;
    }
  }

  return (
    <Grid
      item
      sx={{
        width: "100%",
        padding: 2,
        border: `2px solid ${theme.border()}`,
        borderRadius: 4,
        marginBottom: 1,
        backgroundColor: store.mode === "dark" ? "#111216" : "#fff",
        shadow: theme.shadow(),
      }}
    >
      <NewSignupLoginModal
        open={openLoginModal}
        onClose={handleCloseLoginModal}
      />
      <NewTokenPasswordModal
        open={openPasswordModal}
        onClose={handleClosePasswordModal}
        token={token}
      />
      <Grid
        container
        direction="row"
        justifyContent={isDesktop ? "space-between" : "center"}
        alignItems="center"
        sx={{ width: "100%" }}
        columnSpacing={{ xs: 2 }}
        rowSpacing={{ xs: 1 }}
      >
        <Grid
          item
          sx={{
            minWidth: isDesktop ? 0 : "100%",
          }}
        >
          <Grid
            container
            justifyContent={isDesktop ? "start" : "center"}
            alignItems="center"
            columnSpacing={{ xs: 1 }}
          >
            {/* <Grid item>
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Grid item>
                  <Img
                    src={getLogoForGame(token?.game)}
                    alt="thumbnail"
                    sx={{
                      maxWidth: 60,
                      borderRadius: 2,
                    }}
                  />
                </Grid>

                <Grid item>
                  <Chip
                    label={getGame(token?.game)}
                    sx={{
                      color: theme.white(),
                      backgroundColor: getColorForGame(token?.game),
                      fontSize: 14,
                      fontWeight: 900,
                      border: `2px solid ${getColorForGame(token?.game)}`,
                      borderRadius: 2,
                    }}
                    size="small"
                  />
                </Grid>
              </Grid>
            </Grid> */}

            <Grid item>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems={isDesktop ? "start" : "center"}
                rowSpacing={{ xs: 0.5 }}
                sx={{ textAlign: isDesktop ? "start" : "center" }}
              >
                <Grid item>
                  <Grid
                    container
                    justifyContent="start"
                    alignItems="center"
                    columnSpacing={{ xs: 1 }}
                  >
                    <Grid item>
                      <Chip
                        label={getGame(token?.game)}
                        sx={{
                          color: theme.white(),
                          backgroundColor: getColorForGame(token?.game),
                          fontSize: 14,
                          fontWeight: 900,
                        }}
                        size="small"
                      />
                    </Grid>

                    <Grid item>
                      <Typography sx={styles.value}>
                        {token?.region}{" "}
                        {getCurrentTokenTitle(
                          token?.team_size,
                          token?.match_type
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid
                    container
                    justifyContent="start"
                    alignItems="center"
                    rowSpacing={{ xs: 1 }}
                    sx={{ position: "relative" }}
                  >
                    <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
                      <Typography sx={styles.label}>
                        Entry Fee{" "}
                        <span style={{ fontWeight: 900, color: theme.green() }}>
                          {numFormatter.format(token?.entry_fee)}
                        </span>{" "}
                        <span style={{ fontWeight: 900, color: theme.text() }}>
                          •
                        </span>{" "}
                        {token?.region}{" "}
                        {token?.region ? (
                          <span
                            style={{ fontWeight: 900, color: theme.text() }}
                          >
                            •
                          </span>
                        ) : null}{" "}
                        {token?.console_only ? (
                          <span style={{ color: theme.red(), fontWeight: 900 }}>
                            Console Only
                          </span>
                        ) : (
                          "All Platforms"
                        )}{" "}
                        {isDesktop ? (
                          <span
                            style={{ fontWeight: 900, color: theme.text() }}
                          >
                            •
                          </span>
                        ) : null}
                      </Typography>
                    </Grid>

                    {isDesktop ? (
                      <Grid
                        item
                        sx={{
                          minWidth: isDesktop ? 0 : "100%",
                          position: "relative",
                        }}
                      >
                        <Grid
                          container
                          justifyContent="center"
                          alignItems="center"
                        >
                          {token?.blueteam_users?.map((_, i) => (
                            <Grid item key={i}>
                              <Avatar
                                style={{
                                  width: 40,
                                  height: 40,
                                  position: "absolute",
                                  left: i * 15,
                                  top: -15,
                                  zIndex: getZIndexForAvatar(i),
                                }}
                                avatarStyle="Circle"
                                {...avatarArr[i]?.current}
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          sx={{
            minWidth: isDesktop ? 0 : "100%",
            textAlign: isDesktop ? "none" : "center",
          }}
        >
          <Grid
            container
            direction="column"
            rowSpacing={{ xs: 1 }}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Button
                disabled={
                  store?.currentTokenId != null && store?.currentTokenId != ""
                }
                variant="contained"
                size="large"
                sx={styles.join}
                onClick={handleOpenModal}
              >
                {token?.password == "" || token?.password == null ? (
                  "Join"
                ) : (
                  <AiFillLock style={styles.locked} />
                )}
              </Button>
            </Grid>

            {userLoading ||
            (store?.user?.role < 501 && store?.user?.role !== 188) ? null : (
              <>
                {isMoreThan12Hours(token?._id) ? (
                  <Grid
                    item
                    sx={{
                      minWidth: isDesktop ? 0 : "100%",
                      textAlign: isDesktop ? "none" : "center",
                      transition: "all .2s ease-in-out",
                      "&:hover": {
                        cursor: "pointer",
                        transform: "scale(1.1)",
                      },
                    }}
                    onClick={() => navigate(`/token/${token?._id}`)}
                  >
                    <Typography style={styles.old}>View (cancel)</Typography>
                  </Grid>
                ) : (
                  <Grid
                    item
                    sx={{
                      minWidth: isDesktop ? 0 : "100%",
                      textAlign: isDesktop ? "none" : "center",
                      transition: "all .2s ease-in-out",
                      "&:hover": {
                        cursor: "pointer",
                        transform: "scale(1.1)",
                      },
                    }}
                    onClick={() => navigate(`/token/${token?._id}`)}
                  >
                    <Typography style={styles.view}>
                      View (don't cancel)
                    </Typography>
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid
        container
        direction="row"
        justifyContent={isDesktop ? "space-between" : "center"}
        alignItems="center"
        sx={{ width: "100%" }}
        columnSpacing={{ xs: 2 }}
        rowSpacing={{ xs: 1 }}
      >
        <Grid item>
          <Chip
            label={getGame(token?.game)}
            sx={{
              color:
                token?.game === "FN"
                  ? theme.blue()
                  : token?.game === "VAL"
                  ? theme.green()
                  : token?.game === "FIVEM"
                  ? theme.orange()
                  : token?.game === "CLASH"
                  ? theme.red()
                  : theme.blue(),
              backgroundColor: "transparent",
              fontSize: 18,
              fontWeight: 900,
              border: `2px solid ${
                token?.game === "FN"
                  ? theme.blue()
                  : token?.game === "VAL"
                  ? theme.green()
                  : token?.game === "FIVEM"
                  ? theme.orange()
                  : token?.game === "CLASH"
                  ? theme.red()
                  : theme.blue()
              }`,
            }}
            size="large"
          />
        </Grid>

        <Grid item>
          <Typography style={styles.text}>
            {getTokenMode(token?.match_type)}
          </Typography>
        </Grid>

        <Grid item>
          <Typography style={styles.fee}>
            {numFormatter.format(token?.entry_fee)}/player
          </Typography>
        </Grid>

        {token?.game === "CLASH" ? null : (
          <Grid item>
            <Typography style={styles.subText}>{token?.region}</Typography>
          </Grid>
        )}

        <Grid item>
          <Typography style={styles.text}>
            {getTokenSize(token?.team_size)}
          </Typography>
        </Grid>

        {token?.game === "FIVEM" && token?.showMe ? (
          <Grid item>
            <Grid
              container
              direction="column"
              justifyContent="start"
              alignItems="center"
              columnSpacing={{ xs: 1 }}
              rowSpacing={{ xs: 1 }}
            >
              {token?.blueteam_users?.map((user, i) => (
                <Grid item key={i}>
                  <Chip
                    label={user}
                    sx={{
                      color: theme.text(),
                      backgroundColor: theme.skeleton(),
                      fontSize: 14,
                      fontWeight: 900,
                    }}
                    size="large"
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        ) : null}

        {token?.game === "FN" || token?.game == null ? (
          <Grid item>
            <Typography style={styles.subText}>
              {token?.console_only ? "Console Only" : "All Platforms"}
            </Typography>
          </Grid>
        ) : null}

        <Grid
          item
          sx={{
            minWidth: isDesktop ? 0 : "100%",
          }}
        >
          <Grid container justifyContent="center" alignItems="center">
            {isDesktop
              ? token?.blueteam_users?.map((_, i) => (
                  <Grid item key={i}>
                    <Avatar
                      style={{ width: 70, height: 70 }}
                      avatarStyle="Circle"
                      {...avatarArr[i]?.current}
                    />
                  </Grid>
                ))
              : null}
          </Grid>
        </Grid>

        <Grid
          item
          sx={{
            minWidth: isDesktop ? 0 : "100%",
            textAlign: isDesktop ? "none" : "center",
          }}
        >
          <Grid
            container
            direction="column"
            rowSpacing={{ xs: 1 }}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Button
                disabled={
                  store?.currentTokenId != null && store?.currentTokenId != ""
                }
                variant="contained"
                size="large"
                sx={styles.join}
                onClick={handleOpenModal}
              >
                {token?.password == "" || token?.password == null ? (
                  "Join"
                ) : (
                  <AiFillLock style={styles.locked} />
                )}
              </Button>
            </Grid>

            {userLoading ||
            (store?.user?.role < 501 && store?.user?.role !== 188) ? null : (
              <>
                <Grid
                  item
                  sx={{
                    minWidth: isDesktop ? 0 : "100%",
                    textAlign: isDesktop ? "none" : "center",
                  }}
                >
                  <Typography
                    style={
                      isMoreThan12Hours(token?._id) ? styles.old : styles.date
                    }
                  >
                    {getDateForMatch(token?._id)} ({getTimeForMatch(token?._id)}
                    )
                  </Typography>
                </Grid>

                {isMoreThan12Hours(token?._id) ? (
                  <Grid
                    item
                    sx={{
                      minWidth: isDesktop ? 0 : "100%",
                      textAlign: isDesktop ? "none" : "center",
                      transition: "all .2s ease-in-out",
                      "&:hover": {
                        cursor: "pointer",
                        transform: "scale(1.1)",
                      },
                    }}
                    onClick={() => navigate(`/token/${token?._id}`)}
                  >
                    <Typography style={styles.old}>View (cancel)</Typography>
                  </Grid>
                ) : (
                  <Grid
                    item
                    sx={{
                      minWidth: isDesktop ? 0 : "100%",
                      textAlign: isDesktop ? "none" : "center",
                      transition: "all .2s ease-in-out",
                      "&:hover": {
                        cursor: "pointer",
                        transform: "scale(1.1)",
                      },
                    }}
                    onClick={() => navigate(`/token/${token?._id}`)}
                  >
                    <Typography style={styles.view}>
                      View (don't cancel)
                    </Typography>
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Grid> */}
    </Grid>
  );
};

export default NewTokenItem;
