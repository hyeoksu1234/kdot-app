import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";

const HeaderContainer = styled.header`
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

function Header() {
  return (
    <HeaderContainer>
      <Navbar />
    </HeaderContainer>
  );
}

export default Header;