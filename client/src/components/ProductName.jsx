import React, { useRef, useEffect, useState } from "react";

const ProductName = ({ name }) => {
  const nameRef = useRef(null);
  const [fontSize, setFontSize] = useState(14); // default font size

  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;

    let currentSize = 14;
    el.style.fontSize = currentSize + "px";

    // Shrink until the text fits in one line
    while (el.scrollHeight > el.clientHeight && currentSize > 10) {
      currentSize -= 1;
      el.style.fontSize = currentSize + "px";
    }
  }, [name]);

return (
  <h2
    ref={nameRef}
    style={{
      width: "80%",
      textAlign: "center",       // centers the text
      margin: "0 auto",
      padding: "0",
      lineHeight: "1.2em",
      color: "rgb(150, 92, 85)"  // change this to any color you want
    }}
  >
    {name}
  </h2>
);
};

export default ProductName;