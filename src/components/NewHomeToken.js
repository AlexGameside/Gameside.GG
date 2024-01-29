import { Grid, Typography, Paper } from "@mui/material";
import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";

const NewHomeToken = (wager) => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const styles = {
    card: {
      backgroundColor: theme.card(),
      borderRadius: 4,
      padding: 2,
      display: "flex",
      flexDirection: "column",
      boxShadow: theme.shadow(),
    },
    headerText: {
      fontWeight: 900,
      color: theme.text(),
      fontSize: 24,
    },
    subText: {
      fontWeight: 900,
      color: theme.subText(),
      fontSize: 24,
    },
  };

  // variables
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const token = wager?.token;

  // methods
  const determinePlayerAmount = (teamSize) => {
    switch (teamSize) {
      case 1:
        return <FaUserCircle style={{ fontSize: 20, color: theme.blue() }} />;
      case 2:
        return (
          <>
            <FaUserCircle style={{ fontSize: 20, color: theme.blue() }} />
            <FaUserCircle style={{ fontSize: 20, color: theme.green() }} />
          </>
        );
      case 3:
        return (
          <>
            <FaUserCircle style={{ fontSize: 20, color: theme.blue() }} />
            <FaUserCircle style={{ fontSize: 20, color: theme.green() }} />
            <FaUserCircle style={{ fontSize: 20, color: theme.red() }} />
          </>
        );
      case 4:
        return (
          <>
            <FaUserCircle style={{ fontSize: 20, color: theme.blue() }} />
            <FaUserCircle style={{ fontSize: 20, color: theme.green() }} />
            <FaUserCircle style={{ fontSize: 20, color: theme.red() }} />
            <FaUserCircle style={{ fontSize: 20, color: theme.purple() }} />
          </>
        );
    }
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

  return (
    <Grid item xs={6}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Paper elevation={0} sx={styles.card}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              columnSpacing={{ xs: 1 }}
            >
              <Grid item>
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="start"
                >
                  <Grid item sx={{ width: "100%" }}>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography style={styles.headerText}>
                          {numFormatter.format(token?.entry_fee)}{" "}
                          {wagerType(token?.match_type)}
                        </Typography>
                      </Grid>
                      <Grid item>
                        {determinePlayerAmount(token?.team_size)}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      columnSpacing={{ xs: 1 }}
                    >
                      <Grid item>
                        <Typography style={styles.subText}>
                          {token?.region}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          style={styles.subText}
                        >{`First to ${token?.first_to}`}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography style={styles.subText}>
                          {token?.console_only
                            ? "Console Only"
                            : "All Platforms"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewHomeToken;
