import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ProductDetail from "./pages/ProductDetail";
import Splash from "./pages/Splash";

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

function App() {
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setIsFirstVisit(true);
      localStorage.setItem("hasVisited", "true");
    } else {
      setIsFirstVisit(false);
    }

    // 페이지 새로고침 시 localStorage 초기화
    window.addEventListener("beforeunload", () => {
      localStorage.removeItem("hasVisited");
    });

    return () => {
      window.removeEventListener("beforeunload", () => {
        localStorage.removeItem("hasVisited");
      });
    };
  }, []);

  if (isFirstVisit) {
    return (
      <Splash
        onSplashComplete={() => {
          setIsFirstVisit(false);
        }}
      />
    );
  }

  return (
    <Router>
      <CartProvider>
        <AppContainer>
          <Header />
          <MainContent>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
          </MainContent>
          <Footer />
        </AppContainer>
      </CartProvider>
    </Router>
  );
}

export default App;
