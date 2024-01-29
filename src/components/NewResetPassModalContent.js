import { useContext, useState } from "react";
import createTheme from "../utils/theme";
import { StoreContext } from "../context/NewStoreContext";
import { Alert, DialogContent, Grid, Typography } from "@mui/material";
import NewInput from "./NewInput";
import { forgotPass } from "../utils/API";
import { useSearchParams } from "react-router-dom";
import { BiLockOpenAlt } from "react-icons/bi";
import NewPrimaryButton from "../custom_components/NewPrimaryButton";

const NewResetPassModalContent = (props) => {
  // variables
  const { showLogin } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  // state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [searchParams, _] = useSearchParams();

  // methods
  const handleResetPassword = () => {
    setLoading(true);
    setError("");
    setSuccess("");
    const code = searchParams.get("forgot");
    forgotPass(password, confirmPassword, code).then((res) => {
      if (!res.error) {
        setLoading(false);
        setSuccess("Successfully changed password. Please login!");
        return;
      } else {
        setError(res.message);
        setLoading(false);
        return;
      }
    });
  };

  // styles
  const styles = {
    title: {
      fontSize: 32,
      fontWeight: 600,
      color: theme.text(),
    },
    sub: {
      fontSize: 16,
      fontWeight: 400,
      color: theme.metaText(),
      marginBottom: 4,
    },
    input: {
      backgroundColor: theme.background(),
    },
    signUpText: {
      fontSize: 18,
      color: theme.subText(),
    },
    signUpContainer: {
      transition: "all .2s ease-in-out",
      "&:hover": {
        cursor: "pointer",
      },
    },
    signUp: {
      fontSize: 18,
      fontWeight: 900,
      color: theme.text(),
    },
    button: {
      color: theme.white(),
      width: "100%",
      fontSize: 18,
      textTransform: "none",
      fontWeight: 900,
      borderRadius: 50,
      boxShadow: "0 0",
      transition: "all .3s ease-in-out",
      backgroundColor: theme.blue(),
      "&:hover": {
        backgroundColor: theme.blue(),
        opacity: 0.7,
        boxShadow: "0 0",
        transform: "scale(1.1)",
      },
    },
    label: {
      fontSize: 14,
      fontWeight: 600,
      color: theme.text(),
    },
    loading: {
      color: theme.white(),
    },
  };

  return (
    <DialogContent>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        rowSpacing={{ xs: 6 }}
      >
        {error ? (
          <Grid item>
            <Alert severity="error" onClose={() => setError("")}>
              {error}
            </Alert>
          </Grid>
        ) : null}

        {success ? (
          <Grid item>
            <Alert severity="success" onClose={() => setSuccess("")}>
              {success}
            </Alert>
          </Grid>
        ) : null}
        <Grid item>
          <Grid
            container
            direction="column"
            alignItems="start"
            justifyContent="center"
          >
            <Grid item>
              <Typography style={styles.title}>Reset Password</Typography>
            </Grid>
            <Grid item>
              <Typography style={styles.sub}>Enter a new password.</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sx={{ width: "100%" }}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            gap={{ xs: 2 }}
            sx={{ width: "100%" }}
          >
            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                direction="column"
                justifyContent="start"
                alignItems="start"
                rowSpacing={{ xs: 1 }}
              >
                <Grid item sx={{ width: "100%" }}>
                  <Typography style={styles.label}>Password*</Typography>
                </Grid>
                <Grid item sx={{ width: "100%" }}>
                  <NewInput
                    placeholder="Password"
                    onChange={setPassword}
                    lowercase
                    value={password}
                    type="password"
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
                    Confirm Password*
                  </Typography>
                </Grid>
                <Grid item sx={{ width: "100%" }}>
                  <NewInput
                    placeholder="Confirm Password"
                    onChange={setConfirmPassword}
                    value={confirmPassword}
                    type="password"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sx={{ width: "100%" }}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            rowSpacing={{ xs: 1 }}
          >
            <Grid item sx={{ minWidth: "100%" }}>
              <NewPrimaryButton
                label="reset password"
                loading={loading}
                onClick={handleResetPassword}
                fullWidth={true}
              />
            </Grid>

            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                gap={{ xs: 0.5 }}
                sx={{ width: "100%" }}
              >
                <Grid item>
                  <Typography
                    style={{
                      fontSize: 13,
                      fontWeight: 400,
                      color: theme.metaText(),
                    }}
                  >
                    Back to{" "}
                  </Typography>
                </Grid>
                <Grid item sx={styles.signUpContainer} onClick={showLogin}>
                  <Typography
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: theme.primary(),
                    }}
                  >
                    Log in
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DialogContent>
  );
};

export default NewResetPassModalContent;
