import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';

const DescriptionCard = ({ title, description }) => {
  const titleStyle = {
    fontFamily: 'Syne, sans-serif',
    fontSize: '48px',
    fontWeight: 700,
    color: 'white', // Add your preferred color or remove this line if you want the default color
  };

  const descriptionStyle = {
    fontFamily: 'Oxygen, sans-serif',
    fontSize: '18px',
    fontWeight: 400,
    color: 'white', // Add your preferred color or remove this line if you want the default color
  };

  return (
    <Card elevation={0} sx={{ maxWidth: '100%', mb: 4 }}> {/* Adjust maxWidth as per your design requirement */}
      <CardContent>
        <Typography gutterBottom align='left' style={titleStyle}>
          {title}
        </Typography>
        <Typography variant="body1" style={descriptionStyle}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DescriptionCard;
