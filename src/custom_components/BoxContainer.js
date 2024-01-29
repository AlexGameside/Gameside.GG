import { useContext } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import { Grid, Typography } from "@mui/material";

const BoxContainer = (props) => {
  const { label, value, children } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const styles = {
    container: {
      borderRadius: 2,
      paddingTop: 2,
      paddingBottom: 2,
      backgroundColor: theme.cardDark(),
      minWidth: 125,
      border: `1px solid ${theme.border()}`,
    },
    label: {
      fontSize: 15,
      fontWeight: 500,
      color: theme.metaText(),
    },
    value: {
      fontSize: 15,
      fontWeight: 600,
      color: theme.text(),
    },
  };

  return (
    <Grid item sx={styles.container}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>{children}</Grid>

            <Grid item>
              <Typography sx={styles.value}>{value}</Typography>
            </Grid>

            <Grid item>
              <Typography sx={styles.label}>{label}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BoxContainer;
