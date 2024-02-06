import { Grid, Paper, Typography } from "@mui/material";
import constants from "../../utils/constants";

const History = (props) => {
  // props
  const { history } = props;

  if (!history) {
    return null;
  }

  const styles = {
    historyTitle: {
      fontWeight: 900,
      fontSize: 24,
      color: constants.black,
    },
    metaLabels: {
      color: constants.lightGray,
      fontWeight: 900,
      fontSize: 18,
    },
    metaValues: {
      color: constants.gray,
      fontWeight: 900,
      fontSize: 18,
    },
    priceLabel: {
      color: constants.newOrange,
      fontWeight: 900,
      fontSize: 18,
    },
    historyItem: {
      "&:hover": {
        backgroundColor: "#eeeeee",
        cursor: "pointer",
      },
      transition: "0.3s",
    },
  };

  // variables
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <>
      <Grid
        container
        direction="column"
        rowSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ marginBottom: 5 }}
      >
        <Grid item>
          <Paper
            elevation={1}
            sx={{
              borderRadius: 3,
              padding: 4,
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Grid item>
              <Typography sx={styles.historyTitle}>Token History</Typography>
            </Grid>
            <Grid item>
              <Grid
                container
                direction="row"
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography sx={styles.metaLabels}>Date</Typography>
                </Grid>
                <Grid item>
                  <Typography sx={styles.metaLabels}>Entry Fee</Typography>
                </Grid>
                <Grid item>
                  <Typography sx={styles.metaLabels}>Game Mode</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item>
          <Grid container direction="column-reverse" rowSpacing={{ xs: 1 }}>
            {history?.reverse()?.map((match, i) => {
              const date = `${match?.date?.split(" ")[0]} ${
                match?.date?.split(" ")[1]
              } ${match?.date?.split(" ")[2]}`;
              const splitId = match?.wager_id?.split("/");
              splitId?.splice(3, 1, "token");
              const matchId = splitId?.join("/")?.split("token/")[1];
              const url = `${constants.clientUrl}/token/${matchId}`;
              return (
                <Grid item key={i}>
                  <Paper
                    elevation={2}
                    sx={{
                      borderRadius: 3,
                      padding: 2,
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      borderLeft: `5px solid ${constants.newBlue}`,
                      boxSizing: "border-box",
                      ...styles.historyItem,
                    }}
                    onClick={() => {
                      // navigate to the match on the history
                      window.location = url;
                    }}
                  >
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                      <Grid item>
                        <Typography sx={styles.metaValues}>{date}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography sx={styles.priceLabel}>
                          {numFormatter.format(match?.entry_fee)}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography sx={styles.metaValues}>
                          {match?.game_mode}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default History;
