import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartContextProvider } from "./context/cart-context";


import { Shop } from "./components/shop/shop";
import { Cart } from "./components/Cart/cart";
import { Navbar } from "./components/Navbar/navbar";
import { ItemDetail } from "./components/shop/ItemDetail";


function App() {
  return (
    <div className="App">
      <CartContextProvider>
      <BrowserRouter>
        
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/category/:categoryid" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/:id" element={<ItemDetail/>} />
          </Routes>

        </BrowserRouter>
      </CartContextProvider>
    </div>
  );
}

export default App;
