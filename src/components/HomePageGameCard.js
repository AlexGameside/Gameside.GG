import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const HomePageGameCard = ({ gameName, posterSrc }) => {
  const cardStyle = {
    position: 'relative',
    width:'100%',
    borderRadius: 4,
    boxShadow: "0px 6px 14px -6px rgba(24, 39, 75, 0.12), 0px 10px 32px -4px rgba(24,39,75,0.1)",
  };

  const footerStyle = {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black
    color: 'white',
    padding: '8px', // Adjust padding as needed
    textAlign: 'center', // Centers the text
  };

  return (
    <Card sx={cardStyle}>
      <CardMedia
        component="img"
        image={posterSrc} // The source URL for the game's poster image
        alt={gameName}
        sx={{height: '65%', objectFit: 'cover'}}
      />
      <CardContent sx={{ flexGrow: 1 }} />
      <div style={footerStyle}>
        <Typography variant="h6">{gameName}</Typography>
      </div>
    </Card>
  );
};

export default HomePageGameCard;
