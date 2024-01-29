import {
  useMediaQuery,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Typography,
  Grid,
  Alert,
} from "@mui/material";
import { useContext, useState } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import CloseIcon from "@mui/icons-material/Close";
import NewInput from "./NewInput";
import NewJoinScrimModal from "./NewJoinScrimModal";
import NewPrimaryButton from "../custom_components/NewPrimaryButton";
import NewJoinCashMatchModal from "./NewJoinCashMatchModal";

const NewTokenPasswordModal = (props) => {
  // variables
  const { open, onClose, token } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const isMobile = useMediaQuery("(max-width:500px)");

  // state
  const [closeHovered, setCloseHovered] = useState(false);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [joinScrimOpen, setJoinScrimOpen] = useState(false);

  // methods
  const handleOpenModal = () => {
    if (token?.isScrimMatch) {
      setJoinScrimOpen(true);
    } else {
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    if (token?.isScrimMatch) {
      setJoinScrimOpen(false);
      return;
    } else {
      setOpenModal(false);
    }
  };

  const handleSubmitPassword = () => {
    setError(null);
    if (password !== token?.password) {
      setError("Incorrect password.");
      return;
    } else {
      setPassword(null);
      handleOpenModal();
    }
  };

  const handleClose = () => {
    setPassword(null);
    setOpenModal(false);
    setError(null);
    onClose();
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
      <NewJoinCashMatchModal
        open={openModal}
        onClose={handleCloseModal}
        token={token}
        handleClosePasswordModal={handleClose}
      />
      <NewJoinScrimModal
        open={joinScrimOpen}
        onClose={handleCloseModal}
        token={token}
        handleClosePasswordModal={handleClose}
      />
      <DialogTitle>
        <Typography style={styles.title}>Enter Password</Typography>
        <Typography sx={styles.subtitle}>
          You need a password to join this{" "}
          {token?.isScrimMatch ? "scrim" : "cash match"}.
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
                    <Typography style={styles.label}>Password</Typography>
                  </Grid>
                  <Grid item sx={{ width: "100%" }}>
                    <NewInput
                      placeholder={
                        token?.isScrimMatch
                          ? "Scrim password"
                          : "Cash Match password"
                      }
                      onChange={setPassword}
                      value={password}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            sx={{
              width: "100%",
              textAlign: isDesktop ? "end" : "none",
            }}
          >
            <NewPrimaryButton label="submit" onClick={handleSubmitPassword} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default NewTokenPasswordModal;
