import {
  Grid,
  Paper,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import MatchToolsDialog from "../MatchToolsDialog";
import constants from "../../utils/constants";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

<Typography sx={{ color: constants.newBlue, fontSize: 10, fontWeight: 900 }}>
  Coming Soon!
</Typography>;

const WagerModTools = (props) => {
  const styles = {
    modButton: {
      width: "100%",
      border: `2px solid ${constants.newGray}`,
      color: constants.newGray,
      fontWeight: 900,
      borderRadius: 3,
      fontSize: 14,
      boxShadow: "0 0",
      backgroundColor: constants.white,
      "&:hover": {
        backgroundColor: constants.newGray,
        color: constants.white,
        boxShadow: "0 0",
      },
      transition: "0.3s",
    },
    vote: {
      width: "100%",
      border: `2px solid ${constants.newGray}`,
      color: constants.newGray,
      fontWeight: 900,
      borderRadius: 3,
      fontSize: 14,
      boxShadow: "0 0",
      backgroundColor: constants.white,
      "&:hover": {
        backgroundColor: constants.newGray,
        color: constants.white,
        boxShadow: "0 0",
      },
      transition: "0.3s",
    },
    voted: {
      width: "100%",
      border: `2px solid ${constants.newGray}`,
      color: constants.newGray,
      fontWeight: 900,
      borderRadius: 3,
      fontSize: 12,
      boxShadow: "0 0",
      backgroundColor: constants.newGreen,
    },
  };

  const {
    user,
    wagerId,
    wagerState,
    resetCurrentToken,
    loading,
    cancelCurrentToken,
    openMatchToolsDialog,
    handleCloseMatchToolsDialog,
    handleOpenMatchToolsDialog,
    currentWagerStatus,
    onClickVoteToCancel,
    agreedUsers,
    voteLoading,
  } = props;

  const navigate = useNavigate();

  // state

  // methods
  const renderVoteToCancelButton = (wagerStatus) => {
    const isBlueTeam = currentWagerStatus?.blue_users?.includes(user?.username);
    const isRedTeam = currentWagerStatus?.red_users?.includes(user?.username);

    if (wagerStatus !== 2 && wagerStatus !== 4) {
      return null;
    } else {
      if (!isRedTeam && !isBlueTeam) {
        return null;
      }
      return (
        <Grid item>
          <Button
            disabled={agreedUsers?.includes(user?.username)}
            variant="contained"
            size="large"
            sx={
              agreedUsers?.includes(user?.username)
                ? styles.voted
                : styles.modButton
            }
            onClick={onClickVoteToCancel}
          >
            {agreedUsers?.includes(user?.username) ? (
              "Voted!"
            ) : voteLoading ? (
              <CircularProgress size={24} />
            ) : (
              "Vote to Cancel"
            )}
          </Button>
        </Grid>
      );
    }
  };

  return (
    <Grid item sx={{ width: "100%" }}>
      <Paper
        elevation={1}
        sx={{
          borderRadius: 2,
          padding: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          columnSpacing={{ xs: 1, sm: 2 }}
          sx={{ width: "100%" }}
        >
          <Grid item alignSelf="start">
            <IconButton
              component="span"
              size="large"
              sx={styles.modButton}
              onClick={() => navigate("/")}
            >
              <HomeIcon />
            </IconButton>
          </Grid>
          {renderVoteToCancelButton(wagerState)}
          {user?.role < 200 ? null : (
            <>
              {wagerState === -1 ? null : (
                <Grid item>
                  <Button
                    disabled={loading}
                    onClick={() => resetCurrentToken()}
                    sx={styles.modButton}
                    variant="contained"
                    size="large"
                  >
                    {loading ? <CircularProgress size={24} /> : "Reset Token"}
                  </Button>
                </Grid>
              )}
              {wagerState === 3 || wagerState === -1 ? null : (
                <Grid item>
                  <Button
                    disabled={loading}
                    sx={styles.modButton}
                    variant="contained"
                    size="large"
                    onClick={() => {
                      cancelCurrentToken();
                    }}
                  >
                    Cancel Token
                  </Button>
                </Grid>
              )}
              {wagerState === 1 || wagerState === 0 ? null : (
                <Grid item>
                  <Button
                    variant="contained"
                    size="large"
                    sx={styles.modButton}
                    onClick={handleOpenMatchToolsDialog}
                    endIcon={<SettingsIcon />}
                  >
                    Tools
                  </Button>
                </Grid>
              )}
              <MatchToolsDialog
                open={openMatchToolsDialog}
                onClose={handleCloseMatchToolsDialog}
                currentWagerStatus={currentWagerStatus}
              />
            </>
          )}
        </Grid>
      </Paper>
    </Grid>
  );
};

export default WagerModTools;
