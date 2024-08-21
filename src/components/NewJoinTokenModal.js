import {
  useMediaQuery,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Typography,
  CircularProgress,
  Grid,
  Button,
  Chip,
  Alert,
} from "@mui/material";
import { useContext, useState, useEffect } from "react";
import {
  StoreContext,
  StoreDispatch,
  SET_CURRENT_TOKEN,
} from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import CloseIcon from "@mui/icons-material/Close";
import NewDropdown from "./NewDropdown";
import { Checkbox } from "semantic-ui-react";
import useAxios from "../utils/useAxios";
import { joinWager } from "../utils/API";
import { useNavigate, useLocation } from "react-router-dom";
import useSocket from "../utils/useSocket";

const NewJoinTokenModal = (props) => {
  // variables
  const { open, onClose, token, handleClosePasswordModal = () => {} } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const navigate = useNavigate();
  const api = useAxios();
  const location = useLocation();
  const isSpectre = location.pathname.startsWith("/spectre") || location.pathname === 'spectre'; 
  const isValorant = location.pathname.startsWith("/valorant");

  const dispatch = useContext(StoreDispatch);
  const { sendJoinEvent, tokenToRemove } = useSocket(token?._id);
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // state
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [team, setTeam] = useState(null);
  const [teamMembers, setTeamMembers] = useState(null);
  const [putUpRed, setPutUpRed] = useState(true);

  // methods
  const clearFilters = () => {
    setError(null);
    setLoading(false);
    setTeam(null);
    setTeamMembers(null);
    setPutUpRed(null);
  };

  const handleClose = () => {
    clearFilters();
    handleClosePasswordModal();
    onClose();
  };

  const handleJoinToken = () => {
    setLoading(true);
    if (!team) {
      setLoading(false);
      setError("You must select a team!");
      return;
    }
    joinWager(
      api,
      token?._id,
      team,
      store?.user?.username,
      team,
      putUpRed ? putUpRed : "",
      token?.game
    ).then((res) => {
      if (!res.error) {
        dispatch({ type: SET_CURRENT_TOKEN, payload: token?._id });
        sendJoinEvent({
          username: store?.user?.username,
          wagerId: token?._id,
        });
        setLoading(false);
        navigate(`/token/${isValorant ? 'valorant/' : isSpectre ? 'spectre/' : null}${token?._id}`);
        handleClose();
      } else {
        clearFilters();
        setError(res.message);
        setLoading(false);
        return;
      }
    });
  };

  const teamOptions = () => {
    let teamOpts = [{ title: "None", value: null }];
    let userTeams = store?.user?.userTeams;
    const matchType = token?.match_type;
    const game = token?.game;

    // check clash teams
    if (game === "CLASH") {
      userTeams = userTeams?.filter((team) => team?.usernames?.length < 2);
    }

    // check fortnite teams
    if (matchType === "ARENA_RACE" || matchType === "PG") {
      userTeams = userTeams?.filter((team) => team?.usernames?.length < 2);
    }

    if (matchType === "RACE") {
      userTeams = userTeams?.filter((team) => team?.usernames?.length < 3);
    }

    // check val
    if (game === "VAL") {
      userTeams = userTeams?.filter((team) => team?.usernames?.length > 1);
    }

    // check team size
    userTeams = userTeams?.filter(
      (team) => team?.usernames?.length === token?.team_size
    );

    userTeams?.forEach((team) => {
      teamOpts.push({
        title: team?.name,
        value: team?._id,
        teamMembers: team?.usernames,
      });
    });

    return teamOpts;
  };

  const handleSelectedTeamChange = (teamId, teamMembers) => {
    setPutUpRed(null);
    setTeam(teamId);
    setTeamMembers(teamMembers);
  };

  const getGame = (g) => {
    switch (g) {
      case "FN":
        return "spectre";
      case "VAL":
        return "Valorant";
      case "CLASH":
        return "Clash";
      default:
        return "spectre";
    }
  };

  const getMatchType = (type) => {
    switch (type) {
      case "ZW":
        return `Zone Wars`;
      case "REAL":
        return `Realistics`;
      case "BOX":
        return `Box Fights`;
      case "PG":
        return `PG/Build Fights`;
      case "RACE":
        return `Kill Race`;
      case "ARENA_RACE":
        return `Arena Kill Race`;
      case "BIND":
        return "Bind";
      case "FRACTURE":
        return "Fracture";
      case "ICEBOX":
        return "Icebox";
      case "BREEZE":
        return "Breeze";
      case "SPLIT":
        return "Split";
      case "HAVEN":
        return "Haven";
      case "ASCENT":
        return "ASCENT";
      case "BATTLE":
        return "Battle 1v1";
      default:
        return "";
    }
  };

  const getSize = (teamSize) => {
    switch (teamSize) {
      case 1:
        return "1v1";
      case 2:
        return "2v2";
      case 3:
        return "3v3";
      case 4:
        return "4v4";
      case 5:
        return "5v5";
    }
  };

  const getTokenRounds = () => {
    if (token?.game === "FN") {
      if (token?.match_type !== "RACE" && token?.match_type !== "ARENA_RACE")
        return (
          <>
            {token?.first_to}
            <sup> +2</sup>
          </>
        );
    }
    return token?.first_to;
  };

  // useEffects
  useEffect(() => {
    if (token?._id === tokenToRemove) {
      handleClose();
    }
  }, [tokenToRemove]);

  // styles
  const styles = {
    card: {
      backgroundColor: theme.card(),
      minWidth: isDesktop ? 500 : 0,
      maxWidth: 500,
      padding: "2%",
      borderRadius: 16,
    },
    title: {
      fontSize: 32,
      fontWeight: 900,
      color: theme.text(),
      marginBottom: 4,
    },
    closeButton: {
      color: theme.iconButton(),
      backgroundColor: theme.cardHover(),
      borderRadius: 100,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      right: 10,
      top: 10,
      transition: "all .3s ease-in-out",
      "&:hover": {
        transform: "scale(1.1)",
        backgroundColor: theme.cardHover(),
      },
    },
    join: {
      minWidth: isDesktop ? 0 : "100%",
      border: `2px solid ${theme.blue()}`,
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
        boxShadow: theme.shadow(),
        transform: "scale(1.1)",
        border: `2px solid ${theme.blue()}`,
      },
    },
    cancel: {
      minWidth: isDesktop ? 0 : "100%",
      border: `2px solid ${theme.text()}`,
      color: theme.text(),
      fontSize: 18,
      textTransform: "none",
      fontWeight: 900,
      borderRadius: 50,
      boxShadow: "0 0",
      transition: "all .3s ease-in-out",
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: theme.text(),
        color: theme.card(),
        boxShadow: theme.shadow(),
        transform: "scale(1.1)",
        border: `2px solid ${theme.text()}`,
      },
    },
    label: {
      fontSize: 20,
      fontWeight: 900,
      color: theme.text(),
    },
    subLabel: {
      fontSize: 20,
      fontWeight: 900,
      color: theme.subText(),
    },
    fee: {
      fontSize: 20,
      fontWeight: 900,
      color: theme.green(),
    },
    rules: {
      fontSize: 16,
      color: theme.text(),
    },
    rulesValue: {
      fontSize: 16,
      color: theme.text(),
      fontWeight: 900,
      textDecoration: "underline",
    },
    rulesHover: {
      transition: "all .2s ease-in-out",
      "&:hover": {
        transform: "scale(1.1)",
        cursor: "pointer",
      },
    },
    consoleOnly: {
      fontSize: 20,
      fontWeight: 900,
      color: theme.red(),
    },
    loading: {
      color: theme.white(),
    },
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ style: styles.card }}
    >
      <DialogTitle sx={styles.title}>
        {handleClose ? (
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={styles.closeButton}
          >
            <CloseIcon sx={{ fontSize: 24 }} />
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
          rowSpacing={{ xs: 3 }}
        >
          <Grid item>
            <Typography style={styles.title}>Join Token</Typography>
          </Grid>

          <Grid item sx={{ width: "100%" }}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              rowSpacing={{ xs: 2 }}
            >
              <Grid item sx={{ width: "100%" }}>
                <Grid
                  container
                  direction="column"
                  justifyContent="start"
                  alignItems="start"
                  rowSpacing={{ xs: 1 }}
                >
                  <Grid item sx={{ width: "100%" }}>
                    <Typography style={styles.label}>Team</Typography>
                  </Grid>
                  <Grid item sx={{ width: "100%" }}>
                    <NewDropdown
                      options={teamOptions()}
                      placeholder="Select team"
                      onChange={(value, teamMembers) =>
                        handleSelectedTeamChange(value, teamMembers)
                      }
                      game={token?.game}
                      team
                      matchType={token?.match_type}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {team == null ? null : (
                <Grid item sx={{ width: "100%" }}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="start"
                    alignItems="center"
                    rowSpacing={{ xs: 1 }}
                  >
                    <Grid item sx={{ width: "100%" }}>
                      <Typography style={styles.label}>Team Members</Typography>
                    </Grid>
                    <Grid item sx={{ width: "100%" }}>
                      <Grid
                        container
                        justifyContent="start"
                        alignItems="center"
                        columnSpacing={{ xs: 1 }}
                      >
                        {teamMembers?.map((user, i) => (
                          <Grid item key={i}>
                            <Chip
                              label={user}
                              sx={{
                                color: theme.text(),
                                backgroundColor: theme.cardHover(),
                                fontSize: 14,
                                fontWeight: 900,
                              }}
                              size="large"
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )}

              <Grid item sx={{ width: "100%" }}>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
                    <Typography style={styles.subLabel}>Game</Typography>
                  </Grid>

                  <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
                    <Typography style={styles.label}>
                      {getGame(token?.game)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item sx={{ width: "100%" }}>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
                    <Typography style={styles.subLabel}>
                      Entry Fee / Player
                    </Typography>
                  </Grid>

                  <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
                    <Typography style={styles.fee}>
                      {numFormatter.format(token?.entry_fee)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item sx={{ width: "100%" }}>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
                    <Typography style={styles.subLabel}>Match Type</Typography>
                  </Grid>

                  <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
                    <Typography style={styles.label}>
                      {getMatchType(token?.match_type)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item sx={{ width: "100%" }}>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
                    <Typography style={styles.subLabel}>Team Size</Typography>
                  </Grid>

                  <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
                    <Typography style={styles.label}>
                      {getSize(token?.team_size)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              {token?.game === "CLASH" ? null : (
                <Grid item sx={{ width: "100%" }}>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
                      <Typography style={styles.subLabel}>Region</Typography>
                    </Grid>

                    <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
                      <Typography style={styles.label}>
                        {token?.region}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}

              {token?.game === "CLASH" ? null : (
                <Grid item sx={{ width: "100%" }}>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
                      <Typography style={styles.subLabel}>First To</Typography>
                    </Grid>

                    <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
                      <Typography style={styles.label}>
                        {getTokenRounds()}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}

              {(token?.game !== "FN" || token?.game != null) &&
              !token?.console_only ? null : (
                <Grid item sx={{ width: "100%" }}>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
                      <Typography style={styles.subLabel}>Platform</Typography>
                    </Grid>

                    <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
                      <Typography style={styles.consoleOnly}>
                        CONSOLE PLAYERS ONLY
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}

              {team == null ? null : teamMembers?.length < 2 ? null : (
                <Grid item sx={{ width: "100%" }}>
                  <Grid
                    container
                    justifyContent="start"
                    alignItems="center"
                    columnSpacing={{ xs: 1 }}
                  >
                    <Grid item alignSelf="end">
                      <Checkbox
                        checked={putUpRed != null}
                        onChange={() =>
                          putUpRed != null
                            ? setPutUpRed(null)
                            : setPutUpRed(store?.user?.username)
                        }
                      />
                    </Grid>
                    <Grid item alignSelf="start">
                      <Typography style={styles.label}>
                        You are covering your teammates entry fee
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}

              <Grid item sx={{ width: "100%" }}>
                <Grid
                  container
                  justifyContent="start"
                  alignItems="center"
                  columnSpacing={{ xs: 1 }}
                >
                  <Grid item>
                    <Typography style={styles.rules}>
                      By joining this token you agree to the token{" "}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sx={styles.rulesHover}
                    onClick={() => navigate("/valorant/support/rules")}
                  >
                    <Typography style={styles.rulesValue}>rules.</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item sx={{ width: "100%" }}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              rowSpacing={{ xs: 2 }}
            >
              <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={styles.cancel}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
                <Button
                  disabled={loading}
                  variant="contained"
                  size="large"
                  sx={styles.join}
                  onClick={handleJoinToken}
                >
                  {loading ? (
                    <CircularProgress size={30} style={styles.loading} />
                  ) : (
                    "Join Token"
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default NewJoinTokenModal;
