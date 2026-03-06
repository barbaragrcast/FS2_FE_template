
import React from "react";
import productImg from "../images/productImg.png";

const Product = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <div className="img-frame">
        <img src={product.image_url || productImg} alt={product.name} />
      </div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      {}
      {addToCart && (
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      )}
    </div>
  );
};

export default Product;