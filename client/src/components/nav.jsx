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
    <>
      <div className="nav">
        <div className="nav-items">
          <img className="icons" id="logo" src={logo} alt=""></img>
          <input
            type="text"
            className="search-box"
            placeholder="search"
            value={searchTerm}
            onChange={handleInputChange}
          ></input>

          <Link to="/shopping">
            <button className="search-btn" onClick={handleSearchClick}>
              search
            </button>
          </Link>

          <img className="icons" src={acct} alt=""></img>

          <button onClick={props.cartPath} id="cart-btn">
            {" "}
            {props.length}
            <img src={cartlogo} alt=""></img>
          </button>
        </div>
        <div id="links">
          <Link className="navlink" to="/">Home</Link>
          <Link className="navlink" to="/shopping">Shopping</Link>
          <Link className="navlink" to="/about">About Us</Link>
          <Link className="navlink" to="/contact">Contact</Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;