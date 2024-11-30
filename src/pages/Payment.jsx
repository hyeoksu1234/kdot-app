import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../contexts/CartContext";

const PaymentContainer = styled.div`
  padding: 4rem 1rem 10rem;
  max-width: 768px;
  margin: 0 auto;
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
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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

const OrderSummary = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  margin: 0 0 1rem 0;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #666;
`;

const PaymentMethods = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const PaymentOption = styled.button`
  width: 100%;
  padding: 1rem;
  margin: 0.5rem 0;
  border: 1px solid ${(props) => (props.$selected ? "#ff7b28" : "#eee")};
  background: ${(props) => (props.$selected ? "#fff6f2" : "white")};
  border-radius: 12px;
  cursor: pointer;
  text-align: left;
  font-size: 1rem;

  &:hover {
    border-color: #ff7b28;
    background: #fff6f2;
  }
`;

const FixedBottom = styled.div`
  position: fixed;
  bottom: 4rem;
  left: 0;
  right: 0;
  background: white;
  padding: 1rem;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
`;

const TotalPrice = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  text-align: right;
  margin-bottom: 1rem;
`;

const PayButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: #ff7b28;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;

  &:hover {
    background: #e66a1f;
  }
`;

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);
  const { items, totalAmount } = location.state || {
    items: [],
    totalAmount: 0,
  };
  const [selectedPayment, setSelectedPayment] = React.useState("card");

  const handlePayment = () => {
    alert("결제가 완료되었습니다.");
    clearCart();
    navigate("/");
  };

  return (
    <PaymentContainer>
      <TopHeader>
        <BackButton onClick={() => navigate(-1)}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </BackButton>
        <PageTitle>결제하기</PageTitle>
      </TopHeader>

      <OrderSummary>
        <SectionTitle>주문 내역</SectionTitle>
        {items.map((item, index) => (
          <OrderItem key={index}>
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>{item.totalPrice.toLocaleString()}원</span>
          </OrderItem>
        ))}
      </OrderSummary>

      <PaymentMethods>
        <SectionTitle>결제 수단</SectionTitle>
        <PaymentOption
          $selected={selectedPayment === "card"}
          onClick={() => setSelectedPayment("card")}
        >
          신용/체크카드
        </PaymentOption>
        <PaymentOption
          $selected={selectedPayment === "kakao"}
          onClick={() => setSelectedPayment("kakao")}
        >
          카카오페이
        </PaymentOption>
        <PaymentOption
          $selected={selectedPayment === "naver"}
          onClick={() => setSelectedPayment("naver")}
        >
          네이버페이
        </PaymentOption>
      </PaymentMethods>

      <FixedBottom>
        <TotalPrice>총 결제금액: {totalAmount.toLocaleString()}원</TotalPrice>
        <PayButton onClick={handlePayment}>
          {totalAmount.toLocaleString()}원 결제하기
        </PayButton>
      </FixedBottom>
    </PaymentContainer>
  );
}

export default Payment;
