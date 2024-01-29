import { useContext } from "react";
import { StoreContext } from "../../context/NewStoreContext";
import { Grid, useMediaQuery, Button } from "@mui/material";
import createTheme from "../../utils/theme";

const MatchTabButton = (props) => {
  const { selected, onClick, label } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");

  const styles = {
    sectionButton: {
      padding: 1,
      color: theme.text(),
      borderBottom: `2px solid ${theme.primary()}`,
      boxSizing: "border-box",
      fontSize: 14,
      textTransform: "none",
      fontWeight: 600,
      borderRadius: 2,
      boxShadow: "0 0",
      transition: "all .2s ease-in-out",
      backgroundColor: "transparent",
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      "&:hover": {
        backgroundColor: "transparent",
        boxShadow: "0 0",
        borderBottom: `2px solid ${theme.primary()}`,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
    },
    unselectedSectionButton: {
      padding: 1,
      color: theme.metaText(),
      boxSizing: "border-box",
      fontSize: 14,
      textTransform: "none",
      fontWeight: 600,
      borderRadius: 2,
      boxShadow: "0 0",
      transition: "all .2s ease-in-out",
      backgroundColor: "transparent",
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderBottom: `2px solid transparent`,
      "&:hover": {
        backgroundColor: "transparent",
        color: theme.text(),
        boxShadow: "0 0",
      },
    },
  };

  return (
    <Grid>
      <Button
        size="small"
        sx={selected ? styles.sectionButton : styles.unselectedSectionButton}
        onClick={onClick}
      >
        {label}
      </Button>
    </Grid>
  );
};

export default MatchTabButton;
