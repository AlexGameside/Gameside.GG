import { useContext, useEffect, useState } from "react";
import createTheme from "../utils/theme";
import {
  StoreContext,
  StoreDispatch,
  SET_USER,
} from "../context/NewStoreContext";
import {
  Alert,
  DialogContent,
  Grid,
  Typography,
  useMediaQuery,
  Divider,
} from "@mui/material";
import NewInput from "./NewInput";
import { useSearchParams } from "react-router-dom";
import { login } from "../utils/API";
import createTokenProvider from "../utils/TokenUtils";
import NewPrimaryButton from "../custom_components/NewPrimaryButton";
import constants from "../utils/constants";

const CountdownLoginModalContent = (props) => {
  // variables
  const { showSignup, showForgot, handleClose } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const tokenProvider = createTokenProvider();
  const dispatch = useContext(StoreDispatch);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const isMobile = useMediaQuery("(max-width:500px)");

  // state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [searchParams, _] = useSearchParams();

  // methods
  const handleLogin = () => {
    setLoading(true);
    setError(null);
    if (!username || !password) {
      setLoading(false);
      setError("Please enter your username and password.");
      return;
    }

    login(username, password).then((res) => {
      if (!res.error) {
        setLoading(false);
        tokenProvider.setToken(res.accessToken, res.refreshToken);
        dispatch({ type: SET_USER, payload: res.user });
        handleClose();
        return;
      } else {
        if (typeof res.message === "string") {
          setError(res.message);
        }
        setLoading(false);
        return;
      }
    });
  };

  // useEffect
  useEffect(() => {
    const verify = searchParams.get("verify");
    if (verify) {
      if (verify === "true") {
        setSuccess("Email verified successfully. You can now login if you have access to our closed beta. If not, come back March 1.");
        return;
      }

      if (verify === "false") {
        setError("Unable to verify email.");
        return;
      }
    }
  }, [searchParams]);

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
    forgot: {
      fontSize: 13,
      fontWeight: 600,
      color: constants.primaryRed,
    },
  };

  return (
    <DialogContent>
      {error ? (
        <Alert severity="error" onClose={() => setError("")}>
          {error}
        </Alert>
      ) : null}

      {success ? (
        <Alert severity="success" onClose={() => setSuccess("")}>
          {success}
        </Alert>
      ) : null}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        rowSpacing={{ xs: 4 }}
      >
        <Grid
          item
          sx={{
            width: "100%",
          }}
        >
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            justifyContent="center"
            gap={{ xs: 2 }}
          >
            <Grid item>
              <Grid
                container
                direction="column"
                alignItems="start"
                justifyContent="center"
              >
                <Grid item>
                  <Typography style={styles.title}>Login</Typography>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    justifyContent="start"
                    alignItems="center"
                    gap={{ xs: 0.5 }}
                  >
                    <Grid item>
                      <Typography sx={styles.subtitle}>
                        Don't have an account?
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      sx={{ "&:hover": { cursor: "pointer" } }}
                      onClick={showSignup}
                    >
                      <Typography
                        sx={{
                          fontSize: 16,
                          fontWeight: 600,
                          color: constants.primaryRed,
                        }}
                      >
                        Sign up.
                      </Typography>
                    </Grid>
                  </Grid>
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
                  <Typography style={styles.label}>Username*</Typography>
                </Grid>
                <Grid item sx={{ width: "100%" }}>
                  <NewInput
                    placeholder="Username"
                    onChange={setUsername}
                    lowercase
                    value={username}
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
                  <Typography style={styles.label}>Password*</Typography>
                </Grid>
                <Grid item sx={{ width: "100%" }}>
                  <NewInput
                    placeholder="Password"
                    onChange={setPassword}
                    value={password}
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
            alignItems="center"
            justifyContent="center"
            gap={{ xs: 1 }}
          >
            <Grid item sx={{ minWidth: "100%" }}>
              <NewPrimaryButton
                label="login"
                backgroundColor={constants.primaryRed}
                loading={loading}
                onClick={handleLogin}
                fullWidth={true}
              />
            </Grid>

            <Grid item>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                rowSpacing={{ xs: 1 }}
              >
                <Grid
                  item
                  sx={{ width: "100%", "&:hover": { cursor: "pointer" } }}
                  onClick={showForgot}
                >
                  <Typography sx={styles.forgot}>
                    Forgot your password?
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

export default CountdownLoginModalContent;
