import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #333;
  color: white;
  padding: 2rem;
  text-align: center;
`;

function Footer() {
  return (
    <FooterContainer>
      <p>&copy; 2024 K.Dot Cafe. All rights reserved.</p>
    </FooterContainer>
  );
}

export default Footer;
