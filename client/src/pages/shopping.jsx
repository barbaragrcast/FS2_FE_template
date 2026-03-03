import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "../components/product";
import { useNavigate } from "react-router-dom";
import productImg from "../images/productImg.png";

const Shopping = ({ searchTerm, addToCart, cart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products`);
        setProducts(data.rows || []);
        setError(null);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter products
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes((searchTerm || "").toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products, searchTerm]);

  const handleAddToCart = async (product) => {
    try {
      addToCart(product); // update global cart
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/cart`, product);
      navigate("/cart"); // go to cart page
    } catch (err) {
      console.error("Failed to add product to cart", err);
    }
  };

  return (
    <div className="main">
      <header id="shopping-head">
        <button onClick={() => navigate("/cart")} id="goToCart">
          Go to Cart ({cart.length})
        </button>
      </header>

      {error && <p>{error}</p>}

      <div id="shopping">
        {isLoading && <p>Loading products...</p>}
        {!isLoading && !error && filteredProducts.length === 0 && <h2>No products available at the moment.</h2>}
        {!isLoading &&
          !error &&
          filteredProducts.map((product) => (
            <div className="card" key={product.id}>
              <Product product={product} />
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Shopping;