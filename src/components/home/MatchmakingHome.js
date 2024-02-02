import React from 'react';
import { Typography } from '@mui/material';

const MatchmakingTitle = () => {

    const headingStyle = {
        fontFamily: 'Syne, sans-serif',
        fontSize: '48px',
        fontWeight: 700,
      };

      const descriptionStyle = {
        fontFamily: 'Oxygen',
        fontSize: '18px',
        fontWeight: 400
      };

      return (
        <diV>
            <Typography variant="h4" gutterBottom align='left' style={headingStyle}>Matchmaking</Typography>
            <Typography variant="p" style={descriptionStyle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
        </diV>
    );
};
