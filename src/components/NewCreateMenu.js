import { Typography, Grid, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import {
  SET_USER,
  StoreContext,
  StoreDispatch,
} from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import { useLocation } from 'react-router-dom';
import { FaSkullCrossbones, FaPiggyBank, FaUsers } from "react-icons/fa";
import NewCreateTeamModal from "./NewCreateTeamModal";
import NewCreateScrimModal from "./NewCreateScrimModal";
import NewCreateCashMatchModal from "./NewCreateCashMatchModal";

const useOutsideClick = (ref, containerRef, callback) => {
  const handleClick = (e) => {
    if (
      ref.current &&
      !ref.current.contains(e.target) &&
      !containerRef.current.contains(e.target)
    ) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

const NewCreateMenu = (props) => {
  // variables
  const { open, handleClose, containerRef } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const dispatch = useContext(StoreDispatch);
  const wrapperRef = useRef(null);
  const location = useLocation();
  const isFortnite = location.pathname.startsWith("/fortnite") || location.pathname === 'fortnite'; 
  const isDesktop = useMediaQuery("(min-width:1025px)");

  // state
  const [createOpen, setCreateOpen] = useState(false);
  const [createScrimOpen, setCreateScrimOpen] = useState(false);
  const [createCashMatchOpen, setCreateCashMatchOpen] = useState(false);

  // methods
  const handleCreateOpen = () => {
    setCreateOpen(true);
  };

  const handleCreateClose = () => {
    setCreateOpen(false);
  };

  const handleCreateScrimOpen = () => {
    setCreateScrimOpen(true);
  };

  const handleCreateScrimClose = () => {
    setCreateScrimOpen(false);
  };

  const handleOpenCreateCashMatch = () => {
    setCreateCashMatchOpen(true);
  };

  const handleCloseCreateCashMatch = () => {
    setCreateCashMatchOpen(false);
  };

  const handleAddTeam = (team) => {
    const newUserData = store?.user;
    newUserData.userTeams?.push(team);
    dispatch({ type: SET_USER, payload: newUserData });
  };

  useOutsideClick(wrapperRef, containerRef, () => {
    if (open) {
      if (!createOpen && !createCashMatchOpen && !createScrimOpen) {
        handleClose();
        return;
      }
    }
  });

  // styles
  const styles = {
    menuContainer: {
      borderRadius: 12,
      boxShadow: theme.shadow(),
      backgroundColor: theme.card(),
      color: theme.text(),
      minHeight: 250,
      paddingTop: 8,
      paddingBottom: 8,
      position: "fixed",
      bottom: isDesktop ? 0 : 51,
      right: 90,
      zIndex: 1000,
    },
    title: {
      fontSize: 22,
      fontWeight: 700,
      color: theme.text(),
    },
    transactions: {
      fontSize: 14,
      fontWeight: 400,
      color: theme.metaText(),
      transition: "all .2s ease-in-out",
      "&:hover": {
        cursor: "pointer",
        color: theme.text(),
      },
    },
    label: {
      fontSize: 14,
      fontWeight: 400,
      color: theme.metaText(),
    },
    value: {
      fontSize: 16,
      fontWeight: 700,
      color: theme.text(),
    },
    deposit: {
      color: theme.white(),
      fontSize: 11,
      textTransform: "none",
      fontWeight: 700,
      borderRadius: 50,
      boxShadow: "0 0",
      transition: "all .2s ease-in-out",
      minWidth: 130,
      height: 40,
      backgroundColor: theme.green(),
      "&:hover": {
        backgroundColor: theme.green(),
        backgroundImage: theme.buttonHover(),
        boxShadow: "0 0",
      },
    },
    withdraw: {
      color: theme.text(),
      fontSize: 11,
      textTransform: "none",
      fontWeight: 700,
      borderRadius: 50,
      boxShadow: "0 0",
      transition: "all .2s ease-in-out",
      minWidth: 130,
      height: 40,
      backgroundColor: theme.border(),
      "&:hover": {
        backgroundColor: theme.border(),
        backgroundImage: theme.buttonHover(),
        boxShadow: "0 0",
      },
    },
  };

  return !open ? null : (
    <div style={styles.menuContainer} ref={wrapperRef}>
      <NewCreateTeamModal
        open={createOpen}
        onClose={handleCreateClose}
        fromCreateMenu={true}
        handleAddTeam={handleAddTeam}
      />
      <NewCreateScrimModal
        open={createScrimOpen}
        onClose={handleCreateScrimClose}
      />
      <NewCreateCashMatchModal
        open={createCashMatchOpen}
        onClose={handleCloseCreateCashMatch}
      />

      <Grid
        container
        direction="column"
        alignItems="start"
        justifyContent="start"
        sx={{ width: "100%", minHeight: 250, paddingLeft: 1, paddingRight: 2 }}
      >
        <Grid item sx={{ paddingLeft: 1, marginBottom: 2 }}>
          <Typography sx={styles.title}>Create</Typography>
        </Grid>

        <Grid item sx={{ width: "100%" }}>
          <Grid
            container
            direction="column"
            alignItems="start"
            justifyContent="center"
            gap={{ xs: 1 }}
          >
            <Grid
              item
              sx={{
                width: "100%",
                borderRadius: 2,
                padding: 1,
                "&:hover": {
                  cursor: store?.currentTokenId ? "not-allowed" : "pointer",
                  backgroundColor: theme.cardHover(),
                },
              }}
              onClick={() => {
                if (store?.currentTokenId) {
                  return;
                }
                handleCreateScrimOpen();
              }}
            >
              {!isFortnite && (
              <Grid
                container
                justifyContent="start"
                alignItems="center"
                gap={{ xs: 2 }}
              >
                <Grid
                  item
                  sx={{
                    height: 48,
                    width: 48,
                    borderRadius: 100,
                    backgroundColor: theme.iconButton(),
                  }}
                >
                  <FaSkullCrossbones
                    style={{
                      color: theme.icon(),
                      fontSize: 26,
                      marginLeft: 11,
                      marginTop: 10,
                    }}
                  />
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    alignItems="start"
                    justifyContent="center"
                  >
                    <Grid item>
                      <Typography sx={styles.value}>Scrim</Typography>
                    </Grid>

                    <Grid item>
                      <Typography sx={styles.label}>
                        Free to enter competitive scrims.
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid item sx={{ width: "100%" }}>
          <Grid
            container
            direction="column"
            alignItems="start"
            justifyContent="center"
            gap={{ xs: 1 }}
          >
            <Grid
              item
              sx={{
                width: "100%",
                borderRadius: 2,
                padding: 1,
                "&:hover": {
                  cursor: store?.currentTokenId ? "not-allowed" : "pointer",
                  backgroundColor: theme.cardHover(),
                },
              }}
              onClick={() => {
                if (store?.currentTokenId) {
                  return;
                }

                handleOpenCreateCashMatch();
              }}
            >
              <Grid
                container
                justifyContent="start"
                alignItems="center"
                gap={{ xs: 2 }}
              >
                <Grid
                  item
                  sx={{
                    height: 48,
                    width: 48,
                    borderRadius: 100,
                    backgroundColor: theme.iconButton(),
                  }}
                >
                  <FaPiggyBank
                    style={{
                      color: theme.icon(),
                      fontSize: 26,
                      marginLeft: 10,
                      marginTop: 10,
                    }}
                  />
                </Grid>

                <Grid item>
                  <Grid
                    container
                    direction="column"
                    alignItems="start"
                    justifyContent="center"
                  >
                    <Grid item>
                      <Typography sx={styles.value}>Cash Match</Typography>
                    </Grid>

                    <Grid item>
                      <Typography sx={styles.label}>
                        Compete in wager style matches <br /> and win money.
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
            alignItems="start"
            justifyContent="center"
            gap={{ xs: 1 }}
          >
            <Grid
              item
              sx={{
                width: "100%",
                borderRadius: 2,
                padding: 1,
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor: theme.cardHover(),
                },
              }}
              onClick={handleCreateOpen}
            >
              <Grid
                container
                justifyContent="start"
                alignItems="center"
                gap={{ xs: 2 }}
              >
                <Grid
                  item
                  sx={{
                    height: 48,
                    width: 48,
                    borderRadius: 100,
                    backgroundColor: theme.iconButton(),
                  }}
                >
                  <FaUsers
                    style={{
                      color: theme.icon(),
                      fontSize: 26,
                      marginLeft: 10,
                      marginTop: 10,
                    }}
                  />
                </Grid>

                <Grid item>
                  <Grid
                    container
                    direction="column"
                    alignItems="start"
                    justifyContent="center"
                  >
                    <Grid item>
                      <Typography sx={styles.value}>Team</Typography>
                    </Grid>

                    <Grid item>
                      <Typography sx={styles.label}>
                        Compete in scrims, cash matches <br /> and tournaments.
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default NewCreateMenu;
