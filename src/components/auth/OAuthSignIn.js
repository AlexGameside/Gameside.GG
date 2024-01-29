import { CircularProgress, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  SET_USER,
  StoreContext,
  StoreDispatch,
} from "../../context/NewStoreContext";
import { getOAuthUser, setUserRefCode } from "../../utils/API";
import createTheme from "../../utils/theme";
import createTokenProvider from "../../utils/TokenUtils";
import useAxios from "../../utils/useAxios";

const OAuthSignIn = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const tokenProvider = createTokenProvider();
  const dispatch = useContext(StoreDispatch);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, _] = useSearchParams();

  const api = useAxios(searchParams.get("token"));

  useEffect(() => {
    theme.changeWebsiteBackground();
  }, []);

  useEffect(() => {
    theme.changeWebsiteBackground();
  }, [store.mode]);

  useEffect(() => {
    const refCode = localStorage.getItem("ref_code");
    if (refCode) {
      setUserRefCode(api, refCode).then((res) => {
        if (!res?.error) {
          localStorage.removeItem("ref_code");
        }
      });
    }
    getOAuthUser(api).then((res) => {
      if (!res?.error) {
        tokenProvider.setToken(res?.accessToken, res?.refreshToken);
        dispatch({ type: SET_USER, payload: res?.user });
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    });
    // On Success, reroute to home
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!error) {
        navigate("/");
      } else {
        navigate("/login?failed=true");
      }
    }
  }, [loading]);

  const styles = {};

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="start"
      direction="column"
      sx={{
        minHeight: "100vh",
      }}
      id="top"
    >
      <Grid item sx={{ height: "100%" }}>
        <CircularProgress size={70} sx={{ color: theme.primary() }} />
      </Grid>
    </Grid>
  );
};

export default OAuthSignIn;
