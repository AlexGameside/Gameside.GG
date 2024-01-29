import { useContext } from "react";
import { GlobalStateContext } from "../../context/StoreContext";
import { poofRequest, withdrawTokens } from "../../utils/API";
import useAxios from "../../utils/useAxios";
import constants from "../../utils/constants";
import {
  Grid,
  Button,
  Typography,
  Paper,
  InputLabel,
  IconButton,
  TextField,
  Alert,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useState } from "react";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import { Dropdown, Input, Label } from "semantic-ui-react";
import ErrorIcon from "@mui/icons-material/Error";

const defaultMaskOptions = {
  prefix: "$",
  suffix: "",
  allowDecimal: true,
  decimalSymbol: ".",
  decimalLimit: 2,
  allowNegative: false,
  integerLimit: 3,
  allowLeadingZeroes: false,
};

const Withdraws = () => {
  const styles = {
    withdrawTitle: {
      fontWeight: 900,
      color: constants.newGray,
      fontSize: 26,
    },
    createTeamButton: {
      backgroundColor: constants.black,
      "&:hover": {
        backgroundColor: constants.blackHovered,
      },
      transition: "0.3s",
    },
    moneyButtonContainer: {
      borderRadius: 2,
      padding: 4,
      display: "flex",
      flexDirection: "column",
      "&:hover": {
        backgroundColor: "#f5f5f5",
        cursor: "pointer",
      },
      transition: "0.3s",
    },
    selectedMoneyContainer: {
      borderRadius: 2,
      padding: 4,
      display: "flex",
      flexDirection: "column",
      border: "2px solid #66bb6a",
      "&:hover": {
        backgroundColor: "#f5f5f5",
        cursor: "pointer",
      },
      transition: "0.3s",
    },
    moneyLabel: {
      fontSize: 20,
      color: constants.gray,
      fontWeight: 900,
    },
    inputLabel: {
      color: constants.gray,
      fontSize: 20,
    },
    input: {
      width: "100%",
      borderRadius: 4,
      minHeight: 20,
    },
    paypal: {
      color: "#0079C1",
      "&:hover": {
        color: "#00457C",
        cursor: "pointer",
      },
      transition: "0.3s",
      fontSize: 80,
    },
    cashapp: {
      color: "#00D64B",
      "&:hover": {
        color: "#00C244",
        cursor: "pointer",
      },
      transition: "0.3s",
      fontSize: 80,
    },
    paypalCheckout: {
      backgroundColor: "#0079C1",
      width: 100,
      "&:hover": {
        backgroundColor: "#00457C",
      },
      transition: "0.3s",
    },
  };

  const currencyMask = createNumberMask({ ...defaultMaskOptions });
  const api = useAxios();
  const store = useContext(GlobalStateContext);

  // paypal state
  const [paypalOpen, setPaypalOpen] = useState(false);
  const [paypalEmail, setPayPalEmail] = useState("");
  const [paypalAmount, setPaypalAmount] = useState("");

  // cashapp state
  const [cashappOpen, setCashAppOpen] = useState(false);
  const [cashTag, setCashTag] = useState("");
  const [cashAppAmount, setCashAppAmount] = useState(0);
  const [success, setSuccess] = useState("");
  const [withdrawError, setWithdrawError] = useState("");

  // errors
  const [error, setError] = useState("");
  const [cashError, setCashError] = useState("");

  // new states
  const [selected, setSelected] = useState("paypal");
  const [paypalWithdraw, setPaypalWithdraw] = useState(0);
  const [loading, setLoading] = useState(false);

  // dialog state
  const [submitOpen, setSubmitOpen] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleOpenSubmitDialog = () => {
    setSubmitOpen(true);
  };

  const handleCloseSubmitDialog = () => {
    setSubmitOpen(false);
  };

  const handlePaypalSubmit = () => {
    setSuccess("");
    setError("");
    const isEmailValid = validateEmail(paypalEmail);

    if (!isEmailValid) {
      setError("You must enter a valid email!");
      setLoading(false);
      handleCloseSubmitDialog();
      return;
    }

    setLoading(true);
    setError("");
    if (paypalEmail === "") {
      setLoading(false);
      setError("You must enter an email for your Paypal!");
      handleCloseSubmitDialog();
      return;
    }
    if (paypalWithdraw === "") {
      setLoading(false);
      setError("Must enter an amount to withdraw!");
      handleCloseSubmitDialog();
      return;
    }
    const amountToWithdraw = paypalWithdraw;
    withdrawTokens(
      api,
      paypalEmail,
      true,
      amountToWithdraw,
      store?.user?.username
    ).then((res) => {
      if (!res.error) {
        setSuccess(
          `Successfully withdrew ${amountToWithdraw}. Withdraws are processed every 1-7 business days. Refresh to see your new balance.`
        );
        setLoading(false);
        handleCloseSubmitDialog();
        return;
      }
      setLoading(false);
      handleCloseSubmitDialog();
      setError("Withdraw failed!");
      return;
    });
  };

  const handleCashAppSubmit = () => {
    setError("");
    setLoading(true);
    if (cashTag === "") {
      setCashError("You must enter a cash tag!");
      setLoading(false);
      handleCloseSubmitDialog();
      return;
    }
    if (cashAppAmount === "") {
      setLoading(false);
      setCashError("You must enter an amount to withdraw!");
      handleCloseSubmitDialog();
      return;
    }

    let newCashTag;
    if (cashTag?.split("$")[0] !== "$") {
      newCashTag = `$${cashTag}`;
    } else {
      newCashTag = cashTag;
    }
    const amountToWithdraw = cashAppAmount;
    withdrawTokens(
      api,
      newCashTag,
      false,
      amountToWithdraw,
      store?.user?.username
    ).then((res) => {
      if (!res.error) {
        setSuccess(
          `Successfully withdrew ${amountToWithdraw}. Withdraws are processed every 1-7 business days. Refresh to see your new balance.`
        );
        setLoading(false);
        handleCloseSubmitDialog();
        return;
      }
      setError("Withdraw failed!");
      setLoading(false);
      handleCloseSubmitDialog();
      return;
    });
  };

  const newStyles = {
    paypalButton: {
      fontWeight: 900,
      backgroundColor: "#f2c07e",
      opacity: 0.6,
      color: constants.white,
      fontSize: 20,
      boxShadow: "none",
      borderRadius: 2,
      width: "100%",
      "&:hover": {
        color: constants.newGray,
        backgroundColor: "#f2c07e",
        boxShadow: "none",
      },
    },
    selectedPaypalButton: {
      fontWeight: 900,
      backgroundColor: constants.newOrange,
      color: constants.white,
      fontSize: 20,
      boxShadow: "none",
      opacity: 1,
      borderRadius: 2,
      width: "100%",
      "&:hover": {
        color: constants.newWhite,
        backgroundColor: constants.newOrange,
        boxShadow: "none",
      },
    },
    balanceLabel: {
      fontWeight: 500,
      color: constants.newGray,
      fontSize: 20,
    },
    receiveLabel: {
      fontWeight: 900,
      color: constants.newGray,
      fontSize: 20,
    },
    balanceValue: {
      fontWeight: 900,
      color: constants.newOrange,
      fontSize: 20,
    },
    balanceFeeLabel: {
      fontWeight: 500,
      color: constants.newGrayLight,
      fontSize: 20,
    },
    balanceFeeValue: {
      fontWeight: 900,
      color: constants.newGray,
      fontSize: 20,
    },
    cancelButton: {
      fontSize: 18,
      width: "100%",
      border: `2px solid ${constants.newGray}`,
      color: constants.newGray,
      fontWeight: 900,
      borderRadius: 3,
      boxShadow: "0 0",
      backgroundColor: constants.white,
      "&:hover": {
        backgroundColor: constants.newGray,
        color: constants.white,
        boxShadow: "0 0",
      },
      transition: "0.3s",
    },
    submitButton: {
      fontSize: 18,
      width: "100%",
      border: `2px solid ${constants.newOrange}`,
      color: constants.white,
      fontWeight: 900,
      borderRadius: 3,
      boxShadow: "0 0",
      backgroundColor: constants.newOrange,
      "&:hover": {
        backgroundColor: constants.newOrange,
        color: constants.white,
        opacity: 0.7,
        boxShadow: "0 0",
      },
      transition: "0.3s",
    },
  };

  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const isButtonDisabled = (type) => {
    if (type == "paypal") {
      if (isNaN(parseFloat(paypalWithdraw))) {
        return true;
      }
      if (parseFloat(paypalWithdraw) > store?.user?.balance) {
        return true;
      }
      if (parseFloat(paypalWithdraw) < 10) {
        return true;
      }
      return false;
    } else {
      if (isNaN(parseFloat(cashAppAmount))) {
        return true;
      }
      if (parseFloat(cashAppAmount) > store?.user?.balance) {
        return true;
      }
      if (parseFloat(cashAppAmount) < 10) {
        return true;
      }
      return false;
    }
  };

  const SubmitDialog = (props) => {
    const { type } = props;
    if (type === "paypal") {
      return (
        <Dialog open={submitOpen} onClose={handleCloseSubmitDialog}>
          <DialogTitle
            sx={{ fontWeight: 900, fontSize: 28, color: constants.newOrange }}
          >
            Are You Sure?
          </DialogTitle>
          <DialogContent sx={{ minWidth: 400 }}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              rowSpacing={{ xs: 1, sm: 2 }}
            >
              <Grid item>
                <Typography
                  sx={{
                    fontSize: 18,
                    color: constants.newOrange,
                    fontWeight: 200,
                  }}
                >
                  The minimum withdraw amount is $10
                </Typography>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  columnSpacing={{ xs: 1, sm: 2 }}
                >
                  <Grid item>
                    <Typography sx={newStyles.balanceLabel}>
                      Amount:{" "}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography sx={newStyles.balanceValue}>
                      {numFormatter.format(paypalWithdraw)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  columnSpacing={{ xs: 1, sm: 2 }}
                >
                  <Grid item>
                    <Typography sx={newStyles.balanceLabel}>
                      Send to:{" "}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography sx={newStyles.balanceValue}>
                      {paypalEmail}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ width: "100%" }}
                  columnSpacing={{ xs: 1, sm: 2 }}
                >
                  <Grid item sx={{ width: "40%" }}>
                    <Button
                      sx={newStyles.cancelButton}
                      onClick={handleCloseSubmitDialog}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item sx={{ width: "40%" }}>
                    <Button
                      sx={newStyles.submitButton}
                      disabled={isButtonDisabled("paypal") || loading}
                      onClick={handlePaypalSubmit}
                    >
                      Withdraw
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      );
    } else if (type === "cashapp") {
      return (
        <Dialog open={submitOpen} onClose={handleCloseSubmitDialog}>
          <DialogTitle
            sx={{ fontWeight: 900, fontSize: 28, color: constants.newOrange }}
          >
            Are You Sure?
          </DialogTitle>
          <DialogContent sx={{ minWidth: 400 }}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              rowSpacing={{ xs: 1, sm: 2 }}
            >
              <Grid item>
                <Typography
                  sx={{
                    fontSize: 18,
                    color: constants.newOrange,
                    fontWeight: 200,
                  }}
                >
                  The minimum withdraw amount is $10
                </Typography>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  columnSpacing={{ xs: 1, sm: 2 }}
                >
                  <Grid item>
                    <Typography sx={newStyles.balanceLabel}>
                      Amount:{" "}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography sx={newStyles.balanceValue}>
                      {numFormatter.format(cashAppAmount)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  columnSpacing={{ xs: 1, sm: 2 }}
                >
                  <Grid item>
                    <Typography sx={newStyles.balanceLabel}>
                      Send to:{" "}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography sx={newStyles.balanceValue}>
                      {cashTag}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ width: "100%" }}
                  columnSpacing={{ xs: 1, sm: 2 }}
                >
                  <Grid item sx={{ width: "40%" }}>
                    <Button
                      sx={newStyles.cancelButton}
                      onClick={handleCloseSubmitDialog}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item sx={{ width: "40%" }}>
                    <Button
                      sx={newStyles.submitButton}
                      disabled={isButtonDisabled("cashapp") || loading}
                      onClick={handleCashAppSubmit}
                    >
                      Withdraw
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      );
    }
    return null;
  };

  const renderPaypal = () => {
    if (selected === "paypal") {
      return (
        <Grid item sx={{ width: "50%", marginTop: 3 }} xs={12}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            rowSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                direction="row"
                columnSpacing={{ xs: 1, sm: 2 }}
              >
                <Grid item>
                  <Typography sx={newStyles.balanceLabel}>
                    Paypal Email
                  </Typography>
                </Grid>
                <Grid item>
                  <Input
                    placeholder="Your Paypal Email"
                    value={paypalEmail}
                    onChange={(e) => setPayPalEmail(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                direction="row"
                columnSpacing={{ xs: 1, sm: 2 }}
                sx={{ width: "100%" }}
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item justifySelf="start">
                  <Typography sx={newStyles.balanceLabel}>
                    Your Balance
                  </Typography>
                </Grid>
                <Grid item justifySelf="end">
                  <Typography sx={newStyles.balanceValue}>
                    {numFormatter.format(store?.user?.balance)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Input
                labelPosition="left"
                type="number"
                placeholder="Amount to withdraw"
                onChange={(e) => setPaypalWithdraw(e.target.value)}
              >
                <Label basic>$</Label>
                <input value={paypalWithdraw} />
              </Input>
            </Grid>
            <Grid item sx={{ width: "100%" }}>
              <Grid container direction="column">
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    columnSpacing={{ xs: 1, sm: 2 }}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography sx={newStyles.balanceFeeLabel}>
                        Withdraw Fee (5% + $1)
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography sx={newStyles.balanceFeeValue}>
                        {numFormatter.format(paypalWithdraw * 0.05 + 1)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sx={{ width: "100%" }}>
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      columnSpacing={{ xs: 1, sm: 2 }}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography sx={newStyles.balanceFeeLabel}>
                          Tokens
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography sx={newStyles.balanceFeeValue}>
                          {numFormatter.format(paypalWithdraw)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                direction="row"
                columnSpacing={{ xs: 1, sm: 2 }}
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography sx={newStyles.receiveLabel}>
                    Total to Receive
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography sx={newStyles.balanceValue}>
                    {numFormatter.format(paypalWithdraw * 0.95 - 1)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Typography sx={newStyles.receiveLabel}>
                      Sending To
                    </Typography>
                  </Grid>
                  <Grid item sx={newStyles.balanceValue}>
                    {paypalEmail}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              sx={{
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              {parseFloat(paypalWithdraw) < 5 ||
              isNaN(parseFloat(paypalWithdraw)) ? (
                <Grid
                  container
                  direction="row"
                  columnSpacing={{ xs: 1 }}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <ErrorIcon
                      sx={{ fontSize: 26, color: constants.newOrange }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: 18,
                        color: constants.newOrange,
                        fontWeight: 200,
                      }}
                    >
                      The minimum withdraw amount is $10
                    </Typography>
                  </Grid>
                </Grid>
              ) : null}
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="large"
                sx={{
                  fontSize: 20,

                  width: "100%",
                  color: constants.white,
                  fontWeight: 900,
                  borderRadius: 2,
                  boxShadow: "0 0",
                  backgroundColor: constants.newOrange,
                  "&:hover": {
                    backgroundColor: constants.newOrange,
                    opacity: 0.7,
                    color: constants.white,
                    boxShadow: "0 0",
                  },
                  transition: "0.3s",
                }}
                onClick={handleOpenSubmitDialog}
              >
                WITHDRAW {numFormatter.format(paypalWithdraw)}
              </Button>
            </Grid>
          </Grid>
          <SubmitDialog type={"paypal"} />
        </Grid>
      );
    }
    return null;
  };

  const renderCashApp = () => {
    if (selected === "cashapp") {
      return (
        <Grid item sx={{ width: "50%", marginTop: 3 }}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            rowSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                direction="row"
                columnSpacing={{ xs: 1, sm: 2 }}
              >
                <Grid item>
                  <Typography sx={newStyles.balanceLabel}>Cash Tag</Typography>
                </Grid>
                <Grid item>
                  <Input
                    placeholder="Your Cash Tag"
                    value={cashTag}
                    onChange={(e) => setCashTag(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                direction="row"
                columnSpacing={{ xs: 1, sm: 2 }}
                sx={{ width: "100%" }}
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item justifySelf="start">
                  <Typography sx={newStyles.balanceLabel}>
                    Your Balance
                  </Typography>
                </Grid>
                <Grid item justifySelf="end">
                  <Typography sx={newStyles.balanceValue}>
                    {numFormatter.format(store?.user?.balance)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Input
                labelPosition="left"
                type="number"
                placeholder="Amount to withdraw"
                onChange={(e) => setCashAppAmount(e.target.value)}
              >
                <Label basic>$</Label>
                <input value={cashAppAmount} />
              </Input>
            </Grid>
            <Grid item sx={{ width: "100%" }}>
              <Grid container direction="column">
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    columnSpacing={{ xs: 1, sm: 2 }}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography sx={newStyles.balanceFeeLabel}>
                        Withdraw Fee (5%)
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography sx={newStyles.balanceFeeValue}>
                        {numFormatter.format(cashAppAmount * 0.05)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sx={{ width: "100%" }}>
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      columnSpacing={{ xs: 1, sm: 2 }}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography sx={newStyles.balanceFeeLabel}>
                          Tokens
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography sx={newStyles.balanceFeeValue}>
                          {numFormatter.format(paypalWithdraw)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                direction="row"
                columnSpacing={{ xs: 1, sm: 2 }}
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography sx={newStyles.receiveLabel}>
                    Total to Receive
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography sx={newStyles.balanceValue}>
                    {numFormatter.format(cashAppAmount * 0.95)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Typography sx={newStyles.receiveLabel}>
                      Sending To
                    </Typography>
                  </Grid>
                  <Grid item sx={newStyles.balanceValue}>
                    {cashTag}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              sx={{
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              {parseFloat(cashAppAmount) < 5 ||
              isNaN(parseFloat(cashAppAmount)) ? (
                <Grid
                  container
                  direction="row"
                  columnSpacing={{ xs: 1 }}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <ErrorIcon
                      sx={{ fontSize: 26, color: constants.newOrange }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: 18,
                        color: constants.newOrange,
                        fontWeight: 200,
                      }}
                    >
                      The minimum withdraw amount is $10
                    </Typography>
                  </Grid>
                </Grid>
              ) : null}
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="large"
                sx={{
                  fontSize: 20,

                  width: "100%",
                  color: constants.white,
                  fontWeight: 900,
                  borderRadius: 2,
                  boxShadow: "0 0",
                  backgroundColor: constants.newOrange,
                  "&:hover": {
                    backgroundColor: constants.newOrange,
                    opacity: 0.7,
                    color: constants.white,
                    boxShadow: "0 0",
                  },
                  transition: "0.3s",
                }}
                onClick={handleOpenSubmitDialog}
              >
                WITHDRAW {numFormatter.format(cashAppAmount)}
              </Button>
            </Grid>
          </Grid>
          <SubmitDialog type={"cashapp"} />
        </Grid>
      );
    }
    return null;
  };

  return (
    <Grid
      container
      sx={{ width: "100%" }}
      direction="column"
      rowSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      <Grid item>
        <Paper
          elevation={2}
          sx={{
            borderRadius: 2,
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: 4,
            paddingRight: 4,
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Grid item alignSelf="start" sx={{ width: "100%" }}>
            <Typography sx={styles.withdrawTitle}>Withdraw</Typography>
          </Grid>
        </Paper>
      </Grid>
      <Grid item>
        <Paper
          elevation={1}
          sx={{
            borderRadius: 3,
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxHeight: 650,
          }}
        >
          <Grid item sx={{ width: "50%", marginBottom: 2 }}>
            {cashError ? (
              <Grid item alignSelf="center">
                <Alert severity="error">{cashError}</Alert>
              </Grid>
            ) : null}
            {error ? (
              <Grid item alignSelf="center">
                <Alert severity="error">{error}</Alert>
              </Grid>
            ) : null}
            {success ? (
              <Grid item alignSelf="center">
                <Alert severity="success">{success}</Alert>
              </Grid>
            ) : null}
          </Grid>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              item
              sx={{
                backgroundColor: "#f2c07e",
                borderRadius: 2,
                width: "70%",
              }}
            >
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                columnSpacing={{ xs: 1, sm: 2 }}
                sx={{ width: "100%", height: 60 }}
              >
                <Grid item sx={{ width: "45%" }}>
                  <Button
                    variant="contained"
                    sx={
                      selected === "paypal"
                        ? newStyles.selectedPaypalButton
                        : newStyles.paypalButton
                    }
                    onClick={() => setSelected("paypal")}
                  >
                    Paypal
                  </Button>
                </Grid>
                <Grid item sx={{ width: "45%" }}>
                  <Button
                    variant="contained"
                    sx={
                      selected === "cashapp"
                        ? newStyles.selectedPaypalButton
                        : newStyles.paypalButton
                    }
                    onClick={() => setSelected("cashapp")}
                  >
                    Cash App
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            {renderPaypal()}
            {renderCashApp()}
          </Grid>
        </Paper>
      </Grid>
      {/* <Grid item>
        <Paper
          elevation={2}
          sx={{
            borderRadius: 2,
            padding: 4,
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Grid
            container
            direction="row"
            columnSpacing={{ xs: 1, sm: 2, md: 3, md: 12, lg: 16 }}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Button
                onClick={() => {
                  setPaypalOpen(false);
                  setCashAppOpen(true);
                }}
              >
                <ImPaypal style={styles.paypal} />
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => {
                  setPaypalOpen(true);
                  setCashAppOpen(false);
                }}
              >
                <SiCashapp style={styles.cashapp} />
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      {paypalInput(paypalOpen)}
      {cashAppInput(cashappOpen)} */}
    </Grid>
  );
};

export default Withdraws;
