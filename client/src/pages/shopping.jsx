import React, { useState, useEffect } from "react";
import axios from "axios";
import productImg from "../images/productImg.png";

const PAGE_PRODUCTS = "products";
const PAGE_CART = "cart";

const Shopping = ({ searchTerm }) => {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [page, setPage] = useState(PAGE_PRODUCTS);
  const [error, setError] = useState(null);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/products`
        );
        setProducts(data.rows || []);
        setError(null);
      } catch (err) {
        setError("Failed to fetch products");
      }
    };

    fetchProducts();
  }, []);

  // Filter products when searchTerm changes
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name
        .toLowerCase()
        .includes((searchTerm || "").toLowerCase())
    );

    setFilteredProducts(filtered);
  }, [products, searchTerm]);

  const addToCart = (product) => {
    setCartList([...cartList, product]);
  };

  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  const renderProducts = () => (
    <>
      <header id="shopping-head">
        <button onClick={() => navigateTo(PAGE_CART)} id="goToCart">
          Go to Cart ({cartList.length})
        </button>
      </header>

      {error && <p>{error}</p>}

      <div id="shopping">
        {filteredProducts.map((product, idx) => (
          <div className="card" key={idx}>
            <div id="product">
              <img
                id="img"
                src={product.image || productImg}
                alt={product.name}
              />
              <h2>{product.name}</h2>
              <h3>{product.description}</h3>
              <h3>${product.price}</h3>
              <button onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const renderCart = () => (
    <>
      <div id="cart-container">
        <button
          onClick={() => navigateTo(PAGE_PRODUCTS)}
          id="products-btn"
        >
          Back to Products
        </button>

        <h1 id="cart-title">Cart</h1>

        {cartList.map((product, idx) => (
          <div className="card card-container" key={idx}>
            <div id="product">
              <img
                src={product.image || productImg}
                alt={product.name}
              />
              <h2>{product.name}</h2>
              <h3>{product.description}</h3>
              <h3>${product.price}</h3>
            </div>
          </div>
        ))}

        <button id="checkout-btn">Checkout</button>
      </div>
    </>
  );

  return (
    <div className="main">
      {page === PAGE_PRODUCTS && renderProducts()}
      {page === PAGE_CART && renderCart()}
    </div>
  );
};

export default Shopping;