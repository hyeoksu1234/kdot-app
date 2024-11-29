import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import { CartProvider } from "./contexts/CartContext";
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <CartProvider>
      <Router>
        <GlobalStyle />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Navbar />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
