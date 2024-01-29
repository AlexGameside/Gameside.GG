import { useContext } from "react";
import { StoreContext } from "../../context/NewStoreContext";
import createTheme from "../../utils/theme";
import { Grid, Skeleton } from "@mui/material";

const HomeTournamentGlimmer = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  return (
    <Grid item sx={{ borderRadius: 2, padding: 1 }}>
      <Grid
        container
        direction="column"
        alignItems="start"
        justifyContent="center"
        gap={{ xs: 1 }}
      >
        <Grid item>
          <Skeleton
            variant="rectangular"
            height={190}
            width={336}
            sx={{ bgcolor: theme.skeleton(), borderRadius: 2 }}
          />
        </Grid>

        <Grid item>
          <Skeleton
            variant="rectangular"
            height={15}
            width={150}
            sx={{ bgcolor: theme.skeleton(), marginBottom: 1 }}
          />

          <Grid item>
            <Skeleton
              variant="rectangular"
              height={15}
              width={150}
              sx={{ bgcolor: theme.skeleton() }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomeTournamentGlimmer;
