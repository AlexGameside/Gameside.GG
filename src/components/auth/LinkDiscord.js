import { CircularProgress, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  SET_USER,
  StoreContext,
  StoreDispatch,
} from "../../context/NewStoreContext";
import { linkDiscord } from "../../utils/API";
import createTheme from "../../utils/theme";
import useAxios from "../../utils/useAxios";

const LinkDiscord = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const dispatch = useContext(StoreDispatch);
  const navigate = useNavigate();
  const api = useAxios();

  const [loading, setLoading] = useState(true);
  const [discordConnection, setDiscordConnection] = useState(null);
  const [error, setError] = useState(null);
  const [searchParams, _] = useSearchParams();

  const handleLinkDiscord = (code) => {
    setLoading(true);
    setError(null);
    linkDiscord(api, code).then((res) => {
      if (!res?.error) {
        setDiscordConnection(res?.discord);
        setLoading(false);
      } else {
        setError(res?.message);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    theme.changeWebsiteBackground();
  }, []);

  useEffect(() => {
    theme.changeWebsiteBackground();
  }, [store.mode]);

  useEffect(() => {
    if (store?.user && !loading) {
      if (error) {
        navigate("/profile/accounts", {
          state: {
            error,
          },
        });
        return;
      }
      let newUser = store?.user;
      newUser.connections[10] = discordConnection;
      dispatch({ type: SET_USER, payload: { ...newUser } });
      navigate("/profile/accounts");
    }
  }, [store?.user]);

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    if (code) {
      // make call to backend to save refresh token and add connection
      handleLinkDiscord(code);
    }
    if (error) {
      setLoading(false);
      setError(error);
    }
  }, [searchParams]);

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

export default LinkDiscord;
