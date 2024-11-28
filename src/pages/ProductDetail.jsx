import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { products } from "../data/products";

const ProductDetailContainer = styled.div`
  max-width: 768px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #F8F9FA;
`;

const ProductHeader = styled.div`
  margin-bottom: 2rem;
`;

const ProductTitle = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const ProductTag = styled.span`
  background: #f5f5f5;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #666;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
  margin-bottom: 2rem;
`;

const InfoButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #666;
  font-size: 1rem;
  cursor: pointer;
  padding: 0;
  margin-bottom: 2rem;
`;

const QuestionIcon = styled.span`
  &::before {
    content: "?";
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border-radius: 50%;
    border: 1px solid #666;
    margin-right: 8px;
  }
`;

const CustomizationSection = styled.div`
  margin-bottom: 2rem;
  background-color: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const CustomizationTitle = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  cursor: pointer;
`;

const ArrowIcon = styled.span`
  transform: ${(props) => (props.$isopen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.3s ease;
  &::after {
    content: "∨";
  }
`;

const OptionButton = styled.button`
  padding: 1rem;
  margin: 0.25rem 0;
  border: 2px solid ${(props) => (props.selected ? "#FF7B28" : "#eee")};
  border-radius: 12px;
  background: ${(props) => (props.selected ? "#FFF6F2" : "white")};
  color: ${(props) => (props.selected ? "#FF7B28" : "#333")};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    border-color: #ff7b28;
    transform: translateY(-2px);
    box-shadow: ${(props) =>
      props.selected
        ? "0 4px 12px rgba(255, 123, 40, 0.2)"
        : "0 4px 12px rgba(0, 0, 0, 0.1)"};
  }

  .recommended {
    font-size: 0.8rem;
    color: #ff7b28;
    background: #fff6f2;
    padding: 0.2rem 0.5rem;
    border-radius: 8px;
  }
`;

const OptionsContainer = styled.div`
  display: ${(props) => (props.$isopen ? "block" : "none")};
  background-color: white;
  border-radius: 8px;
  padding: 0.5rem;
  margin-top: 0.5rem;
`;

const SelectedOptions = styled.div`
  background: #f9f9f9;
  border-radius: 12px;
  padding: 1rem;
  margin: 1rem 0;
`;

const OptionSummary = styled.div`
  background: #fff6f2;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  border: 2px solid #ff7b28;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  position: relative;

  .option-name {
    color: #666;
    font-weight: 500;
  }

  .option-value {
    color: #ff7b28;
    font-weight: 600;
    text-align: right;
  }

  .remove-option {
    position: absolute;
    top: -10px;
    right: -10px;
    background: white;
    border: 2px solid #ff7b28;
    color: #ff7b28;
    cursor: pointer;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    padding: 0;
    
    &:hover {
      background: #ff7b28;
      color: white;
    }
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 0.5rem;
  margin: 2rem 0;

  button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0 1rem;
    color: #333;
  }

  span {
    font-size: 1.1rem;
    font-weight: 500;
  }
`;

const PriceDisplay = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  text-align: right;
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 2rem;
`;

const BaseButton = styled.button`
  padding: 1rem;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const AddToCartButton = styled(BaseButton)`
  background: ${(props) => (props.disabled ? "#ccc" : "#FF7B28")};
  &:hover {
    background: ${(props) => (props.disabled ? "#ccc" : "#E66A1F")};
  }
`;

const CheckoutButton = styled(BaseButton)`
  background: ${(props) => (props.disabled ? "#ccc" : "#000")};
  &:hover {
    background: ${(props) => (props.disabled ? "#ccc" : "#333")};
  }
`;

function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState(null);
  const [customOptions, setCustomOptions] = useState({});
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === Number(id));
    setProduct(foundProduct);
  }, [id]);

  useEffect(() => {
    if (product?.options) {
      const defaultOptions = {};
      Object.entries(product.options).forEach(([optionType, values]) => {
        if (optionType === "size" && values.length === 1) {
          defaultOptions[optionType] = values[0][0];
        }
        if (optionType === "ice" && customOptions.temperature === "차갑게") {
          const defaultOption = values.find(([name]) => name === "보통");
          if (defaultOption) {
            defaultOptions[optionType] = defaultOption[0];
          }
        }
      });
      setCustomOptions((prev) => ({
        ...prev,
        ...defaultOptions,
      }));
    }
  }, [product, customOptions.temperature]);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleOptionChange = (type, value) => {
    if (type === "화이트펄" || type === "치즈폼") {
      setCustomOptions((prev) => ({
        ...prev,
        [type]: value,
      }));
    } else if (type === "temperature") {
      setCustomOptions((prev) => ({
        ...prev,
        [type]: value,
        ice: value === "뜨겁게" ? undefined : prev.ice,
      }));
    } else {
      setCustomOptions((prev) => ({
        ...prev,
        [type]: value,
      }));
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      customOptions: customOptions,
      totalPrice: product.price * quantity,
    });
    navigate("/menu");
  };

  const handleCheckout = () => {
    handleAddToCart();
    navigate("/cart");
  };

  const validateOptions = () => {
    if (!product?.options) return true;

    return Object.entries(product.options).every(([optionType, values]) => {
      // 화이트펄과 치즈폼은 선택사항
      if (optionType === "화이트펄" || optionType === "치즈폼") return true;
      
      // 뜨거운 음료의 경우 얼음량 옵션 제외
      if (optionType === "ice" && customOptions.temperature === "뜨겁게") return true;
      
      // 나머지 옵션들은 필수 선택
      const hasValue = customOptions[optionType] !== undefined && customOptions[optionType] !== "";
      return hasValue;
    });
  };

  const isOptionsValid = validateOptions();

  return (
    <ProductDetailContainer>
      <ProductHeader>
        <ProductTitle>{product?.name}</ProductTitle>
        <ProductTag>
          {product?.category === "traditional" && "전통차"}
          {product?.category === "signature" && "시그니처"}
          {product?.category === "blending" && "블렌딩"}
          {product?.category === "seasonal" && "시즌메뉴"}
        </ProductTag>
      </ProductHeader>

      <ProductImage src={product?.image} alt={product?.name} />
      <InfoButton>
        <QuestionIcon />
        <span>{product?.description}</span>
      </InfoButton>

      {product?.options &&
        Object.entries(product.options).map(([optionType, values]) => {
          if (optionType === "ice" && customOptions.temperature !== "차갑게") {
            return null;
          }

          return (
            <CustomizationSection key={optionType}>
              <CustomizationTitle onClick={() => toggleSection(optionType)}>
                {optionType === "size"
                  ? "사이즈"
                  : optionType === "temperature"
                  ? "온도"
                  : optionType === "ice"
                  ? "얼음량"
                  : optionType === "sweetness"
                  ? "당도"
                  : optionType === "블렌딩 베이스"
                  ? "식혜 베이스"
                  : optionType === "화이트펄"
                  ? "펄"
                  : optionType === "치즈폼"
                  ? "치즈폼"
                  : optionType}
                <ArrowIcon
                  $isopen={openSection === optionType ? "true" : "false"}
                />
              </CustomizationTitle>
              <OptionsContainer
                $isopen={openSection === optionType ? "true" : "false"}
              >
                {values.map(([name, isDefault]) => (
                  <OptionButton
                    key={name}
                    selected={customOptions[optionType] === name}
                    onClick={() => handleOptionChange(optionType, name)}
                  >
                    <span>{name}</span>
                    {isDefault && <span className="recommended">추천</span>}
                  </OptionButton>
                ))}
              </OptionsContainer>
            </CustomizationSection>
          );
        })}

      <SelectedOptions>
        {Object.entries(customOptions).map(
          ([key, value]) =>
            value && (
              <OptionSummary key={key}>
                <span className="option-name">
                  {key === "temperature"
                    ? "온도"
                    : key === "sweetness"
                    ? "당도"
                    : key === "블렌딩 베이스"
                    ? "식혜 베이스"
                    : key === "화이트펄"
                    ? "펄"
                    : key === "ice"
                    ? "얼음량"
                    : key === "치즈폼"
                    ? "치즈폼"
                    : key}
                </span>
                <span>{Array.isArray(value) ? value.join(", ") : value}</span>
                {key !== "size" && (
                  <button
                    className="remove-option"
                    onClick={() => handleOptionChange(key, "")}
                    title="옵션 삭제"
                  >
                    ×
                  </button>
                )}
              </OptionSummary>
            )
        )}
      </SelectedOptions>

      <QuantityControl>
        <button onClick={() => handleQuantityChange(-1)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => handleQuantityChange(1)}>+</button>
      </QuantityControl>

      <PriceDisplay>
        {(product?.price * quantity).toLocaleString()}원
      </PriceDisplay>

      <ButtonContainer>
        <AddToCartButton
          onClick={handleAddToCart}
          disabled={!isOptionsValid}
          title={!isOptionsValid ? "필수 옵션을 모두 선택해주세요" : ""}
        >
          장바구니 담기
        </AddToCartButton>
        <CheckoutButton
          onClick={handleCheckout}
          disabled={!isOptionsValid}
          title={!isOptionsValid ? "필수 옵션을 모두 선택해주세요" : ""}
        >
          바로 결제하기
        </CheckoutButton>
      </ButtonContainer>
    </ProductDetailContainer>
  );
}

export default ProductDetail;
