import React from 'react';
import { Typography, useMediaQuery } from '@mui/material';




const HomePageHeaders = ({context}) => {

  const isMobile = useMediaQuery("(max-width:500px)");

    const headingStyle = {
        fontFamily: 'Syne, sans-serif',
        fontSize: isMobile ? '18px' : '64px',
        fontWeight: 700,
        maxWidth: isMobile ? '100px' : '1000px',
      };
    
      // Inline styles for the subtitle
      const subtitleStyle = {
        fontFamily: 'Oxygen, sans-serif',
        fontSize: isMobile ? '12px' : '18px',
        fontWeight: 400,
        maxWidth: isMobile ? '100px' : '1000px',
      };
      let content;
      if (context === 'middleWrapper') {

        const middleWrapperStyle = isMobile ? {marginRight: '30px'} : {marginRight: '100px'}

        content = (
          <>
            <Typography variant="h4" gutterBottom align='left' style={{...headingStyle, ...middleWrapperStyle}}>Matchmaking</Typography>
            <Typography variant="subtitle1" gutterBottom align='left' style={{...subtitleStyle, marginRight: '100px'}}>
            {isMobile ? 'Quick matches for you and your friends!' : "It's designed to quickly match you with others looking for a game, whether you're aiming for a casual play session or seeking competitors for a friendly wager."}
            </Typography>
          </>
        );
      } else if (context === 'bottomWrapper') {
        

        const bottomWrapperStyle = isMobile ? {marginRight: '30px'} : {marginLeft: '150px'};
        content = (
          <>
            <Typography variant= "h5" gutterBottom align='left' style={{ ...headingStyle, ...bottomWrapperStyle }}>Tournaments</Typography>
            <Typography variant="subtitle1" gutterBottom align='left' style={{...subtitleStyle, ...bottomWrapperStyle}}>
            {isMobile ? 'Join tournaments easily' : "Our tournament platform provides a comprehensive tool for organizing and participating in tournaments across multiple games, with flexible brackets that accommodate players of all levels and include cash prizes."}
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