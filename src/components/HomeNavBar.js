import React from 'react';
import { AppBar, Toolbar, Typography, Button, Grid } from '@mui/material';
import { useMediaQuery } from "@mui/material";
import { Link } from 'react-router-dom';


const HomeNavBar = () => {
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const isMobile = useMediaQuery("(max-width:500px)");

  const styles = {
    navBar: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      height: isDesktop ? 56 : 50,
      width: "100%",
      backgroundColor: "transparent",
    },
    link: {
      color: 'black',
      marginRight: '20px',
    },
    loginButton: {
      position: "absolute",
      right: 20,
      color: 'black',
      borderColor: 'black',
      borderRadius: '10px',
    },
  };

  return (
    <AppBar 
      elevation={0}
      position="fixed" 
      sx={styles.navBar}
    >
    <Toolbar sx={{ width: "100%" }}>
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

          {/* Login button on the right */}
          <Button variant="outlined" sx={styles.loginButton}>
            Sign up / Log in
          </Button>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
  );
};

export default HomeNavBar;