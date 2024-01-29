import { Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";

const EmptyList = (props) => {
  const { title, label, children } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  return (
    <Grid item alignSelf="center" sx={{ width: "100%" }}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>{children}</Grid>

        <Grid item>
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 600,
              color: theme.metaText(),
            }}
          >
            {title}
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
            {label}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EmptyList;
