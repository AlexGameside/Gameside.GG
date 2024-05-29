import { Button, CircularProgress, useMediaQuery, Grid } from "@mui/material";
import { useContext } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import constants from "../utils/constants";

const NewPrimaryButton = (props) => {
  const {
    label,
    onClick = () => {},
    loading = false,
    fullWidth = false,
    complementary = false,
    disabled = false,
    square = false,
    small = false,
    children = null,
    backgroundColor = null,
    textColor = null,
    childrenMarginTop = 1,
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

  const getBackgroundColor = () => {
    if (complementary) {
      return theme.complementary();
    }

    if (backgroundColor) {
      return backgroundColor;
    }

    return constants.primaryRed;
  };

  const styles = {
    button: {
      color: textColor ?? theme.white(),
      fontSize: 11,
      fontWeight: 700,
      borderRadius: square || small ? 2 : 50,
      boxShadow: "0 0",
      transition: "all .2s ease-in-out",
      minWidth: getSizeForButton(),
      height: small ? 30 : fullWidth ? 45 : 40,
      backgroundColor: getBackgroundColor(),
      "&:hover": {
        backgroundImage: theme.buttonHover(),
        backgroundColor: getBackgroundColor(),
        boxShadow: "0 0",
      },
    },
    disabled: {
      color: theme.metaText(),
      fontSize: 11,
      fontWeight: 700,
      borderRadius: square || small ? 2 : 50,
      boxShadow: "0 0",
      transition: "all .2s ease-in-out",
      minWidth: getSizeForButton(),
      height: small ? 30 : fullWidth ? 45 : 40,
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
      size={small ? "small" : "large"}
      sx={loading || disabled ? styles.disabled : styles.button}
      onClick={() => (loading ? null : onClick())}
    >
      {loading ? (
        <CircularProgress size={20} sx={{ color: theme.metaText() }} />
      ) : (
        <>
          {children ? (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              gap={{ xs: 1 }}
            >
              <Grid item sx={{ marginTop: childrenMarginTop }}>
                {children}
              </Grid>
              <Grid item>{label}</Grid>
            </Grid>
          ) : (
            label
          )}
        </>
      )}
    </Button>
  );
};

export default NewPrimaryButton;
