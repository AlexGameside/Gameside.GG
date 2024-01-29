import { Divider, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MdCompareArrows } from "react-icons/md";
import { StoreContext } from "../../context/NewStoreContext";
import Header from "../../custom_components/Header";
import { getDateForMatch } from "../../utils/helperMethods";
import createTheme from "../../utils/theme";
import TransactionItem from "./TransactionItem";

const Wallet = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // state
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState(null);

  // methods

  // effects
  useEffect(() => {
    if (store?.user) {
      setLoading(false);
    }
  }, [store]);

  useEffect(() => {
    if (store?.user) {
      const allData = store?.user?.withdrawData?.concat(
        store?.user?.depositData
      );
      if (allData?.length < 1) {
        setLoading(false);
        return;
      }
      if (transactions) {
        setLoading(false);
        return;
      }

      const newTransactions = allData.sort(
        (a, b) =>
          new Date(getDateForMatch(b?._id)) - new Date(getDateForMatch(a?._id))
      );
      setTransactions(newTransactions);
      setLoading(false);
    }
  }, [store?.user]);

  // styles
  const styles = {
    label: {
      fontSize: 16,
      fontWeight: 400,
      color: theme.text(),
    },
  };

  return loading ? null : (
    <Grid
      container
      direction="column"
      alignItems="start"
      justifyContent="center"
      gap={{ xs: 2 }}
    >
      <Grid item sx={{ width: "100%" }}>
        <Header label={"Transactions"} />
      </Grid>

      {transactions?.length < 1 || transactions == null ? (
        <Grid item alignSelf="center">
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <MdCompareArrows
                style={{ fontSize: 40, color: theme.metaText() }}
              />
            </Grid>

            <Grid item>
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: theme.metaText(),
                }}
              >
                No Transactions Yet!
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: theme.metaText(),
                }}
              >
                All of your deposits and withdrawals will appear here.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid
          item
          sx={{
            width: "100%",
            padding: 1,
            borderRadius: 2,
            backgroundColor: theme.card(),
          }}
        >
          <Grid
            container
            direction="column"
            alignItems="start"
            justifyContent="center"
            gap={{ xs: 0.5 }}
          >
            {transactions?.map((transaction, i) => {
              return (
                <>
                  <TransactionItem key={i} transaction={transaction} />

                  {i === transactions?.length - 1 ? null : (
                    <Grid item sx={{ width: "100%" }}>
                      <Divider sx={{ backgroundColor: theme.border() }} />
                    </Grid>
                  )}
                </>
              );
            })}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default Wallet;
