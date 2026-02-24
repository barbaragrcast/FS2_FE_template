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
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shopping" element={<Shopping />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;