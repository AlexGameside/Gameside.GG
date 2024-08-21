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
import { useContext, useEffect, useState } from "react";
import {
  StoreContext,
  StoreDispatch,
  SET_CURRENT_TOKEN,
} from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import CloseIcon from "@mui/icons-material/Close";
import NewDropdown from "./NewDropdown";
import NewInput from "./NewInput";
import { Checkbox } from "semantic-ui-react";
import useAxios from "../utils/useAxios";
import { createWager } from "../utils/API";
import { useNavigate } from "react-router-dom";
import { shouldShowFiveM } from "../utils/gatekeeper";
import {
  fortMatchOptions,
  ValMatchOptions,
  clashMatchOptions,
  fivemMatchOptions,
  fortRegions,
  valRegions,
  fortFirstToOptions,
  fortFirstToRaceOptions,
  valFirstToOptions,
  fivemFirstToOptions,
} from "../utils/helperMethods";

const NewCreateTokenModal = (props) => {
  // variables
  const { open, onClose } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const api = useAxios();
  const dispatch = useContext(StoreDispatch);
  const navigate = useNavigate();
  const gameOptions = shouldShowFiveM(store.user)
    ? [
        { title: "None", value: null },
        { title: "Spectre Divide", value: "FN" },
        { title: "Valorant", value: "VAL" },
        { title: "Clash Royale", value: "CLASH" },
        { title: "FiveM", value: "FIVEM" },
      ]
    : [
        { title: "None", value: null },
        { title: "Spectre Divide", value: "FN" },
        { title: "Valorant", value: "VAL" },
        { title: "Clash Royale", value: "CLASH" },
      ];

  // state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [game, setGame] = useState(null);
  const [entryFee, setEntryFee] = useState(null);
  const [team, setTeam] = useState(null);
  const [matchType, setMatchType] = useState(null);
  const [region, setRegion] = useState(null);
  const [consoleOnly, setConsoleOnly] = useState(false);
  const [rounds, setRounds] = useState(null);
  const [abovePrice, setAbovePrice] = useState(false);
  const [aboveDecimal, setAboveDecimal] = useState(false);
  const [teamMembers, setTeamMembers] = useState(null);
  const [putUpBlue, setPutUpBlue] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showMe, setShowMe] = useState(false);

  // methods
  const clearFilters = () => {
    setEntryFee(null);
    setTeam(null);
    setMatchType(null);
    setRegion(null);
    setConsoleOnly(false);
    setTeamMembers(null);
    setRounds(null);
    setPutUpBlue(null);
    setShowMe(false);
    setPassword(null);
    setShowPassword(false);
    setError(null);
    setLoading(false);
    setGame(null);
  };

  const handleClose = () => {
    clearFilters();
    onClose();
  };

  const determineMatchOptions = (g) => {
    switch (g) {
      case "FN":
        return fortMatchOptions;
      case "VAL":
        return ValMatchOptions;
      case "CLASH":
        return clashMatchOptions;
      case "FIVEM":
        return fivemMatchOptions;
    }
  };

  const determineRegion = (g) => {
    switch (g) {
      case "FN":
        return fortRegions;
      case "VAL":
        return valRegions;
      case "CLASH":
        return fortRegions;
      case "FIVEM":
        return fortRegions;
    }
  };

  const determineRounds = (g) => {
    switch (g) {
      case "FN":
        return matchType === "ARENA_RACE" || matchType === "RACE"
          ? fortFirstToRaceOptions
          : fortFirstToOptions;
      case "VAL":
        if (teamMembers?.length > 3) {
          return [
            { title: "None", value: null },
            { title: "First to 13", value: 13 },
          ];
        }
        return valFirstToOptions;
      case "CLASH":
        return fortFirstToOptions;
      case "FIVEM":
        return fivemFirstToOptions;
    }
  };

  const teamOptions = () => {
    let teamOpts = [{ title: "None", value: null }];
    let userTeams = store?.user?.userTeams;

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

    if (matchType === "PARK") {
      userTeams = userTeams.filter((team) => team?.usernames?.length < 3);
    }
    if (matchType === "VANS") {
      userTeams = userTeams.filter((team) => team?.usernames?.length < 3);
    }

    if (matchType === "BIG_ARENA" || matchType === "STABLES") {
      userTeams = userTeams.filter(
        (team) => team?.usernames?.length < 6 && team?.usernames?.length > 2
      );
    }

    // check val
    if (game === "VAL") {
      userTeams = userTeams?.filter((team) => team?.usernames?.length > 1);
    }

    userTeams?.forEach((team, i) => {
      teamOpts.push({
        title: team?.name,
        value: team?._id,
        teamMembers: team?.usernames,
      });
    });

    return teamOpts;
  };

  const handleSelectedTeamChange = (teamId, teamMembers) => {
    setPutUpBlue(null);
    setShowMe(false);
    setTeam(teamId);
    setTeamMembers(teamMembers);
  };

  const handleCreateToken = () => {
    setError(null);
    setLoading(true);

    const userTeam = store?.user?.userTeams?.find((team) => team?._id === team);

    if (!team) {
      setError("You must select a team!");
      setLoading(false);
      return;
    }

    if (userTeam) {
      if (userTeam?.in_wager) {
        setError("This team is already in a token!");
        setLoading(false);
        return;
      }
    }

    if (entryFee == null || entryFee == "") {
      setError("You must enter a price!");
      setLoading(false);
      return;
    }

    const price = parseFloat(entryFee).toFixed(2);
    const balance = parseFloat(store?.user?.balance);

    if (!price || price === 0) {
      setError("You must enter a price!");
      setLoading(false);
      return;
    }

    if (price > balance) {
      setError("You do not have enough in your balance!");
      setLoading(false);
      return;
    }

    if (price < 0.1) {
      setError("Price must be greater than $0.10!");
      setLoading(false);
      return;
    }

    if (price > 100) {
      setError("Price cannot be above $100!");
      setLoading(false);
      return;
    }

    if (
      game !== "CLASH" &&
      game !== "FIVEM" &&
      (region == null || region == "")
    ) {
      setError("You must select a region!");
      setLoading(false);
      return;
    }

    if (matchType === "" || matchType == null) {
      setError("You must select a match type!");
      setLoading(false);
      return;
    }

    if (store?.currentTokenId) {
      setError("You cannot create a token when you are in one!");
      setLoading(false);
      return;
    }

    if (game === "VAL" && teamMembers?.length > 3 && rounds < 13) {
      setError("You can only play First to 13 rounds on Valorant 4v4 or 5v5.");
      setLoading(false);
      return;
    }

    // create the token
    let tokenData = {
      game,
      entry_fee: entryFee,
      region,
      match_type: matchType,
      teamid: team,
      first_to: rounds,
      console_only: consoleOnly,
      username: store?.user?.username,
      showMe: showMe,
    };
    if (putUpBlue) {
      tokenData.userThatPutUp = store?.user?.username;
    }
    if (password && (password != null || password != "")) {
      tokenData.password = password;
    }

    createWager(api, tokenData).then((res) => {
      if (!res) {
        setLoading(false);
        setError("Could not create token!");
        return;
      }

      if (!res.error) {
        setLoading(false);
        dispatch({ type: SET_CURRENT_TOKEN, payload: res?.wager?._id });
        // navigate to the new token
        navigate(`/token/${res?.wager?._id}`);
        handleClose();
      } else {
        setLoading(false);
        setError(
          typeof res?.message === "string"
            ? res.message
            : "Could not create token!"
        );
        return;
      }
    });
  };

  // useEffects
  useEffect(() => {
    setTeam(null);
    setEntryFee("");
    setMatchType(null);
    setRegion(null);
    setConsoleOnly(false);
    setTeamMembers(null);
    setRounds(null);
    setPutUpBlue(null);
    setShowMe(false);
    setPassword("");
    setShowPassword(false);
    setError(null);
    setLoading(false);
  }, [game]);

  useEffect(() => {
    setTeamMembers(null);
    setTeam(null);
  }, [matchType]);

  useEffect(() => {
    setPutUpBlue(null);
  }, [team]);

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
    create: {
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
    selected: {
      minWidth: isDesktop ? 0 : "100%",
      border: `2px solid ${theme.green()}`,
      color: theme.white(),
      fontSize: 18,
      textTransform: "none",
      fontWeight: 900,
      borderRadius: 50,
      boxShadow: "0 0",
      transition: "all .3s ease-in-out",
      backgroundColor: theme.green(),
      "&:hover": {
        backgroundColor: theme.green(),
        boxShadow: theme.shadow(),
        transform: "scale(1.1)",
        border: `2px solid ${theme.green()}`,
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
    unselected: {
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
        backgroundColor: theme.green(),
        color: theme.white(),
        boxShadow: theme.shadow(),
        transform: "scale(1.1)",
        border: `2px solid ${theme.green()}`,
      },
    },
    loading: {
      color: theme.white(),
    },
    label: {
      fontSize: 18,
      fontWeight: 900,
      color: theme.text(),
    },
    teamMembers: {
      fontSize: 18,
      fontWeight: 900,
      color: theme.green(),
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
            <Typography style={styles.title}>Create Token</Typography>
          </Grid>

          <Grid item sx={{ width: "100%" }}>
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
                  justifyContent="start"
                  alignItems="start"
                  rowSpacing={{ xs: 1 }}
                >
                  <Grid item sx={{ width: "100%" }}>
                    <Typography style={styles.label}>Game</Typography>
                  </Grid>
                  <Grid item sx={{ width: "100%" }}>
                    <NewDropdown
                      options={gameOptions}
                      placeholder="Select a game"
                      onChange={(value) => setGame(value)}
                    />
                  </Grid>
                </Grid>
              </Grid>

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
                        <Typography style={styles.label}>
                          Entry Fee Per Player (USD)
                        </Typography>
                      </Grid>
                      <Grid item sx={{ width: "100%" }}>
                        <NewInput
                          placeholder="Price"
                          onChange={(value) => {
                            setAbovePrice(false);
                            setAboveDecimal(false);
                            if (parseFloat(value) > 100) {
                              setAbovePrice(true);
                              return;
                            }
                            if (value?.toString()?.split(".")[1]?.length > 2) {
                              setAboveDecimal(true);
                              return;
                            }
                            if (abovePrice) {
                              return;
                            }
                            if (aboveDecimal) {
                              return;
                            }
                            setEntryFee(value);
                          }}
                          value={entryFee}
                          type="number"
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  {game === "CLASH" || game === "FIVEM" ? null : (
                    <Grid item sx={{ width: "100%" }}>
                      <Grid
                        container
                        direction="column"
                        justifyContent="start"
                        alignItems="start"
                        rowSpacing={{ xs: 1 }}
                      >
                        <Grid item sx={{ width: "100%" }}>
                          <Typography style={styles.label}>Region</Typography>
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
                        <Typography style={styles.label}>Match Type</Typography>
                      </Grid>
                      <Grid item sx={{ width: "100%" }}>
                        <NewDropdown
                          options={determineMatchOptions(game)}
                          placeholder="Select match type"
                          onChange={(value) => setMatchType(value)}
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
                        <Typography style={styles.label}>Team</Typography>
                      </Grid>
                      <Grid item sx={{ width: "100%" }}>
                        <NewDropdown
                          options={teamOptions()}
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
                        rowSpacing={{ xs: 1 }}
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
                            columnSpacing={{ xs: 1 }}
                          >
                            {teamMembers?.map((user, i) => (
                              <Grid item key={i}>
                                <Chip
                                  label={user}
                                  sx={{
                                    color: theme.text(),
                                    backgroundColor: theme.border(),
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

                  {game === "CLASH" ? null : (
                    <Grid item sx={{ width: "100%" }}>
                      <Grid
                        container
                        direction="column"
                        justifyContent="start"
                        alignItems="center"
                        rowSpacing={{ xs: 1 }}
                      >
                        <Grid item sx={{ width: "100%" }}>
                          <Typography style={styles.label}>Rounds</Typography>
                        </Grid>
                        <Grid item sx={{ width: "100%" }}>
                          <NewDropdown
                            options={determineRounds(game)}
                            placeholder="Select rounds"
                            onChange={(value) => setRounds(value)}
                            game={game}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  )}

                  {game === "FN" ? (
                    <Grid item sx={{ width: "100%" }}>
                      <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                        rowSpacing={{ xs: 1 }}
                      >
                        <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
                          <Button
                            variant="contained"
                            size="small"
                            sx={
                              consoleOnly ? styles.unselected : styles.selected
                            }
                            onClick={() => setConsoleOnly(false)}
                          >
                            All Platforms
                          </Button>
                        </Grid>
                        <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
                          <Button
                            variant="contained"
                            size="small"
                            sx={
                              consoleOnly ? styles.selected : styles.unselected
                            }
                            onClick={() => setConsoleOnly(true)}
                          >
                            Console Only
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  ) : null}

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
                            checked={putUpBlue != null}
                            onChange={() =>
                              putUpBlue != null
                                ? setPutUpBlue(null)
                                : setPutUpBlue(store?.user?.username)
                            }
                          />
                        </Grid>
                        <Grid item alignSelf="start">
                          <Typography style={styles.label}>
                            Put up for teammates
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}

                  {game === "FIVEM" ? (
                    <Grid item sx={{ width: "100%" }}>
                      <Grid
                        container
                        justifyContent="start"
                        alignItems="center"
                        columnSpacing={{ xs: 1 }}
                      >
                        <Grid item alignSelf="end">
                          <Checkbox
                            checked={showMe}
                            onChange={() => setShowMe(!showMe)}
                          />
                        </Grid>
                        <Grid item alignSelf="start">
                          <Typography style={styles.label}>
                            Show my username on the tokens page
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  ) : null}

                  <Grid item sx={{ width: "100%" }}>
                    <Grid
                      container
                      justifyContent="start"
                      alignItems="center"
                      columnSpacing={{ xs: 1 }}
                    >
                      <Grid item alignSelf="end">
                        <Checkbox
                          onChange={() => {
                            setShowPassword(!showPassword);
                            setPassword(null);
                          }}
                          checked={showPassword}
                        />
                      </Grid>
                      <Grid item alignSelf="start">
                        <Typography style={styles.label}>
                          Make match private with password
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
                  variant="contained"
                  size="large"
                  sx={styles.create}
                  onClick={handleCreateToken}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={30} style={styles.loading} />
                  ) : (
                    "Create Token"
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

export default NewCreateTokenModal;
