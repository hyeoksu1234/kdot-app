import styled, { keyframes } from "styled-components";

const float = keyframes`
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(5deg);
  }
  100% {
    transform: translateY(0px) rotate(0deg);
  }
`;

const LogoImage = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 0rem;
  animation: ${float} 3s ease-in-out infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

function BrandLogo() {
  return <LogoImage src="/images/logo.png" alt="K.Dot Cafe Logo" />;
}

export default BrandLogo;
