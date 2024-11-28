import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MenuContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const CategoryNav = styled.nav`
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const CategoryButton = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  background: ${(props) => (props.$active === "true" ? "#FF7B28" : "#f0f0f0")};
  color: ${(props) => (props.$active === "true" ? "white" : "#333")};
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background: ${(props) =>
      props.$active === "true" ? "#E66A1F" : "#e0e0e0"};
    transform: translateY(-2px);
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 0 0.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
    padding: 0 0.3rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    padding: 0 0.2rem;
  }
`;

const ProductCard = styled(Link)`
  text-decoration: none;
  color: inherit;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    border-radius: 8px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;

  @media (max-width: 768px) {
    height: 140px;
  }

  @media (max-width: 480px) {
    height: 120px;
  }
`;

const ProductInfo = styled.div`
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h3 {
    font-size: 1.1rem;
    margin-bottom: 0.3rem;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }

  .description {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;

    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }

  .price {
    color: #ff7b28;
    font-weight: 600;
    font-size: 1rem;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }
`;

function Menu() {
  const [category, setCategory] = useState("all");

  const categories = [
    { id: "all", name: "전체" },
    { id: "traditional", name: "전통차" },
    { id: "signature", name: "시그니처" },
    { id: "blending", name: "블렌딩" },
    { id: "seasonal", name: "시즌메뉴" },
  ];

  const products = [
    {
      id: 1,
      name: "치즈 웨이브 수정과",
      price: 6500,
      category: "signature",
      description: "부드러운 치즈폼과 전통 수정과의 달콤한 조화",
      image: `${process.env.PUBLIC_URL}/images/cheese-wave-sujeonggwa.jpg`,
    },
    {
      id: 2,
      name: "식혜 파라다이스",
      price: 7000,
      category: "blending",
      description: "망고, 코코넛, 베리 중 선택 가능한 프리미엄 블렌딩 식혜",
      image: `${process.env.PUBLIC_URL}/images/sikhye-paradise.jpg`,
    },
    {
      id: 3,
      name: "치즈 크라운 쌍화차",
      price: 7500,
      category: "signature",
      description: "치즈폼 토핑을 얹은 건강한 쌍화차",
      image: `${process.env.PUBLIC_URL}/images/cheese-crown-ssanghwa.jpg`,
    },
    {
      id: 4,
      name: "제주녹차&미숫가루 쉐이크",
      price: 6800,
      category: "blending",
      description: "제주 녹차와 고소한 미숫가루의 완벽한 블렌딩",
      image: `${process.env.PUBLIC_URL}/images/jeju-shake.jpg`,
    },
    {
      id: 5,
      name: "민트 진저 스파클",
      price: 6000,
      category: "seasonal",
      description: "상쾌한 민트와 생강의 조화로운 탄산음료",
      image: `${process.env.PUBLIC_URL}/images/mint-ginger-sparkle.jpg`,
    },
    {
      id: 6,
      name: "대추 버스트",
      price: 6500,
      category: "traditional",
      description: "대추의 달콤함이 가득한 전통 음료",
      image: `${process.env.PUBLIC_URL}/images/date-burst.jpg`,
    },
    {
      id: 7,
      name: "오미자 샴페인 스플래쉬",
      price: 7000,
      category: "signature",
      description: "오미자의 오묘한 맛과 탄산의 상쾌함(논알콜)",
      image: `${process.env.PUBLIC_URL}/images/omija-champagne.jpg`,
    },
    {
      id: 8,
      name: "유자 그레이프 붐",
      price: 6500,
      category: "seasonal",
      description: "상큼한 유자와 포도의 특별한 만남",
      image: `${process.env.PUBLIC_URL}/images/yuza-grape.jpg`,
    },
    {
      id: 9,
      name: "도라지 허니 부스트",
      price: 7000,
      category: "traditional",
      description: "도라지와 꿀이 조화롭게 어우러진 건강음료",
      image: `${process.env.PUBLIC_URL}/images/doraji-honey.jpg`,
    },
    {
      id: 10,
      name: "매실 얼그레이 크러쉬",
      price: 6800,
      category: "blending",
      description: "매실청과 얼그레이 티의 특별한 만남",
      image: `${process.env.PUBLIC_URL}/images/maesil-earlgrey.jpg`,
    },
  ];

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((product) => product.category === category);

  return (
    <MenuContainer>
      <h1>메뉴</h1>
      <CategoryNav>
        {categories.map((cat) => (
          <CategoryButton
            key={cat.id}
            $active={(category === cat.id).toString()}
            onClick={() => setCategory(cat.id)}
          >
            {cat.name}
          </CategoryButton>
        ))}
      </CategoryNav>
      <ProductGrid>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} to={`/product/${product.id}`}>
            <ProductImage
              src={`${process.env.PUBLIC_URL}/images/menu/${product.image}`}
              alt={product.name}
            />
            <ProductInfo>
              <h3>{product.name}</h3>
              <p className="description">{product.description}</p>
              <p className="price">{product.price.toLocaleString()}원</p>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>
    </MenuContainer>
  );
}

export default Menu;
