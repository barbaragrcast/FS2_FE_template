import Home from "./pages/home.jsx";
import About from "./pages/about.jsx";
import Account from "./pages/account.jsx";
import Cart from "./pages/cart.jsx";
import Contact from "./pages/contact.jsx";
import Shopping from "./pages/shopping.jsx";

import { NavBar } from "./components/index.js"; // keep .js if index.js is not JSX
import { Footer } from "./components/index.js";

function App() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Hello, React is working!</h1>
    </div>
  );
}

export default App;