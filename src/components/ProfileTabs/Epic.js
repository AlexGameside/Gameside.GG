import {
  Button,
  Grid,
  Alert,
  Typography,
  Paper,
  Tooltip,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Input } from "semantic-ui-react";
import {
  resetTempEpic,
  setTempEpic,
  getTempEpic,
  getUserEpicID,
  refreshUserEpic,
} from "../../utils/API";
import constants from "../../utils/constants";
import useAxios from "../../utils/useAxios";
import ErrorIcon from "@mui/icons-material/Error";
import useEpic from "../../utils/useEpic";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import RefreshIcon from "@mui/icons-material/Refresh";
import { styled } from "@mui/material/styles";
import careerLeaderboard from "../../assets/career-leaderboard.png";
import { GlobalStateContext } from "../../context/StoreContext";

const Epic = (props) => {
  const styles = {
    button: {
      fontSize: 18,
      border: `2px solid ${constants.newGreen}`,
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
    refreshButton: {
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
    epicTitle: {
      fontWeight: 900,
      color: constants.newGray,
      fontSize: 26,
    },
    warning: {
      fontWeight: 900,
      color: constants.newOrange,
      fontSize: 22,
      textAlign: "center",
    },
    epicInputText: {
      fontWeight: 200,
      fontSize: 18,
      color: constants.white,
    },
    epicName: {
      fontWeight: 200,
      fontSize: 20,
      color: constants.newGray,
    },
    steps: {
      fontWeight: 200,
      fontSize: 18,
      color: constants.newGray,
    },
  };

  const { user, tempEpic, newEpic, newEpicId } = props;
  const store = useContext(GlobalStateContext);
  const { sendTempEpic } = useEpic(user?.username);
  const api = useAxios();
  const Img = styled("img")``;

  const [currentEpic, setCurrentEpic] = useState(null);
  const [currentTemp, setCurrentTemp] = useState(null);
  const [epic, setEpic] = useState(user?.epic);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(true);
  const [currentEpicId, setCurrentEpicId] = useState(store?.epicId);

  useEffect(() => {
    if (!currentTemp) {
      if (user?.username) {
        getTempEpic(api, user?.username).then((res) => {
          if (!res.error) {
            setCurrentTemp(res.tempEpic);
            setCurrentEpicId(res.id);
            return;
          }
          return;
        });
      }
    }
  }, []);

  useEffect(() => {
    if (tempEpic) {
      setCurrentTemp(tempEpic);
      setCurrentEpicId(store?.epidId);
      setSuccess("Epic sent for verification!");
    }
    return;
  }, [user]);

  useEffect(() => {
    setCurrentEpic(newEpic);
  }, [newEpic]);

  useEffect(() => {
    setCurrentEpicId(newEpicId);
  }, [newEpicId]);

  const handleSubmit = () => {
    setError("");
    if (epic === "") {
      setError("Please enter an epic!");
      return;
    }
    setLoading(true);
    setSuccess("");
    setTempEpic(api, user?.username, epic).then((res) => {
      setLoading(false);
      if (!res.error) {
        setLoading(false);
        setSuccess("Epic sent for verification!");
        sendTempEpic(epic);
        setCurrentTemp(epic);
        return;
      } else {
        setError("Failed to send Epic for verification!");
      }
    });
  };

  const handleCopyBotName = () => {
    navigator.clipboard.writeText("TknsGG");
  };

  const refreshEpic = () => {
    setLoading(true);
    getUserEpicID(api, user?.username).then((res) => {
      if (!res.error) {
        const id = res.id;
        refreshUserEpic(api, user?.username, id).then((refreshRes) => {
          if (!res.error) {
            setCurrentEpic(refreshRes?.epic);
            setLoading(false);
            return;
          }
          setError(res?.message);
          setLoading(false);
          return;
        });
      }
      setError(res.message);
      setLoading(false);
      return;
    });
  };

  const hasNoTempNoEpic = () => {
    // show submit button
    // non disabled text field
    // show the temp epic account they submitted on

    if (!currentTemp && (!currentEpicId || user?.epic === "")) {
      return (
        <>
          <Grid item>
            <Typography sx={styles.epicTitle}>
              Please Link Your Epic Account
            </Typography>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              columnSpacing={{ xs: 1, sm: 2 }}
              sx={{ width: "25%" }}
            >
              <Grid item>
                <Tooltip
                  title={
                    <Typography sx={styles.epicInputText}>
                      Once you link an Epic, you will not be able to link
                      another one.
                    </Typography>
                  }
                >
                  <ErrorIcon
                    sx={{ fontSize: 30, color: constants.newOrange }}
                  />
                </Tooltip>
              </Grid>
              <Grid item>
                <Input
                  disabled={loading}
                  placeholder={"Link Epic"}
                  onChange={(e, data) => setEpic(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sx={{ width: "25%" }}>
            <Button
              disabled={loading}
              sx={styles.button}
              onClick={handleSubmit}
            >
              {loading ? <CircularProgress size={24} /> : "Submit Epic"}
            </Button>
          </Grid>
        </>
      );
    }
    return null;
  };

  const hasTempNoEpic = () => {
    if (currentTemp && !currentEpicId) {
      // show epic sent for verified
      // disabled text field
      // show steps to add bot
      return (
        <>
          {success ? (
            <Grid item alignSelf="center">
              <Alert severity="success">{success}</Alert>
            </Grid>
          ) : null}
          <Grid item>
            <Typography sx={styles.epicTitle}>
              Put the wrong Epic? Press reset to restart the process.
              Capitalization does not matter.
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              sx={styles.epicName}
            >{`Epic Sent: ${currentTemp}`}</Typography>
          </Grid>
          <Grid item>
            <Button
              disabled={loading}
              sx={styles.refreshButton}
              onClick={() => {
                setLoading(true);
                resetTempEpic(api, user?.username).then((res) => {
                  if (!res.error) {
                    setHasSubmitted(false);
                    sendTempEpic("");
                    setSuccess("Successfully reset temporary Epic!");
                    setCurrentTemp(null);
                    setLoading(false);
                    return;
                  }
                  setLoading(false);
                  setError("Could not reset temporary Epic!");
                  return;
                });
              }}
            >
              Reset Epic for Verification
            </Button>
          </Grid>
          <Grid item>
            <Typography sx={styles.epicTitle}>How To Verify Epic:</Typography>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
              rowSpacing={{ xs: 1 }}
            >
              <Grid item>
                <Typography sx={styles.steps}>
                  1. On Fortnite, Add{" "}
                  <span style={{ fontWeight: 900 }}>
                    TknsGG{" "}
                    <IconButton
                      component="span"
                      size="small"
                      onClick={handleCopyBotName}
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </span>{" "}
                  as a friend.
                </Typography>
                <Typography sx={styles.steps}>
                  2. Once verified successfully, this page will update
                  automatically.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </>
      );
    }
    return null;
  };

  const hasEpic = () => {
    if (currentEpicId) {
      // show their current epic
      // show a refresh epic button
      // dont show text field
      return (
        <>
          {error ? (
            <Grid item alignSelf="center">
              <Alert severity="error">{error}</Alert>
            </Grid>
          ) : null}
          <Grid item>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
              columnSpacing={{ xs: 1 }}
            >
              <Grid item>
                <Tooltip
                  title={
                    <>
                      <Typography sx={styles.epicInputText}>
                        FYI: Your Career Leaderboard Must be Public on your
                        Fortnite Account in Order to Refresh your Epic!
                      </Typography>
                      <Img
                        src={careerLeaderboard}
                        alt="Career"
                        sx={{ width: 280 }}
                      />
                    </>
                  }
                >
                  <ErrorIcon
                    sx={{ fontSize: 30, color: constants.newOrange }}
                  />
                </Tooltip>
              </Grid>
              <Grid item>
                <Typography sx={styles.epicTitle}>Linked Epic</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={styles.epicName}>{currentEpic}</Typography>
          </Grid>
          <Grid item>
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <IconButton disabled={loading}>
                <RefreshIcon sx={{ fontSize: 30 }} onClick={refreshEpic} />
              </IconButton>
            )}
          </Grid>
        </>
      );
    }
    return null;
  };

  return (
    <Grid container direction="column" rowSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item>
        <Paper
          elevation={1}
          sx={{
            borderRadius: 3,
            padding: 4,
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%" }}
            rowSpacing={{ xs: 1, sm: 2 }}
          >
            {hasNoTempNoEpic()}
            {hasTempNoEpic()}
            {hasEpic()}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Epic;
