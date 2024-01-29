import { Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { StoreContext } from "../../context/NewStoreContext";
import {
  getFullDateForMatch,
  getMatchType,
  getTimeForMatch,
  getTournamentDate,
} from "../../utils/helperMethods";
import createTheme from "../../utils/theme";

const ScrimHistoryItem = (props) => {
  const { scrim } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const styles = {
    label: {
      fontSize: 12,
      color: theme.metaText(),
      fontWeight: 600,
    },
    value: {
      fontSize: 15,
      fontWeight: 400,
      color: theme.text(),
    },
  };

  return (
    <Grid
      item
      sx={{
        width: "100%",
        boxSizing: "border-box",
        padding: 1,
        borderRadius: 2,
        backgroundColor: "transparent",
        "&:hover": {
          cursor: "pointer",
          backgroundColor: theme.cardHover(),
        },
      }}
      onClick={() => window.open(scrim?.wager_id, "_blank")}
    >
      <Grid container justifyContent="start" alignItems="center">
        <Grid item xs={3}>
          <Grid
            container
            direction="column"
            alignItems="start"
            justifyContent="center"
          >
            <Grid item>
              <Typography sx={{ ...styles.value, color: theme.primary() }}>
                {scrim?.game_mode === "VOTE"
                  ? "Pick-and-Ban"
                  : getMatchType(scrim?.game_mode)}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.label}>Map</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={3}>
          <Grid
            container
            direction="column"
            alignItems="start"
            justifyContent="center"
          >
            <Grid item>
              <Typography sx={styles.value}>
                {scrim?.team_size}v{scrim?.team_size}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.label}>Team Size</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={3}>
          <Grid
            container
            direction="column"
            alignItems="start"
            justifyContent="center"
          >
            <Grid item>
              <Typography sx={styles.value}>
                {scrim?.status === "CANCEL"
                  ? "Canceled"
                  : scrim?.status === store?.user?.username
                  ? "Win"
                  : "Loss"}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.label}>Status</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={3}>
          <Grid
            container
            direction="column"
            alignItems="end"
            justifyContent="center"
          >
            <Grid item>
              <Typography sx={styles.value}>
                {/* {getTournamentDate(getFullDateForMatch(scrim?._id))} */}
                {getTimeForMatch(scrim?._id)}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.label}>Time</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ScrimHistoryItem;
