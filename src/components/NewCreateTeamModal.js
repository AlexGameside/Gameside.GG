import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
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
import CloseIcon from "@mui/icons-material/Close";
import NewInput from "./NewInput";
import { createTeam } from "../utils/API";
import useAxios from "../utils/useAxios";
import NewTeamModal from "./NewTeamModal";
import NewPrimaryButton from "../custom_components/NewPrimaryButton";

const NewCreateTeamModal = (props) => {
  // variables
  const {
    onClose,
    open,
    handleAddTeam = () => {},
    fromCreateMenu = false,
  } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const api = useAxios();

  // state
  const [teamName, setTeamName] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [newCreatedTeam, setNewCreatedTeam] = useState(null);
  const [closeHovered, setCloseHovered] = useState(false);

  // methods
  const handleClose = () => {
    setError(null);
    setTeamName("");
    setLoading(false);
    onClose();
  };

  const handleOpenInviteModal = () => {
    setInviteOpen(true);
  };

  const handleCloseInviteModal = () => {
    setInviteOpen(false);
  };

  const handleCreateTeam = () => {
    setLoading(true);
    setError("");
    if (teamName == null || teamName == "") {
      setLoading(false);
      setError("Please add a team name!");
      return;
    }
    createTeam(api, teamName, store?.user?.username).then((res) => {
      if (!res?.error) {
        setLoading(false);
        handleAddTeam(res?.team);

        if (fromCreateMenu) {
          setNewCreatedTeam(res?.team);
          handleOpenInviteModal();
          return;
        }
        handleClose();
        return;
      }
      setError(res?.message);
      setLoading(false);
    });
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
      <NewTeamModal
        open={inviteOpen}
        team={newCreatedTeam}
        onClose={handleCloseInviteModal}
        closeCreateModal={handleClose}
      />
      <DialogTitle sx={styles.title}>
        <Typography style={styles.title}>Create New Team</Typography>
        <Typography sx={styles.subtitle}>
          Compete in scrims, cash matches, and tournaments.
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
                <NewInput
                  placeholder="Team Name"
                  onChange={setTeamName}
                  value={teamName}
                />
              </Grid>

              <Grid item alignSelf="end">
                <NewPrimaryButton
                  label="create"
                  loading={loading}
                  onClick={handleCreateTeam}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default NewCreateTeamModal;
