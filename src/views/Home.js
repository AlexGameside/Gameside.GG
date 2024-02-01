import React from 'react';
import { Box, Grid } from "@mui/material";
import HomePageHeaders from "../components/HomePageHeaders.js";
import HomePageGameCard from '../components/HomePageGameCard.js';
import fortniteLogo from '../assets/fortnite-logo.PNG';
import valorantLogo from '../assets/valorant-logo.PNG';

const Home = () => {

  const games = [
    {name: 'Fortnite', poster:fortniteLogo},
    {name: 'Valorant', poster: valorantLogo},
  ];



  return (
    <Box m={4} sx={{ width: '100%' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <HomePageHeaders />
        </Grid>
          {games.map((game, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <HomePageGameCard gameName={game.name} posterSrc={game.poster} />
        </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default Home;
