import { useContext, useState, useEffect } from "react";
import {
  StoreContext,
  StoreDispatch,
  SET_OPEN_MATCH_DIALOG_ID,
} from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import { getCurrentTokenTitle } from "../utils/helperMethods";
import { AiFillLock } from "react-icons/ai";
import NewSignupLoginModal from "./NewSignupLoginModal";
import NewTokenPasswordModal from "./NewTokenPasswordModal";
import NewJoinCashMatchModal from "./NewJoinCashMatchModal";
import NewPrimaryOutlineButton from "../custom_components/NewPrimaryOutlineButton";
import { useNavigate, useLocation } from "react-router-dom";

const NewCashMatchItem = (props) => {
  const { match, home = false } = props;
  console.log(match);
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const navigate = useNavigate();
  const location = useLocation();
  const isFortnite = location.pathname.startsWith("/fortnite");
  const isValorant = location.pathname.startsWith("/valorant");
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const dispatch = useContext(StoreDispatch);

  // state
  const [loginOpen, setLoginOpen] = useState(false);
  const [joinId, setJoinId] = useState(null);
  const [passwordOpen, setPasswordOpen] = useState(false);

  // methods
  const handleJoinOpen = () => {
    if (home) {
      navigate(`${isFortnite ? '/fortnite' : isValorant ? '/valorant' : null}/cash-matches`);
      return;
    }
    if (store?.user) {
      if (match?.password != "" && match?.password != null) {
        setPasswordOpen(true);
        return;
      }
      dispatch({ type: SET_OPEN_MATCH_DIALOG_ID, payload: match?._id });
      return;
    } else {
      setLoginOpen(true);
      return;
    }
  };

  const handleJoinClose = () => {
    dispatch({ type: SET_OPEN_MATCH_DIALOG_ID, payload: null });
  };

  const handleCloseLogin = () => {
    setLoginOpen(false);
  };

  // effects
  useEffect(() => {
    setJoinId(store?.openMatchDialogId);
  }, [store?.openMatchDialogId]);

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
  };

  return (
    <>
      <NewSignupLoginModal
        open={loginOpen}
        onClose={handleCloseLogin}
        handleMenuClose={() => {}}
      />

      <NewTokenPasswordModal
        token={match}
        onClose={() => setPasswordOpen(false)}
        open={passwordOpen}
      />

      <NewJoinCashMatchModal
        open={joinId === match?._id}
        token={match}
        onClose={handleJoinClose}
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
                  {match?.hasVoting
                    ? `${match?.team_size}v${match?.team_size} Best of 3`
                    : `${getCurrentTokenTitle(
                        match?.team_size,
                        match?.match_type
                      )}`}
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
                    <Typography sx={styles.value}>{match?.region}</Typography>
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
                      First To
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography sx={styles.value}>{match?.first_to}</Typography>
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
                    <Typography sx={styles.label}>Best of</Typography>
                  </Grid>

                  <Grid item>
                    <Typography sx={styles.value}>
                      {match?.hasVoting ? "3" : "1"}
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
                      Entry Fee
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: theme.complementary(),
                      }}
                    >
                      {numFormatter.format(match?.entry_fee)}
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
                    <Typography sx={styles.label}>Prize</Typography>
                  </Grid>

                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: theme.green(),
                      }}
                    >
                      {numFormatter.format(match?.entry_fee * 0.9)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item sx={{ width: "100%", marginTop: 2 }}>
            <NewPrimaryOutlineButton
              label={
                match?.password !== "" && match?.password != null ? (
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

export default NewCashMatchItem;
