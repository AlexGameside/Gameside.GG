import React, { useContext, useRef, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Grid, Skeleton } from '@mui/material';
import { useMediaQuery } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import Avatar from "avataaars";
import constants from '../utils/constants';
import createTheme from "../utils/theme";
import HomeSignupLoginModal from './HomeSignupLoginModal';
import { StoreContext } from '../context/NewStoreContext';
import NewPrimaryButton from "../custom_components/NewPrimaryButton";
import UserProfileModal from './user/UserProfileModal';

const HomeNavBar = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const navigate = useNavigate();
  const avatar = useRef();

  // state
  const [openModal, setOpenModal] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openProfile, setOpenProfile] = useState(false);
  const [userSelected, setUserSelected] = useState(null);
  const isMenuOpen = Boolean(menuAnchor);

  const isDesktop = useMediaQuery("(min-width:1025px)");
  const isMobile = useMediaQuery("(max-width:500px)");

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    navigate("/");
    setOpenModal(false);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const styles = {
    navBar: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      height: isDesktop ? 56 : 50,
      width: "100%",
      backgroundColor: constants.black,
    },
    link: {
      color: constants.white,
      marginRight: '20px',
    },
    loginButton: {
      position: "absolute",
      right: 20,
      color: constants.white,
      borderColor: constants.white,
      borderRadius: '10px',
    },
    avatar: {
      position: "absolute",
      right: 20,
    },
    iconsContainer: {
      transition: "all .1s ease-in-out",
      paddingLeft: 0,
      paddingRight: 2,
      borderRadius: 50,
    },
  };

  return (
    <>
      <HomeSignupLoginModal
        open={openModal}
        onClose={handleCloseModal}
        handleMenuClose={handleMenuClose}
      />
      <AppBar 
        elevation={0}
        position="fixed" 
        sx={styles.navBar}
      >
      <Toolbar sx={{ width: "100%" }}>
        <UserProfileModal
          username={userSelected}
          open={openProfile}
          onClose={() => {
            setOpenProfile(false);
            setUserSelected(null);
          }}
        />
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            {/* Logo */}
          </Grid>
          {/* Todo: add actual navigation */}
          <Grid container direction="row" alignItems="center">
            <Typography variant="subtitle1" style={styles.link}>
              Matches
            </Typography>
            <Typography variant="subtitle1" style={styles.link}>
              Tournaments
            </Typography>

            {/* Login button on the right or avatar */}
            {store.user && isDesktop ? (
              <Avatar
                style={{ ...styles.avatar, width: 43, height: 43 }}
                avatarStyle="Circle"
                {...store?.user?.avatar[0]}
              />
            ) : loading && isDesktop ? (
              <Grid item sx={styles.iconsContainer}>
                <Skeleton
                  variant="circular"
                  width={40}
                  height={40}
                  sx={{ bgcolor: theme.skeleton() }}
                  animation="wave"
                />
              </Grid>
            ) : !store?.user ? (
              // <NewPrimaryButton
              //   label="signup / login"
              //   onClick={handleOpenModal}
              // />
              <Button variant="outline" sx={styles.loginButton} onClick={handleOpenModal}>signup / login</Button>
            ) : null}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  </>
  );
};

export default HomeNavBar;