import {
  useMediaQuery,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Typography,
  CircularProgress,
  Grid,
  Button,
} from "@mui/material";
import { useContext, useState } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import CloseIcon from "@mui/icons-material/Close";
import useAxios from "../utils/useAxios";

const NewWithdrawModal = (props) => {
  // variables
  const {
    open,
    onClose,
    withdrawAmount,
    type,
    sendTo,
    handleWithdraw,
    loading,
  } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const api = useAxios();
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // methods
  const handleClose = () => {
    onClose();
  };

  // styles
  const styles = {
    card: {
      backgroundColor: theme.card(),
      minWidth: isDesktop ? 500 : 0,
      maxWidth: 500,
      padding: "2%",
      borderRadius: 16,
    },
    title: {
      fontSize: 32,
      fontWeight: 900,
      color: theme.text(),
      marginBottom: 4,
    },
    closeButton: {
      color: theme.iconButton(),
      backgroundColor: theme.cardHover(),
      borderRadius: 100,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      right: 10,
      top: 10,
      transition: "all .3s ease-in-out",
      "&:hover": {
        transform: "scale(1.1)",
        backgroundColor: theme.cardHover(),
      },
    },
    typeLabel: {
      fontSize: 18,
      fontWeight: 900,
      color: theme.subText(),
    },
    cashType: {
      fontSize: 18,
      fontWeight: 900,
      color: theme.green(),
    },
    bankType: {
      fontSize: 18,
      fontWeight: 900,
      color: theme.blue(),
    },
    withdrawAmount: {
      fontSize: 18,
      fontWeight: 900,
      color: theme.green(),
    },
    withdrawButton: {
      border: `3px solid ${type === "Bank" ? theme.blue() : theme.green()}`,
      color: theme.white(),
      fontSize: 22,
      textTransform: "none",
      fontWeight: 900,
      borderRadius: 50,
      boxShadow: "0 0",
      transition: "all .3s ease-in-out",
      backgroundColor: type === "Bank" ? theme.blue() : theme.green(),
      "&:hover": {
        backgroundColor: type === "Bank" ? theme.blue() : theme.green(),
        color: theme.white(),
        boxShadow: theme.shadow(),
        transform: "scale(1.1)",
      },
      minWidth: "100%",
    },
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ style: styles.card }}
    >
      <DialogTitle sx={styles.title}>
        <Typography style={styles.title}>Are you sure?</Typography>
        {handleClose ? (
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={styles.closeButton}
          >
            <CloseIcon sx={{ fontSize: 24 }} />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          rowSpacing={{ xs: 3 }}
        >
          <Grid item sx={{ width: "100%" }}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              sx={{ width: "100%" }}
              rowSpacing={{ xs: 2 }}
            >
              <Grid item>
                <Typography sx={styles.typeLabel}>Type:</Typography>
              </Grid>
              <Grid item>
                <Typography
                  sx={type === "Bank" ? styles.bankType : styles.cashType}
                >
                  {type}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item sx={{ width: "100%" }}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              sx={{ width: "100%" }}
              rowSpacing={{ xs: 2 }}
            >
              <Grid item>
                <Typography sx={styles.typeLabel}>Send To:</Typography>
              </Grid>
              <Grid item>
                <Typography
                  sx={type === "Bank" ? styles.bankType : styles.cashType}
                >
                  {sendTo}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item sx={{ width: "100%" }}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              sx={{ width: "100%" }}
              rowSpacing={{ xs: 2 }}
            >
              <Grid item>
                <Typography sx={styles.typeLabel}>Amount Receiving:</Typography>
              </Grid>
              <Grid item>
                <Typography sx={styles.withdrawAmount}>
                  {numFormatter.format(parseFloat(withdrawAmount * 0.95))}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item sx={{ minWidth: "100%" }}>
            <Button
              disabled={
                loading ||
                parseFloat(withdrawAmount) > parseFloat(store?.user?.balance)
              }
              variant="contained"
              size="large"
              sx={styles.withdrawButton}
              onClick={handleWithdraw}
            >
              {loading ? (
                <CircularProgress size={30} sx={{ color: theme.white() }} />
              ) : (
                `Withdraw ${numFormatter.format(parseFloat(withdrawAmount))}`
              )}
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default NewWithdrawModal;
