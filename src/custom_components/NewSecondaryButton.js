import { Button, CircularProgress, useMediaQuery } from "@mui/material";
import { useContext } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";

const NewSecondaryButton = (props) => {
  const {
    label,
    onClick = () => {},
    loading = false,
    small = false,
    fullWidth = false,
    square = false,
    disabled = false,
    className,
  } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");

  const getSizeForButton = () => {
    if (small) {
      return 50;
    } else if (fullWidth) {
      return "100%";
    } else {
      return isDesktop ? 130 : "100%";
    }
  };

  const styles = {
    button: {
      color: theme.text(),
      fontSize: 11,
      fontWeight: 700,
      borderRadius: small || square ? 2 : 50,
      boxShadow: "0 0",
      transition: "all .2s ease-in-out",
      minWidth: getSizeForButton(),
      height: small ? 30 : 40,
      backgroundColor: theme.border(),
      "&:hover": {
        backgroundColor: theme.border(),
        backgroundImage: theme.buttonHover(),
        boxShadow: "0 0",
      },
    },
    disabled: {
      color: theme.metaText(),
      fontSize: 11,
      fontWeight: 700,
      borderRadius: small || square ? 2 : 50,
      boxShadow: "0 0",
      transition: "all .2s ease-in-out",
      minWidth: getSizeForButton(),
      height: small ? 30 : 40,
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
      className={className}
      variant="contained"
      size={small ? "small" : "large"}
      sx={loading || disabled ? styles.disabled : styles.button}
      onClick={() => (loading || disabled ? null : onClick())}
    >
      {loading ? (
        <CircularProgress size={20} sx={{ color: theme.metaText() }} />
      ) : (
        label
      )}
    </Button>
  );
};

export default NewSecondaryButton;
