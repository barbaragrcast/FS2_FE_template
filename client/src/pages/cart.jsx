import React from "react";

const Cart = () => {
  const [cartList, setCartList] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const getCart = async () => {
      const {data} = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/cart`);
      console.log("CART", data);
      setCartList(data.rows);
    }
    getCart();
  }, [])

  const removeFromCart = async (product) => {
    const result = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/cart/${product.id}`);
    setCartList(result.data.rows);
  }
  return (
    <div id="cart-container">
      <button onClick={() => navigate("/shopping")}>
        Back to Shopping
      </button>

      <h1 id="cart-title"> Cart </h1>
      {cartList.map((product) => (
        <div className="card card-container" key={product.id}>
          <Product product= {product}/>
          <button onClick={() => removeFromCart(product)} > Remove</button>
        </div>
      ))}
      <button id="checkout-btn">Checkput</button>
    </div>
  );
};
export default Cart;
