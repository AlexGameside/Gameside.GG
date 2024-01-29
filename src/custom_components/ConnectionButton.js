import { useContext } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import { Grid } from "@mui/material";
import { AiFillCheckCircle } from "react-icons/ai";

const ConnectionButton = (props) => {
  const { children, onClick, isLinked, canLinkAgain } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const styles = {
    container: {
      borderRadius: 2,
      padding: 1,
      backgroundColor: theme.iconBackground(),
      width: 60,
      height: 60,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transition: "all .2s ease-in-out",
      position: "relative",
      "&:hover": {
        cursor:
          (isLinked && canLinkAgain) || !isLinked ? "pointer" : "not-allowed",
        backgroundColor:
          (isLinked && canLinkAgain) || !isLinked
            ? theme.iconBackground(true)
            : theme.iconBackground(),
      },
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
    <Grid
      item
      sx={styles.container}
      onClick={!canLinkAgain ? null : () => onClick()}
    >
      {children}
    </Grid>
  );
};

export default ConnectionButton;
