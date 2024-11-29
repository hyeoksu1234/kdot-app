import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../contexts/CartContext";
import { products } from "../data/products";
import {
  SizeIcon,
  TemperatureIcon,
  IceIcon,
  SweetnessIcon,
  PearlIcon,
  BlendingIcon,
  CheeseIcon,
  SparklingIcon,
  TeaIcon,
} from "../components/Icons";

const ProductDetailContainer = styled.div`
  padding: 0;
  max-width: 768px;
  margin: 0 auto;
  padding-bottom: 150px;
`;

const TopHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: white;
  position: sticky;
  top: 0;
  z-index: 100;
  transition: box-shadow 0.3s ease;
  box-shadow: ${(props) =>
    props.$scrolled ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none"};
`;

const BackButton = styled.button`
  background: transparent;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  margin-right: 1rem;

  svg {
    width: 20px;
    height: 20px;
    color: #333;
  }
`;

const PageTitle = styled.h1`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 500;
`;

const ProductHeader = styled.div`
  padding: 1.5rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProductTitle = styled.h2`
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
`;

const ProductSubtitle = styled.span`
  color: #999;
  font-size: 0.9rem;
`;

const ProductPrice = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: #333;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  margin: 0;
`;

const InfoButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  background: #fff6f2;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  cursor: pointer;

  span {
    flex: 1;
    text-align: left;
    color: #666;
  }
`;

const OptionButton = styled.button`
  width: 100%;
  padding: 1rem;
  margin: 0.5rem 0;
  border: 2px solid ${(props) => (props.selected ? "#FF7B28" : "#ddd")};
  background: ${(props) => (props.selected ? "#fff6f2" : "white")};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .recommended {
    font-size: 0.8rem;
    color: #ff7b28;
    background: #fff6f2;
    padding: 0.2rem 0.5rem;
    border-radius: 8px;
  }
`;

const OptionsContainer = styled.div`
  margin-top: 1rem;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1.5rem 0;

  button {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid #ddd;
    background: white;
    color: #333;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: #f5f5f5;
    }

    &:active {
      background: #eee;
    }

    &:disabled {
      color: #ccc;
      cursor: not-allowed;
    }
  }

  span {
    font-size: 1.2rem;
    font-weight: 500;
    min-width: 40px;
    text-align: center;
  }
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  background: ${(props) => (props.disabled ? "#ccc" : "#FF7B28")};
  color: white;

  &:hover {
    background: ${(props) => (props.disabled ? "#ccc" : "#ff6b18")};
  }
`;

const CheckoutButton = styled(AddToCartButton)`
  background: ${(props) => (props.disabled ? "#ccc" : "#000")};
  &:hover {
    background: ${(props) => (props.disabled ? "#ccc" : "#333")};
  }
`;

const OptionsModal = styled.div`
  position: fixed;
  bottom: ${(props) => (props.$isopen === "true" ? "0" : "-100%")};
  left: 0;
  right: 0;
  background: white;
  padding: 1.5rem;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  transition: bottom 0.3s ease-in-out;
  z-index: 1001;
  max-height: 80vh;
  overflow-y: auto;
  padding-bottom: 5rem;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h3 {
    margin: 0;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

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

const PriceDisplay = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  text-align: right;
  color: #ff7b28;
`;

const OptionSelectButton = styled.button`
  width: 100%;
  padding: 1.2rem;
  margin: 0.5rem 0;
  border: 1px solid #eee;
  background: white;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.2s ease;

  .icon-wrapper {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
    border-radius: 8px;
  }

  .option-content {
    flex: 1;
    text-align: left;
  }

  .option-title {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 0.2rem;
  }

  .option-value {
    font-size: 1.1rem;
    font-weight: 500;
    color: #ff7b28;
  }

  &:hover {
    border-color: #ff7b28;
    background: #fff6f2;
  }
`;

const DetailImage = styled.img`
  width: 100%;
  height: auto;
  margin-top: 20px;
  margin-bottom: 100px;
  border-radius: 12px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${(props) => (props.$isopen === "true" ? 1 : 0)};
  visibility: ${(props) => (props.$isopen === "true" ? "visible" : "hidden")};
  transition: all 0.3s ease-out;
  z-index: 999;
`;

const ShowMoreButton = styled.button`
  width: 200px;
  padding: 0.8rem 1.2rem;
  margin: 1.5rem auto;
  border: 1px solid #ddd;
  background: white;
  border-radius: 20px;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    border-color: #ff7b28;
    background: #fff6f2;
    color: #ff7b28;
  }

  svg {
    width: 16px;
    height: 16px;
    transform: ${(props) =>
      props.$isExpanded ? "rotate(180deg)" : "rotate(0deg)"};
    transition: transform 0.3s ease;

    path {
      stroke: currentColor;
      stroke-width: 2.5;
    }
  }
`;

const InfoLinkButton = styled.button`
  padding: 0.5rem 1rem;
  margin-left: auto;
  border: 1px solid #eee;
  background: white;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 0.9rem;
  transition: all 0.15s ease;

  &:hover {
    background: #f8f8f8;
  }

  &:active {
    background: #f0f0f0;
    transform: scale(0.98);
  }
`;

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [customOptions, setCustomOptions] = useState({});
  const [openSection, setOpenSection] = useState(null);
  const [showAllOptions, setShowAllOptions] = useState(false);
  const detailRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const product = products.find((p) => p.id === parseInt(id));

  useEffect(() => {
    if (!product) {
      navigate("/menu");
      return;
    }

    if (product.options) {
      const defaultOptions = {};
      if (product.options.size) {
        const defaultSize = product.options.size.find(
          ([_, isDefault]) => isDefault
        );
        if (defaultSize) {
          defaultOptions.size = defaultSize[0];
        }
      }
      if (product.options.temperature) {
        const defaultTemp = product.options.temperature.find(
          ([_, isDefault]) => isDefault
        );
        if (defaultTemp) {
          defaultOptions.temperature = defaultTemp[0];
        }
      }
      setCustomOptions(defaultOptions);
    }
  }, [product, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    setOpenSection(null);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const calculateTotalPrice = () => {
    let basePrice = product.price;
    if (customOptions.size === "Large (+800원)") {
      basePrice += 800;
    }
    return basePrice * quantity;
  };

  const handleAddToCart = () => {
    const totalPrice = calculateTotalPrice();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      customOptions: customOptions,
      totalPrice: totalPrice,
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
      if (optionType === "화이트펄" || optionType === "치즈폼") return true;
      if (optionType === "ice" && customOptions.temperature === "뜨겁게")
        return true;

      const hasValue =
        customOptions[optionType] !== undefined &&
        customOptions[optionType] !== "";
      return hasValue;
    });
  };

  const isOptionsValid = validateOptions();

  const scrollToDetail = () => {
    detailRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ProductDetailContainer>
      <TopHeader $scrolled={isScrolled}>
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
        <PageTitle>{product?.name}</PageTitle>
      </TopHeader>
      <Overlay $isopen={openSection ? "true" : "false"} />
      <ProductHeader>
        <ProductTitle>{product?.name}</ProductTitle>
        <ProductSubtitle>{product?.category}</ProductSubtitle>
        <ProductPrice>{product?.price?.toLocaleString()}원</ProductPrice>
        <InfoLinkButton onClick={scrollToDetail}>상세보기</InfoLinkButton>
      </ProductHeader>

      <ProductImage
        src={`${process.env.PUBLIC_URL}/images/menu/${product?.image
          .split("/")
          .pop()}`}
        alt={product?.name}
      />

      <InfoButton>
        <span>{product?.description}</span>
      </InfoButton>

      {product?.options &&
        Object.entries(product.options)
          .slice(0, showAllOptions ? undefined : 4)
          .map(([optionType, values]) => {
            if (
              optionType === "ice" &&
              customOptions.temperature !== "차갑게"
            ) {
              return null;
            }

            return (
              <div key={optionType}>
                <OptionSelectButton onClick={() => setOpenSection(optionType)}>
                  <div className="icon-wrapper">
                    {optionType === "size" && <SizeIcon />}
                    {optionType === "temperature" && <TemperatureIcon />}
                    {optionType === "ice" && <IceIcon />}
                    {optionType === "sweetness" && <SweetnessIcon />}
                    {optionType === "블렌딩 베이스" && <BlendingIcon />}
                    {optionType === "화이트펄" && <PearlIcon />}
                    {optionType === "치즈폼" && <CheeseIcon />}
                    {optionType === "탄산" && <SparklingIcon />}
                    {(optionType === "자스민그린티" ||
                      optionType === "얼그레이티" ||
                      optionType === "민트차") && <TeaIcon />}
                  </div>
                  <div className="option-content">
                    <div className="option-title">
                      {optionType === "size"
                        ? "사이즈"
                        : optionType === "temperature"
                        ? "온도"
                        : optionType === "ice"
                        ? "얼음량"
                        : optionType === "sweetness"
                        ? "당도"
                        : optionType === "블렌딩 베이스"
                        ? "블렌�� 베이스"
                        : optionType === "화이트펄"
                        ? "펄"
                        : optionType === "치즈폼"
                        ? "치즈폼"
                        : optionType}
                    </div>
                    <div className="option-value">
                      {customOptions[optionType] || "선택하기"}
                    </div>
                  </div>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M7 10l5 5 5-5" stroke="#666" strokeWidth="2" />
                  </svg>
                </OptionSelectButton>

                <Overlay
                  $isopen={openSection === optionType ? "true" : "false"}
                  onClick={() => setOpenSection(null)}
                />
                <OptionsModal
                  $isopen={openSection === optionType ? "true" : "false"}
                >
                  <ModalHeader>
                    <h3>
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
                    </h3>
                    <CloseButton onClick={() => setOpenSection(null)}>
                      ×
                    </CloseButton>
                  </ModalHeader>
                  <OptionsContainer>
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
                </OptionsModal>
              </div>
            );
          })}

      {product?.options && Object.keys(product.options).length > 4 && (
        <ShowMoreButton
          onClick={() => setShowAllOptions(!showAllOptions)}
          $isExpanded={showAllOptions}
        >
          {showAllOptions ? "옵션 접기" : "더 많은 옵션 보기"}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7 10l5 5 5-5" stroke="#666" strokeWidth="2" />
          </svg>
        </ShowMoreButton>
      )}

      <QuantityControl>
        <button onClick={() => handleQuantityChange(-1)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => handleQuantityChange(1)}>+</button>
      </QuantityControl>

      <FixedBottom>
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
            바로 주문하기
          </CheckoutButton>
        </ButtonContainer>
      </FixedBottom>

      {product?.image && (
        <DetailImage
          ref={detailRef}
          src={`${process.env.PUBLIC_URL}/images/menu/${product.image
            .split("/")
            .pop()
            .replace(".jpg", "-detail.jpg")}`}
          alt={`${product?.name} 상세 설명`}
        />
      )}
    </ProductDetailContainer>
  );
}

export default ProductDetail;
