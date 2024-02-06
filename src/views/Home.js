import React, {useEffect, useRef} from 'react';
import HomePageHeaders from "../components/home/HomePageHeaders.js";
import HomePageGameCard from '../components/home/HomePageGameCard.js';
import styled, { createGlobalStyle } from 'styled-components';
import fortniteLogo from '../assets/fortniteCard.jpg';
import BackgroundImage from '../assets/homebackground.png'
import valorantLogo from '../assets/valorantCard.png';




const HeaderGamesWrapper = styled.div`
  display: flex; 
  flex-direction: row;
  align-items: flex-start;
  padding-top: 16px;
  width: 100%;
  height: 428px;
`;

const GameCardContainer = styled.div`
  height: 100%;
  width: 100%;
  max-width: 308px;
  padding-right: 16px;
`;

const MiddleCardContainer = styled.div`
  height: 100%;
  min-width: 465px;
  padding-right: 16px;
`;

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 100%;
  scroll-snap-type: y mandatory;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  scroll-snap-align: start;
`

const JoinDiscordButton = styled.div`
  width: 183px;
  height: 48px;
  padding: 12px 25px;
  border-radius: 12px;
  border: 1px solid; 
  border-color: #000000;
  background-color: #7289da;
  color: white; 
  font-size: 16px; 
  position: relative;
  top: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
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
  justify-content: space-between;
  scroll-snap-align: start;
`;

const MiddleText = styled.div`
  display: flex;
  flex-direction: column;
`;


const MiddleCards = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 600px;
  width: 100%;
  left-margin: 50px;
  right-margin: 100px;
`;


const EndCards = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 600px;
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
padding-right:120px;
justify-content: space-between;
scroll-snap-align: start;
`;

const ScrollView = styled.div`
  overflow-x: scroll;
  display: flex;
  height: 100%;
  max-width: 600px;
  flex-shrink: 1; /* Prevent shrinking beyond specified width */
  flex-grow: 1;
  /* Add any other styling as needed */
`;

const Home = () => {
  const endScrollViewRef = useRef(null);
  const games = [
    {name: 'Fortnite', poster:fortniteLogo},
    {name: 'Valorant', poster: valorantLogo},
  ];


   useEffect(() => {
    // Set the initial scroll position to the maximum value
    if (endScrollViewRef.current) {
      endScrollViewRef.current.scrollLeft = endScrollViewRef.current.scrollWidth;
    }
  }, []);


  return (
    <HomeWrapper>
    <HeaderWrapper style={{backgroundImage: `url(${BackgroundImage})`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
    <div style ={{paddingTop: 120, paddingLeft: 120, paddingRight: 120, paddingBottom: 120}}>
        <div>
          <HomePageHeaders />
        </div>
        <JoinDiscordButton as="a" href="https://discord.gg/sbVXAEJC" target="_blank">
          Join Discord
        </JoinDiscordButton>
        <HeaderGamesWrapper>
          {games.map((game, index) => (
            <GameCardContainer key={index}>
              <HomePageGameCard  gameName={game.name} posterSrc={game.poster} />
            </GameCardContainer>
          ))}
        </HeaderGamesWrapper>
        </div>
        </HeaderWrapper>
        <MiddleWrapper>
        <MiddleText>
        <HomePageHeaders context={'middleWrapper'}></HomePageHeaders>
        </MiddleText>
        <ScrollView>
        <MiddleCards>
        {games.map((game, index) => (
            <MiddleCardContainer key={index}>
              <HomePageGameCard  gameName={game.name} posterSrc={game.poster} />
            </MiddleCardContainer>
          ))}
        </MiddleCards>
        </ScrollView>
        </MiddleWrapper>
        <BottomWrapper>
          <ScrollView ref={endScrollViewRef}>
            <EndCards>
            {games.map((game, index) => (
            <MiddleCardContainer key={index}>
              <HomePageGameCard gameName={game.name} posterSrc={game.poster} />
            </MiddleCardContainer>
          ))}
            </EndCards>
            </ScrollView>
        <MiddleText>
        <HomePageHeaders context={'bottomWrapper'}></HomePageHeaders>
          </MiddleText>
        </BottomWrapper>
    </HomeWrapper>
  );
};

export default Home;
