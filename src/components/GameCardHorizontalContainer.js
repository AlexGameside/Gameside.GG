import React from 'react';
import { Grid, Paper, Typography } from "@mui/material";
import constants from "../utils/constants";

const GameCard = ({ name, backgroundColor }) => {
  const cardStyle = {
    borderRadius: 4,
    padding: 1,
    display: "flex",
    flexDirection: "column",
    boxShadow:
      "0px 6px 14px -6px rgba(24, 39, 75, 0.12), 0px 10px 32px -4px rgba(24, 39, 75, 0.1)",
    backgroundColor,
  };

  const cardHeaderStyle = {
    fontSize: 22,
    fontWeight: 900,
    color: constants.white,
  };

  return (
    <Grid item xs={12} sm={12} md={6}>
      <Paper elevation={0} sx={cardStyle}>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Grid item>
            <Typography style={cardHeaderStyle}>{name}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

const GameCardHorizontalContainer = () => {
  return (
    <Grid item>
      <Grid container direction="row" justifyContent="center" alignItems="center" columnSpacing={{ xs: 1 }} rowSpacing={{ xs: 1 }}>
        <GameCard name="Fortnite" backgroundColor="#00bbf9" />
        <GameCard name="Valorant" backgroundColor="#06d6a0" />
        <GameCard name="Clash Royale" backgroundColor="#ef476f" />
        {/* Add more GameCard components as needed */}
      </Grid>
    </Grid>
  );
};

export default GameCardHorizontalContainer;

