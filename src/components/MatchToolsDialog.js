import {
  Grid,
  Button,
  DialogTitle,
  Dialog,
  Select,
  FormControl,
  MenuItem,
  Alert,
  CircularProgress,
  Typography,
  FormHelperText,
  IconButton,
} from "@mui/material";
import { punishUser } from "../utils/API";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useState } from "react";
import { GlobalStateContext } from "../context/StoreContext";
import constants from "../utils/constants";
import useAxios from "../utils/useAxios";

const MatchToolsDialog = (props) => {
  const styles = {
    punishButton: {
      width: "100%",
      fontSize: 16,
      backgroundColor: constants.black,
      color: constants.white,
      transition: "0.3s",
      "&:hover": {
        backgroundColor: constants.blackHovered,
      },
    },
    punInput: {
      width: "100%",
    },
  };

  const api = useAxios();
  const store = useContext(GlobalStateContext);
  const { open, onClose, currentWagerStatus } = props;
  const [punPoints, setPunPoints] = useState(0);
  const [userToPunish, setUserToPunish] = useState("None");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChangePunPoints = (e) => {
    setPunPoints(e.target.value);
  };

  const handleChangeUserToPunish = (e) => {
    setUserToPunish(e.target.value);
  };

  const handlePunish = () => {
    setError("");
    setLoading(true);
    if (userToPunish === "None") {
      setError("Must Select a User to Punish!");
      setLoading(false);
      return;
    }
    if (punPoints === 0) {
      setError("Must Select a PUN Point Option!");
      setLoading(false);
      return;
    }
    punishUser(
      api,
      userToPunish,
      store?.user?.username,
      punPoints,
      `https://www.gameside.gg/token/${currentWagerStatus?.wagerid}`
    ).then((res) => {
      if (!res.error) {
        setSuccess(`${userToPunish} punished!`);
        setLoading(false);
        return;
      }
      setError(res.message);
      setLoading(false);
      return;
    });
  };

  const handleClose = () => {
    setLoading(false);
    setSuccess("");
    setPunPoints(0);
    setUserToPunish("None");
    setError("");
    onClose();
  };

  const determineWhichPunishPointsToShow = () => {
    const role = store?.user?.role;

    if (role === 200) {
      return (
        <Select
          value={punPoints}
          onChange={handleChangePunPoints}
          label="PUN Points"
        >
          <MenuItem value={0}>
            <em>PUN Points</em>
          </MenuItem>
          <MenuItem value={75}>75: Minor Toxicity (No TOS)</MenuItem>
          <MenuItem value={100}>100: False Mark / Stalling</MenuItem>
          <MenuItem value={200}>200: Very Toxic / TOS</MenuItem>
        </Select>
      );
    }
    if (role > 200) {
      return (
        <>
          <Select
            value={punPoints}
            onChange={handleChangePunPoints}
            label="PUN Points"
          >
            <MenuItem value={0}>
              <em>PUN Points</em>
            </MenuItem>
            <MenuItem value={75}>75: Minor Toxicity (No TOS)</MenuItem>
            <MenuItem value={100}>100: False Mark / Stalling</MenuItem>
            <MenuItem value={200}>200: Very Toxic / TOS</MenuItem>
            <MenuItem value={700}>700: Cheating</MenuItem>
          </Select>
        </>
      );
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        Match Tools
        {handleClose ? (
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      {success ? (
        <Grid item alignSelf="center">
          <Alert severity="success">{success}</Alert>
        </Grid>
      ) : null}
      {error ? (
        <Grid item alignSelf="center">
          <Alert severity="error">{error}</Alert>
        </Grid>
      ) : null}
      <Grid
        container
        sx={{ padding: 3 }}
        rowSpacing={{ xs: 1, sm: 2 }}
        alignItems="center"
      >
        <Grid container direction="column" rowSpacing={{ xs: 1, sm: 2 }}>
          <Grid item>
            <Typography
              sx={{ color: constants.black, fontWeight: 900, marginBottom: 1 }}
            >
              Punish User
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          columnSpacing={{ xs: 1 }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={6}>
            <FormControl variant="filled" sx={styles.punInput}>
              <Select
                value={userToPunish}
                onChange={handleChangeUserToPunish}
                label="User to Punish"
              >
                <MenuItem value="None">
                  <em>None</em>
                </MenuItem>
                {currentWagerStatus?.readied_users?.map((user, i) => (
                  <MenuItem value={user} key={i}>
                    {user}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>User to Punish</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="filled" sx={styles.punInput}>
              {determineWhichPunishPointsToShow()}
              <FormHelperText>PUN Points</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item sx={{ width: "100%" }}>
          <Button
            variant="contained"
            size="large"
            sx={styles.punishButton}
            onClick={handlePunish}
            disabled={loading}
          >
            Punish
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default MatchToolsDialog;
