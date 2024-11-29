import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FaHome, FaCoffee, FaShoppingCart, FaEllipsisH } from "react-icons/fa";

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

const NavItem = styled.li`
  text-align: center;
`;

const NavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: ${props => props.$active ? '#FF7B28' : '#666'};
  font-size: 0.8rem;
  gap: 0.3rem;
  padding: 0.5rem;

  svg {
    font-size: 1.3rem;
  }
`;

function Navbar() {
  const location = useLocation();

  return (
    <NavbarContainer>
      <NavList>
        <NavItem>
          <NavLink to="/" $active={location.pathname === "/"}>
            <FaHome />
            홈
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/menu" $active={location.pathname === "/menu"}>
            <FaCoffee />
            메뉴
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/cart" $active={location.pathname === "/cart"}>
            <FaShoppingCart />
            장바구니
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/profile" $active={location.pathname === "/profile"}>
            <FaEllipsisH />
            더보기
          </NavLink>
        </NavItem>
      </NavList>
    </NavbarContainer>
  );
}

export default Navbar;