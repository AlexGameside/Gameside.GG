import { Grid, Button, Typography } from "@mui/material";
import constants from "../utils/constants";

const Notification = (props) => {
  const styles = {
    title: {
      color: constants.newGray,
      fontSize: 18,
      fontWeight: 900,
    },
    text: {
      color: constants.newGray,
      fontWeight: 200,
      fontSize: 16,
    },
    container: {
      padding: 1,
    },
    joinButton: {
      border: `2px solid ${constants.newBlue}`,
      width: "100%",
      color: constants.white,
      fontWeight: 900,
      borderRadius: 3,
      boxShadow: "0 0",
      backgroundColor: constants.newBlue,
      "&:hover": {
        backgroundColor: constants.newBlue,
        opacity: 0.7,
        color: constants.white,
        boxShadow: "0 0",
      },
      transition: "0.3s",
    },
    declineButton: {
      width: "100%",
      border: `2px solid ${constants.newOrange}`,
      color: constants.newOrange,
      fontWeight: 900,
      borderRadius: 3,
      boxShadow: "0 0",
      backgroundColor: constants.white,
      "&:hover": {
        backgroundColor: constants.newOrange,
        color: constants.white,
        boxShadow: "0 0",
      },
      transition: "0.3s",
    },
  };

  const { notif, joinTeam, declineTeam, buttonsDisabled } = props;

  return (
    <Grid item sx={styles.container}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="start"
      >
        <Grid item>
          <Typography sx={styles.title}>Team Invite</Typography>
        </Grid>
        <Grid item>
          <Typography sx={styles.text}>{notif?.text}</Typography>
        </Grid>
        <Grid item sx={{ width: "100%", marginTop: 1 }}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Button
                onClick={() => joinTeam(notif)}
                sx={styles.joinButton}
                variant="contained"
                size="small"
                disabled={buttonsDisabled}
              >
                JOIN
              </Button>
            </Grid>
            <Grid item>
              <Button
                sx={styles.declineButton}
                variant="contained"
                size="small"
                onClick={() => declineTeam(notif)}
                disabled={buttonsDisabled}
              >
                Decline
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Notification;
