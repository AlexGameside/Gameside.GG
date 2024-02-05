import { useContext, useEffect, useState } from "react";
import {
  SET_OPEN_TOKEN_DIALOG_ID,
  StoreContext,
  StoreDispatch,
} from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import { Grid, Typography, Chip } from "@mui/material";
import { getRankLabel, getTokenMatchType } from "../utils/helperMethods";
import NewJoinScrimModal from "./NewJoinScrimModal";
import NewSignupLoginModal from "./NewSignupLoginModal";
import NewTokenPasswordModal from "./NewTokenPasswordModal";
import { AiFillLock } from "react-icons/ai";
import NewPrimaryOutlineButton from "../custom_components/NewPrimaryOutlineButton";
import { useNavigate } from "react-router-dom";

const NewMatchItem = (props) => {
  // variables
  const { scrim, home = false } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const dispatch = useContext(StoreDispatch);
  const navigate = useNavigate();

  // state
  const [loginOpen, setLoginOpen] = useState(false);
  const [joinId, setJoinId] = useState(null);
  const [passwordOpen, setPasswordOpen] = useState(false);

  // methods
  const handleJoinOpen = () => {
    if (home) {
      navigate("/valorant/scrims");
      return;
    }

    if (store?.user) {
      if (scrim?.password != "" && scrim?.password != null) {
        setPasswordOpen(true);
        return;
      }
      dispatch({ type: SET_OPEN_TOKEN_DIALOG_ID, payload: scrim?._id });
      return;
    } else {
      setLoginOpen(true);
      return;
    }
  };

  const handleJoinClose = () => {
    dispatch({ type: SET_OPEN_TOKEN_DIALOG_ID, payload: null });
  };

  const handleCloseLogin = () => {
    setLoginOpen(false);
  };

  useEffect(() => {
    setJoinId(store?.openTokenDialogId);
  }, [store?.openTokenDialogId]);

  // styles
  const styles = {
    title: {
      fontSize: 18,
      fontWeight: 700,
      color: theme.text(),
    },
    value: {
      fontSize: 15,
      fontWeight: 600,
      color: theme.text(),
    },
    label: {
      fontSize: 14,
      fontWeight: 500,
      color: theme.metaText(),
    },
    accept: {
      color: theme.white(),
      fontSize: 11,
      fontWeight: 700,
      borderRadius: 2,
      boxShadow: "0 0",
      transition: "all .2s ease-in-out",
      minWidth: 50,
      height: 40,
      backgroundColor: theme.primary(),
      "&:hover": {
        backgroundColor: theme.primary(true),
        boxShadow: "0 0",
      },
    },
  };

  return (
    <>
      <NewJoinScrimModal
        open={joinId === scrim?._id}
        token={scrim}
        onClose={handleJoinClose}
      />

      <NewSignupLoginModal
        open={loginOpen}
        onClose={handleCloseLogin}
        handleMenuClose={() => {}}
      />

      <NewTokenPasswordModal
        token={scrim}
        onClose={() => setPasswordOpen(false)}
        open={passwordOpen}
      />

      <Grid
        item
        xs={12}
        sm={12}
        md={5.9}
        xl={3.9}
        sx={{
          borderRadius: 4,
          transition: "all .2s ease-in-out",
          position: "relative",
          padding: 2,
          backgroundColor: theme.card(),
          boxSizing: "border-box",
          minWidth: home ? 320 : 0,
        }}
      >
        <Grid
          container
          direction="column"
          alignItems="start"
          justifyContent="center"
          gap={{ xs: 1 }}
        >
          <Grid item sx={{ width: "100%" }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography sx={styles.title}>
                  {scrim?.hasVoting
                    ? `Best of 3 Scrim`
                    : `${getTokenMatchType(scrim?.match_type)} Scrim`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item sx={{ width: "100%" }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Grid
                  container
                  direction="column"
                  alignItems="start"
                  justifyContent="center"
                >
                  <Grid item>
                    <Typography sx={styles.label}>Region</Typography>
                  </Grid>

                  <Grid item>
                    <Typography sx={styles.value}>{scrim?.region}</Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <Grid
                  container
                  direction="column"
                  alignItems="start"
                  justifyContent="center"
                >
                  <Grid item>
                    <Typography sx={styles.label} noWrap>
                      Size
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography sx={styles.value}>
                      {scrim?.team_size}v{scrim?.team_size}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <Grid
                  container
                  direction="column"
                  alignItems="start"
                  justifyContent="center"
                >
                  <Grid item>
                    <Typography sx={styles.label} noWrap>
                      Map
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography
                      sx={{ ...styles.value, color: theme.primary() }}
                    >
                      {scrim?.hasVoting
                        ? "Pick/Ban Map"
                        : getTokenMatchType(scrim?.match_type)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <Grid
                  container
                  direction="column"
                  alignItems="start"
                  justifyContent="center"
                >
                  <Grid item>
                    <Typography sx={styles.label} noWrap>
                      Best Of
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography sx={styles.value}>
                      {scrim?.hasVoting ? "3" : "1"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              {scrim?.rank != null && scrim?.rank !== "" ? (
                <Chip
                  label={getRankLabel(scrim?.rank)}
                  sx={{
                    color: theme.text(),
                    backgroundColor: theme.border(),
                    fontSize: 12,
                    fontWeight: 600,
                    position: "absolute",
                    top: 5,
                    right: 5,
                  }}
                  size="small"
                />
              ) : null}
            </Grid>
          </Grid>

          <Grid item sx={{ width: "100%", marginTop: 2 }}>
            <NewPrimaryOutlineButton
              complementary
              label={
                scrim?.password !== "" && scrim?.password != null ? (
                  <AiFillLock style={{ fontSize: 24 }} />
                ) : (
                  "Accept"
                )
              }
              fullWidth
              onClick={() => {
                if (
                  store?.currentTokenId != null &&
                  store?.currentTokenId != ""
                ) {
                  return;
                }
                handleJoinOpen();
              }}
              disabled={
                store?.currentTokenId != null && store?.currentTokenId != ""
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default NewMatchItem;
