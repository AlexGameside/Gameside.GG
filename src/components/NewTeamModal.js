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
import useNotifications from "../utils/useNotifications";
import NewPrimaryButton from "../custom_components/NewPrimaryButton";

const NewTeamModal = (props) => {
  // variables
  const { open, onClose, team, closeCreateModal = () => {} } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const { sendNotifEvent } = useNotifications(store?.user?.username);

  // state
  const [closeHovered, setCloseHovered] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [userToInvite, setUserToInvite] = useState(null);
  const [inviteLoading, setInviteLoading] = useState(false);

  // methods
  const handleClose = () => {
    setUserToInvite("");
    setError(null);
    setSuccess(null);
    closeCreateModal();
    onClose();
  };

  const handleInviteUser = () => {
    setInviteLoading(true);
    if (userToInvite == null || userToInvite == "") {
      setInviteLoading(false);
      return;
    }

    const notification = {
      user: store?.user?.username,
      userToInv: userToInvite.toLowerCase(),
      teamId: team?._id,
      name: team?.name,
    };

    sendNotifEvent(notification);
    setSuccess(`Invited ${userToInvite} to ${team?.name}!`);
    setInviteLoading(false);
    setUserToInvite("");
    return;
  };

  // effects

  // styles
  const styles = {
    card: {
      backgroundColor: theme.card(),
      minWidth: isDesktop ? 450 : 0,
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
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ style: styles.card }}
    >
      <DialogTitle sx={styles.title}>
        <Typography style={styles.title}>
          Invite players to {team?.name}
        </Typography>
        <Typography sx={styles.subtitle}>
          Invite players to start competing with{" "}
          <span style={{ color: theme.green() }}>{team?.name}</span>.
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
          <Grid item sx={{ width: "100%" }}>
            <NewInput
              placeholder="Username"
              onChange={setUserToInvite}
              value={userToInvite}
            />
          </Grid>

          <Grid item alignSelf="end">
            <NewPrimaryButton
              label="invite"
              loading={inviteLoading}
              onClick={handleInviteUser}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default NewTeamModal;
