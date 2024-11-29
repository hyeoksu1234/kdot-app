import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const FixedBottom = styled.div`
  position: fixed;
  bottom: 4.5rem;
  left: 0;
  right: 0;
  background: white;
  padding: 1rem;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
`;

const CartContainer = styled.div`
  padding: 4rem 1rem 8rem;
  max-width: 768px;
  margin: 0 auto;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 1rem;
  border-radius: 8px;
`;

const ItemInfo = styled.div`
  flex: 1;
  h3 {
    margin: 0 0 0.5rem 0;
  }
  p {
    margin: 0;
    color: #666;
  }
`;

const RemoveButton = styled.button`
  background: #ff4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #cc0000;
  }
`;

const TotalPrice = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  text-align: right;
  margin: 0 0 1rem 0;
`;

const CheckoutButton = styled.button`
  background: #ff7b28;
  color: white;
  border: none;
  padding: 1rem 2rem;
  width: 100%;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #e66a1f;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;

  button {
    background: none;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      background: #f5f5f5;
    }
  }

  span {
    font-size: 1rem;
    min-width: 24px;
    text-align: center;
  }
`;

const TopHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 1000;
  box-shadow: ${props => props.$scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const PageTitle = styled.h1`
  margin: 0;
  font-size: 1.2rem;
`;

function Cart() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { cartItems, removeFromCart, updateCartItemQuantity } =
    useContext(CartContext);
  const total = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleQuantityChange = (itemId, change) => {
    const item = cartItems.find((item) => item.id === itemId);
    const newQuantity = item.quantity + change;

    if (newQuantity >= 1) {
      updateCartItemQuantity(itemId, newQuantity);
    }
  };

  return (
    <CartContainer>
      <TopHeader $scrolled={isScrolled}>
        <BackButton onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </BackButton>
        <PageTitle>장바구니</PageTitle>
      </TopHeader>
      {cartItems.map((item, index) => (
        <CartItem key={index}>
          <ItemImage
            src={`${process.env.PUBLIC_URL}/images/menu/${item.image
              .split("/")
              .pop()}`}
            alt={item.name}
          />
          <ItemInfo>
            <h3>{item.name}</h3>
            <p>
              {Object.entries(item.customOptions).map(([key, value]) => (
                <span key={key}>
                  {key}: {value},{" "}
                </span>
              ))}
            </p>
            <QuantityControl>
              <button onClick={() => handleQuantityChange(item.id, -1)}>
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQuantityChange(item.id, 1)}>
                +
              </button>
            </QuantityControl>
            <p>{item.totalPrice.toLocaleString()}원</p>
          </ItemInfo>
          <RemoveButton onClick={() => removeFromCart(item.id)}>
            삭제
          </RemoveButton>
        </CartItem>
      ))}
      <FixedBottom>
        <TotalPrice>총 금액: {total.toLocaleString()}원</TotalPrice>
        <CheckoutButton>주문하기</CheckoutButton>
      </FixedBottom>
    </CartContainer>
  );
}

export default Cart;
