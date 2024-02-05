import { Grid, Paper, Typography, LinearProgress } from "@mui/material";
import constants from "../../utils/constants";
import { useEffect, useContext, useState } from "react";
import { getTransactions, getWithdrawals } from "../../utils/API";
import useAxios from "../../utils/useAxios";
import { useNavigate } from "react-router-dom";

const Transactions = (props) => {
  const navigate = useNavigate();
  const { user } = props;
  const api = useAxios();
  // props

  const [transactions, setTransactions] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/valorant/profile");
      return;
    }
    getTransactions(api, user?.username).then((res) => {
      if (!res?.error) {
        setTransactions(res?.transactions);
      }
      return;
    });

    getWithdrawals(api, user?.username).then((res) => {
      if (!res?.error) {
        setWithdrawals(res?.withdrawals);
      }
      return;
    });
  }, [user]);

  const beforeTransactions = transactions?.concat(withdrawals);

  const formatDate = (today) => {
    const parseDbDate = Date.parse(today);
    const newDate = new Date(parseDbDate);
    const fixedDate = newDate.toDateString();
    const formattedDate = fixedDate.split(" ");
    const dateToString = newDate.toString();
    const getTimeVar = dateToString.split(" ");
    const hoursMinutes = getTimeVar[4].split(":");
    const finalFixedDate =
      formattedDate[1] +
      " " +
      formattedDate[2] +
      ", " +
      hoursMinutes[0] +
      ":" +
      hoursMinutes[1] +
      " " +
      formattedDate[3];
    return finalFixedDate;
  };

  var allTransactions = beforeTransactions?.slice()?.sort((a, b) => {
    const aDate = a?.date ?? formatDate(a?.time);
    const bDate = b?.date ?? formatDate(b?.time);

    return new Date(bDate) - new Date(aDate);
  });

  const styles = {
    historyTitle: {
      fontWeight: 900,
      fontSize: 24,
      color: constants.black,
      textAlign: "center",
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
    withdraw: {
      color: constants.red,
      fontWeight: 900,
      fontSize: 18,
    },
    deposit: {
      color: constants.green,
      fontWeight: 900,
      fontSize: 18,
    },
  };

  // variables
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <>
      <Grid container direction="column" rowSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item>
          <Paper
            elevation={2}
            sx={{
              borderRadius: 3,
              padding: 4,
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Grid item alignSelf="start">
              <Typography sx={styles.historyTitle}>
                Transaction History
              </Typography>
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
                  <Typography sx={styles.metaLabels}>Amount</Typography>
                </Grid>
                <Grid item>
                  <Typography sx={styles.metaLabels}>Transaction ID</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item>
          <Grid
            container
            direction="column"
            rowSpacing={{ xs: 1 }}
            sx={{ paddingBottom: 5 }}
          >
            {allTransactions?.length < 1 ? (
              <Grid item sx={{ width: "100%" }}>
                <LinearProgress />
              </Grid>
            ) : (
              allTransactions?.map((transaction, i) => {
                return (
                  <Grid item>
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
                          <Typography sx={styles.metaValues}>
                            {transaction?.date ?? formatDate(transaction?.time)}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            sx={
                              transaction?.paypal
                                ? styles.withdraw
                                : styles.deposit
                            }
                          >
                            {numFormatter.format(transaction?.amount)}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography sx={styles.metaValues}>
                            {transaction?.transactionId ?? transaction?.paypal}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                );
              })
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Transactions;
