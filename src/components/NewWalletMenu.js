import { Menu, Typography, Grid, Divider, Button } from "@mui/material";
import { useContext, useState } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import NewPrimaryButton from "../custom_components/NewPrimaryButton";
import NewSecondaryButton from "../custom_components/NewSecondaryButton";
import { useNavigate } from "react-router-dom";
import DepositDialogModal from "./wallet/DepositDialogModal";
import WithdrawDialogModal from "./wallet/WithdrawDialogModal";

const NewWalletMenu = (props) => {
  // variables
  const { anchor, handleClose } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const navigate = useNavigate();

  // state
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  // methods
  const handleDepositOpen = () => {
    setDepositOpen(true);
  };

  const handleDepositClose = () => {
    setDepositOpen(false);
  };

  const handleWithdrawOpen = () => {
    setWithdrawOpen(true);
  };

  const handleWithdrawClose = () => {
    setWithdrawOpen(false);
  };

  // styles
  const styles = {
    menuContainer: {
      borderRadius: 12,
      boxShadow: theme.shadow(),
      backgroundColor: theme.card(),
      color: theme.text(),
      minHeight: 250,
      width: 350,
      paddingTop: 8,
      paddingBottom: 8,
    },
    title: {
      fontSize: 22,
      fontWeight: 700,
      color: theme.text(),
    },
    transactions: {
      fontSize: 14,
      fontWeight: 400,
      color: theme.metaText(),
      transition: "all .2s ease-in-out",
      "&:hover": {
        cursor: "pointer",
        color: theme.text(),
      },
    },
    label: {
      fontSize: 14,
      fontWeight: 700,
      color: theme.metaText(),
    },
    balance: {
      fontSize: 28,
      fontWeight: 700,
      color: theme.text(),
    },
    vp: {
      fontSize: 28,
      fontWeight: 700,
      color: theme.red(),
    },
  };

  return (
    <Menu
      anchorEl={anchor}
      open={Boolean(anchor)}
      onClose={handleClose}
      PaperProps={{
        style: styles.menuContainer,
      }}
    >
      <DepositDialogModal onClose={handleDepositClose} open={depositOpen} />
      <WithdrawDialogModal onClose={handleWithdrawClose} open={withdrawOpen} />

      <Grid
        container
        direction="column"
        alignItems="start"
        justifyContent="space-between"
        sx={{ width: "100%", minHeight: 250 }}
      >
        <Grid item sx={{ width: "100%" }}>
          <Grid
            container
            direction="column"
            alignItems="start"
            justifyContent="start"
          >
            <Grid item sx={{ paddingLeft: 2, paddingRight: 2 }}>
              <Typography sx={styles.title}>Wallet</Typography>
            </Grid>

            <Grid
              item
              sx={{ paddingLeft: 2, paddingRight: 2 }}
              onClick={() => navigate("/valorant/profile/wallet")}
            >
              <Typography sx={styles.transactions}>
                View Transactions
              </Typography>
            </Grid>

            <Grid item sx={{ width: "100%", marginTop: 2 }}>
              <Divider sx={{ backgroundColor: theme.border() }} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item sx={{ paddingLeft: 2, paddingRight: 2, marginTop: 2 }}>
          <Grid
            container
            direction="column"
            alignItems="start"
            justifyContent="start"
          >
            <Grid item>
              <Typography sx={styles.label}>Balance</Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.balance}>
                {numFormatter.format(store?.user?.balance)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sx={{ paddingLeft: 2, paddingRight: 2 }}>
          <Grid
            container
            direction="column"
            alignItems="start"
            justifyContent="start"
          >
            <Grid item>
              <Typography sx={styles.label}>Valorant Points</Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.balance}>{store?.user?.points}</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          sx={{ width: "100%", paddingLeft: 2, paddingRight: 2, marginTop: 4 }}
        >
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <NewPrimaryButton label="deposit" onClick={handleDepositOpen} />
            </Grid>

            <Grid item>
              <NewSecondaryButton
                label="withdraw"
                onClick={handleWithdrawOpen}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Menu>
  );
};

export default NewWalletMenu;
