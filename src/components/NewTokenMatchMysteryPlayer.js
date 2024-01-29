import { useContext } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import { Grid, Typography } from "@mui/material";
import { BsQuestionCircleFill } from "react-icons/bs";

const NewTokenMatchMysteryPlayer = (props) => {
  // variables
  const { team, avatarSize } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  // styles
  const styles = {
    value: {
      fontWeight: 600,
      fontSize: 14,
      color: theme.text(),
    },
    meta: {
      fontWeight: 400,
      fontSize: 16,
      color: team === "blue" ? theme.blue() : theme.red(),
    },
    label: {
      fontSize: 14,
      fontWeight: 400,
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
        paddingBottom: 1,
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
        columnSpacing={{ xs: 2 }}
      >
        <Grid item sx={{ paddingTop: 1 }}>
          <BsQuestionCircleFill
            style={{
              fontSize: 70,
              color: team === "blue" ? theme.blue() : theme.red(),
            }}
          />
        </Grid>

        <Grid item>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="start"
          >
            <Grid item>
              <Typography sx={styles.label}>Username</Typography>
            </Grid>

            <Grid item>
              <Typography sx={styles.value}>Mystery Player</Typography>
            </Grid>

            <Grid item>
              <Typography sx={styles.meta}>Mystery gamertag</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewTokenMatchMysteryPlayer;
