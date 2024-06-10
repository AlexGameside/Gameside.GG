import React, { useContext, useState } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import Logo from '../assets/rebrand/Gameside_Logomark.svg';
import NewPrimaryButton from '../custom_components/NewPrimaryButton';
import {JoinDiscordButton} from '../custom_components/DiscordButton';
import Countdown from 'react-countdown';
import { StoreContext } from '../context/NewStoreContext';
// import createTheme from '../utils/theme';
// import NewSignupLoginModal from '../components/NewSignupLoginModal';
import { useNavigate } from 'react-router-dom';
import CountdownSignupModal from '../components/CountdownSignupLoginModal';
import constants from '../utils/constants';


const CountdownPage = () => {
  const store = useContext(StoreContext);
  // const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const isMobile = useMediaQuery("(max-width:500px)");

  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [, setMenuAnchor] = useState(null);

  const date = new Date('2024-06-15T00:00:00Z');
  const epoch = date.getTime();

  // const handleJoinDiscord = (e) => {
  //   e.preventDefault();
  //   window.open('https://discord.gg/EZvFmXgam2', '_blank');
  // }

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    navigate("/countdown");
    setOpenModal(false);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      maxWidth: "800px",
    },
    logo: {
      maxWidth: isDesktop ? "500px" : isMobile ? "350px" : "400px",
      maxHeight: isDesktop ? "500px" : isMobile ? "350px" : "400px",
      marginBottom: "20px",
    },
    countdownText: {
      fontSize: isDesktop ? 50 : isMobile ? 25 : 40,
      paddingBottom: "20px",
      fontFamily: 'Syne, sans-serif',
    },
    signedUpText: {
      fontSize: 25,
      fontFamily: 'Syne, sans-serif',
      color: constants.primaryRed,
    },
  };

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return null;
    } else {
      // Render a countdown
      return (
        <Box>
          <Typography sx={styles.countdownText}>
            Coming Soon {days} : {hours} : {minutes} : {seconds}
          </Typography>
        </Box>
      );
    }
  };

  return (
    <>
      <CountdownSignupModal 
        open={openModal}
        onClose={handleCloseModal}
        handleMenuClose={handleMenuClose}
      />
      <div style={styles.container}>
        <img src={Logo} alt="GameSide Logo" style={styles.logo} />
        <Countdown 
          date={epoch} 
          renderer={renderer}
          className='text-red-500'
        />
      </div>
        {store?.user?.role >= 2 ? (
          <div className="max-w-[340px] sm:max-w-[400px] md:max-w-[500px] w-[100%]">
            <NewPrimaryButton
              label="Enter GamesideGG"
              backgroundColor={constants.primaryRed}
              fullWidth={true}
              onClick={() => {navigate('/')}}
            />
          </div>
        ) : store?.user ? (
          <Typography sx={styles.signedUpText}>Signed up! Come back March 1 or request access to our beta.</Typography>
          ) : (
          <div className="max-w-[340px] sm:max-w-[400px] md:max-w-[500px] w-[100%]">
            <NewPrimaryButton
              label="sign up / login"
              backgroundColor={constants.primaryRed}
              fullWidth={true}
              onClick={handleOpenModal}
            />
          </div>
        )}
        <div className="max-w-[340px] sm:max-w-[400px] md:max-w-[500px] w-[100%] mt-[20px]">
          <JoinDiscordButton childrenMarginTop={0} />
        </div>
    </>
  )
};

export default CountdownPage;