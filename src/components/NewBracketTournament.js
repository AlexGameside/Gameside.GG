import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaWallet,
  FaGlobeAmericas,
  FaSkullCrossbones,
  FaPiggyBank,
} from "react-icons/fa";
import { MdOutlineGames, MdOutlineEditNote } from "react-icons/md";
import { IoPodium } from "react-icons/io5";
import {
  SET_USER,
  StoreContext,
  StoreDispatch,
} from "../context/NewStoreContext";
import {
  cancelBracketTournament,
  deleteBracketTournament,
  getBracketTournament,
  kickTeamFromTournament,
  leaveBracketTournament,
  startBracketTournament,
} from "../utils/API";
import createTheme from "../utils/theme";
import {
  Grid,
  Typography,
  useMediaQuery,
  Chip,
  Button,
  Alert,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import {
  getTournamentDate,
  getTournamentCountdownDate,
  determinePlaceEnd,
  getCurrentTokenRegion,
} from "../utils/helperMethods";
import Countdown from "react-countdown";
import { AiFillCheckCircle } from "react-icons/ai";
import useDraggableScroll from "use-draggable-scroll";
import Avatar from "avataaars";
import NewBracketTournamentBracket from "./NewBracketTournamentBracket";
import NewJoinBracketTournamentModal from "./NewJoinBracketTournamentModal";
import useAxios from "../utils/useAxios";
import useSocket from "../utils/useSocket";
import { FaTrophy, FaCrown, FaUsers, FaMedal } from "react-icons/fa";
import Header from "../custom_components/Header";
import NewPrimaryButton from "../custom_components/NewPrimaryButton";
import NewOutlineButton from "../custom_components/NewOutlineButton";
import SectionHeader from "../custom_components/SectionHeader";
import NewSecondaryButton from "../custom_components/NewSecondaryButton";
import MatchTabButton from "./match/MatchTabButton";
import StateScrollItem from "./match/components/StateScrollItem";
import UserProfileModal from "./user/UserProfileModal";
import NewBracketTournamentTeamModal from "./NewBracketTournamentTeamModal";
import defaultThumbnail from "../assets/default-tournament.png";

const NewBracketTournament = () => {
  // variables
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const params = useParams();
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const navigate = useNavigate();
  const ref = useRef(null);
  const screenshotRef = useRef(null);
  const { onMouseDown } = useDraggableScroll(ref, {
    direction: "horizontal",
  });
  const api = useAxios();
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const { bracketTournament } = useSocket(params?.id);
  const dispatch = useContext(StoreDispatch);

  // state
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(null);
  const [tournament, setTournament] = useState(null);
  const [selected, setSelected] = useState(null);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [leaveLoading, setLeaveLoading] = useState(false);
  const [startLoading, setStartLoading] = useState(false);
  const [kickLoading, setKickLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [prizeObj, setPrizeObj] = useState({});
  const [hostHovered, setHostHovered] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [userSelected, setUserSelected] = useState(null);

  // methods
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return null;
    } else {
      // Render a countdown
      return (
        <span style={{ color: theme.primary(), fontWeight: 600 }}>
          {getTournamentCountdownDate(days, hours, minutes, seconds)}
        </span>
      );
    }
  };

  const handleCloseJoinModal = () => {
    setJoinModalOpen(false);
  };

  const handleOpenJoinModal = () => {
    setJoinModalOpen(true);
  };

  const handleOpenTeamModal = () => {
    setTeamModalOpen(true);
  };

  const handleCloseTeamModal = () => {
    setSelectedTeam(null);
    setTeamModalOpen(false);
  };

  const handleCancelTournament = () => {
    setCancelLoading(true);
    setError(null);
    setSuccess(null);
    cancelBracketTournament(api, tournament?._id).then((res) => {
      if (!res?.error) {
        setCancelLoading(false);
        setSuccess(res?.message);
        return;
      } else {
        setError(res?.message);
        setCancelLoading(false);
        return;
      }
    });
  };

  const handleDeleteTournament = () => {
    setDeleteLoading(true);
    setError(null);
    setSuccess(null);
    deleteBracketTournament(api, params?.id).then((res) => {
      if (!res?.error) {
        setDeleteLoading(false);
        setSuccess(res?.message);
        navigate("/valorant/tournaments");
        return;
      } else {
        setError(res?.message);
        setDeleteLoading(false);
        return;
      }
    });
  };

  const handleStartTournament = () => {
    setStartLoading(true);
    setError(null);
    setSuccess(null);
    startBracketTournament(api, params?.id).then((res) => {
      if (!res?.error) {
        setStartLoading(false);
        setSuccess(res?.message);
        return;
      } else {
        setStartLoading(false);
        setError(res?.message);
        return;
      }
    });
  };

  const handleLeaveTournament = () => {
    setLeaveLoading(true);
    const teamId = getPlayerTeamInTournament();
    leaveBracketTournament(api, teamId, params?.id).then((res) => {
      if (!res?.error) {
        setLeaveLoading(false);
        setSuccess(res?.message);
        let newUserData = store.user;
        let newUpcomingTournaments =
          newUserData.user_tournaments?.upcoming?.filter(
            (tournament) => tournament?._id !== params?.id
          );
        newUserData.user_tournaments.upcoming = newUpcomingTournaments;
        dispatch({ type: SET_USER, payload: newUserData });
        return;
      } else {
        setLeaveLoading(false);
        setError(res?.message);
        return;
      }
    });
  };

  const handleKickTeam = (teamId) => {
    setKickLoading(teamId);
    kickTeamFromTournament(api, teamId, params?.id).then((res) => {
      if (!res?.error) {
        setKickLoading(null);
        setSuccess(res?.message);
        return;
      } else {
        setKickLoading(null);
        setError(res?.message);
        return;
      }
    });
  };

  const isPlayerTeamInTournament = () => {
    for (let i = 0; i < store?.user?.userTeams?.length; i++) {
      if (tournament?.teamIds?.includes(store?.user?.userTeams[i]?._id)) {
        return true;
      }
    }
    return false;
  };

  const getPlayerTeamInTournament = () => {
    for (let i = 0; i < store?.user?.userTeams?.length; i++) {
      if (tournament?.teamIds?.includes(store?.user?.userTeams[i]?._id)) {
        return store?.user?.userTeams[i]?._id;
      }
    }
    return null;
  };

  const calculateRoundsToPay = (round, teamsPaid, numWinners, roundsToPay) => {
    while (teamsPaid < numWinners) {
      for (let i = 0; i < tournament?.bracket?.matches[round]?.length; i++) {
        teamsPaid += 1;
      }
      roundsToPay += 1;
      round -= 1;
    }
    return roundsToPay;
  };

  const createDistribution = (numWinners, prize, entryFee, teamSize) => {
    let tourneyObj = {};
    let prizeRemaining = prize;
    let roundCounter = tournament?.bracket?.matches?.length - 2;
    let paidTeams = 2;
    let roundsPaid = 1;
    const roundsToPay = calculateRoundsToPay(
      tournament?.bracket?.matches?.length - 1,
      paidTeams,
      numWinners,
      0
    );

    if (numWinners === 1 && entryFee === 0) {
      tourneyObj[1] = prizeRemaining;
      return tourneyObj;
    }
    if (numWinners === 1 && entryFee > 0) {
      tourneyObj[1] = prizeRemaining - entryFee * teamSize;
      tourneyObj[2] = entryFee * teamSize;
      return tourneyObj;
    }
    if (numWinners === 2) {
      tourneyObj[1] = prizeRemaining * 0.7;
      tourneyObj[2] = prizeRemaining * 0.3;
      return tourneyObj;
    }

    tourneyObj[1] = prizeRemaining * 0.5;
    prizeRemaining -= prizeRemaining * 0.5;
    tourneyObj[2] = prizeRemaining * 0.5;
    prizeRemaining -= prizeRemaining * 0.5;

    while (paidTeams < numWinners) {
      for (
        let i = 0;
        i < tournament?.bracket?.matches[roundCounter]?.length;
        i++
      ) {
        tourneyObj[paidTeams + 1] =
          (prizeRemaining *
            (roundsPaid === roundsToPay - 1 || roundsPaid === roundsToPay
              ? 1
              : 0.5)) /
          tournament?.bracket?.matches[roundCounter]?.length;
        paidTeams += 1;
      }
      roundsPaid += 1;
      roundCounter -= 1;
      prizeRemaining *= 0.5;
    }
    return tourneyObj;
  };

  // effects
  useEffect(() => {
    theme.changeWebsiteBackground();
  }, []);

  useEffect(() => {
    theme.changeWebsiteBackground();
  }, [store.mode]);

  useEffect(() => {
    getBracketTournament(params?.id).then((res) => {
      if (!res?.error) {
        setLoading(false);
        setTournament(res?.tourney);
        return;
      } else {
        setLoading(false);
        setError(res?.message);
        return;
      }
    });
  }, []);

  useEffect(() => {
    getBracketTournament(params?.id).then((res) => {
      if (!res?.error) {
        setLoading(false);
        setTournament(res?.tourney);
        return;
      } else {
        setLoading(false);
        setError(res?.message);
        return;
      }
    });
  }, [params?.id]);

  useEffect(() => {
    setTournament(bracketTournament);
  }, [bracketTournament]);

  useEffect(() => {
    setPrizeObj(
      createDistribution(
        tournament?.num_winners,
        tournament?.prize,
        tournament?.entry_fee,
        tournament?.team_size
      )
    );
  }, [tournament]);

  // style
  const styles = {
    subtitle: {
      fontSize: 18,
      fontWeight: 400,
      color: theme.metaText(),
    },
    label: {
      fontSize: 15,
      fontWeight: 400,
      color: theme.metaText(),
    },
    starts: {
      fontWeight: 400,
      color: theme.metaText(),
      fontSize: 15,
    },
    stateLabelSelected: {
      fontWeight: 600,
      color: theme.text(),
      fontSize: 18,
      textShadow: `1px 1px #000`,
    },
    stateLabel: {
      fontWeight: 600,
      color: "#5F6170",
      fontSize: 18,
      textShadow: `1px 1px #000`,
    },
    stateMetaSelected: {
      fontWeight: 300,
      color: theme.text(),
      fontSize: 15,
      textShadow: `1px 1px #000`,
    },
    stateMeta: {
      fontWeight: 300,
      color: "#5F6170",
      fontSize: 15,
      textShadow: `1px 1px #000`,
    },
    header: {
      fontWeight: 600,
      fontSize: 20,
      color: theme.text(),
    },
    value: {
      fontWeight: 600,
      fontSize: 18,
      color: theme.text(),
    },
    winnings: {
      fontWeight: 600,
      fontSize: 15,
      color: theme.text(),
    },
    sectionButton: {
      color: theme.primary(),
      borderBottom: `2px solid ${theme.primary()}`,
      boxSizing: "border-box",
      fontSize: 14,
      textTransform: "none",
      fontWeight: 700,
      borderRadius: 2,
      boxShadow: "0 0",
      transition: "all .2s ease-in-out",
      minWidth: isDesktop ? 120 : "100%",
      height: 40,
      backgroundColor: "transparent",
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      "&:hover": {
        backgroundColor: "transparent",
        boxShadow: "0 0",
        borderBottom: `2px solid ${theme.primary()}`,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
    },
    unselectedSectionButton: {
      color: theme.metaText(),
      boxSizing: "border-box",
      fontSize: 14,
      textTransform: "none",
      fontWeight: 700,
      borderRadius: 2,
      boxShadow: "0 0",
      transition: "all .2s ease-in-out",
      minWidth: isDesktop ? 120 : "100%",
      height: 40,
      backgroundColor: "transparent",
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderBottom: `2px solid transparent`,
      "&:hover": {
        backgroundColor: theme.border(),
        boxShadow: "0 0",
      },
    },
    kick: {
      fontSize: 15,
      color: theme.complementary(),
      textTransform: "none",
      fontWeight: 900,
      borderRadius: 50,
      boxShadow: "0 0",
      transition: "all .2s ease-in-out",
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: "transparent",
        boxShadow: "0 0",
        transform: "scale(1.1)",
      },
    },
  };

  return loading ? (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="start"
        direction="column"
        rowSpacing={{ xs: 1, sm: 2, md: 4 }}
        sx={{
          minHeight: "100vh",
          paddingBottom: 2,
          paddingTop: 4,
        }}
        id="top"
      >
        <Grid
          item
          sx={{
            width: "100%",
            borderRadius: 2,
            backgroundColor: theme.card(),
            height: 297,
            paddingLeft: 4,
            paddingRight: 4,
          }}
        >
          <Grid
            container
            justifyContent="start"
            alignItems="center"
            gap={{ xs: 2 }}
          >
            <Grid item>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: 193,
                  width: 334,
                  bgcolor: theme.border(),
                  borderRadius: 2,
                }}
              />
            </Grid>

            <Grid item>
              <Grid
                container
                direction="column"
                alignItems="start"
                justifyContent="start"
                gap={{ xs: 1 }}
              >
                <Grid item>
                  <Skeleton
                    variant="text"
                    sx={{ bgcolor: theme.border(), height: 15, width: 61 }}
                  />
                </Grid>

                <Grid item>
                  <Skeleton
                    variant="text"
                    sx={{ bgcolor: theme.border(), height: 15, width: 100 }}
                  />
                </Grid>

                <Grid item>
                  <Skeleton
                    variant="text"
                    sx={{ bgcolor: theme.border(), height: 15, width: 122 }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sx={{ width: "100%", height: 150 }}></Grid>

        <Grid item sx={{ width: "100%" }}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="start"
            gap={{ xs: 2 }}
          >
            <Grid
              item
              sx={{
                backgroundColor: theme.card(),
                borderRadius: 2,
                height: 350,
                boxSizing: "border-box",
                padding: 2,
                minWidth: isDesktop ? 500 : "100%",
              }}
            >
              <Grid
                container
                direction="column"
                alignItems="start"
                justifyContent="start"
                sx={{ height: "100%" }}
                gap={{ xs: 2 }}
              >
                <Grid item>
                  <SectionHeader label="Overview" />
                </Grid>

                <Grid item>
                  <Skeleton
                    variant="text"
                    sx={{ bgcolor: theme.border(), height: 20, width: 92 }}
                  />
                </Grid>

                <Grid item>
                  <Skeleton
                    variant="text"
                    sx={{ bgcolor: theme.border(), height: 20, width: 150 }}
                  />
                </Grid>

                <Grid item>
                  <Skeleton
                    variant="text"
                    sx={{ bgcolor: theme.border(), height: 20, width: 150 }}
                  />
                </Grid>

                <Grid item>
                  <Skeleton
                    variant="text"
                    sx={{ bgcolor: theme.border(), height: 20, width: 150 }}
                  />
                </Grid>

                <Grid item>
                  <Skeleton
                    variant="text"
                    sx={{ bgcolor: theme.border(), height: 20, width: 150 }}
                  />
                </Grid>

                <Grid item>
                  <Skeleton
                    variant="text"
                    sx={{ bgcolor: theme.border(), height: 20, width: 150 }}
                  />
                </Grid>

                <Grid item>
                  <Skeleton
                    variant="text"
                    sx={{ bgcolor: theme.border(), height: 20, width: 150 }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              sx={{
                backgroundColor: theme.card(),
                borderRadius: 2,
                height: 350,
                boxSizing: "border-box",
                padding: 2,
                flexGrow: 1,
              }}
            >
              <Grid
                container
                direction="column"
                alignItems="start"
                justifyContent="start"
                sx={{ height: "100%" }}
                gap={{ xs: 2 }}
              >
                <Grid item>
                  <SectionHeader label="Rules" />
                </Grid>

                <Grid item>
                  <Skeleton
                    variant="text"
                    sx={{ bgcolor: theme.border(), height: 20, width: 92 }}
                  />
                </Grid>

                <Grid item>
                  <Skeleton
                    variant="text"
                    sx={{ bgcolor: theme.border(), height: 20, width: 150 }}
                  />
                </Grid>

                <Grid item>
                  <Skeleton
                    variant="text"
                    sx={{ bgcolor: theme.border(), height: 20, width: 150 }}
                  />
                </Grid>

                <Grid item>
                  <Skeleton
                    variant="text"
                    sx={{ bgcolor: theme.border(), height: 20, width: 150 }}
                  />
                </Grid>

                <Grid item>
                  <Skeleton
                    variant="text"
                    sx={{ bgcolor: theme.border(), height: 20, width: 150 }}
                  />
                </Grid>

                <Grid item>
                  <Skeleton
                    variant="text"
                    sx={{ bgcolor: theme.border(), height: 20, width: 150 }}
                  />
                </Grid>

                <Grid item>
                  <Skeleton
                    variant="text"
                    sx={{ bgcolor: theme.border(), height: 20, width: 150 }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  ) : (
    <>
      <NewBracketTournamentTeamModal
        open={teamModalOpen}
        onClose={handleCloseTeamModal}
        team={selectedTeam}
      />
      <NewJoinBracketTournamentModal
        tournament={tournament}
        open={joinModalOpen}
        onClose={handleCloseJoinModal}
        setSuccess={setSuccess}
      />
      <UserProfileModal
        username={userSelected}
        open={profileOpen}
        onClose={() => {
          setProfileOpen(false);
          setUserSelected(null);
          setHostHovered(null);
        }}
      />
      <Grid
        container
        alignItems="start"
        justifyContent="start"
        direction="column"
        rowSpacing={{ xs: 1, sm: 2, md: 4 }}
        sx={{
          minHeight: "100vh",
        }}
        id="top"
        gap={{ xs: 1 }}
      >
        <Grid item>
          <NewOutlineButton
            onClick={() => navigate("/valorant/tournaments")}
            label={"Back to Tournaments"}
          />
        </Grid>
        <Grid
          item
          sx={{
            backgroundColor: theme.cardDark(),
            borderRadius: 2,
            border: `1px solid ${theme.border()}`,
            width: "100%",
          }}
        >
          <Grid
            container
            direction="column"
            alignItems="start"
            justifyContent="center"
            sx={{
              width: "100%",
              paddingLeft: 4,
              paddingRight: 4,
            }}
          >
            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                direction="row"
                justifyContent="start"
                alignItems="center"
                columnSpacing={{ xs: 2 }}
                rowSpacing={{ xs: 1, sm: 2, md: 4 }}
              >
                <Grid item sx={{ width: "100%" }}>
                  <Grid
                    container
                    justifyContent={isDesktop ? "start" : "center"}
                    alignItems="center"
                    gap={{ xs: 2 }}
                  >
                    {tournament?.thumbnail == null ? (
                      <Grid item>
                        <img
                          src={defaultThumbnail}
                          alt="thumbnail"
                          style={{
                            borderRadius: 8,
                          }}
                        />
                      </Grid>
                    ) : (
                      <Grid item>
                        <img
                          src={tournament?.thumbnail}
                          alt="thumbnail"
                          style={{
                            borderRadius: 8,
                            border: `1px solid ${theme.border()}`,
                            height: 190,
                            width: 336,
                          }}
                        />
                      </Grid>
                    )}

                    <Grid item sx={{ flexGrow: 1 }}>
                      <Grid
                        container
                        direction="column"
                        rowSpacing={{ xs: 1 }}
                        alignItems={isDesktop ? "start" : "center"}
                        justifyContent="center"
                        sx={{
                          textAlign: isDesktop ? "start" : "center",
                          width: "100%",
                        }}
                      >
                        <Grid item sx={{ width: "100%" }}>
                          <Grid
                            container
                            justifyContent={
                              isDesktop ? "space-between" : "center"
                            }
                            alignItems="center"
                          >
                            <Grid item>
                              <Header label={tournament?.title} />
                            </Grid>

                            <Grid
                              item
                              sx={{ minWidth: isDesktop ? 0 : "100%" }}
                            >
                              <Grid
                                container
                                direction="row"
                                alignItems="center"
                                justifyContent="center"
                                columnSpacing={{ xs: 2 }}
                              >
                                {tournament?.num_teams >
                                  tournament?.teams?.length &&
                                tournament?.state === 0 &&
                                store?.user ? (
                                  <Grid item>
                                    {isPlayerTeamInTournament() ? (
                                      <NewPrimaryButton
                                        complementary
                                        loading={leaveLoading}
                                        onClick={handleLeaveTournament}
                                        label="leave"
                                      />
                                    ) : (
                                      <NewPrimaryButton
                                        label="register"
                                        onClick={handleOpenJoinModal}
                                      />
                                    )}
                                  </Grid>
                                ) : null}

                                {tournament?.state === 0 &&
                                tournament?.num_teams ===
                                  tournament?.teams?.length &&
                                store?.user?.role > 502 ? (
                                  <Grid item>
                                    <NewPrimaryButton
                                      label="start"
                                      loading={startLoading}
                                      onClick={handleStartTournament}
                                    />
                                  </Grid>
                                ) : null}

                                {store?.user?.role > 502 &&
                                (tournament?.state === 0 ||
                                  tournament?.state === 1) ? (
                                  <Grid item>
                                    <NewSecondaryButton
                                      label="cancel"
                                      loading={cancelLoading}
                                      onClick={handleCancelTournament}
                                    />
                                  </Grid>
                                ) : null}

                                {store?.user?.role > 501 &&
                                (tournament?.state === 2 ||
                                  tournament?.state === -1) ? (
                                  <Grid item>
                                    <NewSecondaryButton
                                      label="Delete"
                                      loading={deleteLoading}
                                      onClick={handleDeleteTournament}
                                    />
                                  </Grid>
                                ) : null}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item>
                          <Typography sx={styles.subtitle}>
                            {tournament?.description}
                          </Typography>
                        </Grid>

                        <Grid item>
                          <Typography sx={styles.label}>
                            <span
                              style={{ fontWeight: 600, color: theme.text() }}
                            >
                              {getTournamentDate(tournament?.start_date)}
                            </span>{" "}
                            <span
                              style={{ fontWeight: 600, color: theme.text() }}
                            >
                              •
                            </span>{" "}
                            Hosted by{" "}
                            <span
                              style={{ color: theme.text(), fontWeight: 600 }}
                            >
                              {typeof tournament?.hosted_by === "string"
                                ? tournament?.hosted_by
                                : tournament?.hosted_by?.username}
                            </span>
                          </Typography>
                        </Grid>

                        {tournament?.state === 0 ? (
                          <Grid item>
                            <Typography sx={styles.starts}>
                              Starts In{" "}
                              <span style={{ color: theme.text() }}>
                                <Countdown
                                  date={new Date(tournament?.start_date)}
                                  renderer={renderer}
                                />
                              </span>
                            </Typography>
                          </Grid>
                        ) : null}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Grid
                    container
                    direction="column"
                    alignItems="start"
                    justifyContent="center"
                  >
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
                        <MatchTabButton
                          label="About"
                          selected={selected == null}
                          onClick={() => setSelected(null)}
                        />

                        <MatchTabButton
                          label="Bracket"
                          selected={selected === "bracket"}
                          onClick={() => setSelected("bracket")}
                        />

                        <MatchTabButton
                          label="Teams"
                          selected={selected == "teams"}
                          onClick={() => setSelected("teams")}
                        />

                        <MatchTabButton
                          label="Results"
                          selected={selected == "results"}
                          onClick={() => setSelected("results")}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                {success ? (
                  <Grid item sx={{ width: "100%" }}>
                    <Alert severity="success" onClose={() => setSuccess("")}>
                      {success}
                    </Alert>
                  </Grid>
                ) : null}
                {error ? (
                  <Grid item sx={{ width: "100%" }}>
                    <Alert severity="error" onClose={() => setError("")}>
                      {error}
                    </Alert>
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {selected == null ? (
          <Grid
            item
            sx={{
              width: "100%",
            }}
          >
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
              rowSpacing={{ xs: 1, sm: 2, md: 4 }}
              sx={{
                paddingTop: 2,
              }}
            >
              <Grid
                item
                wrap="nowrap"
                sx={{
                  width: "100%",
                  overflow: "auto",
                  paddingBottom: 2,
                  paddingTop: 2,
                }}
                ref={ref}
                onMouseDown={onMouseDown}
                className="state-scroll"
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="start"
                  alignItems="start"
                  wrap="nowrap"
                  sx={{ boxSizing: "border-box" }}
                >
                  <StateScrollItem
                    title="Open"
                    description="Signups are open"
                    current={
                      tournament?.state === 0 &&
                      tournament?.teams?.length < tournament?.num_teams
                    }
                    finished={
                      tournament?.state > 0 ||
                      tournament?.teams?.length >= tournament?.num_teams
                    }
                    isLast={false}
                  />

                  <StateScrollItem
                    title="Waiting"
                    description="Waiting for tournament to start"
                    current={
                      tournament?.state === 0 &&
                      tournament?.teams?.length === tournament?.num_teams
                    }
                    finished={tournament?.state > 0}
                    isLast={false}
                  />

                  <StateScrollItem
                    title="Ongoing"
                    description="Tournament is currently in play"
                    current={tournament?.state === 1}
                    finished={tournament?.state > 1}
                    isLast={false}
                  />

                  <StateScrollItem
                    title="Completed"
                    description="Tournament has concluded"
                    current={false}
                    finished={tournament?.state === 2}
                    isLast={true}
                  />
                </Grid>
              </Grid>

              <Grid item sx={{ width: "100%", paddingBottom: 2 }}>
                <Grid
                  container
                  justifyContent="start"
                  alignItems="stretch"
                  gap={{ xs: 2 }}
                >
                  <Grid item sx={{ flexGrow: 1 }}>
                    <Grid
                      container
                      direction="column"
                      alignItems="start"
                      justifyContent="center"
                      gap={{ xs: 2 }}
                    >
                      <Grid
                        item
                        sx={{
                          padding: 2,
                          backgroundColor: theme.cardDark(),
                          borderRadius: 2,
                          width: "100%",
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
                            <SectionHeader label="Overview" />
                          </Grid>

                          <Grid item sx={{ width: "100%" }}>
                            <Grid
                              container
                              justifyContent="start"
                              alignItems="center"
                              gap={{ xs: 1 }}
                            >
                              <Grid item>
                                <MdOutlineEditNote
                                  style={{
                                    fontSize: 24,
                                    color: theme.metaText(),
                                  }}
                                />
                              </Grid>

                              <Grid item>
                                <Typography
                                  sx={{
                                    fontSize: 15,
                                    color: theme.text(),
                                    fontWeight: 400,
                                  }}
                                >
                                  {tournament?.teams?.length}/
                                  {tournament?.num_teams} Registered Teams
                                </Typography>
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
                                <FaWallet
                                  style={{
                                    fontSize: 24,
                                    color: theme.metaText(),
                                  }}
                                />
                              </Grid>

                              <Grid item>
                                <Typography
                                  sx={{
                                    fontSize: 15,
                                    color: theme.text(),
                                    fontWeight: 400,
                                  }}
                                >
                                  {tournament?.entry_fee === 0
                                    ? "Free"
                                    : numFormatter.format(
                                        tournament?.entry_fee
                                      )}{" "}
                                  Entry
                                </Typography>
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
                                <FaPiggyBank
                                  style={{
                                    fontSize: 24,
                                    color: theme.metaText(),
                                  }}
                                />
                              </Grid>

                              <Grid item>
                                <Typography
                                  sx={{
                                    fontSize: 15,
                                    color: theme.text(),
                                    fontWeight: 400,
                                  }}
                                >
                                  <span style={{ color: theme.green() }}>
                                    {numFormatter.format(tournament?.prize)}
                                  </span>{" "}
                                  Prize
                                </Typography>
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
                                <FaUsers
                                  style={{
                                    fontSize: 24,
                                    color: theme.metaText(),
                                  }}
                                />
                              </Grid>

                              <Grid item>
                                <Typography
                                  sx={{
                                    fontSize: 15,
                                    color: theme.text(),
                                    fontWeight: 400,
                                  }}
                                >
                                  {tournament?.team_size}v
                                  {tournament?.team_size}
                                </Typography>
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
                                <MdOutlineGames
                                  style={{
                                    fontSize: 24,
                                    color: theme.metaText(),
                                  }}
                                />
                              </Grid>

                              <Grid item>
                                <Typography
                                  sx={{
                                    fontSize: 15,
                                    color: theme.text(),
                                    fontWeight: 400,
                                  }}
                                >
                                  Pick/Ban Map Selection
                                </Typography>
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
                                <FaGlobeAmericas
                                  style={{
                                    fontSize: 24,
                                    color: theme.metaText(),
                                  }}
                                />
                              </Grid>

                              <Grid item>
                                <Typography
                                  sx={{
                                    fontSize: 15,
                                    color: theme.text(),
                                    fontWeight: 400,
                                  }}
                                >
                                  {getCurrentTokenRegion(tournament?.region)}
                                </Typography>
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
                                <IoPodium
                                  style={{
                                    fontSize: 24,
                                    color: theme.metaText(),
                                  }}
                                />
                              </Grid>

                              <Grid item>
                                <Typography
                                  sx={{
                                    fontSize: 15,
                                    color: theme.text(),
                                    fontWeight: 400,
                                  }}
                                >
                                  Best of 3
                                </Typography>
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
                                <FaSkullCrossbones
                                  style={{
                                    fontSize: 24,
                                    color: theme.metaText(),
                                  }}
                                />
                              </Grid>

                              <Grid item>
                                <Typography
                                  sx={{
                                    fontSize: 15,
                                    color: theme.text(),
                                    fontWeight: 400,
                                  }}
                                >
                                  {tournament?.format === 1
                                    ? "Single Elim"
                                    : "Double Elim"}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid
                        item
                        sx={{
                          width: "100%",
                          padding: 2,
                          backgroundColor: theme.cardDark(),
                          borderRadius: 2,
                          flexGrow: 1,
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
                            <SectionHeader label="Prizes" />
                          </Grid>

                          <Grid item>
                            <Grid
                              container
                              justifyContent="start"
                              alignItems="center"
                              gap={{ xs: 2 }}
                            >
                              {Object.keys(prizeObj)?.map((place, i) => {
                                return (
                                  <>
                                    <Grid item key={i}>
                                      <Grid
                                        container
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="start"
                                        columnSpacing={{ xs: 1 }}
                                      >
                                        {place === "1" ||
                                        place === "2" ||
                                        place === "3" ? (
                                          <Grid item>
                                            <FaTrophy
                                              style={{
                                                fontSize: 25,
                                                color:
                                                  place === "1"
                                                    ? theme.gold()
                                                    : place === "2"
                                                    ? "#bdbdbd"
                                                    : "#cd7f32",
                                              }}
                                            />
                                          </Grid>
                                        ) : (
                                          <Grid item>
                                            <FaMedal
                                              style={{
                                                fontSize: 25,
                                                color: theme.metaText(),
                                              }}
                                            />
                                          </Grid>
                                        )}

                                        <Grid item>
                                          <Grid
                                            container
                                            direction="column"
                                            alignItems="start"
                                            justifyContent="center"
                                          >
                                            <Grid item>
                                              <Typography
                                                sx={{
                                                  color: theme.metaText(),
                                                  fontWeight: 600,
                                                }}
                                              >
                                                {place}
                                                {determinePlaceEnd(place)}
                                              </Typography>
                                            </Grid>

                                            <Grid item>
                                              <Typography sx={styles.winnings}>
                                                {numFormatter.format(
                                                  prizeObj[place]
                                                )}
                                              </Typography>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </>
                                );
                              })}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Grid
                      container
                      direction="column"
                      alignItems="start"
                      justifyContent="center"
                      gap={{ xs: 2 }}
                    >
                      <Grid
                        item
                        sx={{
                          padding: 2,
                          backgroundColor: theme.cardDark(),
                          borderRadius: 2,
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
                            <SectionHeader label="Rules" />
                          </Grid>

                          <Grid item>
                            <Typography
                              sx={{
                                fontSize: 15,
                                color: theme.subText(),
                                fontWeight: 400,
                              }}
                            >
                              - "Play all rounds" off
                            </Typography>
                          </Grid>

                          <Grid item>
                            <Typography
                              sx={{
                                fontSize: 15,
                                color: theme.subText(),
                                fontWeight: 400,
                              }}
                            >
                              - "Tournament mode" on
                            </Typography>
                          </Grid>

                          <Grid item>
                            <Typography
                              sx={{
                                fontSize: 15,
                                color: theme.subText(),
                                fontWeight: 400,
                              }}
                            >
                              - "Hide match history" off
                            </Typography>
                          </Grid>

                          <Grid item>
                            <Typography
                              sx={{
                                fontSize: 15,
                                color: theme.subText(),
                                fontWeight: 400,
                              }}
                            >
                              - "Cheats" off
                            </Typography>
                          </Grid>

                          <Grid item>
                            <Typography
                              sx={{
                                fontSize: 15,
                                color: theme.subText(),
                                fontWeight: 400,
                              }}
                            >
                              - No switching agents at half.
                            </Typography>
                          </Grid>

                          <Grid item>
                            <Typography
                              sx={{
                                fontSize: 15,
                                color: theme.subText(),
                                fontWeight: 400,
                              }}
                            >
                              - Best of 3 Games
                            </Typography>
                          </Grid>

                          <Grid item>
                            <Typography
                              sx={{
                                fontSize: 15,
                                color: theme.subText(),
                                fontWeight: 400,
                              }}
                            >
                              - Maps will be chosen in your matches through
                              <br /> the pick/ban system
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid
                        item
                        sx={{
                          padding: 2,
                          backgroundColor: theme.cardDark(),
                          borderRadius: 2,
                          width: "100%",
                        }}
                      >
                        <Grid
                          container
                          direction="column"
                          alignItems="start"
                          justifyContent="center"
                          gap={{ xs: 1 }}
                        >
                          <Grid item sx={{ width: "100%" }}>
                            <Grid
                              container
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Grid item>
                                <SectionHeader label="Teams" />
                              </Grid>

                              <Grid item>
                                <NewOutlineButton
                                  label="View All"
                                  onClick={() => setSelected("teams")}
                                />
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item sx={{ width: "100%" }}>
                            <Grid
                              container
                              justifyContent="space-around"
                              alignItems="center"
                              gap={{ xs: 2 }}
                            >
                              <Grid item>
                                <Grid
                                  container
                                  direction="column"
                                  alignItems="center"
                                  justifyContent="center"
                                >
                                  <Grid item>
                                    <Typography
                                      sx={{
                                        fontSize: 15,
                                        fontWeight: 600,
                                        color: theme.text(),
                                      }}
                                    >
                                      {tournament?.teams?.length}
                                    </Typography>
                                  </Grid>

                                  <Grid item>
                                    <Typography
                                      sx={{
                                        fontSize: 15,
                                        fontWeight: 500,
                                        color: theme.metaText(),
                                      }}
                                    >
                                      Registered
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>

                              <Grid item>
                                <Grid
                                  container
                                  direction="column"
                                  alignItems="center"
                                  justifyContent="center"
                                >
                                  <Grid item>
                                    <Typography
                                      sx={{
                                        fontSize: 15,
                                        fontWeight: 600,
                                        color: theme.text(),
                                      }}
                                    >
                                      {tournament?.num_teams}
                                    </Typography>
                                  </Grid>

                                  <Grid item>
                                    <Typography
                                      sx={{
                                        fontSize: 15,
                                        fontWeight: 500,
                                        color: theme.metaText(),
                                      }}
                                    >
                                      Total Spots
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                      {typeof tournament?.hosted_by === "string" ? null : (
                        <Grid
                          item
                          sx={{
                            padding: 2,
                            backgroundColor: theme.cardDark(),
                            borderRadius: 2,
                            width: "100%",
                          }}
                        >
                          <Grid
                            container
                            direction="column"
                            alignItems="start"
                            justifyContent="center"
                            sx={{ width: "100%" }}
                            wrap="nowrap"
                          >
                            <Grid item>
                              <Typography sx={styles.header}>
                                Tournament Host
                              </Typography>
                            </Grid>

                            <Grid item sx={{ width: 300 }}>
                              <Grid
                                container
                                direction="column"
                                alignItems="start"
                                rowSpacing={{ xs: 1 }}
                              >
                                <Grid item>
                                  <Grid
                                    container
                                    direction="row"
                                    justifyContent="start"
                                    alignItems="center"
                                    columnSpacing={{ xs: 1 }}
                                  >
                                    <Grid item>
                                      <Avatar
                                        style={{ width: 60, height: 60 }}
                                        avatarStyle="Circle"
                                        {...tournament?.hosted_by?.avatar[0]}
                                      />
                                    </Grid>

                                    <Grid item>
                                      <Grid
                                        container
                                        direction="column"
                                        justifyContent="center"
                                        alignItems="start"
                                      >
                                        <Grid item>
                                          <Typography sx={styles.label}>
                                            Username
                                          </Typography>
                                        </Grid>

                                        <Grid item>
                                          <Typography
                                            sx={{
                                              ...styles.value,
                                              fontSize: 15,
                                              fontWeight: 600,
                                              color:
                                                hostHovered ===
                                                tournament?.hosted_by?.username
                                                  ? theme.primary()
                                                  : theme.text(),
                                              cursor:
                                                hostHovered ===
                                                tournament?.hosted_by?.username
                                                  ? "pointer"
                                                  : "default",
                                            }}
                                            onMouseEnter={() =>
                                              setHostHovered(
                                                tournament?.hosted_by?.username
                                              )
                                            }
                                            onMouseLeave={() =>
                                              setHostHovered(null)
                                            }
                                            onClick={() => {
                                              setUserSelected(
                                                tournament?.hosted_by?.username
                                              );
                                              setProfileOpen(true);
                                            }}
                                          >
                                            {tournament?.hosted_by?.username}
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : null}

        {selected === "bracket" ? (
          <NewBracketTournamentBracket tournament={tournament} />
        ) : null}

        {selected === "teams" ? (
          <Grid
            item
            sx={{
              width: "100%",
              paddingTop: 2,
            }}
          >
            <Grid
              container
              direction="column"
              alignItems="start"
              justifyContent="center"
              sx={{ width: "100%" }}
              gap={{ xs: 1 }}
            >
              {tournament?.teams?.length < 1 ? (
                <Grid item alignSelf="center">
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item>
                      <FaUsers
                        style={{ fontSize: 40, color: theme.metaText() }}
                      />
                    </Grid>

                    <Grid item>
                      <Typography
                        sx={{
                          fontSize: 18,
                          fontWeight: 600,
                          color: theme.metaText(),
                        }}
                      >
                        No Teams Yet!
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
                        Once teams register, they will appear here.
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              ) : (
                <>
                  {tournament?.teams?.map((team, i) => {
                    return (
                      <Grid
                        item
                        sx={{
                          width: "100%",
                          backgroundColor: theme.card(),
                          padding: 2,
                          borderRadius: 2,
                          "&:hover": {
                            cursor: "pointer",
                            backgroundColor: theme.cardHover(),
                          },
                        }}
                        onClick={() => {
                          setSelectedTeam(team?.avatars);
                          handleOpenTeamModal();
                        }}
                        key={i}
                      >
                        <Grid
                          container
                          direction="column"
                          alignItems="start"
                          justifyContent="center"
                          gap={{ xs: 1 }}
                          sx={{ width: "100%" }}
                        >
                          <Grid item>
                            <Grid
                              container
                              alignItems="center"
                              justifyContent="start"
                              columnSpacing={{ xs: 1 }}
                            >
                              <Grid item>
                                <Typography
                                  sx={{
                                    fontSize: 16,
                                    fontWeight: 500,
                                    color: theme.metaText(),
                                  }}
                                >
                                  Team{" "}
                                  <span style={{ color: theme.text() }}>
                                    {team?.name}
                                  </span>
                                </Typography>
                              </Grid>

                              {tournament?.state === 0 &&
                              store?.user?.role > 500 ? (
                                <Grid item>
                                  <NewSecondaryButton
                                    label="kick team"
                                    loading={kickLoading === team?._id}
                                    onClick={() => handleKickTeam(team?._id)}
                                    small
                                  />
                                </Grid>
                              ) : null}
                            </Grid>
                          </Grid>

                          <Grid item sx={{ width: "100%" }}>
                            <Grid
                              container
                              direction="column"
                              alignItems="start"
                              justifyContent="center"
                            >
                              <Grid item sx={{ width: "100%" }}>
                                <Grid
                                  container
                                  direction="row"
                                  alignItems="center"
                                  justifyContent="start"
                                  columnSpacing={{ xs: 1 }}
                                >
                                  {team?.usernames?.map((user, i) => {
                                    return (
                                      <Grid item>
                                        <Chip
                                          label={
                                            i === 0 ? (
                                              <Grid
                                                container
                                                justifyContent="center"
                                                alignItems="center"
                                                columnSpacing={{ xs: 0.5 }}
                                              >
                                                <Grid item>
                                                  <Grid item>
                                                    <FaCrown
                                                      style={{
                                                        fontSize: 20,
                                                        color: "#FFD700",
                                                      }}
                                                    />
                                                  </Grid>
                                                </Grid>
                                                <Grid item>
                                                  <Typography
                                                    sx={{
                                                      color: theme.text(),
                                                      fontSize: 14,
                                                      fontWeight: 600,
                                                    }}
                                                  >
                                                    {user}
                                                  </Typography>
                                                </Grid>
                                              </Grid>
                                            ) : (
                                              user
                                            )
                                          }
                                          key={i}
                                          sx={{
                                            color: theme.text(),
                                            backgroundColor: theme.border(),
                                            fontSize: 14,
                                            fontWeight: 600,
                                          }}
                                          size="large"
                                        />
                                      </Grid>
                                    );
                                  })}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })}
                </>
              )}
            </Grid>
          </Grid>
        ) : null}

        {selected === "results" ? (
          <Grid
            item
            sx={{
              width: "100%",
              paddingTop: 2,
            }}
          >
            <Grid
              container
              direction="column"
              alignItems="start"
              justifyContent="center"
              sx={{ width: "100%" }}
              ref={screenshotRef}
              gap={{ xs: 1 }}
            >
              {tournament?.state === 2 && tournament?.prize_dist[0] != null ? (
                Object.keys(tournament?.prize_dist[0])?.map((team, i) => {
                  return (
                    <Grid
                      key={i}
                      item
                      sx={{
                        width: "100%",
                        borderRadius: 2,
                        paddingLeft: 2,
                        paddingBottom: 1,
                        backgroundColor: theme.card(),
                        paddingTop: 2,
                      }}
                    >
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="start"
                        columnSpacing={{ xs: 2 }}
                      >
                        <Grid item>
                          <Grid
                            container
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Grid item>
                              {i < 3 ? (
                                <FaTrophy
                                  style={{
                                    fontSize: 20,
                                    color:
                                      i === 0
                                        ? theme.gold()
                                        : i === 1
                                        ? "#bdbdbd"
                                        : "#cd7f32",
                                  }}
                                />
                              ) : (
                                <FaMedal
                                  style={{
                                    fontSize: 20,
                                    color: theme.metaText(),
                                  }}
                                />
                              )}
                            </Grid>

                            <Grid item>
                              <Typography
                                sx={{
                                  fontSize: 16,
                                  fontWeight: 400,
                                  color: theme.metaText(),
                                }}
                              >
                                {i + 1}
                                {determinePlaceEnd(`${i + 1}`)}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item>
                          <Avatar
                            style={{ width: 60, height: 60 }}
                            avatarStyle="Circle"
                            {...tournament?.prize_dist[0][i][0]?.avatar[0]}
                          />
                        </Grid>

                        <Grid item xs={3}>
                          <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="start"
                          >
                            <Grid item>
                              <Typography sx={styles.label}>Team</Typography>
                            </Grid>

                            <Grid item>
                              <Typography sx={styles.value}>
                                Team {tournament?.prize_dist[0][i][0]?.username}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item>
                          <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="start"
                          >
                            <Grid item>
                              <Typography sx={styles.label}>
                                Total Prize
                              </Typography>
                            </Grid>

                            <Grid item>
                              <Typography
                                sx={{ ...styles.value, color: theme.green() }}
                              >
                                {numFormatter.format(prizeObj[i + 1])}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item>
                          <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="start"
                          >
                            <Grid item>
                              <Typography sx={styles.label}>
                                Prize/Player
                              </Typography>
                            </Grid>

                            <Grid item>
                              <Typography
                                sx={{ ...styles.value, color: theme.green() }}
                              >
                                {numFormatter.format(
                                  prizeObj[i + 1] / tournament?.team_size
                                )}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })
              ) : (
                <Grid item alignSelf="center">
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item>
                      <FaTrophy
                        style={{ fontSize: 40, color: theme.metaText() }}
                      />
                    </Grid>

                    <Grid item>
                      <Typography
                        sx={{
                          fontSize: 18,
                          fontWeight: 600,
                          color: theme.metaText(),
                        }}
                      >
                        No Results Yet!
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
                        Once the tournament completes, the results will show
                        here.
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </>
  );
};

export default NewBracketTournament;
