import { useContext, useState } from "react";
import createTheme from "../utils/theme";
import { StoreContext } from "../context/NewStoreContext";
import { Alert, DialogContent, Grid, Typography } from "@mui/material";
import NewInput from "./NewInput";
import { forgot } from "../utils/API";
import NewPrimaryButton from "../custom_components/NewPrimaryButton";

const NewForgotModalContent = (props) => {
  // variables
  const { showLogin } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  // state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [email, setEmail] = useState(null);

  // methods
  const handleSubmitForgot = () => {
    setError("");
    setSuccess("");
    setLoading(true);
    if (!email || email == null || email == "") {
      setLoading(false);
      setError("Please enter an email.");
      return;
    }
    forgot(email).then((res) => {
      if (!res.error) {
        setLoading(false);
        setSuccess(
          "Email has been sent to reset your password. Check spam if you cannot find it."
        );
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
    subtitle: {
      fontSize: 16,
      fontWeight: 400,
      color: theme.metaText(),
      marginBottom: 4,
    },
    label: {
      fontSize: 14,
      fontWeight: 600,
      color: theme.text(),
    },
    signUpContainer: {
      transition: "all .2s ease-in-out",
      "&:hover": {
        cursor: "pointer",
      },
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
              <Typography style={styles.title}>Forgot Password?</Typography>
            </Grid>
            <Grid item>
              <Typography style={styles.subtitle}>
                Enter your email below and we'll send you a link to reset your
                password.
              </Typography>
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
              <Typography style={styles.label}>Email*</Typography>
            </Grid>
            <Grid item sx={{ width: "100%" }}>
              <NewInput
                placeholder="Email"
                type="email"
                onChange={setEmail}
                value={email}
              />
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
                label="send link"
                loading={loading}
                onClick={handleSubmitForgot}
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

export default NewForgotModalContent;
