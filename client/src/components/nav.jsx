import React from "react";
import acct from "../images/acct.png";
import logo from "../images/logo.png";
import cartlogo from "../images/cartlogo.png";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  const { searchTerm, setSearchTerm } = props;

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    setSearchTerm(searchTerm);
  };

  return (
    <div className="nav">
      <div className="nav-items">
        {/* Logo */}
        <img className="icons" id="logo" src={logo} alt="logo" />

        {/* Search box + button container */}
        <div className="search-container">
          <input
            type="text"
            className="search-box"
            placeholder="search"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <Link to="/shopping">
            <button className="search-btn" onClick={handleSearchClick}>
              search
            </button>
          </Link>
        </div>

        {/* Account icon */}
        <img className="icons" src={acct} alt="account" />

        {/* Cart icon */}
        <Link to="/cart" id="cart-btn">
          <img className="icons" src={cartlogo} alt="cart" />
        </Link>
      </div>

      {/* Page navigation links */}
      <div id="links">
        <Link className="navlink" to="/">Home</Link>
        <Link className="navlink" to="/shopping">Shopping</Link>
        <Link className="navlink" to="/about">About Us</Link>
        <Link className="navlink" to="/contact">Contact</Link>
      </div>
    </div>
  );
};

export default NavBar;