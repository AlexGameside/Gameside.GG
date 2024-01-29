import { CircularProgress, Grid, Typography, Divider } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { FaPiggyBank } from "react-icons/fa";
import { StoreContext } from "../../../../../context/NewStoreContext";
import SectionHeader from "../../../../../custom_components/SectionHeader";
import { getUserDeposits } from "../../../../../utils/api/admin";
import createTheme from "../../../../../utils/theme";
import useAxios from "../../../../../utils/useAxios";
import TransactionItem from "../../../TransactionItem";

const StaffPanelSearchUserDeposits = (props) => {
  const { username } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const api = useAxios();

  const [loading, setLoading] = useState(true);
  const [deposits, setDeposits] = useState(null);

  useEffect(() => {
    if (deposits == null) {
      getUserDeposits(api, username).then((res) => {
        setLoading(false);
        if (!res?.error) {
          setDeposits(res?.deposits);
        }
      });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <Grid item sx={{ width: "100%" }}>
      <Grid
        container
        direction="column"
        alignItems="start"
        justifyContent="center"
        gap={{ xs: 2 }}
      >
        {loading ? (
          <Grid item alignSelf="center" sx={{ marginTop: 10 }}>
            <CircularProgress size={50} sx={{ color: theme.primary() }} />
          </Grid>
        ) : null}

        {!loading && deposits?.length > 0 ? (
          <>
            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                sx={{ width: "100%" }}
              >
                <Grid item>
                  <SectionHeader label="Withdrawals" />
                </Grid>
              </Grid>
            </Grid>

            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                direction="column"
                alignItems="start"
                justifyContent="center"
                gap={{ xs: 1 }}
              >
                {deposits?.map((deposit, i) => {
                  return (
                    <>
                      <TransactionItem key={i} transaction={deposit} />

                      {i === deposits?.length - 1 ? null : (
                        <Grid item sx={{ width: "100%" }}>
                          <Divider sx={{ backgroundColor: theme.border() }} />
                        </Grid>
                      )}
                    </>
                  );
                })}
              </Grid>
            </Grid>
          </>
        ) : null}

        {deposits?.length < 1 && !loading ? (
          <Grid item alignSelf="center" sx={{ width: "100%", marginTop: 4 }}>
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <FaPiggyBank
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
                  No Deposits!
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
                  When a user deposits, it will appear here.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default StaffPanelSearchUserDeposits;
