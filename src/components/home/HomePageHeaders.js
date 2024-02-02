import React from 'react';
import { Typography } from '@mui/material';




const HomePageHeaders = () => {

    const headingStyle = {
        fontFamily: 'Syne, sans-serif',
        fontSize: '48px',
        fontWeight: 700,
      };
    
      // Inline styles for the subtitle
      const subtitleStyle = {
        fontFamily: 'Oxygen, sans-serif',
        fontSize: '14px',
        fontWeight: 400,
      };
    
    return (
        <div>
            <Typography variant="h4" gutterBottom align='left' style={headingStyle}>Find Matchmaking</Typography>
            <Typography variant= "h5" gutterBottom align='left' style={headingStyle}>Play Tournaments </Typography>
            <Typography variant ="subtitle1" gutterBottom align='left' style={subtitleStyle}>Let's play your favorite games!</Typography>
        </div>
    );
};

export default HomePageHeaders;