import { useContext } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import { Grid, Typography, CircularProgress, Skeleton } from "@mui/material";

const NewTokenMatchReadyPlayer = (props) => {
  // variables
  const { avatarSize, team, isReadied, isReadyLoading, user } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  // methods

  // styles
  const styles = {
    username: {
      fontSize: 14,
      fontWeight: 400,
      color: theme.metaText(),
    },
    readyUsername: {
      fontWeight: 600,
      fontSize: 16,
      color: theme.green(),
    },
    notReadyUsername: {
      fontWeight: 600,
      fontSize: 16,
      color: theme.metaText(),
    },
  };

  return (
    <Grid
      item
      sx={{
        width: "100%",
        border: `2px solid ${theme.border()}`,
        borderRadius: 2,
        paddingLeft: 2,
        paddingRight: 2,
        paddingTop: 1,
        backgroundColor: theme.background(),
        position: "relative",
        height: 97,
      }}
    >
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="start"
        columnSpacing={{ xs: 1 }}
      >
        <Grid item>
          <Skeleton
            variant="circular"
            width={75}
            height={75}
            sx={{ bgcolor: theme.skeleton() }}
          />
        </Grid>

        <Grid item>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="start"
            rowSpacing={{ xs: 1 }}
          >
            <Grid item>
              <Typography sx={styles.username}>
                {team === "blue" ? "Blue Player" : "Red Player"}
              </Typography>
            </Grid>
            <Grid item>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                columnSpacing={{ xs: 2 }}
              >
                <Grid item>
                  <Typography
                    sx={
                      isReadied ? styles.readyUsername : styles.notReadyUsername
                    }
                  >
                    {isReadyLoading &&
                    !isReadied &&
                    store?.user?.username === user ? (
                      <CircularProgress
                        size={16}
                        sx={{
                          color: theme.subText(),
                        }}
                      />
                    ) : isReadied ? (
                      "Ready"
                    ) : (
                      "Not Ready"
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewTokenMatchReadyPlayer;
