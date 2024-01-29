import { Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/NewStoreContext";
import Header from "../../custom_components/Header";
import SectionHeader from "../../custom_components/SectionHeader";
import { getTournamentDate } from "../../utils/helperMethods";
import createTheme from "../../utils/theme";

const Premium = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (store?.user) {
      setLoading(false);
    }
  }, [store?.user]);

  return loading ? null : (
    <Grid
      container
      direction="column"
      alignItems="start"
      justifyContent="center"
      gap={{ xs: 2 }}
    >
      <Grid item sx={{ width: "100%" }}>
        <Header label={"Premium"} />
      </Grid>

      <Grid
        item
        sx={{
          width: "100%",
          borderRadius: 2,
          backgroundColor: theme.cardDark(),
          padding: 2,
          border: `1px solid ${theme.border()}`,
        }}
      >
        <Grid
          container
          direction="column"
          alignItems="start"
          justifyContent="center"
          gap={{ xs: 1 }}
        >
          <Grid item>
            <SectionHeader label="Active Subscriptions" />
          </Grid>

          <Grid item>
            {store?.user?.connections[5]?.active !== true ? (
              <Typography
                sx={{ fontSize: 15, fontWeight: 400, color: theme.metaText() }}
              >
                No Active Subscriptions!
              </Typography>
            ) : (
              <Typography
                sx={{ fontSize: 15, fontWeight: 400, color: theme.metaText() }}
              >
                Premium expires:{" "}
                <span style={{ color: theme.primary() }}>
                  {getTournamentDate(
                    store?.user?.connections[5]?.expire_timestamp
                  )}
                </span>
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Premium;
