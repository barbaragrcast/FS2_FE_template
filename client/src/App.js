import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NavBar, Footer } from "./components";
import Home from "./pages/home";
import About from "./pages/about";
import Account from "./pages/account";
import Cart from "./pages/cart";
import Contact from "./pages/contact";
import Shopping from "./pages/shopping";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shopping" element={<Shopping />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;