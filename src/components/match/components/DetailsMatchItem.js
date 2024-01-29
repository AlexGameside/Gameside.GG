import { Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { StoreContext } from "../../../context/NewStoreContext";
import createTheme from "../../../utils/theme";

const DetailsMatchItem = (props) => {
  const { label, value, entry = false, prize = false } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const styles = {
    label: {
      fontSize: 11,
      fontWeight: 600,
      color: theme.metaText(),
    },
    value: {
      fontSize: 15,
      fontWeight: 400,
      color: entry
        ? theme.complementary()
        : prize
        ? theme.green()
        : theme.text(),
    },
  };

  return (
    <Grid item>
      <Grid
        container
        direction="column"
        alignItems="start"
        justifyContent="center"
      >
        <Grid item>
          <Typography sx={styles.label}>{label}</Typography>
        </Grid>

        <Grid item>
          <Typography sx={styles.value}>{value}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DetailsMatchItem;
