import React, { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (newItem) => {
    setCartItems(prevItems => {
      // 동일한 상품과 옵션이 있는지 확인
      const existingItemIndex = prevItems.findIndex(item => {
        if (item.id !== newItem.id) return false;
        
        // 모든 옵션이 동일한지 확인
        return Object.entries(item.customOptions).every(([key, value]) => 
          newItem.customOptions[key] === value
        );
      });

      if (existingItemIndex !== -1) {
        // 동일한 상품이 있으면 수량만 증가
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        updatedItems[existingItemIndex].totalPrice = 
          updatedItems[existingItemIndex].price * updatedItems[existingItemIndex].quantity;
        return updatedItems;
      }

      // 새로운 상품이면 배열에 추가
      return [...prevItems, newItem];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateCartItemQuantity = (itemId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: newQuantity,
              totalPrice: item.price * newQuantity,
            }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
