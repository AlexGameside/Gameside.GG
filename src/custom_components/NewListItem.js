import { Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";

const NewListItem = (props) => {
  const { children, label, selected, onClick } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const styles = {
    label: {
      fontSize: 15,
      fontWeight: 500,
      color: theme.text(),
    },
  };

  return (
    <Grid
      item
      sx={{
        width: "100%",
        padding: 1,
        height: 52,
        borderRadius: 2,
        backgroundColor: selected ? theme.cardHover() : "transparent",
        minWidth: 185,
        transition: "all .1s ease-in-out",
        "&:hover": {
          cursor: "pointer",
          backgroundColor: theme.cardHover(),
        },
      }}
      onClick={onClick}
    >
      <Grid
        container
        justifyContent="start"
        alignItems="center"
        gap={{ xs: 1.5 }}
      >
        <Grid
          item
          sx={{
            height: 36,
            width: 36,
            borderRadius: 50,
            backgroundColor: selected
              ? theme.primary()
              : theme.iconBackground(),
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 36,
            }}
          >
            {children}
          </div>
        </Grid>

        <Grid item>
          <Typography sx={styles.label}>{label}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewListItem;
