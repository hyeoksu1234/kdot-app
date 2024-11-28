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
  min-height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("/images/background/traditional-tea.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: white;
`;

const HeroSection = styled.section`
  
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-color);
  color: white;
  padding: 2rem;
  text-align: center;
  position: relative;
  overflow-x: hidden;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 600px;
`;

const MenuButton = styled(Link)`
  background-color: white;
  color: var(--primary-color);
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
  font-family: "Hahmlet", serif;
  color: #ff7b28;
`;

const EventSection = styled.div`
  padding: 6rem 2rem;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
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
  border-radius: 20px;
  overflow: hidden;
  animation: ${fadeIn} 1s ease-out;
  backdrop-filter: blur(10px);
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
    }

    p {
      opacity: 0.9;
      margin-bottom: 1rem;
      line-height: 1.6;
    }

    .date {
      font-size: 0.9rem;
      color: #ff7b28;
      font-weight: 600;
    }
  }
`;

const RecommendSection = styled.div`
  padding: 6rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
`;

const FeaturedSection = styled.div`
  padding: 6rem 2rem;
  background: rgba(0, 0, 0, 0.8);
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeaturedItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 2.5rem;
  border-radius: 20px;
  text-align: center;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    font-family: "Hahmlet", serif;
    color: #ff7b28;
  }

  p {
    opacity: 0.9;
    line-height: 1.8;
  }
`;

function Home() {
  return (
    <HomeContainer>
      <HeroSection>
        <BrandLogo />
        <Title>K.Dot Cafe</Title>
        <Subtitle>
          전통차의 깊이와 현대적 감각이 만나는 곳<br />
          한국의 전통 음료를 새롭게 재해석한 특별한 경험
        </Subtitle>
        <MenuButton to="/menu">메뉴 보기</MenuButton>
      </HeroSection>

      <EventSection>
        <SectionTitle>진행중인 이벤트</SectionTitle>
        <EventGrid>
          <EventCard>
            <img src="/images/events/summer-special.jpg" alt="여름 시즌 메뉴" />
            <div className="content">
              <h3>여름 시즌 한정 메뉴</h3>
              <p>시원한 수박화채와 함께하는 무더운 여름</p>
              <p className="date">2024.06.01 - 2024.08.31</p>
            </div>
          </EventCard>
          <EventCard>
            <img src="/images/events/membership.jpg" alt="멤버십 혜택" />
            <div className="content">
              <h3>K.Dot 멤버십 런칭</h3>
              <p>회원가입시 음료 무료 쿠폰 증정</p>
              <p className="date">2024.05.01 - 2024.05.31</p>
            </div>
          </EventCard>
        </EventGrid>
      </EventSection>

      <RecommendSection>
        <SectionTitle>이 달의 추천 메뉴</SectionTitle>
        <EventGrid>
          <EventCard>
            <img src="/images/menu/signature1.jpg" alt="시그니처 메뉴" />
            <div className="content">
              <h3>치즈 웨이브 수정과</h3>
              <p>부드러운 치즈폼과 전통 수정과의 달콤한 조화</p>
            </div>
          </EventCard>
          <EventCard>
            <img src="/images/menu/signature2.jpg" alt="시그니처 메뉴" />
            <div className="content">
              <h3>오미자 샴페인 스플래쉬</h3>
              <p>오미자의 오묘한 맛과 탄산의 상쾌함</p>
            </div>
          </EventCard>
        </EventGrid>
      </RecommendSection>

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
