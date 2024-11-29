import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const MenuContainer = styled.div`
  padding: 4rem 0 5rem;
  max-width: 768px;
  margin: 0 auto;
  background: #f5f5f5;
`;

const CategoryNav = styled.nav`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  background: white;
  overflow-x: auto;
  margin-top: 0;
  margin-bottom: 0.5rem;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  background: ${(props) => (props.$active === "true" ? "#FF7B28" : "#f5f5f5")};
  color: ${(props) => (props.$active === "true" ? "white" : "#666")};
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.$active === "true" ? "#FF7B28" : "#eeeeee"};
  }
`;

const ProductGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  padding-bottom: 5rem;
`;

const ProductCard = styled(Link)`
  text-decoration: none;
  color: inherit;
  background: white;
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
`;

const ProductInfo = styled.div`
  flex: 1;

  .category {
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin-bottom: 0.3rem;
  }

  h3 {
    font-size: 0.9rem;
    margin: 0 0 0.2rem 0;
    font-weight: 600;
    color: var(--text-primary);
  }

  .description {
    font-size: 0.7rem;
    color: var(--text-secondary);
    margin: 0 0 0.5rem 0;
  }

  .price {
    color: var(--text-primary);
    font-weight: 600;
    font-size: 1.1rem;
    margin: 0;
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
  z-index: 100;
  box-shadow: ${(props) =>
    props.$scrolled ? "0 2px 10px rgba(0, 0, 0, 0.1)" : "none"};
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
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
`;

function Menu() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      image: "/images/menu/cheese-wave-sujeonggwa.jpg",
    },
    {
      id: 2,
      name: "식혜 파라다이스",
      price: 7000,
      category: "blending",
      description: "프리미엄 블렌딩 식혜",
      image: "/images/menu/sikhye-paradise.jpg",
    },
    {
      id: 3,
      name: "치즈 크라운 쌍화차",
      price: 7500,
      category: "signature",
      description: "치즈폼 토핑을 얹은 건강한 쌍화차",
      image: "/images/menu/cheese-crown-ssanghwa.jpg",
    },
    {
      id: 4,
      name: "제주녹차&미숫가루 쉐이크",
      price: 6800,
      category: "blending",
      description: "제주 녹차와 고소한 미숫가루의 완벽한 블렌딩",
      image: "/images/menu/jeju-shake.jpg",
    },
    {
      id: 5,
      name: "민트 진저 스파클",
      price: 6000,
      category: "seasonal",
      description: "상쾌한 민트와 생강의 조화로운 탄산음료",
      image: "/images/menu/mint-ginger-sparkle.jpg",
    },
    {
      id: 6,
      name: "대추 버스트",
      price: 6500,
      category: "traditional",
      description: "대추의 달함이 가득한 전통 음료",
      image: "/images/menu/date-burst.jpg",
    },
    {
      id: 7,
      name: "오미자 샴페인 스플래쉬",
      price: 7000,
      category: "signature",
      description: "오미자의 오묘한 맛과 탄산의 상쾌함(논알콜)",
      image: "/images/menu/omija-champagne.jpg",
    },
    {
      id: 8,
      name: "유자 그레이프 붐",
      price: 6500,
      category: "seasonal",
      description: "상큼한 유자와 포도의 특별한 만남",
      image: "/images/menu/yuza-grape.jpg",
    },
    {
      id: 9,
      name: "도라지 허니 부스트",
      price: 7000,
      category: "traditional",
      description: "도라지와 꿀이 조화롭게 어우러진 건강음료",
      image: "/images/menu/doraji-honey.jpg",
    },
    {
      id: 10,
      name: "매실 얼그레이 크러쉬",
      price: 6800,
      category: "blending",
      description: "매실청과 얼그레이 티의 특별한 만남",
      image: "/images/menu/maesil-earlgrey.jpg",
    },
  ];

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((product) => product.category === category);

  return (
    <MenuContainer>
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
        <PageTitle>메뉴</PageTitle>
      </TopHeader>
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
              src={`${process.env.PUBLIC_URL}${product.image}`}
              alt={product.name}
            />
            <ProductInfo>
              <div className="category">
                {(() => {
                  switch (product.category) {
                    case "signature":
                      return "시그니처";
                    case "traditional":
                      return "전통음료";
                    case "seasonal":
                      return "시즌메뉴";
                    case "blending":
                      return "블렌딩";
                    default:
                      return "";
                  }
                })()}
              </div>
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
