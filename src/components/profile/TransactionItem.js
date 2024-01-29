import { Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { StoreContext } from "../../context/NewStoreContext";
import {
  getFullDateForMatch,
  getTournamentDate,
} from "../../utils/helperMethods";
import createTheme from "../../utils/theme";

const TransactionItem = (props) => {
  const { transaction } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

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
        borderRadius: 2,
        padding: 1,
      }}
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
                {transaction?.type === "valPoints"
                  ? "Valorant Points"
                  : "PayPal"}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.label}>Method</Typography>
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
              <Typography
                sx={{
                  ...styles.value,
                  color: transaction?.transactionId
                    ? theme.green()
                    : transaction?.processed
                    ? theme.green()
                    : theme.complementary(),
                }}
              >
                {transaction?.type === "valPoints"
                  ? transaction?.amount
                  : numFormatter?.format(transaction?.amount)}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.label}>Amount</Typography>
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
              <Typography
                sx={{
                  ...styles.value,
                  color: transaction?.transactionId
                    ? theme.green()
                    : theme.red(),
                }}
              >
                {transaction?.transactionId ? "Deposit" : "Withdraw"}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.label}>Type</Typography>
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
                {getTournamentDate(getFullDateForMatch(transaction?._id))}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.label}>Date</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TransactionItem;
