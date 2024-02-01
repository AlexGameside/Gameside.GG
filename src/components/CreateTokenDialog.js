import {
  Grid,
  Button,
  DialogTitle,
  DialogActions,
  Dialog,
  DialogContent,
  Alert,
  CircularProgress,
  Typography,
  Divider,
  FormGroup,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import {
  GlobalStateContext,
  GlobalDispatchContext,
  SET_CURRENT_WAGER,
} from "../context/StoreContext";
import constants from "../utils/constants";
import { useContext, useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
import { getUserTeams, createWager } from "../utils/API";
import { useNavigate, useLocation } from "react-router-dom";
import { Dropdown, Input, Label } from "semantic-ui-react";
import { useMediaQuery } from "@mui/material";

const CreateTokenDialog = (props) => {
  const selectOptions = {
    "& .MuiListItem-root.Mui-selected, .MuiListItem-root.Mui-selected:hover": {
      backgroundColor: "red",
    },
  };

  const styles = {
    button: {
      border: `2px solid ${constants.newBlue}`,
      width: "100%",
      color: constants.white,
      fontWeight: 900,
      borderRadius: 3,
      boxShadow: "0 0",
      backgroundColor: constants.newBlue,
      "&:hover": {
        backgroundColor: constants.newBlue,
        opacity: 0.7,
        color: constants.white,
        boxShadow: "0 0",
      },
      transition: "0.3s",
    },
    cancelButton: {
      width: "100%",
      border: `2px solid ${constants.newGray}`,
      color: constants.newGray,
      fontWeight: 900,
      borderRadius: 3,
      boxShadow: "0 0",
      backgroundColor: constants.white,
      "&:hover": {
        backgroundColor: constants.newGray,
        color: constants.white,
        boxShadow: "0 0",
      },
      transition: "0.3s",
    },
    consoleOnlyOptionUnselected: {
      border: `2px solid ${constants.newBlue}`,
      color: constants.newBlue,
      fontWeight: 900,
      borderRadius: 6,
      fontSize: 12,
      boxShadow: "0 0",
      backgroundColor: constants.white,
      "&:hover": {
        backgroundColor: constants.white,
        color: constants.newBlue,
        boxShadow: "0 0",
      },
      transition: "0.3s",
    },
    consoleOnlyOptionSelected: {
      border: `2px solid ${constants.newBlue}`,
      color: constants.white,
      fontWeight: 900,
      borderRadius: 6,
      fontSize: 12,
      boxShadow: "0 0",
      backgroundColor: constants.newBlue,
      "&:hover": {
        backgroundColor: constants.newBlue,
        color: constants.white,
        boxShadow: "0 0",
      },
      transition: "0.3s",
    },
    select: {
      border: `2px solid ${constants.newBlue}`,
      borderRadius: 10,
      color: constants.newBlue,
      padding: 10,
      fontWeight: 900,
      width: "100%",
      fontSize: 16,
      color: constants.newBlue,
    },
    filterSelect: {
      border: `2px solid ${constants.newBlue}`,
      borderRadius: 10,
      color: constants.newBlue,
      fontWeight: 900,
      width: "30%",
      fontSize: 12,
      color: constants.newBlue,
    },
    label: {
      color: constants.newGray,
      fontSize: 20,
      fontWeight: 500,
      marginBottom: 1,
    },
    wagerDetail: {
      color: constants.newGray,
      fontSize: 18,
      fontWeight: 500,
    },
    wagerDetailValue: {
      color: constants.newBlue,
      fontWeight: 900,
    },
  };

  const MenuProps = {
    PaperProps: {
      style: {},
    },
  };

  MenuProps.PaperProps.className = selectOptions;

  const navigate = useNavigate();
  const store = useContext(GlobalStateContext);
  const api = useAxios();
  const { user } = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);
  const { open, onClose } = props;
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [region, setRegion] = useState("");
  const [matchType, setMatchType] = useState("");
  const [rounds, setRounds] = useState(5);
  const [consoleOnly, setConsoleOnly] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState(null);

  // error states
  const [errors, setErrors] = useState(null);
  const [teamError, setTeamError] = useState(false);
  const [teamErrorMessage, setTeamErrorMessage] = useState(null);
  const [priceError, setPriceError] = useState(false);
  const [priceErrorMessage, setPriceErrorMessage] = useState(null);
  const [abovePrice, setAbovePrice] = useState(false);

  // select options
  const [teamMembers, setTeamMembers] = useState([]);
  const [putUpBlue, setPutUpBlue] = useState(null);
  const matches = useMediaQuery("(min-width:900px)");
  const location = useLocation();
  const isFortnite = location.pathname.startsWith("/fortnite") || location.pathname === 'fortnite'; 
  const isValorant = location.pathname.startsWith("/valorant");


  const handleSelectedTeamChange = (e) => {
    setTeamError(false);
    setTeamErrorMessage(null);
    getTeamMembers(e.value);
    setSelectedTeam(e.value);
  };

  const handleOnSubmit = () => {
    setLoading(true);
    const userTeam = store?.userTeams?.find(
      (team) => team?._id === selectedTeam
    );

    // team errors
    if (!selectedTeam) {
      setTeamError(true);
      setTeamErrorMessage("You must select a team!");
      setLoading(false);
      return;
    }

    if (userTeam) {
      if (userTeam?.in_wager) {
        setTeamError(true);
        setTeamErrorMessage("This team is already in a wager!");
        setLoading(false);
        return;
      }

      // handle only allowing solo teams for pg
      if (matchType === "PG") {
        if (userTeam?.usernames?.length > 1) {
          setTeamError(true);
          setTeamErrorMessage(
            "You can only select a solo team for PG matches!"
          );
          setLoading(false);
          return;
        }
      }

      if (matchType === "ARENA_RACE") {
        if (userTeam?.usernames?.length > 1) {
          setTeamError(true);
          setTeamErrorMessage("You can only do 1v1s for Arena Kill Races!");
          setLoading(false);
          return;
        }
      }

      if (matchType === "RACE") {
        if (userTeam?.usernames?.length > 2) {
          setTeamError(true);
          setTeamErrorMessage("You can only select 1v1 or 2v2 for Kill Race!");
          setLoading(false);
          return;
        }
      }
    }

    // price errors
    const price = parseFloat(selectedPrice).toFixed(2);
    const balance = parseFloat(user?.balance);

    if (!price || price === 0) {
      setPriceError(true);
      setPriceErrorMessage("You must enter a price!");
      setLoading(false);
      return;
    }
    if (price > balance) {
      setPriceError(true);
      setPriceErrorMessage("You do not have enough in your balance!");
      setLoading(false);
      return;
    }

    if (price < 0.1) {
      setPriceError(true);
      setPriceErrorMessage("Price must be greater than $0.10!");
      setLoading(false);
      return;
    }

    if (price > 100) {
      setPriceError(true);
      setPriceErrorMessage("Price cannot be above $99!");
      setLoading(false);
      return;
    }

    if (region === "") {
      setErrors("You must select a region!");
      setLoading(false);
      return;
    }

    if (matchType === "") {
      setErrors("You must select a match type!");
      setLoading(false);
      return;
    }

    if (store?.currentWagerId != null) {
      setErrors("You cannot create a wager when you are in one!");
      setLoading(false);
      return;
    }

    // create token
    let tokenData = {
      entry_fee: selectedPrice,
      region: region,
      match_type: matchType,
      teamid: selectedTeam,
      first_to: rounds,
      console_only: consoleOnly,
      username: user?.username,
    };
    if (putUpBlue) {
      tokenData.userThatPutUp = user?.username;
    }
    if (password != null || password != "") {
      tokenData.password = password;
    }

    createWager(api, tokenData).then((res) => {
      if (!res) {
        setLoading(false);
        setErrors("Could not create token");
      }

      if (!res.error) {
        setLoading(false);
        dispatch({ type: SET_CURRENT_WAGER, payload: res.wager });
        navigate(`/token/${isValorant ? 'valorant/' : isFortnite ? 'fortnite/' : null}${res?.wager?._id}`, {
          state: {
            wager: res?.wager?._id,
          },
        });
        return;
      }
      setLoading(false);
      setErrors(res?.message);
    });
  };

  const getTeamMembers = (teamId) => {
    setLoading(true);
    const newTeam = store?.userTeams?.filter((team) => team?._id === teamId);
    setTeamMembers(newTeam[0]?.usernames);
    setLoading(false);
  };

  const roundOptions = () => {
    if (matchType === "RACE" || matchType === "ARENA_RACE") {
      return [
        { key: 1, text: "First to 1", value: 1 },
        { key: 3, text: "First to 3", value: 3 },
      ];
    } else {
      return [
        { key: 1, text: "First to 3", value: 3 },
        { key: 2, text: "First to 5", value: 5 },
        { key: 3, text: "First to 7", value: 7 },
      ];
    }
  };
  const handleClose = () => {
    setPassword(null);
    setShowPasswordInput(false);
    setPutUpBlue(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={{ borderRadius: 3 }}>
      <DialogTitle
        sx={{ fontWeight: 900, fontSize: 28, color: constants.newGray }}
      >
        Create Token
      </DialogTitle>
      <DialogContent sx={{ width: matches ? 600 : "100%" }}>
        {!errors ? null : (
          <Alert sx={{ marginBottom: 2 }} severity="error">
            {errors}
          </Alert>
        )}
        {!teamError ? null : (
          <Alert sx={{ marginBottom: 2 }} severity="error">
            {teamErrorMessage}
          </Alert>
        )}
        {!priceError ? null : (
          <Alert sx={{ marginBottom: 2 }} severity="error">
            {priceErrorMessage}
          </Alert>
        )}
        <Grid
          container
          direction="column"
          rowSpacing={{ xs: 1, sm: 2 }}
          justifyContent="center"
          alignItems="start"
        >
          <Grid item sx={{ width: "100%" }}>
            <Typography sx={styles.label}>Select Team</Typography>
            <Dropdown
              placeholder="Select Team"
              style={styles.select}
              selection
              options={store?.teamOptions}
              onChange={(e, data) => {
                handleSelectedTeamChange(data);
              }}
            />
          </Grid>
          <Grid item>
            <Typography sx={styles.wagerDetail}>
              Your Team Member(s):{" "}
              {teamMembers?.map((member, i) => (
                <span style={styles.wagerDetailValue}>{` ${member}${
                  i === teamMembers.length - 1 ? "" : ","
                }`}</span>
              ))}
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={styles.label}>Tokens Per Player</Typography>
            <Input labelPosition="left" type="number" placeholder="Amount">
              <Label basic>$</Label>
              <input
                onChange={(e) => {
                  setAbovePrice(false);
                  if (abovePrice) {
                    return;
                  }
                  if (parseFloat(e.target.value) > 100) {
                    setAbovePrice(true);
                    return;
                  }
                  setSelectedPrice(e.target.value);
                }}
                value={selectedPrice}
              />
            </Input>
          </Grid>
          {teamMembers?.length < 2 ? null : (
            <Grid item>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() =>
                        putUpBlue != null
                          ? setPutUpBlue(null)
                          : setPutUpBlue(user?.username)
                      }
                      size="large"
                      color="error"
                    />
                  }
                  label={
                    <Typography sx={styles.label}>
                      Put Up For Teammates
                    </Typography>
                  }
                />
              </FormGroup>
            </Grid>
          )}
          <Grid item>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => {
                      setShowPasswordInput(!showPasswordInput);
                      setPassword(null);
                    }}
                    size="large"
                    color="error"
                  />
                }
                label={
                  <Typography sx={styles.label}>
                    Make Match Private With Password
                  </Typography>
                }
              />
            </FormGroup>
          </Grid>
          {!showPasswordInput ? null : (
            <Grid item>
              <Input labelPosition="left" placeholder="Password">
                <Label basic>Password</Label>
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                />
              </Input>
            </Grid>
          )}
          <Grid item sx={{ width: "100%" }}>
            <Typography sx={styles.label}>
              Region, Match Type, Rounds, and Platform
            </Typography>
            <Grid
              container
              direction="row"
              sx={{ width: "100%" }}
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item>
                <Dropdown
                  selection
                  options={[
                    { key: 0, text: "NONE", value: "" },
                    { key: 1, text: "NAE", value: "NAE" },
                    { key: 2, text: "EU", value: "EU" },
                    { key: 3, text: "NAW", value: "NAW" },
                    { key: 4, text: "OCE", value: "OCE" },
                  ]}
                  placeholder="Region"
                  style={styles.filterSelect}
                  onChange={(e, data) => {
                    setRegion(data.value);
                    setErrors("");
                  }}
                />
              </Grid>
              <Grid item>
                <Dropdown
                  selection
                  placeholder="Match Type"
                  style={styles.filterSelect}
                  options={[
                    { key: 0, text: "NONE", value: "" },
                    { key: 1, text: "Zone Wars", value: "ZW" },
                    { key: 2, text: "Realistics", value: "REAL" },
                    { key: 3, text: "Boxfights", value: "BOX" },
                    { key: 4, text: "PG/Build Fights", value: "PG" },
                    { key: 5, text: "Arena Kill Race", value: "ARENA_RACE" },
                    { key: 6, text: "Public Kill Race", value: "RACE" },
                  ]}
                  onChange={(e, data) => {
                    setMatchType(data.value);
                    setErrors(null);
                  }}
                />
              </Grid>
              <Grid item>
                <Dropdown
                  selection
                  placeholder="Rounds"
                  style={styles.filterSelect}
                  value={rounds}
                  options={roundOptions()}
                  onChange={(e, data) => setRounds(data.value)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              sx={{ width: "100%" }}
            >
              <Grid item>
                <Button
                  sx={
                    consoleOnly
                      ? styles.consoleOnlyOptionUnselected
                      : styles.consoleOnlyOptionSelected
                  }
                  size="large"
                  variant="contained"
                  disabled={loading}
                  onClick={() => setConsoleOnly(false)}
                >
                  All Platforms
                </Button>
              </Grid>
              <Grid item>
                <Button
                  sx={
                    consoleOnly
                      ? styles.consoleOnlyOptionSelected
                      : styles.consoleOnlyOptionUnselected
                  }
                  size="large"
                  variant="contained"
                  disabled={loading}
                  onClick={() => setConsoleOnly(true)}
                >
                  Console Only
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
          <Grid item>
            <Typography style={styles.label}>
              By creating this match you agree to the token{" "}
              <Typography
                display={"inline"}
                sx={{
                  fontWeight: 900,
                  fontSize: 20,
                  color: constants.newGray,
                  "&:hover": { cursor: "pointer" },
                  textDecoration: "underline",
                }}
                onClick={() => {
                  navigate("/rules");
                  return;
                }}
              >
                rules
              </Typography>
              .
            </Typography>
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ width: "100%" }}
            >
              <Grid item sx={{ width: "45%" }}>
                <Button
                  onClick={() => {
                    // clear errors
                    setErrors(null);
                    setTeamError(false);
                    setTeamErrorMessage(null);
                    setPriceError(false);
                    setPriceErrorMessage(null);

                    // clear state
                    setSelectedTeam("");
                    setSelectedPrice("");
                    setRegion("");
                    setMatchType("");
                    setRounds(5);
                    setConsoleOnly(false);
                    setLoading(false);

                    handleClose();
                  }}
                  sx={styles.cancelButton}
                  size="large"
                  variant="contained"
                  disabled={loading}
                >
                  CANCEL
                </Button>
              </Grid>

              <Grid item sx={{ width: "45%" }}>
                <Button
                  sx={styles.button}
                  onClick={handleOnSubmit}
                  variant="contained"
                  size="large"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : "CREATE TOKEN"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default CreateTokenDialog;
