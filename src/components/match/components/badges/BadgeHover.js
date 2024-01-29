import { Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { StoreContext } from "../../../../context/NewStoreContext";
import createTheme from "../../../../utils/theme";

const BadgeHover = (props) => {
  const { label, position = "bottom" } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  return (
    <Grid
      item
      sx={{
        position: "absolute",
        backgroundColor: theme.white(),
        borderRadius: 2,
        padding: 1,
        bottom: position === "top" ? null : -40,
        top: position === "top" ? -35 : null,
        boxShadow: theme.shadow(),
        zIndex: 100,
      }}
    >
      <Typography
        sx={{ fontSize: 12, color: theme.black(), fontWeight: 600 }}
        noWrap
      >
        {label}
      </Typography>
    </Grid>
  );
};

export default BadgeHover;
