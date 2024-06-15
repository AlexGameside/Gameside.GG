import { useContext, useEffect, useRef, useState } from "react";
import { StoreContext } from "../../context/NewStoreContext";
import DialogModal from "../../custom_components/DialogModal";
import {
  Grid,
  Typography,
  useMediaQuery,
  CircularProgress,
  Divider,
} from "@mui/material";
import createTheme from "../../utils/theme";
import NewPrimaryButton from "../../custom_components/NewPrimaryButton";
import NewInput from "../NewInput";
import useAxios from "../../utils/useAxios";
import gameSideLogo from "../../assets/rebrand/Gameside_Logomark.svg";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import PaypalButtons from "./PaypalButtons";

const DepositBox = (props) => {
  const { title, label, onClick } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const styles = {
    container: {
      borderRadius: 2,
      paddingTop: 2,
      paddingBottom: 2,
      backgroundColor: theme.cardDark(),
      minWidth: 125,
      border: `1px solid ${theme.border()}`,
      "&:hover": {
        border: `1px solid ${theme.primary()}`,
        cursor: "pointer",
      },
    },
    title: {
      fontSize: 18,
      fontWeight: 600,
      color: theme.text(),
    },
    label: {
      fontSize: 14,
      fontWeight: 400,
      color: theme.metaText(),
    },
  };

  return (
    <Grid item sx={styles.container} onClick={onClick}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap={{ xs: 1 }}
        sx={{ width: "100%" }}
      >
        <Grid item>
          <Typography sx={styles.title}>{title}</Typography>
        </Grid>

        <Grid item>
          <Typography sx={styles.label}>{label}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

const DepositDialogModal = (props) => {
  // constants
  const { onClose, open } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const api = useAxios();
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // state
  const [isCustomState, setIsCustomState] = useState(false);
  const [isCheckoutState, setIsCheckoutState] = useState(false);
  const [isCompletedState, setIsCompletedState] = useState(false);
  const [isErrorState, setIsErrorState] = useState(false);
  const [amount, setAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasRendered, setHasRendered] = useState(false);

  // methods
  const handleClose = () => {
    setIsCustomState(false);
    setLoading(false);
    setAmount(null);
    setIsCheckoutState(false);
    setIsErrorState(false);
    setIsCompletedState(false);
    setHasRendered(false);
    onClose();
  };

  const renderPaypalButtons = (paypal) => {
    window.paypal
      .Buttons({
        createOrder: (_, actions, __) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Gameside Funds",
                amount: {
                  currency_code: "USD",
                  value: amount,
                },
                custom_id: store?.user?.username,
                invoice_id: null,
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log("Order captured:", order);
          setIsCompletedState(true);
          setIsCustomState(false);
          setIsCheckoutState(false);
          setIsErrorState(false);
        },
        onCancel: () => {
          setIsCheckoutState(true);
          setIsCustomState(false);
          setIsErrorState(false);
          setIsCompletedState(false);
        },
        onError: (err) => {
          console.log("Error:", err);
          setIsCompletedState(false);
          setIsCustomState(false);
          setIsCheckoutState(false);
          setIsErrorState(true);
        },
      })
      .render(paypal.current);
  };

  // styles
  const styles = {
    customLabel: {
      fontSize: 14,
      fontWeight: 600,
      color: theme.metaText(),
      textDecoration: "underline",
      "&:hover": {
        color: theme.text(),
        cursor: "pointer",
      },
    },
    value: {
      fontSize: 18,
      fontWeight: 600,
      color: theme.text(),
    },
    label: {
      fontSize: 14,
      fontWeight: 600,
      color: theme.metaText(),
    },
  };

  return (
    <DialogModal
      title={"Deposit"}
      onClose={handleClose}
      open={open}
      icon={gameSideLogo}
      iconClasses={'w-[50px]'}
      checkout
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%" }}
        gap={{ xs: 2 }}
      >
        {loading ? (
          <Grid item>
            <CircularProgress size={50} sx={{ color: theme.primary() }} />
          </Grid>
        ) : isCustomState ? (
          <>
            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                justifyContent={isDesktop ? "space-between" : "center"}
                alignItems="center"
                sx={{ width: "100%" }}
                gap={{ xs: 1 }}
              >
                <Grid item sx={{ flexGrow: 1 }}>
                  <NewInput
                    placeholder={0}
                    onChange={(value) => setAmount(value)}
                    value={amount}
                    type="number"
                  />
                </Grid>

                <Grid item>
                  <NewPrimaryButton
                    label="Next"
                    disabled={amount < 5 || amount > 100}
                    onClick={() => {
                      setAmount(amount);
                      setIsCustomState(false);
                      setIsCheckoutState(true);
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              onClick={() => {
                setAmount(null);
                setIsCustomState(false);
                setIsCheckoutState(false);
              }}
            >
              <Typography sx={styles.customLabel}>
                or choose a set amount
              </Typography>
            </Grid>
          </>
        ) : isCheckoutState ? (
          <>
            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                direction="column"
                alignItems="start"
                justifyContent="center"
                gap={{ xs: 1 }}
              >
                <Grid item sx={{ width: "100%" }}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="start"
                    alignItems="start"
                  >
                    <Grid item sx={{ width: "100%" }}>
                      <Typography style={styles.label}>Amount</Typography>
                    </Grid>
                    <Grid item sx={{ width: "100%" }}>
                      <Typography sx={styles.value}>
                        {numFormatter.format(amount)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Divider sx={{ backgroundColor: theme.border() }} />
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <PaypalButtons renderPaypalButtons={renderPaypalButtons} />
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Typography
                    sx={{
                      fontSize: 11,
                      color: theme.metaText(),
                      fontWeight: 400,
                      textAlign: "center",
                    }}
                  >
                    Funds will not be available for withdrawal immediately once
                    you deposit. The funds will become available for withdrawal
                    once you haved play cash-matches or buy-in tournaments.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </>
        ) : isCompletedState ? (
          <>
            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                gap={{ xs: 1 }}
              >
                <Grid item>
                  <FaCheckCircle
                    style={{ fontSize: 40, color: theme.green() }}
                  />
                </Grid>

                <Grid item>
                  <Typography
                    sx={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: theme.text(),
                    }}
                  >
                    Deposit Successful!
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 400,
                      color: theme.metaText(),
                      textAlign: "center",
                    }}
                  >
                    Your balance will update momentarily.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </>
        ) : isErrorState ? (
          <>
            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                gap={{ xs: 1 }}
              >
                <Grid item>
                  <MdError style={{ fontSize: 40, color: theme.red() }} />
                </Grid>

                <Grid item>
                  <Typography
                    sx={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: theme.text(),
                    }}
                  >
                    Deposit Failed!
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 400,
                      color: theme.metaText(),
                      textAlign: "center",
                    }}
                  >
                    Try again later.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                alignItems="center"
                justifyContent={isDesktop ? "space-between" : "center"}
                sx={{ width: "100%" }}
                gap={{ xs: 1 }}
              >
                <Grid item >
                  <button
                    data-sellix-product="666c6a434c07d"
                    type="submit"
                    alt="Buy Now with sellix.io"
                    data-sellix-custom-user={store?.user?.username}
                  >
                    <DepositBox
                      onClick={() => {}}
                      title={numFormatter.format(5)}
                      label={"USD"}
                    />
                  </button>
                </Grid>
                <Grid item >
                  <button
                    data-sellix-product="666c6a4d8b0a7"
                    type="submit"
                    alt="Buy Now with sellix.io"
                    data-sellix-custom-user={store?.user?.username}
                  >
                    <DepositBox
                      onClick={() => {}}
                      title={numFormatter.format(10)}
                      label={"USD"}
                    />
                  </button>
                </Grid>
                <Grid item >
                  <button
                    data-sellix-product="666c6a7623f7b"
                    type="submit"
                    alt="Buy Now with sellix.io"
                    data-sellix-custom-user={store?.user?.username}
                  >
                    <DepositBox
                      onClick={() => {}}
                      title={numFormatter.format(25)}
                      label={"USD"}
                    />
                  </button>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </DialogModal>
  );
};

export default DepositDialogModal;
