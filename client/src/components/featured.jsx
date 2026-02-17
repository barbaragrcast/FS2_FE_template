import React, { useState, useEffect } from "react";
import axios from "axios";

const Featured = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/products`
        );
        setProducts(data.rows);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div id="gallery-head">
        <h1> Gallery </h1>
      </div>

      <div id="card-container">
        {products.map((product) => (
          <div className="featured-card" key={product.id}>
            <img
              className="img"
              src={product.image_url}
              alt=""
            />
            <h3>{product.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default Featured;
