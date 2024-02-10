import {
  SET_CURRENT_TOKEN,
  StoreContext,
  StoreDispatch,
} from "../context/NewStoreContext";
import createTheme from "../utils/theme";
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
} from "@mui/material";
import { useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import NewInput from "./NewInput";
import useAxios from "../utils/useAxios";
import NewDropdown from "./NewDropdown";
import {
  determineRegion,
  determineMatchOptions,
  determineTeamSizeOptions,
  teamOptions,
  rankOptions,
} from "../utils/helperMethods";
import { BiPlus, BiX } from "react-icons/bi";
import { createWager } from "../utils/API";
import { useNavigate } from "react-router-dom";
import NewPrimaryButton from "../custom_components/NewPrimaryButton";
import NewSecondaryButton from "../custom_components/NewSecondaryButton";
import BubbleButton from "../custom_components/BubbleButton";

const NewCreateScrimModal = (props) => {
  // variables
  const { onClose, open } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const dispatch = useContext(StoreDispatch);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const isMobile = useMediaQuery("(max-width:500px)");
  const api = useAxios();
  const navigate = useNavigate();

  // state
  const [closeHovered, setCloseHovered] = useState(false);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [game, _] = useState("VAL");
  const [region, setRegion] = useState(null);
  const [matchType, setMatchType] = useState(null);
  const [teamSize, setTeamSize] = useState(null);
  const [team, setTeam] = useState(null);
  const [teamMembers, setTeamMembers] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showMe, setShowMe] = useState(true);
  const [chooseMap, setChooseMap] = useState(false);
  const [rank, setRank] = useState(false);

  // methods
  const handleClose = () => {
    setError(null);
    setTeam(null);
    setTeamMembers(null);
    setRegion(null);
    setLoading(false);
    setPassword("");
    setShowPassword(false);
    onClose();
  };

  const handleSelectedTeamChange = (teamId, teamMembers) => {
    setShowMe(false);
    setTeam(teamId);
    setTeamMembers(teamMembers);
  };

  const handleCreateScrim = () => {
    setError(null);
    setLoading(true);

    const userTeam = store?.user?.userTeams?.find((team) => team?._id === team);

    if (!team) {
      setError("Please select a team.");
      setLoading(false);
      return;
    }

    if (userTeam) {
      if (userTeam?.in_wager) {
        setError("This team is already in a match.");
        setLoading(false);
        return;
      }
    }

    if (!region) {
      setError("You must select a region!");
      setLoading(false);
      return;
    }

    if (!matchType && chooseMap) {
      setError("You must select a map!");
      setLoading(false);
      return;
    }

    let scrimData = {
      game,
      entry_fee: 0,
      region,
      match_type: matchType ?? "VOTE",
      teamid: team,
      first_to: 13,
      console_only: false,
      username: store?.user?.userame,
      showMe: true,
      isScrimMatch: true,
      hasVoting: matchType == null && !chooseMap ? true : false,
      rank,
    };

    if (password && (password != null || password != "")) {
      scrimData.password = password;
    }

    createWager(api, scrimData).then((res) => {
      if (!res?.error) {
        setLoading(false);
        dispatch({ type: SET_CURRENT_TOKEN, payload: res?.wager?._id });
        navigate(`/valorant/token/${res?.wager?._id}`);
        handleClose();
      } else {
        setLoading(false);
        setError(res?.message);
      }
      return;
    });
  };

  // effects

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
      fontSize: 14,
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
        <Typography style={styles.title}>Create Scrim</Typography>
        <Typography sx={styles.subtitle}>
          Free to enter competitive scrims.
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
              gap={{ xs: 2 }}
            >
              {game == null ? null : (
                <>
                  <Grid item sx={{ width: "100%" }}>
                    <Grid
                      container
                      direction="column"
                      justifyContent="start"
                      alignItems="start"
                      rowSpacing={{ xs: 1 }}
                    >
                      <Grid item sx={{ width: "100%" }}>
                        <Typography style={styles.label}>Region*</Typography>
                      </Grid>
                      <Grid item sx={{ width: "100%" }}>
                        <NewDropdown
                          options={determineRegion(game)}
                          placeholder="Select region"
                          onChange={(value) => setRegion(value)}
                          game={game}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item sx={{ width: "100%" }}>
                    <Grid
                      container
                      direction="column"
                      justifyContent="start"
                      alignItems="start"
                      rowSpacing={{ xs: 1 }}
                    >
                      <Grid item sx={{ width: "100%" }}>
                        <Typography style={styles.label}>Team Size*</Typography>
                      </Grid>
                      <Grid item sx={{ width: "100%" }}>
                        <NewDropdown
                          options={determineTeamSizeOptions(game)}
                          placeholder="Choose Size"
                          onChange={(value) => {
                            setTeamSize(value);
                            setTeam(null);
                            setTeamMembers([]);
                          }}
                          game={game}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item sx={{ width: "100%" }}>
                    <Grid
                      container
                      direction="column"
                      justifyContent="start"
                      alignItems="start"
                      rowSpacing={{ xs: 1 }}
                    >
                      <Grid item sx={{ width: "100%" }}>
                        <Typography style={styles.label}>Team*</Typography>
                      </Grid>
                      <Grid item sx={{ width: "100%" }}>
                        <NewDropdown
                          options={teamOptions(
                            store?.user?.userTeams,
                            matchType,
                            game,
                            teamSize
                          )}
                          placeholder="Select team"
                          onChange={(value, teamMembers) =>
                            handleSelectedTeamChange(value, teamMembers)
                          }
                          game={game}
                          team
                          matchType={matchType}
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
                            Team Members
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
                                    fontSize: 14,
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
                    <Grid
                      container
                      direction="column"
                      justifyContent="start"
                      alignItems="start"
                      rowSpacing={{ xs: 1 }}
                    >
                      <Grid item sx={{ width: "100%" }}>
                        <Typography style={styles.label}>Map*</Typography>
                      </Grid>
                      <Grid item sx={{ width: "100%" }}>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justifyContent="start"
                          columnSpacing={{ xs: 2 }}
                        >
                          <Grid item>
                            <BubbleButton
                              title={"Vote For Maps (Best of 3)"}
                              selected={chooseMap === false}
                              onClick={() => {
                                setMatchType(null);
                                setChooseMap(false);
                              }}
                              size="small"
                            />
                          </Grid>
                          <Grid item>
                            <BubbleButton
                              title={"Choose a Map (Best of 1)"}
                              selected={chooseMap === true}
                              onClick={() => {
                                setMatchType(null);
                                setChooseMap(true);
                              }}
                              size="small"
                            />
                          </Grid>
                        </Grid>
                      </Grid>

                      {chooseMap ? (
                        <Grid item sx={{ width: "100%" }}>
                          <NewDropdown
                            options={determineMatchOptions(game)}
                            placeholder="Select map"
                            onChange={(value) => setMatchType(value)}
                            game={game}
                          />
                        </Grid>
                      ) : null}
                    </Grid>
                  </Grid>

                  <Grid item sx={{ width: "100%" }}>
                    <Grid
                      container
                      direction="column"
                      justifyContent="start"
                      alignItems="start"
                      rowSpacing={{ xs: 1 }}
                    >
                      <Grid item sx={{ width: "100%" }}>
                        <Typography style={styles.label}>Rank*</Typography>
                      </Grid>
                      <Grid item sx={{ width: "100%" }}>
                        <NewDropdown
                          options={rankOptions}
                          placeholder="Select rank"
                          onChange={(value) => setRank(value)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    sx={{
                      width: "100%",
                      marginTop: 2,
                      marginBottom: 1,
                      transition: "all .2s ease-in-out",
                      borderRadius: 2,
                      padding: 1,
                      "&:hover": {
                        cursor: "pointer",
                        backgroundColor: theme.cardHover(),
                      },
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Grid
                      container
                      justifyContent="start"
                      alignItems="center"
                      gap={{ xs: 2 }}
                    >
                      <Grid
                        item
                        alignSelf="end"
                        sx={{
                          height: 40,
                          width: 40,
                          borderRadius: 100,
                          backgroundColor: theme.iconButton(),
                          position: "relative",
                          transition: "all .2s ease-in-out",
                          "&:hover": {
                            cursor: "pointer",
                            backgroundColor: theme.border(),
                          },
                        }}
                      >
                        {showPassword ? (
                          <BiX
                            style={{
                              fontSize: 20,
                              color: theme.icon(),
                              marginTop: 10,
                              marginLeft: 10,
                            }}
                          />
                        ) : (
                          <BiPlus
                            style={{
                              fontSize: 20,
                              color: theme.icon(),
                              marginTop: 10,
                              marginLeft: 10,
                            }}
                          />
                        )}
                      </Grid>

                      <Grid item>
                        <Typography style={styles.label}>
                          {showPassword
                            ? "Remove Password"
                            : "Add Password (Optional)"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  {showPassword ? (
                    <Grid item sx={{ width: "100%" }}>
                      <Grid
                        container
                        direction="column"
                        justifyContent="start"
                        alignItems="start"
                        rowSpacing={{ xs: 1 }}
                      >
                        <Grid item sx={{ width: "100%" }}>
                          <Typography style={styles.label}>
                            Match Password
                          </Typography>
                        </Grid>
                        <Grid item sx={{ width: "100%" }}>
                          <NewInput
                            placeholder="Password"
                            onChange={setPassword}
                            value={password}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  ) : null}
                </>
              )}
            </Grid>
          </Grid>

          <Grid item sx={{ width: "100%" }}>
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              gap={{ xs: 1 }}
            >
              <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
                <NewSecondaryButton label="cancel" onClick={handleClose} />
              </Grid>

              <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
                <NewPrimaryButton
                  label="create"
                  loading={loading}
                  onClick={handleCreateScrim}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default NewCreateScrimModal;
