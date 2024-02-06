import { useContext } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import { Button } from "@mui/material";
import constants from "../utils/constants";

const BubbleButton = (props) => {
  // variables
  const { title, selected, onClick, size = "large" } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  // styles
  const styles = {
    selected: {
      backgroundColor: constants.primaryRed,
      fontSize: 11,
      fontWeight: 700,
      color: theme.white(),
      transition: "all .2s ease-in-out",
      boxShadow: "0 0",
      borderRadius: 50,
      textTransform: "none",
      "&:hover": {
        backgroundColor: constants.primaryRed,
        cursor: "pointer",
        boxShadow: "0 0",
      },
    },
    unselected: {
      backgroundColor: theme.iconBackground(),
      fontSize: 11,
      fontWeight: 600,
      color: theme.white(),
      textTransform: "none",
      transition: "all .2s ease-in-out",
      boxShadow: "0 0",
      borderRadius: 50,
      "&:hover": {
        backgroundColor: theme.iconBackground(true),
        cursor: "pointer",
        boxShadow: "0 0",
      },
    },
  };

  return (
    <Button
      variant="contained"
      size={size}
      sx={selected ? styles.selected : styles.unselected}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default BubbleButton;
