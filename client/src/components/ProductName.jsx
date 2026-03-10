import React, { useRef, useEffect, useState } from "react";

const ProductName = ({ name }) => {
  const nameRef = useRef(null);


  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;

    let currentSize = 14; 
    el.style.fontSize = currentSize + "px";

  
    while (el.scrollHeight > el.clientHeight && currentSize > 12) {
      currentSize -= 1;
      el.style.fontSize = currentSize + "px";
    }
  }, [name]);

  return (
    <h2
      ref={nameRef}
      className="product-name"
      style={{
        width: "80%",
        textAlign: "center",
        margin: "0 auto",
        padding: "0",
        lineHeight: "1.2em",
        color: "rgb(150, 92, 85)",
        overflow: "hidden",
        whiteSpace: "nowrap", 
        textOverflow: "ellipsis" 
      }}
    >
      {name}
    </h2>
  );
};

export default ProductName;