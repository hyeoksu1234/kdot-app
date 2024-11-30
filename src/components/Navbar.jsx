import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FaHome, FaCoffee, FaShoppingCart, FaEllipsisH } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const NavbarContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: space-around;
  list-style: none;
  margin: 0;
  padding: 0.5rem 0;
`;

const NavItem = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: ${(props) => (props.$active ? "#FF7B28" : "#666")};
  text-decoration: none;
  font-size: 0.75rem;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -2px;
  right: 2px;
  background: #ff7b28;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Navbar() {
  const location = useLocation();
  const { cartCount } = useContext(CartContext);

  return (
    <NavbarContainer>
      <NavList>
        <NavItem to="/" $active={location.pathname === "/"}>
          <FaHome />홈
        </NavItem>
        <NavItem to="/menu" $active={location.pathname === "/menu"}>
          <FaCoffee />
          메뉴
        </NavItem>
        <NavItem to="/cart" $active={location.pathname === "/cart"}>
          <FaShoppingCart />
          {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
          <span>장바구니</span>
        </NavItem>
        <NavItem to="/profile" $active={location.pathname === "/profile"}>
          <FaEllipsisH />
          더보기
        </NavItem>
      </NavList>
    </NavbarContainer>
  );
}

export default Navbar;
