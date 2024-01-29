import createTheme from "../utils/theme";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/NewStoreContext";
import {
  Grid,
  Typography,
  Chip,
  useMediaQuery,
  Divider,
  Paper,
} from "@mui/material";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getDateForMatch, getTimeForMatch } from "../utils/helperMethods";

const NewTransactions = () => {
  // variables
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const isMobile = useMediaQuery("(max-width:500px)");
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // state
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [transactions, setTransactions] = useState([]);

  // methods
  const handleChangePage = (direction) => {
    if (direction === "left") {
      if (pageNum === 1) {
        return;
      }
      setPageNum(pageNum - 1);
      setIndex(index - 10);
      return;
    } else {
      if (transactions?.length < 10) {
        return;
      }
      if (pageNum === Math.ceil(transactions?.length / 10)) {
        return;
      }
      setPageNum(pageNum + 1);
      setIndex(index + 10);
    }
  };

  const getDividerItem = (i) => {
    if (i === 9 || i === transactions?.length - 1) {
      return null;
    }
    return (
      <Grid item sx={{ width: "100%" }} key={i + 1}>
        <Divider sx={{ backgroundColor: theme.subText() }} />
      </Grid>
    );
  };

  // effects
  useEffect(() => {
    if (store?.user) {
      const allData = store?.user?.withdrawData?.concat(
        store?.user?.depositData
      );
      if (allData?.length < 1) return;
      const transactions = allData.sort(
        (a, b) =>
          new Date(getDateForMatch(b?._id)) - new Date(getDateForMatch(a?._id))
      );
      setTransactions(transactions);
      setLoading(false);
    }
  }, [store?.user]);

  // styles
  const styles = {
    card: {
      backgroundColor: theme.card(),
      borderRadius: 6,
      padding: 2,
      boxShadow: theme.shadow(),
      minWidth: isDesktop ? 250 : 0,
    },
    teamsTitle: {
      fontSize: 36,
      fontWeight: 900,
      color: theme.text(),
    },
    label: {
      fontSize: 20,
      fontWeight: 900,
      color: theme.subText(),
    },
    value: {
      fontSize: 18,
      fontWeight: 900,
      color: theme.text(),
    },
    entry: {
      fontSize: 18,
      fontWeight: 900,
      color: theme.green(),
    },
    link: {
      fontSize: 18,
      fontWeight: 900,
      color: theme.blue(),
    },
    chevron: {
      fontSize: 30,
      color: theme.text(),
    },
    iconContainer: {
      transition: "all .2s ease-in-out",
      "&:hover": {
        cursor: "pointer",
        transform: "scale(1.1)",
      },
    },
    disabled: {
      color: theme.subText(),
      fontSize: 30,
    },
  };

  return loading ? null : (
    <Grid
      container
      direction="column"
      alignItems="start"
      justifyContent="center"
      rowSpacing={{ xs: 1 }}
      sx={{
        paddingLeft: isMobile ? 1 : isDesktop ? "10%" : "5%",
        paddingRight: isMobile ? 1 : isDesktop ? "10%" : "5%",
        marginBottom: isDesktop ? 0 : 2,
      }}
    >
      <Grid item sx={{ width: "100%" }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="start"
          rowSpacing={{ xs: 1 }}
          sx={{ width: "100%" }}
        >
          <Grid item sx={{ paddingLeft: 1 }}>
            <Typography style={styles.teamsTitle}>Transactions</Typography>
          </Grid>

          {isDesktop ? (
            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  paddingLeft: 2,
                  paddingRight: 2,
                }}
              >
                <Grid item xs={12} sm={12} md={2}>
                  <Typography sx={styles.label}>Method</Typography>
                </Grid>

                <Grid item xs={12} sm={12} md={2}>
                  <Typography sx={styles.label}>Amount</Typography>
                </Grid>

                <Grid item xs={12} sm={12} md={3}>
                  <Typography sx={styles.label}>Date</Typography>
                </Grid>

                <Grid item xs={12} sm={12} md={2}>
                  <Typography sx={styles.label}>Type</Typography>
                </Grid>

                <Grid item xs={12} sm={12} md={3} sx={{ textAlign: "right" }}>
                  <Typography sx={styles.label}>Email/Cash Tag</Typography>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </Grid>

      <Grid item sx={{ width: "100%" }}>
        <Paper sx={styles.card}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            rowSpacing={{ xs: 1 }}
          >
            {transactions?.slice(index, index + 10)?.map((transaction, i) => {
              return (
                <>
                  <Grid item sx={{ width: "100%" }} key={i}>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item md={2}>
                        <Chip
                          label={
                            transaction?.currency == null ? "Cash App" : "Bank"
                          }
                          sx={{
                            color:
                              transaction?.currency == null
                                ? theme.green()
                                : theme.blue(),
                            backgroundColor: "transparent",
                            fontSize: 18,
                            fontWeight: 900,
                            border: `2px solid ${
                              transaction?.currency == null
                                ? theme.green()
                                : theme.blue()
                            }`,
                          }}
                          size="large"
                        />
                      </Grid>

                      <Grid item md={2}>
                        <Typography
                          sx={{
                            fontSize: 18,
                            fontWeight: 900,
                            color: transaction?.transactionId
                              ? theme.green()
                              : transaction?.processed
                              ? theme.green()
                              : "#FFD700",
                          }}
                        >
                          {numFormatter.format(transaction?.amount)}
                        </Typography>
                      </Grid>

                      <Grid item md={3}>
                        <Typography sx={styles.value}>
                          {getDateForMatch(transaction?._id)}{" "}
                          <span
                            style={{
                              color: theme.subText(),
                              fontWeight: 500,
                            }}
                          >
                            ({getTimeForMatch(transaction?._id)})
                          </span>
                        </Typography>
                      </Grid>

                      <Grid item md={2}>
                        <Typography
                          sx={{
                            fontSize: 18,
                            fontWeight: 900,
                            color: transaction?.transactionId
                              ? theme.green()
                              : theme.red(),
                          }}
                        >
                          {transaction?.transactionId ? "Deposit" : "Withdraw"}
                        </Typography>
                      </Grid>

                      <Grid
                        item
                        md={3}
                        sx={{
                          fontSize: 18,
                          fontWeight: 900,
                          color:
                            transaction?.currency == null
                              ? theme.green()
                              : theme.blue(),
                          textAlign: "right",
                        }}
                      >
                        <Typography sx={styles.link}>
                          {transaction?.transactionId
                            ? transaction?.email
                            : transaction?.paypal}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  {getDividerItem(i)}
                </>
              );
            })}
          </Grid>
        </Paper>

        <Grid item sx={{ width: "100%", textAlign: "center", marginTop: 2 }}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            columnSpacing={{ xs: 1 }}
          >
            <Grid
              item
              sx={pageNum === 1 ? null : styles.iconContainer}
              onClick={() => handleChangePage("left")}
            >
              <FaChevronLeft
                style={pageNum === 1 ? styles.disabled : styles.chevron}
              />
            </Grid>
            <Grid item>
              <Typography
                sx={{
                  color: theme.text(),
                  fontSize: 22,
                  fontWeight: 900,
                  paddingBottom: 0.5,
                }}
              >{`${pageNum}/${Math.ceil(
                transactions?.length / 10
              )}`}</Typography>
            </Grid>
            <Grid
              item
              sx={
                pageNum === Math.ceil(transactions?.length / 10) ||
                transactions?.length < 10
                  ? null
                  : styles.iconContainer
              }
              onClick={() => handleChangePage("right")}
            >
              <FaChevronRight
                style={
                  pageNum === Math.ceil(transactions?.length / 10) ||
                  transactions?.length < 10
                    ? styles.disabled
                    : styles.chevron
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewTransactions;
