import React from 'react';
import { Typography } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';



const FooterWrapper = styled.div`
display: flex;
flex-direction: row;
width: 100%;
background-color: rgba(82, 82, 90, 0.6);
padding: '8px';
justify-content: center;
`;

const CardWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
border-radius: 16px;
overflow: hidden;
height: 100%;
width: 100%;
align-items: center;
`;

const CardImage = styled.div`
  display: flex;
  border-radius: 16px;
  overflow: hidden;
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  align-items: flex-end;
`;

const HomePageGameCard = ({ gameName, posterSrc, enableFooter, overlay }) => {


  
  const navigate = useNavigate();

  const handleGameClick = () => {
    if(!gameName) return;
    const gamePath = `/${gameName.toLowerCase()}`;
    navigate(gamePath)
  }


  return (
    <>
    <CardWrapper onClick={handleGameClick}>
    <CardImage className={gameName && 'cursor-pointer'} style={{position:'relative', backgroundImage: `url(${posterSrc})`, backgroundPosition: 'center', backgroundSize: 'cover'}} alt={gameName || "game card"}>
    {gameName && enableFooter &&
      <FooterWrapper>
      <Typography variant="h6">{gameName}</Typography>
      </FooterWrapper>
    }
    </CardImage>
    {overlay &&
      <div onClick={handleGameClick} className="cursor-pointer absolute rounded-2xl top-0 left-0 w-full h-full flex justify-center items-center font-['Manrope'] font-extrabold text-[32px] leading-[43.71px] bg-gradient-to-b hover:from-transparent hover:to-[#E72953] opacity-0 hover:opacity-100 transition-opacity duration-300">{gameName}</div>
    }
    </CardWrapper>
    </>
  );
};

export default HomePageGameCard;
