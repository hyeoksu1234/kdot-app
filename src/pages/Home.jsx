import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import BrandLogo from "../components/BrandLogo";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HomeContainer = styled.div`
  min-height: 90vh;
  background: #ff7b28;
  color: white;
`;

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background: url(${process.env.PUBLIC_URL}/images/background/traditional.jpg)
    center/cover;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin: 2rem 0;
  font-family: "Hahmlet", serif;
  animation: ${fadeIn} 1s ease-out;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  opacity: 0.9;
  animation: ${fadeIn} 1s ease-out 0.3s backwards;
`;

const MenuButton = styled(Link)`
  background: white;
  color: #ff7b28;
  padding: 1rem 2rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 500;
  animation: ${fadeIn} 1s ease-out 0.6s backwards;
  transition: transform 0.3s ease;
  align-self: center;

  &:hover {
    transform: translateY(-3px);
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.3rem;
  margin-bottom: 3rem;
  text-align: center;
  font-family: "Hahmlet", serif;
  background: url(${process.env.PUBLIC_URL}/images/background/traditional.jpg)
    center/cover;
`;

const SharedSection = styled.div`
  padding: 6rem 2rem;
  background: ${(props) =>
      props.$isEvent
        ? `linear-gradient(rgba(98, 58, 36, 0.85), rgba(98, 58, 36, 0.85)), 
       url(${process.env.PUBLIC_URL}/images/background/traditional.jpg)`
        : `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
       url(${process.env.PUBLIC_URL}/images/background/traditional.jpg)`}
    center/cover;
  background-attachment: fixed;
  color: white;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(5px);
    z-index: 1;
  }

  > * {
    position: relative;
    z-index: 2;
  }
`;

const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const EventCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }

  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }

  .content {
    padding: 2rem;

    h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      font-family: "Hahmlet", serif;
      color: white;
    }

    p {
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 1rem;
      line-height: 1.6;
    }

    .date {
      font-size: 0.8rem;
      color: #ff7b28;
      font-weight: 600;
      text-align: left; // 오른쪽에서 왼쪽으로 변경
    }
  }
`;

const FeaturedSection = styled.div`
  padding: 6rem 2rem;
  background: #1c1c1e;
  color: white;
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeaturedItem = styled.div`
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #ff7b28;
    font-family: "Hahmlet", serif;
  }

  p {
    line-height: 1.6;
    opacity: 0.9;
  }
`;

function Home() {
  return (
    <HomeContainer>
      <HeroSection>
        <BrandLogo />
        <Title>K.Dot Cafe</Title>
        <Subtitle>
          K.Dot은 한국 전통음료의 맛과 가치를 <br />
          현대적으로 재해석 하여 세계로 확장하며, <br />
          혁신적 기술과 개인 맞춤형 경험을 통해 <br />
          건강하고 즐거운 라이프스타일을 제안합니다.
        </Subtitle>
        <MenuButton to="/menu">메뉴 보기</MenuButton>
      </HeroSection>

      <SharedSection $isEvent={true}>
        <SectionTitle>진행중인 이벤트</SectionTitle>
        <EventGrid>
          <EventCard>
            <img
              src={`${process.env.PUBLIC_URL}/images/events/summer-special.png`}
              alt="여름 시즌 메뉴"
            />
            <div className="content">
              <h3>겨울 시즌 한정 메뉴</h3>
              <p>고소한 앙버터 송편과 상큼한 유자의 완벽한 만남</p>
              <p className="date">2024.012.01 - 2025.01.31</p>
            </div>
          </EventCard>
          <EventCard>
            <img
              src={`${process.env.PUBLIC_URL}/images/events/membership.jpg`}
              alt="멤버십 혜택"
            />
            <div className="content">
              <h3>K.Dot 멤버십 런칭</h3>
              <p>회원가입시 음료 무료 쿠폰 증정</p>
              <p className="date">2024.05.01 - 2024.05.31</p>
            </div>
          </EventCard>
        </EventGrid>
      </SharedSection>

      <SharedSection $isEvent={false}>
        <SectionTitle>이 달의 추천 메뉴</SectionTitle>
        <EventGrid>
          <EventCard>
            <img
              src={`${process.env.PUBLIC_URL}/images/menu/signature1.jpg`}
              alt="시그니처 메뉴"
            />
            <div className="content">
              <h3>치즈 웨이브 수정과</h3>
              <p>부드러운 치즈폼과 전통 수정과의 달콤한 조화</p>
            </div>
          </EventCard>
          <EventCard>
            <img
              src={`${process.env.PUBLIC_URL}/images/menu/signature2.jpg`}
              alt="시그니처 메뉴"
            />
            <div className="content">
              <h3>오미자 샴페인 스플래쉬</h3>
              <p>오미자의 오묘한 맛과 탄산의 상쾌함</p>
            </div>
          </EventCard>
        </EventGrid>
      </SharedSection>

      <FeaturedSection>
        <SectionTitle>K.Dot의 특별함</SectionTitle>
        <FeaturedGrid>
          <FeaturedItem>
            <h3>전통의 재해석</h3>
            <p>
              수정과, 식혜, 쌍화차 등 전통 음료를 현대적으로 재해석한 시그니처
              메뉴를 만나보세요
            </p>
          </FeaturedItem>
          <FeaturedItem>
            <h3>프리미엄 재료</h3>
            <p>엄선된 국내산 재료만을 사용하여 건강하고 깊은 맛을 선사합니다</p>
          </FeaturedItem>
          <FeaturedItem>
            <h3>특별한 블렌딩</h3>
            <p>
              전통 음료와 현대적 요소의 조화로운 블렌딩으로 새로운 맛을
              창조합니다
            </p>
          </FeaturedItem>
        </FeaturedGrid>
      </FeaturedSection>
    </HomeContainer>
  );
}

export default Home;
