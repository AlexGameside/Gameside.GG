import {
  Grid,
  Typography,
  Divider,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useEffect, useContext, useState } from "react";
import { getReferrals, createReferral } from "../../../../utils/api/admin";
import useAxios from "../../../../utils/useAxios";
import { useNavigate } from "react-router-dom";
import { Input, Label } from "semantic-ui-react";
import { StoreContext } from "../../../../context/NewStoreContext";
import createTheme from "../../../../utils/theme";

const StaffPanelReferrals = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const styles = {
    title: {
      fontSize: 20,
      color: theme.text(),
    },
    cancel: {
      color: theme.white(),
      fontWeight: 900,
      borderRadius: 3,
      boxShadow: "0 0",
      backgroundColor: theme.text(),
      "&:hover": {
        backgroundColor: theme.text(),
        opacity: 0.7,
        color: theme.white(),
        boxShadow: "0 0",
      },
      transition: "0.3s",
    },
    create: {
      color: theme.white(),
      fontWeight: 900,
      borderRadius: 3,
      boxShadow: "0 0",
      backgroundColor: theme.green(),
      "&:hover": {
        backgroundColor: theme.green(),
        opacity: 0.7,
        color: theme.white(),
        boxShadow: "0 0",
      },
      transition: "0.3s",
    },
  };

  const navigate = useNavigate();
  const api = useAxios();

  // state
  const [referrals, setReferrals] = useState([]);
  const [showCreateCode, setShowCreateCode] = useState(false);
  const [username, setUsername] = useState(null);
  const [code, setCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const getUserReferrals = () => {
    getReferrals(api).then((res) => {
      if (!res.error) {
        setReferrals(res);
      }
    });
  };

  const handleCreateCode = () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    if (!username || !code) {
      setLoading(false);
      return;
    }
    if (username == null || code == null) {
      setLoading(false);
      return;
    }
    createReferral(api, code, username).then((res) => {
      if (!res.error) {
        setLoading(false);
        const newReferrals = [...referrals];
        newReferrals?.push(res);
        setReferrals([...newReferrals]);
        setUsername("");
        setCode("");
        setSuccess("Created Code!");
        return;
      }
      setError(res?.message);
      setLoading(false);
    });
  };

  useEffect(() => {
    getUserReferrals();
  }, []);

  if (store?.user?.role < 500) {
    navigate("/profile");
    return;
  }

  return (
    <>
      <Grid
        container
        direction="column"
        columnSpacing={{ xs: 1, sm: 2 }}
        rowSpacing={{ xs: 1, sm: 2 }}
        sx={{ padding: 2 }}
      >
        {error ? (
          <Grid item alignSelf="center">
            <Alert severity="error">{error}</Alert>
          </Grid>
        ) : null}
        {success ? (
          <Grid item alignSelf="center">
            <Alert severity="success">{success}</Alert>
          </Grid>
        ) : null}
        <Grid item>
          <Button
            variant="contained"
            size="small"
            sx={showCreateCode ? styles.cancel : styles.create}
            onClick={() => {
              setShowCreateCode(!showCreateCode);
              setCode("");
              setUsername("");
              setError(null);
              setSuccess(null);
            }}
          >
            {showCreateCode ? "Cancel" : "Create Code"}
          </Button>
        </Grid>
        {!showCreateCode ? null : (
          <Grid item>
            <Grid container columnSpacing={{ xs: 1 }}>
              <Grid item>
                <Input labelPosition="left" placeholder="Username">
                  <Label basic>Username</Label>
                  <input
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setError(null);
                      setSuccess(null);
                    }}
                    value={username}
                  />
                </Input>
              </Grid>

              <Grid item>
                <Input labelPosition="left" placeholder="Code">
                  <Label basic>Code</Label>
                  <input
                    onChange={(e) => {
                      setCode(e.target.value);
                      setError(null);
                      setSuccess(null);
                    }}
                    value={code}
                  />
                </Input>
              </Grid>

              <Grid item>
                <Button
                  disabled={loading}
                  variant="contained"
                  size="large"
                  sx={styles.create}
                  onClick={handleCreateCode}
                >
                  {loading ? <CircularProgress size={24} /> : "Create Code"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}

        {referrals?.length < 1 ? (
          <Grid item>
            <Typography sx={styles.title}>No Referrals!</Typography>
          </Grid>
        ) : (
          referrals?.map((referral, i) => {
            return (
              <Grid key={i} item xs={12} sm={12} md={3}>
                <Typography sx={styles.title}>{referral?.code}</Typography>
                <Typography sx={{ color: theme.subText() }}>
                  Sign Ups: {referral?.signups}
                </Typography>
                <Divider sx={{ backgroundColor: theme.subText() }} />
              </Grid>
            );
          })
        )}
      </Grid>
    </>
  );
};

export default StaffPanelReferrals;
