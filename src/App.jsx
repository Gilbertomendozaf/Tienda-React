import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartContextProvider } from "./context/cart-context";

import { Shop } from "./components/shop/shop";
import { Cart } from "./components/Cart/cart";
import { Navbar } from "./components/Navbar/navbar";

function App() {
  return (
    <div className="App">
      <CartContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      </CartContextProvider>
    </div>
  );
}

export default App;
