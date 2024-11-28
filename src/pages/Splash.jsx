import React, { useEffect } from "react";
import styled from "styled-components";

const SplashContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #000;
  color: white;
`;

const Logo = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  opacity: 0;
  animation: fadeIn 1s ease-in forwards;
`;

const Tagline = styled.p`
  font-size: 1.1rem;
  color: #888;
  opacity: 0;
  animation: fadeIn 1s ease-in forwards 0.5s;
`;

const GlobalStyle = styled.div`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

function Splash({ onSplashComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onSplashComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onSplashComplete]);

  return (
    <GlobalStyle>
      <SplashContainer>
        <Logo>K-DOT CAFE</Logo>
        <Tagline>전통과 현대의 만남</Tagline>
      </SplashContainer>
    </GlobalStyle>
  );
}

export default Splash;
