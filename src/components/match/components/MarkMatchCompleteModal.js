import { useContext, useState } from "react";
import { StoreContext } from "../../../context/NewStoreContext";
import createTheme from "../../../utils/theme";
import {
  useMediaQuery,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Typography,
  Grid,
  Alert,
  CircularProgress,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { isBlueTeam, isRedTeam, isVisitor } from "../utils/matchHelpers";
import { submitWagerResult } from "../../../utils/API";
import useAxios from "../../../utils/useAxios";

const MarkMatchCompleteModal = (props) => {
  // variables
  const { match, onClose, open } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const isMobile = useMediaQuery("(max-width:500px)");
  const api = useAxios();

  // state
  const [winLoading, setWinLoading] = useState(false);
  const [lossLoading, setLossLoading] = useState(false);
  const [closeHovered, setCloseHovered] = useState(false);
  const [error, setError] = useState(null);

  // methods
  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (status, team) => {
    if (winLoading || lossLoading) {
      return;
    }

    if (
      (isBlueTeam(store?.user?.username, match) && match?.bluesubmit >= 0) ||
      (isRedTeam(store?.user?.username, match) && match?.redsubmit >= 0)
    ) {
      return;
    }

    if (status === 1) {
      setWinLoading(true);
    }
    if (status === 0) {
      setLossLoading(true);
    }

    submitWagerResult(api, status, match?.wagerid, store?.user?.username).then(
      (res) => {
        if (res?.error) {
          setError(res?.message);
        }
        setWinLoading(false);
        setLossLoading(false);
        handleClose();
      }
    );
  };

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
    won: {
      color: theme.white(),
      fontSize: 11,
      fontWeight: 700,
      borderRadius: 50,
      boxShadow: "0 0",
      transition: "all .2s ease-in-out",
      minWidth: isDesktop ? 130 : "100%",
      height: 40,
      backgroundColor: theme.green(),
      "&:hover": {
        backgroundImage: theme.buttonHover(),
        backgroundColor: theme.green(),
        boxShadow: "0 0",
      },
    },
    lost: {
      color: theme.white(),
      fontSize: 11,
      fontWeight: 700,
      borderRadius: 50,
      boxShadow: "0 0",
      transition: "all .2s ease-in-out",
      minWidth: isDesktop ? 130 : "100%",
      height: 40,
      backgroundColor: theme.red(),
      "&:hover": {
        backgroundImage: theme.buttonHover(),
        backgroundColor: theme.red(),
        boxShadow: "0 0",
      },
    },
    disabled: {
      color: theme.metaText(),
      fontSize: 11,
      fontWeight: 700,
      borderRadius: 50,
      boxShadow: "0 0",
      transition: "all .2s ease-in-out",
      minWidth: isDesktop ? 130 : "100%",
      height: 40,
      backgroundColor: theme.border(),
      cursor: "not-allowed",
      "&:hover": {
        backgroundColor: theme.border(),
        boxShadow: "0 0",
        cursor: "not-allowed",
      },
    },
  };

  return isVisitor(store?.user?.username, match) ? null : (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ style: styles.card }}
    >
      <DialogTitle>
        <Typography sx={styles.title}>Mark Matches Complete</Typography>
        <Typography sx={styles.subtitle}>All maps finished?</Typography>
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
          alignItems="start"
          justifyContent="center"
          gap={{ xs: 4 }}
        >
          <Grid item>
            <Typography
              sx={{ fontSize: 15, fontWeight: 400, color: theme.text() }}
            >
              By submitting these results, you are marking a win or loss for ALL
              maps played.
            </Typography>
          </Grid>

          <Grid item sx={{ width: "100%" }}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              sx={{ width: "100%" }}
            >
              <Grid item>
                <Button
                  variant="contained"
                  size="large"
                  sx={
                    winLoading ||
                    lossLoading ||
                    (isBlueTeam(store?.user?.username, match) &&
                      match?.bluesubmit >= 0) ||
                    (isRedTeam(store?.user?.username, match) &&
                      match?.redsubmit >= 0)
                      ? styles.disabled
                      : styles.won
                  }
                  onClick={() =>
                    isBlueTeam(store?.user?.username, match)
                      ? handleSubmit(1, "blue")
                      : handleSubmit(1, "red")
                  }
                >
                  {winLoading ? (
                    <CircularProgress
                      size={20}
                      sx={{ color: theme.metaText() }}
                    />
                  ) : (isBlueTeam(store?.user?.username, match) &&
                      match?.bluesubmit >= 0) ||
                    (isRedTeam(store?.user?.username, match) &&
                      match?.redsubmit >= 0) ? (
                    "Results Submitted"
                  ) : (
                    "My Team Won"
                  )}
                </Button>
              </Grid>

              <Grid item>
                <Button
                  variant="contained"
                  size="large"
                  sx={
                    lossLoading ||
                    winLoading ||
                    (isBlueTeam(store?.user?.username, match) &&
                      match?.bluesubmit >= 0) ||
                    (isRedTeam(store?.user?.username, match) &&
                      match?.redsubmit >= 0)
                      ? styles.disabled
                      : styles.lost
                  }
                  onClick={() =>
                    isBlueTeam(store?.user?.username, match)
                      ? handleSubmit(0, "blue")
                      : handleSubmit(0, "red")
                  }
                >
                  {lossLoading ? (
                    <CircularProgress
                      size={20}
                      sx={{ color: theme.metaText() }}
                    />
                  ) : (isBlueTeam(store?.user?.username, match) &&
                      match?.bluesubmit >= 0) ||
                    (isRedTeam(store?.user?.username, match) &&
                      match?.redsubmit >= 0) ? (
                    "Results Submitted"
                  ) : (
                    "My Team Lost"
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

export default MarkMatchCompleteModal;
