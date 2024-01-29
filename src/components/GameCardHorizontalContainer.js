import { Grid, Paper, Typography } from "@mui/material";
import constants from "../utils/constants";

const GameCardHorizontalContainer = () => {
  const styles = {
    cardHeader: {
      fontSize: 22,
      fontWeight: 900,
      color: constants.white,
    },
    card: {
      borderRadius: 4,
      padding: 1,
      display: "flex",
      flexDirection: "column",
      boxShadow:
        "0px 6px 14px -6px rgba(24, 39, 75, 0.12), 0px 10px 32px -4px rgba(24, 39, 75, 0.1)",
    },
  };
  return (
    <Grid item>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        columnSpacing={{ xs: 1 }}
        rowSpacing={{ xs: 1 }}
      >
        <Grid item xs={12} sm={12} md={6}>
          <Paper
            elevation={0}
            sx={{ ...styles.card, backgroundColor: "#00bbf9" }}
          >
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Typography style={styles.cardHeader}>Fortnite</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Paper
            elevation={0}
            sx={{ ...styles.card, backgroundColor: "#06d6a0" }}
          >
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Typography style={styles.cardHeader}>Valorant</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Paper
            elevation={0}
            sx={{ ...styles.card, backgroundColor: "#ef476f" }}
          >
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Typography style={styles.cardHeader}>Clash Royale</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GameCardHorizontalContainer;
