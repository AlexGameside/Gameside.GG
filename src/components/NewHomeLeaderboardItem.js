import { Typography, Grid, Paper, useMediaQuery } from "@mui/material";
import { useContext } from "react";
import { StoreContext } from "../context/NewStoreContext";
import Avatar from "avataaars";
import createTheme from "../utils/theme";
import { FaTrophy } from "react-icons/fa";

const NewHomeLeaderboardItem = (props) => {
  // variables
  const { avatar, username, rank, earnings } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // methods
  const determineRank = (rankNum) => {
    switch (rankNum) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
    }
  };

  const determineColor = (rankNum) => {
    switch (rankNum) {
      case 1:
        return "#FFD700";
      case 2:
        return "#bdbdbd";
      case 3:
        return "#cd7f32";
    }
  };

  // styles
  const styles = {
    card: {
      backgroundColor: theme.card(),
      borderRadius: 4,
      padding: isDesktop ? 2 : 1,
      display: "flex",
      flexDirection: "column",
      boxShadow: theme.shadow(),
    },
    position: {
      fontWeight: 900,
      fontSize: 34,
      color: determineColor(rank),
    },
    username: {
      fontWeight: 900,
      fontSize: 24,
      color: theme.text(),
    },
    earnings: {
      fontWeight: 900,
      fontSize: 24,
      color: theme.green(),
    },
    earningsLabel: {
      fontWeight: 900,
      fontSize: 24,
      color: theme.subText(),
    },
  };

  return (
    <Grid item>
      <Paper elevation={0} sx={styles.card}>
        <Grid
          container
          direction="row"
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Typography sx={styles.position}>
              {rank}
              <sup>{determineRank(rank)}</sup>
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              style={{ width: 70, height: 70 }}
              avatarStyle="Circle"
              {...avatar}
            />
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <Typography sx={styles.username}>{username}</Typography>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  columnSpacing={{ xs: 1 }}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography sx={styles.earningsLabel}>Prize: </Typography>
                  </Grid>
                  <Grid item>
                    <Typography sx={styles.earnings}>
                      {numFormatter.format(earnings)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <FaTrophy style={{ color: determineColor(rank), fontSize: 40 }} />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default NewHomeLeaderboardItem;
