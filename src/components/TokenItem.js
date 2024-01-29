import { Paper, Typography, Grid, Button } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalStateContext } from "../context/StoreContext";
import constants from "../utils/constants";
import JoinTokenDialog from "./JoinTokenDialog";
import LockIcon from "@mui/icons-material/Lock";

const TokenItem = (props) => {
  const [joinTokenDialogOpen, setJoinTokenDialogOpen] = useState(false);

  const { wager } = props;
  const store = useContext(GlobalStateContext);
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const styles = {
    button: {
      fontWeight: 900,
      borderRadius: 3,
      boxShadow: "0 0",
      width: "100%",
      backgroundColor: constants.newBlue,
      "&:hover": {
        opacity: 0.6,
        backgroundColor: constants.newBlue,
        boxShadow: "0 0",
      },
      transition: "0.3s",
    },
    font: {
      color: constants.newGray,
      fontWeight: 400,
      fontSize: 20,
    },
  };

  const wagerType = (matchType) => {
    switch (matchType) {
      case "ZW":
        return "Zone Wars";
      case "BOX":
        return "Box Fights";
      case "REAL":
        return "Realistics";
      case "PG":
        return "PG/Build Fights";
      case "RACE":
        return "Kill Race";
      case "ARENA_RACE":
        return "Arena Kill Race";
      default:
        return null;
    }
  };

  const wagerPlatform = (consoleOnly) => {
    if (consoleOnly === false) {
      return "All Platforms";
    }
    return "Console Only";
  };

  const wagerTeamSize = (teamSize) => {
    switch (teamSize) {
      case 1:
        return "1v1";
      case 2:
        return "2v2";
      case 3:
        return "3v3";
      case 4:
        return "4v4";
      default:
        return "";
    }
  };

  const handleOpenJoinTokenDialog = () => {
    setJoinTokenDialogOpen(true);
  };

  const handleCloseJoinTokenDialog = () => {
    setJoinTokenDialogOpen(false);
  };

  return (
    <Grid item xs={12} sm={6}>
      <JoinTokenDialog
        open={joinTokenDialogOpen}
        onClose={handleCloseJoinTokenDialog}
        wagerId={wager?._id}
        wager={wager}
      />
      <Paper
        elevation={0}
        onClick={handleOpenJoinTokenDialog}
        sx={{
          display: "flex",
          width: "100%",
          minHeight: 100,
          borderRadius: 3,
          paddingRight: 2,
          paddingLeft: 2,
          paddingTop: 0,
          paddingBottom: 0,
          boxShadow: constants.newBorderRadius,
          borderLeft: `5px solid ${constants.newBlue}`,
          "&:hover": {
            backgroundColor: "#F9FAFC",
            cursor: "pointer",
          },
          transition: "0.3s",
        }}
      >
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item sx={{ padding: 2 }}>
            <Typography
              sx={{ color: constants.newBlue, fontWeight: 900, fontSize: 18 }}
            >
              {`${wagerType(wager?.match_type)} (${wagerTeamSize(
                wager?.team_size
              )})`}{" "}
              {wager?.password == "" || wager?.password == null ? null : (
                <LockIcon sx={{color: constants.newGray, fontSize: 22}} />
              )}
            </Typography>
            <Typography
              variant="h5"
              sx={{ color: constants.newGray, fontWeight: 900, fontSize: 26 }}
            >
              {`${numFormatter.format(wager?.entry_fee)}/player`}
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={styles.font}>{wager?.region}</Typography>
          </Grid>
          <Grid item>
            <Typography
              sx={styles.font}
            >{`First to ${wager?.first_to}`}</Typography>
          </Grid>
          <Grid item>
            <Typography sx={styles.font}>
              {wagerPlatform(wager?.console_only)}
            </Typography>
          </Grid>
          
          <Grid item>
            <Typography sx={{color: constants.red}}>
              {store?.user?.role >= 501 ? wager?.blueteam_users.toString(): null}
            </Typography>
          </Grid>
          {/* <Grid item>
            <Button
              variant="contained"
              size="large"
              sx={styles.button}
              onClick={() => {
                navigate(`/token/join/${wager?._id}/true`);
              }}
            >
              JOIN
            </Button>
          </Grid> */}
        </Grid>
      </Paper>
    </Grid>
  );
};

export default TokenItem;
