import React from 'react';
import HomePageHeaders from "../components/home/HomePageHeaders.js";
import HomePageGameCard from '../components/home/HomePageGameCard.js';
import DescriptionCard from '../components/home/DescriptionCard.js';
import styled from 'styled-components';
import fortniteLogo from '../assets/fortniteCard.jpg';
import BackgroundImage from '../assets/homebackground.png'
import valorantLogo from '../assets/valorantCard.png';

const HeaderGamesWrapper = styled.div`
  display: flex; 
  flex-direction: row;
  align-items: flex-start;
  padding-top: 16px;
  width: 100%;
  height: 285px;
`;

const GameCardContainer = styled.div`
  height: 100%;
  width: 100%;
  max-width: 205px;
  padding-right: 16px;
`;

const MiddleCardContainer = styled.div`
  height: 100%;
  min-width: 310px;
  padding-right: 16px;
`;

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 100vh;
  scroll-snap-type: y mandatory;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  scroll-snap-align: start;
`

const MiddleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  padding: 64px 0;
  align-items: center;
  height: 100%;
  padding-top:120px;
  padding-left: 120px;
  padding-right: 120px;
  padding-bottom:120px;
  justify-content: space-between;
  scroll-snap-align: start;
`;

const MiddleText = styled.div`
  display: flex;
  flex-direction: column;
`;

const MiddleHeader = styled.div`
        font-family: 'Syne, sans-serif';
        font-size: 48px;
        font-weight: 700;
`;

const MiddleSubtext = styled.div`
        font-family: 'Syne, sans-serif';
        font-size: 14px;
        font-weight: 400;
        flex-wrap: wrap;
        max-width: 400px;
`;

const MiddleCards = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 400px;
  width: 100%;
`;


const BottomWrapper = styled.div`
display: flex;
flex-direction: row;
flex: 1;
padding: 64px 0;
align-items: center;
height: 100%;
padding-top:120px;
padding-left: 120px;
justify-content: space-between;
scroll-snap-align: start;
`;

const ScrollView = styled.div`
  overflow-x: scroll;
  display: flex;
  height: 100%;
  max-width: 400px;
  flex-shrink: 0; /* Prevent shrinking beyond specified width */
  /* Add any other styling as needed */
`;

const Home = () => {

  const games = [
    {name: 'Fortnite', poster:fortniteLogo},
    {name: 'Valorant', poster: valorantLogo},
  ];

  const descriptionTextMatch = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  const descirptionTextTourney = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."

  return (
    <HomeWrapper>
    <HeaderWrapper style={{backgroundImage: `url(${BackgroundImage})`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
    <div style ={{paddingTop: 120, paddingLeft: 120, paddingRight: 120, paddingBottom: 120}}>
        <div>
          <HomePageHeaders />
        </div>
        <HeaderGamesWrapper>
          {games.map((game, index) => (
            <GameCardContainer>
              <HomePageGameCard key={index} gameName={game.name} posterSrc={game.poster} />
            </GameCardContainer>
          ))}
        </HeaderGamesWrapper>
        </div>
        </HeaderWrapper>
        <MiddleWrapper>
        <MiddleText>
        <MiddleHeader>
        {'Matchmaking'}
        </MiddleHeader>
            <MiddleSubtext>
              {descriptionTextMatch}
            </MiddleSubtext>
        </MiddleText>
        <ScrollView>
        <MiddleCards>
        {games.map((game, index) => (
            <MiddleCardContainer>
              <HomePageGameCard key={index} gameName={game.name} posterSrc={game.poster} />
            </MiddleCardContainer>
          ))}
        </MiddleCards>
        </ScrollView>
        </MiddleWrapper>
        <BottomWrapper>
          <ScrollView>
            <MiddleCards>
            {games.map((game, index) => (
            <MiddleCardContainer>
              <HomePageGameCard key={index} gameName={game.name} posterSrc={game.poster} />
            </MiddleCardContainer>
          ))}
            </MiddleCards>
            </ScrollView>
        <MiddleText>
        <MiddleHeader>{'Tournaments'}</MiddleHeader>
        <MiddleSubtext>{descriptionTextMatch}</MiddleSubtext>
          </MiddleText>
        </BottomWrapper>
    </HomeWrapper>
  );
};

export default Home;


      /* <Grid container spacing={2} sx={{mt: 4}}>
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
      </Grid> */