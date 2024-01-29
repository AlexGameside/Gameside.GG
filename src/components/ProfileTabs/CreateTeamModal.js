import {
  Grid,
  Button,
  DialogTitle,
  Dialog,
  Alert,
  CircularProgress,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import constants from "../../utils/constants";
import { useState } from "react";
import { createTeam } from "../../utils/API";
import useAxios from "../../utils/useAxios";

const CreateTeamModal = (props) => {
  const styles = {
    createTeamButton: {
      border: `2px solid ${constants.newOrange}`,
      fontSize: 18,
      width: "100%",
      color: constants.white,
      fontWeight: 900,
      borderRadius: 3,
      boxShadow: "0 0",
      backgroundColor: constants.newOrange,
      "&:hover": {
        backgroundColor: constants.newOrange,
        opacity: 0.7,
        color: constants.white,
        boxShadow: "0 0",
      },
      transition: "0.3s",
    },
  };

  // props
  const { open, onClose, handleNewTeam, user } = props;

  // variables
  const api = useAxios();

  // state
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [newTeamName, setNewTeamName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setError("");
    setSuccess("");
    setNewTeamName("");
    setLoading(false);
    onClose();
  };

  const handleChangeTeamName = (e) => {
    setNewTeamName(e.target.value);
  };

  const handleCreateTeam = () => {
    setLoading(true);
    setError("");
    if (newTeamName === "") {
      setError("You must include a team name!");
      setLoading(false);
      return;
    }
    createTeam(api, newTeamName, user?.username).then((res) => {
      if (!res.error) {
        setLoading(false);
        setSuccess("Created Team!");
        handleNewTeam(res.team);
        return;
      }
      setLoading(false);
      setError(res.message);
      return;
    });
  };

  if (!user) {
    return null;
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        sx={{ fontSize: 26, fontWeight: 900, color: constants.newGray }}
      >
        Create Team
        {onClose ? (
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
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        rowSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ padding: 3 }}
      >
        {error ? (
          <Grid item alignSelf="center">
            <Alert severity="error">{error}</Alert>
          </Grid>
        ) : null}
        {success ? (
          <Grid item alignSelf="center">
            <Alert severity="success">{success}</Alert>
          </Grid>
        ) : null}
        <Grid item>
          <TextField
            onChange={handleChangeTeamName}
            label="Team Name"
            value={newTeamName}
          />
        </Grid>
        <Grid item sx={{ width: "100%" }}>
          <Button
            variant="contained"
            size="large"
            sx={styles.createTeamButton}
            onClick={handleCreateTeam}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Create Team"}
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default CreateTeamModal;
