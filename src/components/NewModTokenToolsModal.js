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
  Alert,
} from "@mui/material";
import { useContext, useState } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import CloseIcon from "@mui/icons-material/Close";
import NewDropdown from "./NewDropdown";
import useAxios from "../utils/useAxios";
import { punishUser } from "../utils/API";

const NewModTokenToolsModal = (props) => {
  // variables
  const { open, onClose, users, token } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const api = useAxios();

  // state
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [punPoints, setPunPoints] = useState(0);
  const [userToPunish, setUserToPunish] = useState(null);

  // methods
  const handleClose = () => {
    setSuccess(null);
    setError(null);
    setLoading(false);
    setPunPoints(0);
    setUserToPunish(null);
    onClose();
  };

  const handlePunish = () => {
    setLoading(true);
    if (
      userToPunish === "" ||
      userToPunish == null ||
      punPoints == 0 ||
      punPoints == null
    ) {
      setLoading(false);
      setError("Must select a user and amount of pun points!");
      return;
    }

    punishUser(
      api,
      userToPunish,
      store?.user?.username,
      punPoints,
      `https://www.gameside.gg/token/${token?.wagerid}`
    ).then((res) => {
      if (!res.error) {
        setError(null);
        setSuccess(`${userToPunish} punished!`);
        setLoading(false);
        return;
      }
      setError(res?.message);
      setLoading(false);
    });
  };

  const getUserOptions = () => {
    const options = [{ title: "None", value: null }];
    let matchUsers = users?.filter((user) => user !== store?.user?.username);
    matchUsers?.forEach((user) => {
      options?.push({ title: user, value: user });
    });
    return options;
  };

  const getPunPointOptions = () => {
    const seniorOptions = [
      { title: "75: Minor Toxicity (No TOS)", value: 75 },
      { title: "100: False Mark / Stalling", value: 100 },
      { title: "200: Very Toxic / TOS", value: 200 },
      { title: "700: Cheating", value: 700 },
    ];
    const regularOptions = [
      { title: "75: Minor Toxicity (No TOS)", value: 75 },
      { title: "100: False Mark / Stalling", value: 100 },
      { title: "200: Very Toxic / TOS", value: 200 },
    ];

    if (store?.user?.role > 200) {
      return seniorOptions;
    }
    return regularOptions;
  };

  const handleChangePunPoints = (v) => {
    setSuccess(null);
    setError(null);
    setPunPoints(v);
  };

  const handleChangeUserToPunish = (v) => {
    setSuccess(null);
    setError(null);
    setUserToPunish(v);
  };

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
    punish: {
      color: theme.white(),
      width: "100%",
      fontSize: 18,
      textTransform: "none",
      fontWeight: 900,
      borderRadius: 50,
      boxShadow: "0 0",
      transition: "all .3s ease-in-out",
      backgroundColor: theme.red(),
      "&:hover": {
        backgroundColor: theme.red(),
        opacity: 0.7,
        boxShadow: "0 0",
        transform: "scale(1.1)",
      },
    },
    label: {
      fontSize: 18,
      fontWeight: 900,
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
        {success ? (
          <Alert severity="success" onClose={() => setSuccess("")}>
            {success}
          </Alert>
        ) : null}
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          rowSpacing={{ xs: 2 }}
        >
          <Grid item>
            <Typography style={styles.title}>Mod Tools</Typography>
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
                <Grid
                  container
                  direction="column"
                  justifyContent="start"
                  alignItems="start"
                  rowSpacing={{ xs: 1 }}
                >
                  <Grid item sx={{ width: "100%" }}>
                    <Typography style={styles.label}>User to Punish</Typography>
                  </Grid>
                  <Grid item sx={{ width: "100%" }}>
                    <NewDropdown
                      options={getUserOptions()}
                      placeholder="Select User to Punish"
                      onChange={handleChangeUserToPunish}
                      game={token?.game}
                      matchType={token?.match_type}
                      value={userToPunish}
                    />
                  </Grid>
                </Grid>
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
                <Grid
                  container
                  direction="column"
                  justifyContent="start"
                  alignItems="start"
                  rowSpacing={{ xs: 1 }}
                >
                  <Grid item sx={{ width: "100%" }}>
                    <Typography style={styles.label}>Pun Points</Typography>
                  </Grid>
                  <Grid item sx={{ width: "100%" }}>
                    <NewDropdown
                      options={getPunPointOptions()}
                      placeholder="Select Pun Points"
                      onChange={handleChangePunPoints}
                      value={punPoints}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item sx={{ width: "100%" }}>
            <Button
              disabled={loading}
              sx={styles.punish}
              variant="contained"
              size="large"
              onClick={handlePunish}
            >
              {loading ? (
                <CircularProgress size={30} sx={{ color: theme.white() }} />
              ) : (
                "Punish"
              )}
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default NewModTokenToolsModal;
