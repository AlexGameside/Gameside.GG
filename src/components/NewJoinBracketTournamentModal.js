import {
  useMediaQuery,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Typography,
  Grid,
  Alert,
  Chip,
  Divider,
} from "@mui/material";
import { useContext, useState } from "react";
import {
  SET_USER,
  StoreContext,
  StoreDispatch,
} from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import CloseIcon from "@mui/icons-material/Close";
import NewDropdown from "./NewDropdown";
import useAxios from "../utils/useAxios";
import {
  getGame,
  getColorForGame,
  getMatchType,
  getTournamentDate,
} from "../utils/helperMethods";
import { joinBracketTournament } from "../utils/API";
import { teamOptions } from "../utils/helperMethods";
import NewPrimaryButton from "../custom_components/NewPrimaryButton";
import NewSecondaryButton from "../custom_components/NewSecondaryButton";

const NewJoinBracketTournamentModal = (props) => {
  // variables
  const { open, onClose, tournament, setSuccess } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isMobile = useMediaQuery("(max-width:500px)");
  const api = useAxios();
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const dispatch = useContext(StoreDispatch);

  // state
  const [closeHovered, setCloseHovered] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [team, setTeam] = useState(null);
  const [teamMembers, setTeamMembers] = useState(null);

  // methods
  const handleClose = () => {
    setError(null);
    setLoading(false);
    setTeam(null);
    setTeamMembers(null);
    onClose();
  };

  const handleSelectedTeamChange = (teamId, teamMembers) => {
    setTeam(teamId);
    setTeamMembers(teamMembers);
  };

  const handleRegister = () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    if (!team) {
      setError("You must select a team!");
      setLoading(false);
      return;
    }
    joinBracketTournament(api, tournament?._id, team, false).then((res) => {
      if (!res?.error) {
        setLoading(false);
        setSuccess(res?.message);
        let newUserData = store.user;
        newUserData?.user_tournaments?.upcoming?.push(res?.tournament);
        dispatch({ type: SET_USER, payload: newUserData });
        handleClose();
      } else {
        setLoading(false);
        setError(res?.message);
        return;
      }
    });
  };

  // effects

  // styles
  const styles = {
    card: {
      backgroundColor: theme.card(),
      minWidth: isMobile ? "95%" : 450,
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
    optionLabel: {
      fontSize: 15,
      fontWeight: 600,
      color: theme.text(),
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
        <Typography style={styles.title}>Register</Typography>
        <Typography style={styles.subtitle}>
          Register for: {tournament?.title}
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
                    <Typography style={styles.optionLabel}>Team*</Typography>
                  </Grid>
                  <Grid item sx={{ width: "100%" }}>
                    <NewDropdown
                      options={teamOptions(
                        store?.user?.userTeams,
                        tournament?.match_type,
                        tournament?.game,
                        tournament?.team_size
                      )}
                      placeholder="Select team"
                      onChange={(value, teamMembers) =>
                        handleSelectedTeamChange(value, teamMembers)
                      }
                      game={tournament?.game}
                      team
                      matchType={tournament?.match_type}
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
                      <Typography style={styles.optionLabel}>
                        Team Members
                      </Typography>
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
                  <Grid item>
                    <Typography style={styles.label}>Start Date</Typography>
                  </Grid>

                  <Grid item>
                    <Typography style={styles.value}>
                      {getTournamentDate(tournament?.start_date)}
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
                  <Grid item>
                    <Typography style={styles.label}>Game</Typography>
                  </Grid>

                  <Grid item>
                    <Typography
                      style={{
                        ...styles.value,
                        color: getColorForGame(tournament?.game),
                      }}
                    >
                      {getGame(tournament?.game)}
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
                  <Grid item>
                    <Typography style={styles.label}>Team Size</Typography>
                  </Grid>

                  <Grid item>
                    <Typography style={styles.value}>
                      {tournament?.team_size}v{tournament?.team_size}
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
                  <Grid item>
                    <Typography style={styles.label}>
                      Entry Fee / Player
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography style={styles.value}>
                      {tournament?.entry_fee == null ||
                      tournament?.entry_fee === 0
                        ? "Free Entry"
                        : numFormatter.format(tournament?.entry_fee)}
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
                  <Grid item>
                    <Typography style={styles.label}>Prize Pool</Typography>
                  </Grid>

                  <Grid item>
                    <Typography
                      style={{ ...styles.value, color: theme.green() }}
                    >
                      {numFormatter.format(tournament?.prize)}
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
                  <Grid item>
                    <Typography style={styles.label}>Region</Typography>
                  </Grid>

                  <Grid item>
                    <Typography style={styles.value}>
                      {tournament?.region}
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
                  <Grid item>
                    <Typography style={styles.label}>Match Type</Typography>
                  </Grid>

                  <Grid item>
                    <Typography style={styles.value}>
                      {getMatchType(tournament?.match_type)}
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
                  <Grid item>
                    <Typography style={styles.label}>First To</Typography>
                  </Grid>

                  <Grid item>
                    <Typography style={styles.value}>
                      {tournament?.first_to}
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
                  <Grid item>
                    <Typography style={styles.label}>Format</Typography>
                  </Grid>

                  <Grid item>
                    <Typography style={styles.value}>
                      {tournament?.format === 1 ? "Single Elim" : "Double Elim"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item sx={{ width: "100%" }}>
                <Divider sx={{ backgroundColor: theme.border() }} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item sx={{ width: "100%" }}>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item alignSelf="start">
                <NewSecondaryButton label="cancel" onClick={handleClose} />
              </Grid>

              <Grid item alignSelf="end">
                <NewPrimaryButton
                  label="register"
                  onClick={handleRegister}
                  loading={loading}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default NewJoinBracketTournamentModal;
