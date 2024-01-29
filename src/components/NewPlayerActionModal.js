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
} from "@mui/material";
import { useContext, useState } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import CloseIcon from "@mui/icons-material/Close";
import useAxios from "../utils/useAxios";
import { BiChevronRight } from "react-icons/bi";
import { reportUser } from "../utils/API";

const NewPlayerActionModal = (props) => {
  // variables
  const { open, onClose, user } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const api = useAxios();

  // state
  const [loading, setLoading] = useState(false);
  const [reported, setReported] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // methods
  const handleClose = () => {
    setLoading(false);
    setReported(false);
    setError(null);
    setSuccess(null);
    onClose();
  };

  const handleReportUser = (reportType) => {
    var currentLocation = window.location.href.toString();
    setLoading(true);
    setSuccess(null);
    setError(null);
    reportUser(
      api,
      user?.username,
      `${store?.user?.username} reported ${user?.username} for ${reportType}`,
      currentLocation
    ).then((res) => {
      if (!res?.error) {
        setReported(true);
        setSuccess(`Reported ${user?.username} for ${reportType}!`);
        setLoading(false);
        return;
      } else {
        setReported(true);
        setError(res?.message);
        setLoading(false);

        return;
      }
    });
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
    option: {
      fontSize: 22,
      fontWeight: 900,
      color: theme.text(),
    },
    cashType: {
      fontSize: 18,
      fontWeight: 900,
      color: theme.green(),
    },
    bankType: {
      fontSize: 18,
      fontWeight: 900,
      color: theme.blue(),
    },
    withdrawAmount: {
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
        <Typography style={styles.title}>Report {user?.username}</Typography>
        {handleClose ? (
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={styles.closeButton}
          >
            <CloseIcon sx={{ fontSize: 24 }} />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          rowSpacing={{ xs: 1 }}
          sx={{ width: "100%" }}
        >
          {reported ? (
            <Grid item sx={{ width: "100%", textAlign: "center" }}>
              {loading ? (
                <CircularProgress size={40} sx={{ color: theme.blue() }} />
              ) : (
                <Alert
                  severity={error ? "error" : "success"}
                  onClose={() => handleClose()}
                >
                  {error ? error : success}
                </Alert>
              )}
            </Grid>
          ) : (
            <>
              <Grid
                item
                sx={{
                  width: "100%",
                  paddingTop: 1,
                  paddingLeft: 1,
                  paddingRight: 1,
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: theme.cardHover(),
                  },
                }}
                onClick={() => {
                  if (loading) {
                    return;
                  }
                  setReported(true);
                  handleReportUser("Cheating/Hacking");
                }}
              >
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ width: "100%" }}
                >
                  <Grid item>
                    <Typography style={styles.option}>
                      Cheating/Hacking
                    </Typography>
                  </Grid>
                  <Grid item>
                    <BiChevronRight
                      style={{ color: theme.text(), fontSize: 30 }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                sx={{
                  width: "100%",
                  paddingTop: 1,
                  paddingLeft: 1,
                  paddingRight: 1,
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: theme.cardHover(),
                  },
                }}
                onClick={() => {
                  if (loading) {
                    return;
                  }
                  setReported(true);
                  handleReportUser("TOS");
                }}
              >
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ width: "100%" }}
                >
                  <Grid item>
                    <Typography style={styles.option}>TOS</Typography>
                  </Grid>
                  <Grid item>
                    <BiChevronRight
                      style={{ color: theme.text(), fontSize: 30 }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                sx={{
                  width: "100%",
                  paddingTop: 1,
                  paddingLeft: 1,
                  paddingRight: 1,
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: theme.cardHover(),
                  },
                }}
                onClick={() => {
                  if (loading) {
                    return;
                  }
                  setReported(true);
                  handleReportUser("Stalling");
                }}
              >
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ width: "100%" }}
                >
                  <Grid item>
                    <Typography style={styles.option}>Stalling</Typography>
                  </Grid>
                  <Grid item>
                    <BiChevronRight
                      style={{ color: theme.text(), fontSize: 30 }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                sx={{
                  width: "100%",
                  paddingTop: 1,
                  paddingLeft: 1,
                  paddingRight: 1,
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: theme.cardHover(),
                  },
                }}
                onClick={() => {
                  if (loading) {
                    return;
                  }
                  setReported(true);
                  handleReportUser("Wrong Mark");
                }}
              >
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ width: "100%" }}
                >
                  <Grid item>
                    <Typography style={styles.option}>Wrong Mark</Typography>
                  </Grid>
                  <Grid item>
                    <BiChevronRight
                      style={{
                        color: theme.text(),
                        fontSize: 30,
                        paddingTop: 1,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default NewPlayerActionModal;
