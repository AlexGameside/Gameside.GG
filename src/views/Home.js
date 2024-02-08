import React, {useEffect, useRef} from 'react';
import HomePageHeaders from "../components/home/HomePageHeaders.js";
import HomePageGameCard from '../components/home/HomePageGameCard.js';
import styled, { createGlobalStyle } from 'styled-components';
import { useMediaQuery } from "@mui/material";
import fortniteLogo from '../assets/fortniteCard.jpg';
import BackgroundImage from '../assets/homebackground.png'
import valorantLogo from '../assets/valorantCard.png';




const HeaderGamesWrapper = styled.div`
  display: flex; 
  flex-direction: row;
  align-items: flex-start;
  padding-top: 16px;
  width: 100%;
  height: ${props => (props.isMobile ? '200px' : '285px')};
`;

const GameCardContainer = styled.div`
  height: 100%;
  width: 100%;
  max-width: ${props => (props.isMobile ? '150px' : '205px')};
  padding-right: 16px;
`;

const MiddleCardContainer = styled.div`
  height: 100%;
  min-width: ${props => (props.isMobile ? '155px' : '310px')};
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

const MiddleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${props => (props.isMobile ? '64px 0' : '32px 0')};;
  align-items: center;
  height: 100%;
  padding-top: ${props => (props.isMobile ? '16px' : '120px')};
  padding-left: ${props => (props.isMobile ? '16px' : '120px')};
  justify-content: space-between;
  scroll-snap-align: start;
`;

const MiddleText = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${props => (props.isMobile ? '200px' : '100%')};
`;


const MiddleCards = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height:  ${props => (props.isMobile ? '300px' : '400px')};
  width: 100%;
`;


const EndCards = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height:  ${props => (props.isMobile ? '300px' : '400px')};
  width: 100%;
`;


const BottomWrapper = styled.div`
display: flex;
flex-direction: row;
flex: 1;
padding: 64px 0;
align-items: center;
height: 100%;
padding-top: ${props => (props.isMobile ? '32px' : '120px')};
padding-right: ${props => (props.isMobile ? '32px' : '120px')};
justify-content: space-between;
scroll-snap-align: start;
`;

const ScrollView = styled.div`
  overflow-x: ${props => props.isMobile ? 'hidden' : 'scroll'}; // Hide overflow on mobile, enable scroll on desktop
  display: flex;
  height: 100%;
  max-width: ${props => (props.isMobile ? 'none' : '400px')};
  width: ${props => props.isMobile ? '100%' : 'auto'}; // Full width on mobile, auto on desktop
  flex-shrink: 1; /* Prevent shrinking beyond specified width */
  flex-grow: 1;
  /* Add any other styling as needed */
`;

const EndScrollView = styled.div`
  overflow-x: ${props => props.isMobile ? 'hidden' : 'scroll'}; // Hide overflow on mobile, enable scroll on desktop
  display: flex;
  height: 100%;
  max-width: ${props => (props.isMobile ? 'none' : '400px')};
  width: ${props => props.isMobile ? '100%' : 'auto'}; // Full width on mobile, auto on desktop
  /* Add any other styling as needed */
`;

const Home = () => {
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const isMobile = useMediaQuery("(max-width:500px)");
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
    <HeaderWrapper>
    <div style ={{paddingTop: isMobile ? 60 : 120, paddingLeft: isMobile ? 16 : 120, paddingRight: isMobile ? 0 : 120, paddingBottom: isMobile ? 16 : 120}}>
        <div>
          <HomePageHeaders />
        </div>
        <HeaderGamesWrapper isMobile={isMobile}>
          {games.map((game, index) => (
            <GameCardContainer isMobile={isMobile} key={index}>
              <HomePageGameCard  gameName={game.name} posterSrc={game.poster} />
            </GameCardContainer>
          ))}
        </HeaderGamesWrapper>
        </div>
        </HeaderWrapper>
        <MiddleWrapper isMobile={isMobile}>
        <MiddleText isMobile={isMobile}>
        <HomePageHeaders context={'middleWrapper'}></HomePageHeaders>
        </MiddleText>
        <ScrollView isMobile={isMobile}>
        <MiddleCards isMobile={isMobile}>
        {games.map((game, index) => (
            <MiddleCardContainer isMobile={isMobile} key={index}>
              <HomePageGameCard  gameName={game.name} posterSrc={game.poster} />
            </MiddleCardContainer>
          ))}
        </MiddleCards>
        </ScrollView>
        </MiddleWrapper>
        <BottomWrapper isMobile={isMobile}>
          <EndScrollView isMobile={isMobile} ref={endScrollViewRef}>
            <EndCards isMobile={isMobile}>
            {games.map((game, index) => (
            <MiddleCardContainer isMobile={isMobile} key={index}>
              <HomePageGameCard gameName={game.name} posterSrc={game.poster} />
            </MiddleCardContainer>
          ))}
            </EndCards>
            </EndScrollView>
        <MiddleText>
        <HomePageHeaders context={'bottomWrapper'}></HomePageHeaders>
          </MiddleText>
        </BottomWrapper>
    </HomeWrapper>
  );
};

export default Home;