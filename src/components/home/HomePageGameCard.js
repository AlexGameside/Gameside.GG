import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const HomePageGameCard = ({ gameName, posterSrc }) => {
  const cardStyle = {
    width: "100%",
    borderRadius: 4,
    boxShadow: "0px 6px 14px -6px rgba(24, 39, 75, 0.12), 0px 10px 32px -4px rgba(24,39,75,0.1)",
    // height:"1000px",
    // width: "1000px"
    minheight:"300px",
    maxHeight: "450px",
    minWidth: "300px",
    maxWidth: "450px",
    display: "flex"
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
        sx={{height: '100%', objectFit: 'cover'}}
      /> 
      <CardContent >
      <div style={footerStyle}>
        <Typography variant="h6">{gameName}</Typography>
      </div>
      </CardContent>
    </Card>
  );
};

export default HomePageGameCard;
