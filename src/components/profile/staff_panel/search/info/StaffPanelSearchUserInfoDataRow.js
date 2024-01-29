import { Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { StoreContext } from "../../../../../context/NewStoreContext";
import createTheme from "../../../../../utils/theme";

const StaffPanelSearchUserInfoDataRow = (props) => {
  const { label, value, color = null } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const styles = {
    label: {
      fontSize: 14,
      fontWeight: 400,
      color: theme.metaText(),
    },
    value: {
      fontSize: 14,
      fontWeight: 400,
      color: color ? color : theme.text(),
    },
  };

  return (
    <Grid item>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="start"
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

export default StaffPanelSearchUserInfoDataRow;
