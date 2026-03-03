import React from "react";
import "./styling/App.css";
import "./styling/nav.css";
import "./styling/footer.css";
import "./styling/home.css";
import "./styling/shopping.css";
import "./styling/about.css";
import "./styling/account.css";
import "./styling/contact.css";
import "./styling/hero.css";
import "./styling/featured.css";

import About from "./pages/about";
import Account from "./pages/account";
import Cart from "./pages/cart";
import Contact from "./pages/contact";
import Shopping from "./pages/shopping";
import Home from "./pages/home";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from 'react';
import { NavBar } from "./components/index.js";
import { Footer } from "./components/index.js";


function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <>
      <BrowserRouter>
        <div className="main">
          <NavBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            cartCount={cart.length} 
          />
          <Footer />
        </div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Account />} />
          <Route path="/cart" element={<Cart cart={cart} />} />
          <Route path="/contact" element={<Contact />} />
          <Route 
            path="/shopping" 
            element={<Shopping searchTerm={searchTerm} addToCart={addToCart} />} 
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}