import {
  useMediaQuery,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Typography,
  Grid,
  Chip,
  Alert,
  Divider,
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
import useAxios from "../utils/useAxios";
import { joinWager } from "../utils/API";
import { useNavigate, useLocation } from "react-router-dom";
import useSocket from "../utils/useSocket";
import {
  teamOptions,
  getMatchType,
  getCurrentTokenRegion,
} from "../utils/helperMethods";
import NewPrimaryButton from "../custom_components/NewPrimaryButton";
import NewSecondaryButton from "../custom_components/NewSecondaryButton";
import { BiCheck } from "react-icons/bi";

const NewJoinCashMatchModal = (props) => {
  // variables
  const { open, onClose, token, handleClosePasswordModal = () => {} } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const isMobile = useMediaQuery("(max-width:500px)");
  const navigate = useNavigate();
  const api = useAxios();
  const dispatch = useContext(StoreDispatch);
  const { sendJoinEvent, tokenToRemove } = useSocket(token?._id);
  const location = useLocation();
  const isFortnite = location.pathname.startsWith("/fortnite") || location.pathname === 'fortnite'; 
  const isValorant = location.pathname.startsWith("/valorant");
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // state
  const [closeHovered, setCloseHovered] = useState(false);
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
      putUpRed ? store?.user?.username : "",
      token?.game
    ).then((res) => {
      if (!res.error) {
        dispatch({ type: SET_CURRENT_TOKEN, payload: token?._id });
        sendJoinEvent({
          username: store?.user?.username,
          wagerId: token?._id,
        });
        setLoading(false);
        navigate(`/${isValorant ? 'valorant/' : isFortnite ? 'fortnite/' : null}token/${token?._id}`);
        handleClose();
      } else {
        clearFilters();
        setError(res.message);
        setLoading(false);
        return;
      }
    });
  };

  const handleSelectedTeamChange = (teamId, teamMembers) => {
    setTeam(teamId);
    setTeamMembers(teamMembers);
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
    label: {
      fontSize: 15,
      fontWeight: 600,
      color: theme.metaText(),
    },
    value: {
      fontSize: 15,
      fontWeight: 600,
      color: theme.text(),
    },
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ style: styles.card }}
    >
      <DialogTitle sx={styles.title}>
        <Typography style={styles.title}>Join Cash Match</Typography>
        <Typography sx={styles.subtitle}>
          Compete in wager style matches and earn money.
        </Typography>
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
          rowSpacing={{ xs: 3 }}
        >
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
                    <Typography style={styles.label}>Your Team</Typography>
                  </Grid>
                  <Grid item sx={{ width: "100%" }}>
                    <NewDropdown
                      options={teamOptions(
                        store?.user?.userTeams,
                        token?.match_type,
                        "VAL",
                        token?.team_size
                      )}
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
                    gap={{ xs: 1 }}
                  >
                    <Grid item sx={{ width: "100%" }}>
                      <Typography style={styles.label}>
                        Your Team Members
                      </Typography>
                    </Grid>
                    <Grid item sx={{ width: "100%" }}>
                      <Grid
                        container
                        justifyContent="start"
                        alignItems="center"
                        gap={{ xs: 1 }}
                      >
                        {teamMembers?.map((user, i) => (
                          <Grid item key={i}>
                            <Chip
                              label={user}
                              sx={{
                                color: theme.text(),
                                backgroundColor: theme.border(),
                                fontSize: 12,
                                fontWeight: 600,
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
                <Divider sx={{ backgroundColor: theme.border() }} />
              </Grid>

              <Grid item sx={{ width: "100%" }}>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
                    <Typography style={styles.label}>Entry / Player</Typography>
                  </Grid>

                  <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
                    <Typography style={styles.value}>
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
                    <Typography style={styles.label}>Prize / Player</Typography>
                  </Grid>

                  <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
                    <Typography style={styles.value}>
                      {numFormatter.format(token?.entry_fee * 0.9)}
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
                    <Typography style={styles.label}>Map</Typography>
                  </Grid>

                  <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
                    <Typography style={styles.value}>
                      {token?.hasVoting
                        ? "Pick-And-Ban Map"
                        : getMatchType(token?.match_type)}
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
                    <Typography style={styles.label}>Best of</Typography>
                  </Grid>

                  <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
                    <Typography style={styles.value}>
                      {token?.hasVoting ? "3" : "1"}
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
                    <Typography style={styles.label}>Team Size</Typography>
                  </Grid>

                  <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
                    <Typography style={styles.value}>
                      {token?.team_size}v{token?.team_size}
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
                    <Typography style={styles.label}>Region</Typography>
                  </Grid>

                  <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
                    <Typography style={styles.value}>
                      {getCurrentTokenRegion(token?.region)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              {team != null && token?.team_size !== 1 ? (
                <Grid item sx={{ width: "100%", marginTop: 1 }}>
                  <Grid
                    container
                    justifyContent="start"
                    alignItems="center"
                    gap={{ xs: 2 }}
                  >

                    <Grid item>
                      <Typography sx={styles.label}>
                        You are covering your teammates entry fee
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              ) : null}
            </Grid>
          </Grid>

          <Grid item sx={{ width: "100%" }}>
            <Divider sx={{ backgroundColor: theme.border() }} />
          </Grid>

          <Grid item sx={{ width: "100%" }}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              rowSpacing={{ xs: 2 }}
            >
              <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
                <NewSecondaryButton label="cancel" onClick={handleClose} />
              </Grid>
              <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
                <NewPrimaryButton
                  loading={loading}
                  label="accept"
                  onClick={() => (loading ? null : handleJoinToken())}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default NewJoinCashMatchModal;
