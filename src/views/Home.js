import React from 'react';
import { Box, Grid } from "@mui/material";
import HomePageHeaders from "../components/home/HomePageHeaders.js";
import HomePageGameCard from '../components/home/HomePageGameCard.js';
import DescriptionCard from '../components/home/DescriptionCard.js';
import fortniteLogo from '../assets/fortniteCard.jpg';
import valorantLogo from '../assets/valorantCard.png';

const Home = () => {

  const games = [
    {name: 'Fortnite', poster:fortniteLogo},
    {name: 'Valorant', poster: valorantLogo},
  ];

  const descriptionTextMatch = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  const descirptionTextTourney = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."

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
      {/*matchmaking seciton */}
      <Grid container spacing={2} sx={{mt: 4}}>
        <Grid item xs={12} sm={8}>
          <DescriptionCard title="Matchmaking" description={descriptionTextMatch}/>
        </Grid>
        <Grid item xs={12} sm={4}>
        {games.slice(0, 1).map((game, index) => (
              <HomePageGameCard key={index} gameName={game.name} posterSrc={game.poster} />
            ))}
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 4}}>
      {games.slice(1, 2).map((game, index) => (
              <HomePageGameCard key={index} gameName={game.name} posterSrc={game.poster} />
            ))}
        <Grid item xs = {12} sm={8}>
          <DescriptionCard title="Tournaments" description={descirptionTextTourney} />
        </Grid>
        <Grid item xs = {12} sm={4}>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
