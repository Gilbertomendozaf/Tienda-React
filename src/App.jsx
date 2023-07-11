import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartContextProvider } from "./context/cart-context";
import { Shop } from "./components/shop/shop";
import { Cart } from "./components/Cart/cart";
import { Navbar } from "./components/Navbar/navbar";
import { ItemDetail } from "./components/shop/ItemDetail";
// import { exportData } from "./services/firebase";



function App() {
  return (
    <div className="App">
      <CartContextProvider>
      <BrowserRouter>
          <Navbar />
          <main>
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/category/:categoryid" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/:id" element={<ItemDetail/>} />
            <Route path="*" element={<h4>Error 404: Page not found</h4>} />
          </Routes>
          </main>
          {/* <button onClick={exportData}> Export Data</button> */}
        </BrowserRouter>
      </CartContextProvider>
    </div>
  );
}

export default App;
