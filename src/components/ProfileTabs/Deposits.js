import { useContext } from "react";
import { GlobalStateContext } from "../../context/StoreContext";
import { poofRequest } from "../../utils/API";
import useAxios from "../../utils/useAxios";
import constants from "../../utils/constants";
import { Grid, Button, Typography, Paper } from "@mui/material";
import { useState } from "react";
import { Input, Label } from "semantic-ui-react";
import PaymentIcon from "react-payment-icons";

const Deposits = () => {
  const styles = {
    depositTitle: {
      fontWeight: 900,
      color: constants.newGray,
      fontSize: 24,
    },
    moneyButtonContainer: {
      border: `1px solid ${constants.newGrayLight}`,
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
      backgroundColor: "#D8FAF2",
      "&:hover": {
        backgroundColor: "#f5f5f5",
        cursor: "pointer",
      },
    },
    moneyLabel: {
      fontSize: 20,
      color: constants.newGray,
      fontWeight: 900,
    },
    selectedMoneyLabel: {
      fontSize: 20,
      color: "#59887D",
      fontWeight: 900,
    },
    inputLabel: {
      color: constants.newGray,
      fontSize: 20,
    },
    input: {
      width: "100%",
      borderRadius: 4,
      minHeight: 20,
    },
    select: {
      border: `2px solid ${constants.newGreen}`,
      borderRadius: 10,
      color: constants.newGreen,
      padding: 10,
      fontWeight: 900,
      width: "100%",
      fontSize: 16,
      color: constants.newGreen,
    },
  };

  const store = useContext(GlobalStateContext);
  const api = useAxios();

  const [selected, setSelected] = useState(5);
  const [other, setOther] = useState(false);

  const payload = {
    username: "arya",
    amount: selected < 5 ? 5 : selected,
    redirect: `${constants.clientUrl}/profile`,
    default: {
      name: store?.user?.username,
    },
  };

  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <Grid
      container
      sx={{ width: "100%" }}
      direction="column"
      rowSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      <Grid item>
        <Paper
          elevation={1}
          sx={{
            borderRadius: 3,
            padding: 4,
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Grid item alignSelf="start">
            <Typography sx={styles.depositTitle}>Deposit</Typography>
          </Grid>
        </Paper>
      </Grid>
      <Grid item>
        <Paper
          elevation={1}
          sx={{
            borderRadius: 3,
            padding: 2,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            marginBottom: 4,
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            rowSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ width: "100%" }}
          >
            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                direction="row"
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{ width: "100%" }}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item>
                  <Paper
                    elevation={0}
                    sx={
                      selected === 10 && !other
                        ? styles.selectedMoneyContainer
                        : styles.moneyButtonContainer
                    }
                    onClick={() => {
                      setSelected(10);
                      setOther(false);
                    }}
                  >
                    <Typography
                      sx={
                        selected === 10 && !other
                          ? styles.selectedMoneyLabel
                          : styles.moneyLabel
                      }
                    >
                      $10
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper
                    elevation={0}
                    sx={
                      selected === 15 && !other
                        ? styles.selectedMoneyContainer
                        : styles.moneyButtonContainer
                    }
                    onClick={() => {
                      setSelected(15);
                      setOther(false);
                    }}
                  >
                    <Typography
                      sx={
                        selected === 15 && !other
                          ? styles.selectedMoneyLabel
                          : styles.moneyLabel
                      }
                    >
                      $15
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper
                    elevation={0}
                    sx={
                      selected === 25 && !other
                        ? styles.selectedMoneyContainer
                        : styles.moneyButtonContainer
                    }
                    onClick={() => {
                      setSelected(25);
                      setOther(false);
                    }}
                  >
                    <Typography
                      sx={
                        selected === 25 && !other
                          ? styles.selectedMoneyLabel
                          : styles.moneyLabel
                      }
                    >
                      $25
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper
                    elevation={0}
                    sx={
                      selected === 50 && !other
                        ? styles.selectedMoneyContainer
                        : styles.moneyButtonContainer
                    }
                    onClick={() => {
                      setSelected(50);
                      setOther(false);
                    }}
                  >
                    <Typography
                      sx={
                        selected === 50 && !other
                          ? styles.selectedMoneyLabel
                          : styles.moneyLabel
                      }
                    >
                      $50
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper
                    elevation={0}
                    sx={
                      other
                        ? styles.selectedMoneyContainer
                        : styles.moneyButtonContainer
                    }
                    onClick={() => setOther(true)}
                  >
                    <Typography
                      sx={other ? styles.selectedMoneyLabel : styles.moneyLabel}
                    >
                      Other
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            {!other ? null : (
              <Grid item>
                {/* <div>
                  <div>
                    <MaskedInput
                      id="deposit-input"
                      style={styles.input}
                      mask={currencyMask}
                      placeholder="$5.00"
                      type="text"
                      defaultValue={5}
                      value={selected}
                      onChange={(e) => {
                        let newAmount = parseInt(e.target.value.substring(1));
                        console.log(newAmount);
                        if (isNaN(newAmount)) {
                          newAmount = 0.0;
                        }
                        setSelected(newAmount);
                      }}
                    />
                  </div>
                </div> */}
                <Input
                  labelPosition="left"
                  type="number"
                  placeholder="Deposit Amount"
                  onChange={(e) => setSelected(e.target.value)}
                >
                  <Label basic>$</Label>
                  <input value={selected} />
                </Input>
              </Grid>
            )}
            <Grid
              item
              sx={{
                width: "40%",
              }}
            >
              <Typography
                style={{
                  fontSize: 16,
                  fontWeight: 200,
                  color: constants.newGray,
                  textAlign: "center",
                }}
              >
                Funds will not be available to{" "}
                <span style={{ color: constants.newOrange }}>withdraw</span>{" "}
                right away once you deposit. Any funds put towards a token will
                become available to{" "}
                <span style={{ color: constants.newOrange }}>withdraw</span>{" "}
                instantly after the match is played!
              </Typography>
            </Grid>
            <Grid item sx={{ width: "50%" }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  fontSize: 22,

                  width: "100%",
                  color: constants.white,
                  fontWeight: 900,
                  borderRadius: 3,
                  boxShadow: "0 0",
                  backgroundColor: "#7EEFD4",
                  "&:hover": {
                    backgroundColor: "#7EEFD4",
                    opacity: 0.7,
                    color: constants.white,
                    boxShadow: "0 0",
                  },
                  transition: "0.3s",
                }}
                onClick={() => {
                  poofRequest(api, payload).then((res) =>
                    window.location.assign(res)
                  );
                }}
              >
                {`Deposit ${
                  selected < 5
                    ? numFormatter.format(5)
                    : numFormatter.format(selected)
                }`}
              </Button>
            </Grid>
            <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item>
                  <PaymentIcon
                    id="visa"
                    style={{ width: 100 }}
                    className="payment-icon"
                  />
                </Grid>
                <Grid item>
                  <PaymentIcon
                    id="mastercard"
                    style={{ width: 100 }}
                    className="payment-icon"
                  />
                </Grid>
                <Grid item>
                  <PaymentIcon
                    id="amex"
                    style={{ width: 100 }}
                    className="payment-icon"
                  />
                </Grid>
                <Grid item>
                  <PaymentIcon
                    id="discover"
                    style={{ width: 100 }}
                    className="payment-icon"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Deposits;
