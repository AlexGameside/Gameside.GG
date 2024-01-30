import {
  Grid,
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  Alert,
  CircularProgress,
  Typography,
  IconButton,
  FormGroup,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useContext, useEffect } from "react";
import GlobalState, { GlobalStateContext } from "../context/StoreContext";
import useAxios from "../utils/useAxios";
import { joinWager } from "../utils/API";
import constants from "../utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import useSocket from "../utils/useSocket";
import { Dropdown } from "semantic-ui-react";
import { Input, Label } from "semantic-ui-react";

const JoinTokenDialog = (props) => {
  const styles = {
    form: {
      width: "100%",
    },
    inputLabel: {
      color: constants.black,
    },
    button: {
      border: `2px solid ${constants.newBlue}`,
      fontSize: 18,
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
    passwordButton: {
      width: "100%",
      color: constants.white,
      fontWeight: 900,
      borderRadius: 3,
      boxShadow: "0 0",
      backgroundColor: constants.newGreen,
      "&:hover": {
        backgroundColor: constants.newGreen,
        opacity: 0.7,
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

  const { open, onClose, wagerId, wager } = props;
  const params = useParams();
  const api = useAxios();
  const navigate = useNavigate();
  const store = useContext(GlobalStateContext);
  const { user } = useContext(GlobalStateContext);
  const [loading, setLoading] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [teamError, setTeamError] = useState(null);
  const [errors, setErrors] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [canJoin, setCanJoin] = useState(true);
  const [putUpRed, setPutUpRed] = useState(null);
  const [password, setPassword] = useState(null);

  const { sendJoinEvent } = useSocket(params?.tokenId);

  const handleClose = () => {
    setErrors(false);
    setLoading(false);
    setSelectedTeam("");
    setTeamError(null);
    setPutUpRed(null);
    setPassword(null);
    onClose();
  };

  const handleSelectedTeamChange = (data) => {
    setTeamError(null);
    getTeamMembers(data.value);
    setSelectedTeam(data.value);
  };

  const handleJoinToken = () => {
    setLoading(true);
    if (!selectedTeam) {
      setTeamError("You must select a team to join!");
      setLoading(false);
      return;
    }
    if (!canJoin) {
      setLoading(false);
      setTeamError("You cannot join a token that you are in you bone head.");
    }
    if (wager?.password != null || wager?.password != "") {
      if (password === wager?.password || store?.user?.role >= 501) {
        joinWager(
          api,
          wagerId,
          selectedTeam,
          user?.username,
          wager?.entry_fee,
          selectedTeam,
          putUpRed ? putUpRed : ""
        ).then((res) => {
          if (!res.error) {
            setPutUpRed(null);
            setErrors(false);
            setLoading(false);
            setSelectedTeam("");
            setTeamError(null);
            setLoading(false);
            sendJoinEvent({
              username: user?.username,
              wagerId,
            });
            navigate(`/token/${wagerId}`, {
              state: {
                wager: wagerId,
              },
            });

            handleClose();
            return;
          }
          setPutUpRed(null);
          setLoading(false);
          setErrors(res.message);
          return;
        });
      } else {
        setPutUpRed(null);
        setLoading(false);
        setErrors("Incorrect Password!");
      }
    }
  };

  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const determineTeamSize = (wager) => {
    switch (wager?.team_size) {
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

  const determineMatchTitle = (wager) => {
    switch (wager?.match_type) {
      case "ZW":
        return `${determineTeamSize(wager)} Zone Wars`;
      case "REAL":
        return `${determineTeamSize(wager)} Realistics`;
      case "BOX":
        return `${determineTeamSize(wager)} Box Fights`;
      case "PG":
        return `${determineTeamSize(wager)} PG/Build Fights`;
      case "RACE":
        return `${determineTeamSize(wager)} Kill Race`;
      case "ARENA_RACE":
        return `${determineTeamSize(wager)} Arena Kill Race`;
      default:
        return "";
    }
  };

  const renderConsoleWarningMessage = () => {
    if (wager?.console_only) {
      return (
        <Grid item>
          <Typography
            sx={{ fontWeight: 900, color: constants.red, fontSize: 24 }}
          >
            THIS MATCH IS FOR CONSOLE PLAYERS ONLY. ARE YOU SURE YOU WANT TO
            JOIN? IF YOU JOIN AND YOU ARE NOT ON CONSOLE IT WILL RESULT IN AN
            AUTOMATIC LOSS.
          </Typography>
        </Grid>
      );
    } else {
      return null;
    }
  };

  const getTeamMembers = (teamId) => {
    setLoading(true);
    const newTeam = store?.userTeams?.filter((team) => team?._id === teamId);
    setTeamMembers(newTeam[0]?.usernames);
    setLoading(false);
  };

  useEffect(() => {
    if (store?.wagers?.indexOf(wager) === -1) {
      handleClose();
    }
  }, [store?.wagers]);

  useEffect(() => {
    handleClose();
  }, [store.wagers]);

  return loading ? null : (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        sx={{ fontWeight: 900, fontSize: 28, color: constants.newGray }}
      >
        Join Token{" "}
        {handleClose ? (
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent>
        {!errors ? null : (
          <Alert sx={{ marginBottom: 2 }} severity="error">
            {errors}
          </Alert>
        )}
        {!teamError ? null : (
          <Alert sx={{ marginBottom: 2 }} severity="error">
            {teamError}
          </Alert>
        )}
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          rowSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
          sx={{ minHeight: "100%" }}
        >
          <Grid item={{ width: "100%" }}>
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
            <Typography sx={styles?.wagerDetail}>
              Entry Fee:{" "}
              <span style={styles.wagerDetailValue}>
                {numFormatter?.format(wager?.entry_fee)}
              </span>
            </Typography>
            <Typography sx={styles?.wagerDetail}>
              Match Type:{" "}
              <span style={styles.wagerDetailValue}>
                {determineMatchTitle(wager)}
              </span>
            </Typography>
            <Typography sx={styles?.wagerDetail}>
              Platform:{" "}
              <span style={styles.wagerDetailValue}>
                {wager?.console_only ? "Console Only" : "All Platforms"}
              </span>
            </Typography>
            <Typography sx={styles?.wagerDetail}>
              Region:{" "}
              <span style={styles.wagerDetailValue}>{wager?.region}</span>
            </Typography>
            <Typography sx={styles?.wagerDetail}>
              Your Team Member(s):
              {teamMembers?.map((member, i) => (
                <span style={styles.wagerDetailValue}>{` ${member}${
                  i === teamMembers.length - 1 ? "" : ","
                }`}</span>
              ))}
            </Typography>
          </Grid>
          {wager?.team_size < 2 ? null : (
            <Grid item>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() =>
                        putUpRed != null
                          ? setPutUpRed(null)
                          : setPutUpRed(user?.username)
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
          {wager?.password == null || wager?.password == "" ? null : (
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
          {renderConsoleWarningMessage()}
          <Grid item>
            <Typography style={styles.label}>
              By joining this match you agree to the token{" "}
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
                  navigate("/valorant/rules");
                  return;
                }}
              >
                rules
              </Typography>
              .
            </Typography>
          </Grid>
          <Grid item>
            <Button
              sx={styles.button}
              variant="contained"
              size="large"
              disabled={loading}
              onClick={handleJoinToken}
            >
              {loading ? <CircularProgress size={24} /> : "JOIN"}
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default JoinTokenDialog;
