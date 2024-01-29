import {
  Grid,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useEffect, useContext, useState } from "react";
import useAxios from "../../../../utils/useAxios";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../../../context/NewStoreContext";
import createTheme from "../../../../utils/theme";
import { getDateForMatch } from "../../../../utils/helperMethods";
import {
  getPendingWithdrawals,
  markPendingWithdrawal,
} from "../../../../utils/api/admin";

const StaffPanelWithdrawalsDashboard = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const styles = {
    title: {
      fontWeight: 900,
      fontSize: 28,
      color: theme.text(),
    },
    subTitle: {
      fontWeight: 200,
      fontSize: 16,
      color: theme.text(),
    },
    label: {
      fontWeight: 200,
      fontSize: 16,
      color: theme.text(),
    },
    value: {
      fontWeight: 900,
      fontSize: 16,
      color: theme.text(),
    },
    isBanned: {
      fontWeight: 900,
      color: theme.red(),
      fontSize: 16,
    },
    isOkay: {
      fontWeight: 900,
      color: theme.green(),
      fontSize: 16,
    },
    mark: {
      color: theme.white(),
      textTransform: "none",
      fontWeight: 900,
      borderRadius: 50,
      boxShadow: "0 0",
      transition: "all .3s ease-in-out",
      backgroundColor: theme.blue(),
      "&:hover": {
        backgroundColor: theme.blue(),
        boxShadow: theme.shadow(),
        transform: "scale(1.1)",
      },
      marginBottom: 2,
    },
  };

  const navigate = useNavigate();
  const api = useAxios();

  // state
  const [withdraws, setWithdraws] = useState([]);
  const [bannedSet, setBannedSet] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const getWithdraws = () => {
    getPendingWithdrawals(api).then((res) => {
      if (!res.error) {
        setLoading(false);
        setWithdraws(res.withdraws);
        setBannedSet(res.bannedSet);
      } else {
        setLoading(false);
      }
    });
  };

  const handleMarkWithdrawal = (unique_value, index) => {
    setError(null);
    setSuccess(null);
    setButtonLoading(true);
    markPendingWithdrawal(api, unique_value).then((res) => {
      if (!res.error) {
        const newWithdraws = [...withdraws];
        newWithdraws?.splice(index, 1);
        setWithdraws([...newWithdraws]);

        // setSuccess("deleted!");
        setButtonLoading(false);
        return;
      } else {
        setError("error deleting withdraw!");
        setButtonLoading(false);
        return;
      }
    });
  };

  useEffect(() => {
    if (withdraws?.length < 1) {
      setLoading(true);
      getWithdraws();
    }
  }, []);

  if (store?.user?.role < 501) {
    navigate("/profile");
    return;
  }

  return (
    <>
      <Grid
        container
        direction="row"
        columnSpacing={{ xs: 1, sm: 2 }}
        rowSpacing={{ xs: 1, sm: 2 }}
        sx={{ padding: 2 }}
      >
        {error ? (
          <Grid item>
            <Alert severity="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          </Grid>
        ) : null}
        {success ? (
          <Grid item>
            <Alert severity="success" onClose={() => setSuccess(null)}>
              {success}
            </Alert>
          </Grid>
        ) : null}
        {loading ? (
          <Grid item>
            <Typography sx={styles.title}>
              Loading Pending Withdraws...
            </Typography>
          </Grid>
        ) : withdraws?.length < 1 ? (
          <Grid item>
            <Typography sx={styles.title}>No Pending Withdraws!</Typography>
          </Grid>
        ) : (
          withdraws?.map((withdraw, i) => {
            return (
              <Grid item xs={12} sm={12} md={3} key={i}>
                <Paper
                  elevation={1}
                  sx={{
                    borderRadius: 3,
                    padding: 2,
                    display: "flex",
                    flexDirection: "column",
                    borderLeft: `5px solid ${theme.blue()}`,
                    backgroundColor: theme.card(),
                  }}
                >
                  <Grid container direction="column" rowSpacing={{ xs: 1 }}>
                    <Grid item>
                      <Grid item>
                        <Button
                          variant="contained"
                          size="small"
                          sx={styles.mark}
                          disabled={buttonLoading}
                          onClick={() => handleMarkWithdrawal(withdraw._id, i)}
                        >
                          {buttonLoading ? (
                            <CircularProgress
                              size={30}
                              sx={{ color: theme.white() }}
                            />
                          ) : (
                            "Completed"
                          )}
                        </Button>
                      </Grid>
                      <Typography sx={styles.label}>
                        Account:{" "}
                        <span
                          style={
                            bannedSet[withdraw?.username]
                              ? styles.isBanned
                              : styles.isOkay
                          }
                        >
                          {withdraw?.paypal}
                        </span>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography sx={styles.label}>
                        Username:{" "}
                        <span
                          style={
                            bannedSet[withdraw?.username]
                              ? styles.isBanned
                              : styles.isOkay
                          }
                        >
                          {withdraw?.username}
                        </span>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography sx={styles.label}>
                        Banned:{" "}
                        <span
                          style={
                            bannedSet[withdraw?.username]
                              ? styles.isBanned
                              : styles.isOkay
                          }
                        >
                          {bannedSet[withdraw?.username] ? "True" : "False"}
                        </span>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography sx={styles.label}>
                        Amount:{" "}
                        <span
                          style={
                            bannedSet[withdraw?.username]
                              ? styles.isBanned
                              : styles.isOkay
                          }
                        >
                          {withdraw?.amount}
                        </span>
                      </Typography>
                    </Grid>

                    {withdraw?.currency ? (
                      <Grid item>
                        <Typography sx={styles.label}>
                          Currency:{" "}
                          <span
                            style={
                              bannedSet[withdraw?.username]
                                ? styles.isBanned
                                : styles.isOkay
                            }
                          >
                            {withdraw?.currency}
                          </span>
                        </Typography>
                      </Grid>
                    ) : null}

                    <Grid item>
                      <Typography sx={styles.label}>
                        Date:{" "}
                        <span
                          style={
                            bannedSet[withdraw?.username]
                              ? styles.isBanned
                              : styles.isOkay
                          }
                        >
                          {getDateForMatch(withdraw?._id)}
                        </span>
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            );
          })
        )}
      </Grid>
    </>
  );
};

export default StaffPanelWithdrawalsDashboard;
