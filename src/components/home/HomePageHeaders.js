import React from 'react';
import { Typography } from '@mui/material';




const HomePageHeaders = ({context}) => {

    const headingStyle = {
        fontFamily: 'Syne, sans-serif',
        fontSize: '80px',
        fontWeight: 700,
      };
    
      // Inline styles for the subtitle
      const subtitleStyle = {
        fontFamily: 'Oxygen, sans-serif',
        fontSize: '40px',
        fontWeight: 400,
      };

      let content;
      if (context === 'middleWrapper') {
        content = (
          <>
            <Typography variant="h4" gutterBottom align='left' style={{...headingStyle, marginRight: '100px'}}>Matchmaking</Typography>
            <Typography variant="subtitle1" gutterBottom align='left' style={{...subtitleStyle, marginRight: '100px'}}>
            It's designed to quickly match you with others looking for a game, whether you're aiming for a casual play session or seeking competitors for a friendly wager.
            </Typography>
          </>
        );
      } else if (context === 'bottomWrapper') {
        content = (
          <>
            <Typography variant= "h5" gutterBottom align='left' style={{ ...headingStyle, marginLeft: '150px' }}>Tournaments</Typography>
            <Typography variant="subtitle1" gutterBottom align='left' style={{...subtitleStyle, marginLeft: '150px'}}>
            Our tournament platform provides a comprehensive tool for organizing and participating in tournaments across multiple games, with flexible brackets that accommodate players of all levels and include cash prizes.
            </Typography>
          </>
        );
      } else {
        // Default content or another condition for different parent
        content = (
          <>
            <Typography variant="h4" gutterBottom align='left' style={headingStyle}>Find Matchmaking</Typography>
            <Typography variant= "h5" gutterBottom align='left' style={headingStyle}>Play Tournaments </Typography>
            <Typography variant ="subtitle1" gutterBottom align='left' style={subtitleStyle}>Let's play your favorite games!</Typography>
          </>
        );
      }
    
      return <div>{content}</div>;
    };

export default HomePageHeaders;