import { Button, CircularProgress, useMediaQuery } from "@mui/material";
import { useContext } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";

const NewPrimaryOutlineButton = (props) => {
  const {
    label,
    onClick = () => {},
    loading = false,
    fullWidth = false,
    disabled = false,
    complementary = false,
  } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");

  const styles = {
    button: {
      color: theme.white(),
      border: `2px solid ${
        complementary ? theme.complementary() : theme.primary()
      }`,
      fontSize: 11,
      fontWeight: 700,
      borderRadius: 2,
      boxShadow: "0 0",
      transition: "all .2s ease-in-out",
      minWidth: fullWidth ? "100%" : isDesktop ? 130 : "100%",
      height: 40,
      backgroundColor: "transparent",
      "&:hover": {
        color: theme.white(),
        backgroundColor: complementary
          ? theme.complementary()
          : theme.primary(),
        boxShadow: "0 0",
      },
    },
    disabled: {
      color: theme.metaText(),
      border: `2px solid ${theme.border()}`,
      fontSize: 11,
      fontWeight: 700,
      borderRadius: 2,
      boxShadow: "0 0",
      transition: "all .2s ease-in-out",
      minWidth: fullWidth ? "100%" : isDesktop ? 130 : "100%",
      height: 40,
      backgroundColor: theme.border(),
      cursor: "not-allowed",
      "&:hover": {
        backgroundColor: theme.border(),
        boxShadow: "0 0",
        cursor: "not-allowed",
      },
    },
  };

  return (
    <Button
      variant="contained"
      size="large"
      sx={loading || disabled ? styles.disabled : styles.button}
      onClick={() => (loading ? null : onClick())}
    >
      {loading ? (
        <CircularProgress size={20} sx={{ color: theme.metaText() }} />
      ) : (
        label
      )}
    </Button>
  );
};

export default NewPrimaryOutlineButton;
