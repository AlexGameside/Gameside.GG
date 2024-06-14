import { useContext, useState } from "react";
import { StoreContext } from "../../context/NewStoreContext";
import createTheme from "../../utils/theme";
import { Divider, Grid, Typography, useMediaQuery } from "@mui/material";
import DialogModal from "../../custom_components/DialogModal";
import { FaWallet } from "react-icons/fa";
import NewPrimaryButton from "../../custom_components/NewPrimaryButton";
import NewInput from "../NewInput";
import paypal from "../../assets/paypal.svg";
import { valWithdraw, withdrawTokens } from "../../utils/API";
import useAxios from "../../utils/useAxios";
import BubbleButton from "../../custom_components/BubbleButton";
import NewDropdown from "../NewDropdown";

const WithdrawDialogModal = (props) => {
  // constants
  const { onClose, open } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const api = useAxios();
  const countries = [
    { title: "None", value: null },
    { title: "Brazil", value: "BR" },
    { title: "Europe", value: "EU" },
    { title: "North America", value: "NA" },
    { title: "Latam", value: "LT" },
    { title: "Australia", value: "AUS" },
  ];

  // state
  const [customAmount, setCustomAmount] = useState(null);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState("paypal");
  const [paypalAccount, setPaypalAccount] = useState(null);
  const [bankAccount, setBankAccount] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [valorantPoints, setValorantPoints] = useState(0);
  const [email, setEmail] = useState(null);
  const [country, setCountry] = useState(null);

  // methods
  const handleClose = () => {
    onClose();
    setCustomAmount(null);
    setStep(0);
    setSelected("paypal");
    setPaypalAccount(null);
    setBankAccount(null);
    setLoading("");
    setSuccess("");
    setError("");
    setEmail(null);
    setLoading(false);
    setValorantPoints(null);
    setCountry(null);
  };

  const handleValWithdraw = () => {
    setLoading(true);
    setError("");
    setSuccess("");

    if (valorantPoints > store?.user?.points) {
      setError("You do not have enough valorant points for this.");
      setLoading(false);
      setValorantPoints(0);
      setEmail("");
      setCountry(null);
      return;
    }

    if (country == null || country === "") {
      setError("Please enter a country.");
      setLoading(false);
      setValorantPoints(0);
      setEmail("");
      setCountry(null);
      return;
    }

    if (email == null || email === "") {
      setError("Please enter an email.");
      setLoading(false);
      setValorantPoints(0);
      setEmail("");
      setCountry(null);
      return;
    }

    valWithdraw(api, country, valorantPoints, email).then((res) => {
      if (!res?.error) {
        setLoading(false);
        setSuccess(res?.message);
        setError("");
        setPaypalAccount("");
        setCustomAmount(0);
        setValorantPoints(0);
        setEmail("");
        setCountry(null);
        return;
      } else {
        setLoading(false);
        setSuccess("");
        setError(res?.message);
        setPaypalAccount("");
        setCustomAmount(0);
        setValorantPoints(0);
        setEmail("null");
        setCountry(null);
      }
    });
  };

  const handleWithdraw = () => {
    setLoading(true);
    setError("");
    setSuccess("");
    if (parseFloat(customAmount) < 10) {
      setError("Withdraw minimum is $10.00");
      setLoading(false);
      setValorantPoints(0);
      setEmail("");
      setCountry(null);
      return;
    }

    if (paypalAccount == null || paypalAccount == "") {
      setError("Please enter a paypal email.");
      setLoading(false);
      setValorantPoints(0);
      setEmail("");
      setCountry(null);
      return;
    }

    withdrawTokens(api, paypalAccount, true, customAmount, null, null).then(
      (res) => {
        if (!res?.error) {
          setLoading(false);
          setSuccess(res?.message);
          setError("");
          setPaypalAccount("");
          setCustomAmount(0);
          setValorantPoints(0);
          setEmail("");
          setCountry(null);
          return;
        } else {
          setLoading(false);
          setSuccess("");
          setError(res?.message);
          setPaypalAccount("");
          setCustomAmount(0);
          setValorantPoints(0);
          setEmail("");
          setCountry(null);
        }
      }
    );
  };

  // styles
  const styles = {
    customLabel: {
      fontSize: 14,
      fontWeight: 600,
      color: theme.red(),
    },
    label: {
      fontSize: 14,
      fontWeight: 600,
      color: theme.text(),
    },
    subLabel: {
      fontSize: 14,
      fontWeight: 600,
      color: theme.metaText(),
    },
  };

  return (
    <DialogModal
      title="Withdraw"
      onClose={handleClose}
      open={open}
      button={
        <NewPrimaryButton
          label="Submit"
          loading={loading}
          onClick={() => {
            if (step === 0) {
              handleWithdraw();
              return;
            }

            if (step === 1) {
              handleValWithdraw();
              return;
            }
          }}
        />
      }
      icon={paypal}
      error={error}
      setError={setError}
      success={success}
      setSuccess={setSuccess}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        gap={{ xs: 1 }}
      >
        {store?.user?.balance < 10 ? (
          <>
            <Grid item>
              <FaWallet
                style={{
                  fontSize: 40,
                  color: theme.metaText(),
                }}
              />
            </Grid>

            <Grid item>
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: theme.metaText(),
                }}
              >
                Not enough balance!
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: theme.metaText(),
                }}
              >
                You must have at least $10.00 in your balance to withdraw.
              </Typography>
            </Grid>
          </>
        ) : (
          <>
            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                justifyContent={isDesktop ? "space-between" : "center"}
                alignItems="center"
                sx={{ width: "100%" }}
                gap={{ xs: 2 }}
              >
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
                          justifyContent="center"
                          alignItems="center"
                          gap={{ xs: 1 }}
                        >
                          <Grid item>
                            <BubbleButton
                              title="Balance"
                              selected={step === 0}
                              onClick={() => {
                                if (step === 0 || loading) {
                                  return;
                                }
                                setStep(0);
                                setPaypalAccount(null);
                                setCustomAmount(0);
                                setValorantPoints(0);
                                setEmail(null);
                                setCountry(null);
                              }}
                            />
                          </Grid>

                          
                        </Grid>
                      </Grid>

                      {step === 0 ? (
                        <>
                          <Grid item sx={{ width: "100%" }}>
                            <Grid
                              container
                              direction="column"
                              justifyContent="start"
                              alignItems="start"
                              rowSpacing={{ xs: 1 }}
                            >
                              <Grid item sx={{ width: "100%" }}>
                                <Typography style={styles.label}>
                                  PayPal Email / $cashtag
                                </Typography>
                              </Grid>
                              <Grid item sx={{ width: "100%" }}>
                                <NewInput
                                  placeholder="Paypal / Cashtag (Cash app)"
                                  onChange={setPaypalAccount}
                                  value={paypalAccount}
                                  type="email"
                                />
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item sx={{ width: "100%", marginBottom: 2 }}>
                            <Grid
                              container
                              direction="column"
                              justifyContent="start"
                              alignItems="start"
                              rowSpacing={{ xs: 1 }}
                            >
                              <Grid item sx={{ width: "100%" }}>
                                <Typography style={styles.label}>
                                  Amount*
                                </Typography>
                              </Grid>
                              <Grid item sx={{ width: "100%" }}>
                                <NewInput
                                  placeholder={0}
                                  onChange={(value) => setCustomAmount(value)}
                                  value={customAmount}
                                  type="number"
                                />
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item sx={{ width: "100%" }}>
                            <Grid
                              container
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Grid item>
                                <Typography sx={styles.subLabel}>
                                  Amount
                                </Typography>
                              </Grid>

                              <Grid item>
                                <Typography sx={styles.label}>
                                  {numFormatter.format(customAmount)}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item sx={{ width: "100%" }}>
                            <Grid
                              container
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Grid item>
                                <Typography sx={styles.subLabel}>
                                  Sending to
                                </Typography>
                              </Grid>

                              <Grid item>
                                <Typography sx={styles.label}>
                                  {paypalAccount ?? "--"}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item sx={{ width: "100%" }}>
                            <Grid
                              container
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Grid item>
                                <Typography sx={styles.subLabel}>
                                  Transaction fees
                                </Typography>
                              </Grid>

                              <Grid item>
                                <Typography sx={styles.label}>
                                  5% + $1.00
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item sx={{ width: "100%" }}>
                            <Grid
                              container
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Grid item>
                                <Typography sx={styles.subLabel}>
                                  Processing time
                                </Typography>
                              </Grid>

                              <Grid item>
                                <Typography sx={styles.label}>
                                  1 - 12 Hours
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item sx={{ width: "100%" }}>
                            <Divider sx={{ backgroundColor: theme.border() }} />
                          </Grid>

                          <Grid item sx={{ width: "100%" }}>
                            <Grid
                              container
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Grid item>
                                <Typography sx={styles.subLabel}>
                                  Total
                                </Typography>
                              </Grid>

                              <Grid item>
                                <Typography sx={styles.label}>
                                  {customAmount < 10
                                    ? numFormatter.format(0)
                                    : numFormatter.format(
                                        customAmount - customAmount * 0.05 - 1
                                      )}
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
                              direction="column"
                              justifyContent="start"
                              alignItems="start"
                              rowSpacing={{ xs: 1 }}
                            >
                              <Grid item sx={{ width: "100%" }}>
                                <Typography style={styles.label}>
                                  Country*
                                </Typography>
                              </Grid>
                              <Grid item sx={{ width: "100%" }}>
                                <NewDropdown
                                  placeholder="Country"
                                  options={countries}
                                  onChange={(value) => setCountry(value)}
                                />
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item sx={{ width: "100%" }}>
                            <Grid
                              container
                              direction="column"
                              justifyContent="start"
                              alignItems="start"
                              rowSpacing={{ xs: 1 }}
                            >
                              <Grid item sx={{ width: "100%" }}>
                                <Typography style={styles.label}>
                                  Email*
                                </Typography>
                              </Grid>
                              <Grid item sx={{ width: "100%" }}>
                                <NewInput
                                  placeholder="Email"
                                  onChange={setEmail}
                                  value={email}
                                  type="email"
                                />
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item sx={{ width: "100%" }}>
                            <Grid
                              container
                              direction="column"
                              justifyContent="start"
                              alignItems="start"
                              rowSpacing={{ xs: 1 }}
                            >
                              <Grid item sx={{ width: "100%" }}>
                                <Typography style={styles.label}>
                                  Amount*
                                </Typography>
                              </Grid>
                              <Grid item sx={{ width: "100%" }}>
                                <Grid
                                  container
                                  justifyContent="center"
                                  alignItems="center"
                                  gap={{ xs: 1 }}
                                >
                                  <Grid item>
                                    <BubbleButton
                                      title="1000"
                                      onClick={() => setValorantPoints(1000)}
                                      selected={valorantPoints === 1000}
                                    />
                                  </Grid>

                                  <Grid item>
                                    <BubbleButton
                                      title="2500"
                                      onClick={() => setValorantPoints(2500)}
                                      selected={valorantPoints === 2500}
                                    />
                                  </Grid>

                                  <Grid item>
                                    <BubbleButton
                                      title="5350"
                                      onClick={() => setValorantPoints(5350)}
                                      selected={valorantPoints === 5350}
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </>
                      )}
                    </Grid>
                  </Grid>
                </>
              </Grid>
            </Grid>

            {customAmount > 0 && customAmount < 10 ? (
              <Grid item>
                <Typography sx={styles.customLabel}>
                  Minimum withdraw amount is $10.00 USD.
                </Typography>
              </Grid>
            ) : null}
          </>
        )}
      </Grid>
    </DialogModal>
  );
};

export default WithdrawDialogModal;
