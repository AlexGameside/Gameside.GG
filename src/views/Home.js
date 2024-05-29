import React, {useEffect, useRef, useState} from 'react';
import HomePageHeaders from "../components/home/HomePageHeaders.js";
import HomePageGameCard from '../components/home/HomePageGameCard.js';
import styled, { createGlobalStyle } from 'styled-components';
import { useMediaQuery } from "@mui/material";
import fortniteLogo from '../assets/fortniteCard.jpg';
import BackgroundImage from '../assets/homebackground.png'
import valorantLogo from '../assets/valorantCard.png';
import {JoinDiscordButton} from '../custom_components/DiscordButton.js';
import { ReactComponent as FlameIcon } from '../assets/flame.svg';
import { ReactComponent as GroupIcon } from '../assets/group.svg';
import { HiArrowLongLeft } from "react-icons/hi2";
import { HiArrowLongRight } from "react-icons/hi2";
import { ReactComponent as ArrowLeft } from '../assets/NewAssets/ArrowLeft.svg';
import { ReactComponent as ArrowRight } from '../assets/NewAssets/ArrowRight.svg';




const HeaderGamesWrapper = styled.div`
  display: flex; 
  flex-direction: row;
  align-items: flex-start;
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
  width: 100%;
  overflow: hidden;
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
  padding: ${props => (props.isMobile ? '64px 0' : '32px 0')};
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
  margin-bottom: 80px;
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
  overflow-x: scroll;
  display: flex;
  height: 100%;
  max-width: ${props => (props.isMobile ? '200px' : '400px')};
  flex-shrink: 1; /* Prevent shrinking beyond specified width */
  flex-grow: 1;
  /* Add any other styling as needed */
`;

const EndScrollView = styled.div`
  overflow-x: scroll;
  display: flex;
  height: 100%;
  max-width: ${props => (props.isMobile ? '200px' : '400px')};
  /* Add any other styling as needed */
`;

const Home = () => {
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
    <div className={`flex w-full mt-[${isMobile ? 60 : 120}px] justify-around`}>
      <div className="flex w-full max-w-[1198px] justify-around flex-wrap">
        <div className={`flex flex-col md:w-[647px] max-[886px]:mb-[24px] mr-auto ml-auto`}>
          <div className="mb-[80px] font-['syne']">
            <div className="font-bold text-5xl leading-[57.6px]">Find Matchmaking</div>
            <div className="font-bold text-5xl leading-[57.6px]">Play Tournaments</div>
            <div className="mt-5 text-sm font-['Oxygen'] leading-[22.4px]">Let's play your favorite games!</div>
          </div>
          <HeaderGamesWrapper isMobile={isMobile}>
              {games.map((game, index) => (
                <GameCardContainer isMobile={isMobile} key={index}>
                  <HomePageGameCard  gameName={game.name} posterSrc={game.poster} />
                </GameCardContainer>
              ))}
            </HeaderGamesWrapper>
        </div>
        <div className="max-w-[385px] w-full flex flex-col justify-end">
          <div className={`flex flex-col`}>
            <div className={`flex mb-6`}>
              <div className="w-16 flex justify-center">
                <FlameIcon style={{ width: '35px', height: '57px', fill:"#ffffff"}} />
              </div>
              <div className={`flex flex-col font-['Oxygen'] grow`}>
                <div className="text-base font-bold">$0.50/player</div>
                <div className="flex text-[14px] *:mr-auto">
                  <div className="">NAE</div>
                  <div className="">First to 5</div>
                  <div className="">All platforms</div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <GroupIcon />
              </div>
            </div>
            <div className={`flex mb-6`}>
              <div className="w-16 flex justify-center">
                <FlameIcon style={{ width: '35px', height: '57px', fill:"#ffffff"}} />
              </div>
              <div className={`flex flex-col font-['Oxygen'] grow`}>
                <div className="text-base font-bold">$0.50/player</div>
                <div className="flex text-[14px] *:mr-auto">
                  <div className="">NAE</div>
                  <div className="">First to 5</div>
                  <div className="">All platforms</div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <GroupIcon />
              </div>
            </div>
            <div className={`flex mb-6`}>
              <div className="w-16 flex justify-center">
                <FlameIcon style={{ width: '35px', height: '57px', fill:"#ffffff"}} />
              </div>
              <div className={`flex flex-col font-['Oxygen'] grow`}>
                <div className="text-base font-bold">$0.50/player</div>
                <div className="flex text-[14px] *:mr-auto">
                  <div className="">NAE</div>
                  <div className="">First to 5</div>
                  <div className="">All platforms</div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <GroupIcon />
              </div>
            </div>
            <div className="flex justify-end">
              <JoinDiscordButton childrenMarginTop={0} fullWidth={false} from='ohio'/>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    {/* <div className="flex flex-col flex-wrap w-screen rounded-[30px] mt-[110px] bg-[#282828] h-[902px]">
      <div className="flex flex-row mt-auto mb-auto grow">
        <div className="flex flex-col justify-center font-['Oxygen'] max-w-[431px]">
          <div className="font-['Syne'] text-[64px]">Matchmaking</div>
          <div className="text-[18px] text-wrap">It's designed to quickly match you with others looking for a game, whether you're aiming for a casual play session or seeking competitors for a friendly wager.</div>
        </div>
        <div className="mt-auto mb-auto flex max-h-[700px grow">
          <div className="fakecard grow min-w-[1px] min-h-[1px] bg-green-300"></div>
          {games.map((game, index) => (
              <MiddleCardContainer className="w-[569px]" isMobile={isMobile} key={index}>
                <HomePageGameCard  gameName={game.name} posterSrc={game.poster} />
              </MiddleCardContainer>
            ))}
        </div>
      </div>
    </div> */}
    <ResponsiveSlider games={games} />
    <ResponsiveSlider games={games} flip />
    </HomeWrapper>
  );
};

export default Home;

const ResponsiveSlider = ({games, flip}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isPhone = useMediaQuery("(max-width:768px)");
  const isTablet = useMediaQuery("(max-width:1024px)");

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < (games.length - 1) ? prevIndex + 1 : (games.length - 1)
    );
  };

  return (
    <>
    {!flip
    ? <div className="outer-container mt-[110px] gap-x-[8.333%] lg:gap-x-[180px] flex max-md:flex-col md:flex-row w-full h-screen max-h-[702px] md:max-h-[902px] overflow-hidden">
      <div className="flex flex-col justify-center font-['Oxygen'] p-4 ml-[6.217%] ">
        <div className="ml-auto mr-auto max-w-[431px] md:max-lg:max-w-[331px]">
          <div className="font-['Syne'] max-lg:text-5xl lg:text-[64px] ">Matchmaking</div>
          <div className="text-[18px]">
            It's designed to quickly match you with others looking for a game, whether you're aiming for a casual play session or seeking competitors for a friendly wager.
          </div>
          <div className="flex justify-left items-center space-x-2 mt-4 font-['Syne'] text-[24px] font-extrabold">
            <button onClick={handlePrevClick} className="z-10 text-[35px]">
            <ArrowLeft />
            </button>
            <span>{currentIndex + 1} / {games.length}</span>
            <button onClick={handleNextClick} className="z-10 text-[35px]">
            <ArrowRight />
            </button>
          </div>
        </div>
      </div>
      <div className="inner-container flex flex-col flex-grow justify-center h-full w-full overflow-hidden">
        <div
          className="inner-container2 flex transition-all duration-300 ease-in-out"
          style={{ marginLeft: `-${currentIndex * (isPhone ? 357 : isTablet ? 521 : 610) }px` }}
        >
          {
            games.map((game, index)=>{
              return (
                <div className="card shrink-0 w-[325px] md:w-[480px] lg:w-[569px] h-[400px] md:h-[700px] ml-4 mr-4 md:ml-0 md:mr-[41px] last:mr-0">
                  <HomePageGameCard  gameName={game.name} posterSrc={game.poster} />
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
    : <div className="outer-container max-lg:mt-[45px] gap-x-[9.326%] lg:gap-x-[180px] flex max-md:flex-col md:flex-row w-full h-screen max-h-[722px] md:max-h-[902px] overflow-hidden">
      <div className="relative inner-container flex flex-col flex-grow justify-center h-full w-full overflow-hidden">
        <div
          className="absolute inner-container2 flex transition-all duration-300 ease-in-out"
          style={{ right: `-${currentIndex * (isPhone ? 357 : isTablet ? 521 : 610) }px` }}
        >
          {
            games.map((game, index)=>{
              return (
                <div className="card shrink-0 w-[325px] md:w-[480px] lg:w-[569px] h-[400px] md:h-[700px] ml-4 mr-4 md:ml-0 md:mr-[41px] last:mr-0">
                  <HomePageGameCard  gameName={game.name} posterSrc={game.poster} />
                </div>
              );
            })
          }
        </div>
      </div>
      
      <div className="flex flex-col justify-center font-['Oxygen'] p-4 mr-[8.333%] ">
        <div className="ml-auto mr-auto max-w-[431px] md:max-lg:max-w-[331px]">
          <div className="font-['Syne'] max-lg:text-5xl lg:text-[64px] ">Tournaments</div>
          <div className="text-[18px]">
          Our tournament platform provides a comprehensive tool for organizing and participating in tournaments across multiple games, with flexible brackets that accommodate players of all levels and include cash prizes.
          </div>
          <div className="flex justify-end items-center space-x-2 mt-4 font-['Syne'] text-[24px] font-extrabold">
            <button onClick={handlePrevClick} className="z-10 text-[35px]">
            <ArrowLeft />
            </button>
            <span>{currentIndex + 1} / {games.length}</span>
            <button onClick={handleNextClick} className="z-10 text-[35px]">
            <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
    }
    </>
  );
};
