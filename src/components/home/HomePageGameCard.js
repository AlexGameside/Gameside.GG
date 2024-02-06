import React from 'react';
import { Typography } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';



const FooterWrapper = styled.div`
display: flex;
flex-direction: row;
width: 100%;
background-color: rgba(82, 82, 45, 0.6);
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
cursor: pointer;
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

const HomePageGameCard = ({ gameName, posterSrc }) => {


  
const navigate = useNavigate();

const handleGameClick = () => {
  const gamePath = `/${gameName.toLowerCase()}`;
  navigate(gamePath)
}


  return (
    <CardWrapper onClick={handleGameClick}>
    <CardImage style={{backgroundImage: `url(${posterSrc})`, backgroundPosition: 'center', backgroundSize: 'cover'}} alt={gameName}>
    <FooterWrapper>
    <Typography variant="h6">{gameName}</Typography>
    </FooterWrapper>
    </CardImage>
    </CardWrapper>
  );
};

export default HomePageGameCard;
