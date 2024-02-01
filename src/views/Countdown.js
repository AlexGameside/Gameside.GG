import React, { useContext, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import Logo from '../assets/gameside-logo.png';
import NewPrimaryButton from '../custom_components/NewPrimaryButton';
import Countdown from 'react-countdown';
import { StoreContext } from '../context/NewStoreContext';
import createTheme from '../utils/theme';
import NewSignupLoginModal from '../components/NewSignupLoginModal';
import { useNavigate } from 'react-router-dom';
import CountdownSignupModal from '../components/CountdownSignupModal';
import constants from '../utils/constants';


const CountdownPage = () => {
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const date = new Date('2024-03-01T18:00:00Z');
  const epoch = date.getTime();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    navigate("/countdown");
    setOpenModal(false);
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      widht: "100vh",
      padding: "20px",
    },
    logo: {
      maxWidth: "350px",
      maxHeight: "350px",
    },
    countdownText: {
      fontSize: 25,
      paddingBottom: "20px",
      fontFamily: 'Syne, sans-serif',
    },
    signedUpText: {
      fontSize: 25,
      fontFamily: 'Syne, sans-serif',
    }
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
      />
      <div style={styles.container}>
        <img src={Logo} alt="GameSide Logo" style={styles.logo} />
        <Countdown 
          date={epoch} 
          renderer={renderer} 
        />
        {store?.user ? (
          <Typography sx={styles.signedUpText}>Signed up!</Typography> // Corrected the closing tag here
        ) : (
          <NewPrimaryButton 
            label="sign up"
            backgroundColor={constants.primaryRed} // Ensure constants is defined/imported
            onClick={handleOpenModal}
          />
        )}
      </div>
    </>
  )
};

export default CountdownPage;