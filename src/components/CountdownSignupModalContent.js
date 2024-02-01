import { useContext, useState } from "react";
import createTheme from "../utils/theme";
import { StoreContext } from "../context/NewStoreContext";
import { Alert, DialogContent, Grid, Typography, Divider } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import NewInput from "./NewInput";
import { register } from "../utils/API";
import NewPrimaryButton from "../custom_components/NewPrimaryButton";
import DiscordButton from "../custom_components/DiscordButton";
import TwitchButton from "../custom_components/TwitchButton";
import GoogleButton from "../custom_components/GoogleButton";
// import jwt_decode from "jwt-decode";

const CountdownSignupModalContent = (props) => {
  // variables
  const { showLogin } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const navigate = useNavigate();

  // state
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [searchParams, _] = useSearchParams();

  // methods
  const showTOS = () => {
    navigate("/valorant/tos");
  };

  const showPrivacy = () => {
    navigate("/valorant/privacypolicy");
  };

  const handleRegister = () => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    if (password !== confirmPassword) {
      setLoading(false);
      setError("Passwords do not match.");
      setPassword("");
      setConfirmPassword("");
      return;
    }
    if (
      !date ||
      !name ||
      !email ||
      !username ||
      !password ||
      !confirmPassword
    ) {
      setLoading(false);
      setError("Please fill in all fields.");
      return;
    }
    const promoCode = searchParams.get("code");
    register(name, date, email, username, password, promoCode).then((res) => {
      if (!res.error) {
        setLoading(false);
        setError(null);
        setSuccess(
          "Successfully registered. Please verify your email to login."
        );
        setDate("");
        setName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        return;
      } else {
        setLoading(false);
        setError(res.message);
      }
    });
  };

  // const handleGoogleCB = (response) => {
  //   const userObject = jwt_decode(response.credential);
  //   console.log(userObject);
  // };

  // effects
  // useEffect(() => {
  //   window.google?.accounts?.id?.initialize({
  //     context: "signup",
  //     client_id:
  //       "413079839400-o3736c7i0sfqqbvbdh6rm2d1ft86ec3d.apps.googleusercontent.com",
  //     callback: handleGoogleCB,
  //   });

  //   window.google?.accounts?.id?.renderButton(
  //     document.getElementById("signInDiv"),
  //     {
  //       theme: "outline",
  //       size: "large",
  //     }
  //   );
  // }, []);

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
        gap={{ xs: 4 }}
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

        <Grid item sx={{ width: "100%" }}>
          <Grid
            container
            direction="column"
            alignItems="center"
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
                  <Typography style={styles.title}>Sign up</Typography>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    justifyContent="start"
                    alignItems="center"
                    gap={{ xs: 0.5 }}
                  >
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item sx={{ width: "100%" }}>
              <DiscordButton label="Sign up with Discord" />
            </Grid>

            <Grid item sx={{ width: "100%" }}>
              <TwitchButton label="Sign up with Twitch" />
            </Grid>

            <Grid item sx={{ width: "100%" }}>
              <GoogleButton label="Sign up with Google" />
            </Grid>

            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                gap={{ xs: 1 }}
              >
                <Grid item flexGrow={1}>
                  <Divider sx={{ backgroundColor: theme.border() }} />
                </Grid>
                <Grid item>
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: theme.text(),
                      fontWeight: 600,
                    }}
                  >
                    or
                  </Typography>
                </Grid>
                <Grid item flexGrow={1}>
                  <Divider sx={{ backgroundColor: theme.border() }} />
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
            rowSpacing={{ xs: 2 }}
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
                  <Typography style={styles.label}>Full Name*</Typography>
                </Grid>
                <Grid item sx={{ width: "100%" }}>
                  <NewInput
                    placeholder="Full Name"
                    onChange={setName}
                    value={name}
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
                  <Typography style={styles.label}>Date of Birth*</Typography>
                </Grid>
                <Grid item sx={{ width: "100%" }}>
                  <NewInput
                    placeholder="Date of Birth"
                    onChange={setDate}
                    type="date"
                    value={date}
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
                  <Typography style={styles.label}>Email*</Typography>
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
                  <Typography style={styles.label}>Username*</Typography>
                </Grid>
                <Grid item sx={{ width: "100%" }}>
                  <NewInput
                    placeholder="Username"
                    onChange={setUsername}
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
            alignItems="center"
            justifyContent="center"
            gap={{ xs: 1 }}
          >
            <Grid item sx={{ minWidth: "100%" }}>
              <NewPrimaryButton
                label="sign up"
                loading={loading}
                onClick={handleRegister}
                fullWidth={true}
              />
            </Grid>

            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                columnSpacing={{ xs: 1 }}
                sx={{ width: "100%" }}
              >
                <Grid item>
                  <Typography
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      color: theme.metaText(),
                    }}
                  >
                    By clicking 'Sign Up' you agree to our{" "}
                  </Typography>
                </Grid>

                <Grid item sx={styles.signUpContainer} onClick={showTOS}>
                  <Typography
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: theme.primary(),
                    }}
                  >
                    terms of service
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      color: theme.metaText(),
                    }}
                  >
                    and{" "}
                  </Typography>
                </Grid>

                <Grid item sx={styles.signUpContainer} onClick={showPrivacy}>
                  <Typography
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: theme.primary(),
                    }}
                  >
                    privacy policy.
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

export default CountdownSignupModalContent;