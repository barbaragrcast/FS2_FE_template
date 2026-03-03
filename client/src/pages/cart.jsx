import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Product from "../components/product"; // Make sure Product is imported

const Cart = () => {
  const [cartList, setCartList] = useState([]);
  const navigate = useNavigate();

  // Fetch cart items from backend
  useEffect(() => {
    const getCart = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/cart`
        );
        setCartList(data.rows || []);
      } catch (err) {
        console.error("Failed to fetch cart", err);
      }
    };
    getCart();
  }, []);

  // Remove item from cart
  const removeFromCart = async (product) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/cart/${product.id}`);
      // Remove locally
      setCartList((prev) => prev.filter((p) => p.id !== product.id));
    } catch (err) {
      console.error("Failed to remove product from cart", err);
    }
  };

  return (
    <div id="cart-container">
      <button onClick={() => navigate("/shopping")}>Back to Shopping</button>

      <h1 id="cart-title">Cart</h1>

      {cartList.length === 0 && <p>Your cart is empty.</p>}

      {cartList.map((product) => (
        <div className="card card-container" key={product.id}>
          <Product product={product} />
          <button onClick={() => removeFromCart(product)}>Remove</button>
        </div>
      ))}

      {cartList.length > 0 && <button id="checkout-btn">Checkout</button>}
    </div>
  );
};

export default Cart;