import { useContext, useEffect, useState } from "react";
import {
  SET_USER,
  StoreContext,
  StoreDispatch,
} from "../../context/NewStoreContext";
import createTheme from "../../utils/theme";
import useAxios from "../../utils/useAxios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { submitTwitch } from "../../utils/API";
import { CircularProgress, Grid } from "@mui/material";

const TwitchRedirect = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const api = useAxios();
  const dispatch = useContext(StoreDispatch);
  const navigate = useNavigate();

  const [userLoading, setUserLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [searchParams, _] = useSearchParams();

  const handleSubmitTwitch = (code) => {
    submitTwitch(api, code).then((res) => {
      if (!res?.error) {
        let newUser = store.user;
        newUser.connections[4] = res?.twitchUser;
        dispatch({ type: SET_USER, payload: { ...newUser } });
      }
      setLoading(false);
      return;
    });
  };

  useEffect(() => {
    if (!store?.user) return;
    setUserLoading(false);
  }, [store]);

  useEffect(() => {
    if (!userLoading) {
      handleSubmitTwitch(searchParams.get("code"));
    }
  }, [searchParams, userLoading]);

  useEffect(() => {
    theme.changeWebsiteBackground();
  }, []);

  useEffect(() => {
    theme.changeWebsiteBackground();
  }, [store.mode]);

  useEffect(() => {
    if (!loading) {
      navigate("/profile/accounts");
    }
  }, [loading]);

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
      rowSpacing={{ xs: 1, sm: 2, md: 4 }}
      sx={{
        minHeight: "100vh",
      }}
      id="top"
    >
      <Grid item>
        <CircularProgress size={100} sx={{ color: theme.primary() }} />
      </Grid>
    </Grid>
  );
};

export default TwitchRedirect;
