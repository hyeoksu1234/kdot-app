import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  
  &:hover {
    color: #FF7B28;
  }
`;

const CartLink = styled(Link)`
  position: relative;
  text-decoration: none;
  color: inherit;
  
  &:hover {
    color: #FF7B28;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: #FF7B28;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
`;

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Nav>
      <NavLink to="/">홈</NavLink>
      <NavLink to="/menu">메뉴</NavLink>
      <CartLink to="/cart">
        장바구니
        {totalItems > 0 && <CartBadge>{totalItems}</CartBadge>}
      </CartLink>
      <NavLink to="/profile">프로필</NavLink>
    </Nav>
  );
}

export default Navbar;