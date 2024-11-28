import React, { useContext } from "react";
import styled from "styled-components";
import { CartContext } from "../contexts/CartContext";

const CartContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
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
  margin: 2rem 0;
`;

const CheckoutButton = styled.button`
  background: #FF7B28;
  color: white;
  border: none;
  padding: 1rem 2rem;
  width: 100%;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  
  &:hover {
    background: #E66A1F;
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

function Cart() {
  const { cartItems, removeFromCart, updateCartItemQuantity } = useContext(CartContext);
  const total = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleQuantityChange = (itemId, change) => {
    const item = cartItems.find(item => item.id === itemId);
    const newQuantity = item.quantity + change;
    
    if (newQuantity >= 1) {
      updateCartItemQuantity(itemId, newQuantity);
    }
  };

  return (
    <CartContainer>
      <h1>장바구니</h1>
      {cartItems.map((item, index) => (
        <CartItem key={index}>
          <ItemImage src={item.image} alt={item.name} />
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
              <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
            </QuantityControl>
            <p>{item.totalPrice.toLocaleString()}원</p>
          </ItemInfo>
          <RemoveButton onClick={() => removeFromCart(item.id)}>
            삭제
          </RemoveButton>
        </CartItem>
      ))}
      <TotalPrice>총 금액: {total.toLocaleString()}원</TotalPrice>
      <CheckoutButton>주문하기</CheckoutButton>
    </CartContainer>
  );
}

export default Cart;