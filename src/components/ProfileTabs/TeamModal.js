import {
  Grid,
  Button,
  DialogTitle,
  Dialog,
  Alert,
  CircularProgress,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import constants from "../../utils/constants";
import { useState } from "react";
import useAxios from "../../utils/useAxios";
import { kickUser, leaveTeam } from "../../utils/API";
import { useEffect, useRef } from "react";
import io from "socket.io-client";

const TeamModal = (props) => {
  const styles = {
    leaveTeamButton: {
      fontSize: 20,
      width: "100%",
      border: `2px solid ${constants.red}`,
      color: constants.red,
      fontWeight: 900,
      borderRadius: 3,
      boxShadow: "0 0",
      backgroundColor: constants.white,
      "&:hover": {
        backgroundColor: constants.red,
        color: constants.white,
        boxShadow: "0 0",
      },
      transition: "0.3s",
    },
    inviteUserButton: {
      fontSize: 18,
      border: `2px solid ${constants.newGreen}`,
      width: "100%",
      color: constants.white,
      fontWeight: 900,
      borderRadius: 2,
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
    teamMembersTitle: {
      color: constants.black,
      fontWeight: 900,
    },
    userName: {
      color: constants.gray,
      fontSize: 20,
    },
  };
  // props
  const { open, onClose, team, user, handleRemoveTeam } = props;

  // state
  const [userToInvite, setUserToInvite] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(team);

  // variables
  const api = useAxios();
  const socket = useRef(
    io(constants.serverUrl, {
      username: user?.username,
    })
  );

  // use effects
  useEffect(() => {
    setCurrentTeam({ ...team });
    return;
  }, [team]);

  // methods
  const handleClose = () => {
    setSuccess("");
    setError("");
    setLoading(false);
    setSuccess("");
    setUserToInvite("");
    onClose();
  };

  const handleSetUserToInvite = (e) => {
    setUserToInvite(e.target.value.toLowerCase());
  };

  const handleInviteUser = () => {
    setLoading(true);
    if (userToInvite === "") {
      setError("Must enter a user to invite!");
      setLoading(false);
      return;
    }
    // send socket invite to invite the user
    const notification = {
      user: user?.username,
      userToInv: userToInvite,
      teamId: currentTeam?._id,
      name: currentTeam?.name,
    };
    socket.current.emit("newNotification", notification);
    setSuccess("Invited User!");
    setLoading(false);
    setError("");
    setUserToInvite("");
    return;
  };

  const handleLeaveTeam = () => {
    setLoading(true);
    leaveTeam(api, currentTeam?._id, user?.username).then((res) => {
      if (!res.error) {
        setLoading(false);
        setError("");
        handleRemoveTeam(currentTeam?._id);
        handleClose();
        return;
      }
      setError(res.message);
      setLoading(false);
    });
  };

  const handleKickUser = (teamuser, teamId) => {
    setLoading(true);
    kickUser(api, teamId, teamuser).then((res) => {
      if (!res.error) {
        setLoading(false);
        const playerIndex = currentTeam?.usernames?.indexOf(teamuser);
        const newCurrentTeam = currentTeam;
        newCurrentTeam?.usernames?.splice(playerIndex, 1);
        setCurrentTeam({ ...newCurrentTeam });
        return;
      }
      setLoading(false);
    });
  };

  const renderKickUserButton = (teamuser, teamId) => {
    if (currentTeam?.usernames?.length < 2) {
      return null;
    }

    if (currentTeam?.usernames[0] !== user?.username) {
      return null;
    }

    return (
      <Grid item>
        <Button onClick={() => handleKickUser(teamuser, teamId)}>Kick</Button>
      </Grid>
    );
  };

  if (!team || !user || !currentTeam) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{ color: constants.newGray, fontSize: 26, fontWeight: 900 }}
      >
        {`${currentTeam?.name} `}
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
      <Grid
        container
        alignItems="center"
        direction="column"
        rowSpacing={{ xs: 3 }}
        sx={{ padding: 3 }}
      >
        <Grid item>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
            columnSpacing={{ xs: 1 }}
          >
            <Grid item>
              <TextField
                onChange={handleSetUserToInvite}
                label="Enter Username Here"
                value={userToInvite}
              />
            </Grid>
            <Grid item>
              <Button
                variant="conatined"
                size="small"
                sx={styles.inviteUserButton}
                onClick={handleInviteUser}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Invite"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item alignSelf="start">
          <Grid container direction="column" rowSpacing={{ xs: 1 }}>
            <Grid item>
              <Typography sx={styles.teamMembersTitle}>Team Members</Typography>
            </Grid>
            {currentTeam?.usernames?.map((teamuser, i) => {
              return (
                <Grid item key={i}>
                  <Grid container direction="row">
                    <Grid item>
                      <Typography sx={styles.userName}>{teamuser}</Typography>
                    </Grid>
                    {teamuser !== user?.username
                      ? renderKickUserButton(teamuser, currentTeam._id)
                      : null}
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item sx={{ width: "100%" }}>
          <Button
            disabled={loading}
            variant="contained"
            size="large"
            sx={styles.leaveTeamButton}
            onClick={handleLeaveTeam}
          >
            {loading ? <CircularProgress size={24} /> : "Leave Team"}
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default TeamModal;
