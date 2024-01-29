import { Grid, Skeleton } from "@mui/material";
import { useContext } from "react";
import { StoreContext } from "../../../context/NewStoreContext";
import createTheme from "../../../utils/theme";

const PlayerGlimmer = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  return (
    <Grid
      item
      sx={{
        boxSizing: "border-box",
        minWidth: "100%",
        borderRadius: 2,
        border: `1px solid ${theme.border()}`,
        backgroundColor: theme.cardDark(),
        height: 65,
      }}
    >
      <Grid
        container
        justifyContent="start"
        alignItems="center"
        gap={{ xs: 2 }}
        sx={{
          height: "100%",
          paddingTop: 0.5,
          paddingBottom: 0.5,
          paddingLeft: 1,
        }}
      >
        <Grid item>
          <Skeleton
            variant="circular"
            sx={{ height: 50, width: 50, bgcolor: theme.border() }}
          />
        </Grid>

        <Grid item>
          <Grid
            container
            direction="column"
            alignItems="start"
            justifyContent="center"
          >
            <Grid item>
              <Skeleton
                variant="text"
                sx={{ height: 15, width: 100, bgcolor: theme.border() }}
              />
            </Grid>
            <Grid item>
              <Skeleton
                variant="text"
                sx={{ height: 15, width: 200, bgcolor: theme.border() }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PlayerGlimmer;
