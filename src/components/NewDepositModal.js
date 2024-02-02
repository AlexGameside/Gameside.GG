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
import { SiCashapp } from "react-icons/si";
import { BsFillCreditCardFill } from "react-icons/bs";
import useAxios from "../utils/useAxios";
import constants from "../utils/constants";
import { poofRequest } from "../utils/API";

const NewDepositModal = (props) => {
  // variables
  const { open, onClose, depositAmount } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const api = useAxios();
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const payload = {
    username: "arya",
    amount: depositAmount,
    redirect: `${constants.clientUrl}/profile`,
    default: {
      name: store?.user?.username,
    },
  };

  // state
  const [loading, setLoading] = useState(false);

  // methods
  const handleClose = () => {
    setLoading(false);
    onClose();
  };

  // effects

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
    subTitle: {
      fontSize: 28,
      fontWeight: 900,
      color: theme.text(),
    },
    label: {
      fontSize: 18,
      fontWeight: 500,
      color: theme.text(),
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
    cardButton: {
      border: `3px solid ${theme.blue()}`,
      color: theme.white(),
      fontSize: 22,
      textTransform: "none",
      fontWeight: 900,
      borderRadius: 50,
      boxShadow: "0 0",
      transition: "all .3s ease-in-out",
      backgroundColor: theme.blue(),
      "&:hover": {
        backgroundColor: theme.blue(),
        color: theme.white(),
        boxShadow: theme.shadow(),
        transform: "scale(1.1)",
      },
      minWidth: isDesktop ? 120 : "100%",
    },
    cashAppButton: {
      border: `3px solid ${theme.green()}`,
      color: theme.white(),
      fontSize: 22,
      textTransform: "none",
      fontWeight: 900,
      borderRadius: 50,
      boxShadow: "0 0",
      transition: "all .3s ease-in-out",
      backgroundColor: theme.green(),
      "&:hover": {
        backgroundColor: theme.green(),
        color: theme.white(),
        boxShadow: theme.shadow(),
        transform: "scale(1.1)",
      },
      minWidth: isDesktop ? 120 : "100%",
    },
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ style: styles.card }}
    >
      <DialogTitle sx={styles.title}>
        <Typography style={styles.title}>
          Depositing:{" "}
          <span style={{ color: theme.green() }}>
            {numFormatter.format(depositAmount)}
          </span>
        </Typography>
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
          rowSpacing={{ xs: 2 }}
        >
          <Grid item sx={{ width: "100%" }}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              sx={{ width: "100%", minHeight: 120 }}
              rowSpacing={{ xs: 2 }}
            >
              <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={styles.cardButton}
                  onClick={() =>
                    window.open(
                      `https://playagaingg-frontend.herokuapp.com/?user=${store?.user?.username}&amount=${depositAmount}`,
                      "_blank"
                    )
                  }
                >
                  <BsFillCreditCardFill
                    style={{ fontSize: 35, color: theme.white() }}
                  />
                </Button>
              </Grid>
              <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
                <Button
                  disabled={loading}
                  variant="contained"
                  size="large"
                  sx={styles.cashAppButton}
                  onClick={() => {
                    setLoading(true);
                    poofRequest(api, payload).then((res) => {
                      setLoading(false);
                      window.location.assign(res);
                    });
                  }}
                >
                  {loading ? (
                    <CircularProgress size={30} sx={{ color: theme.white() }} />
                  ) : (
                    <SiCashapp style={{ fontSize: 35, color: theme.white() }} />
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default NewDepositModal;
