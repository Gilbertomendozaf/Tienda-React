import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/cart-context";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import { getCartItems } from "../../services/firebase";


import "./style-cart.css";

export const Cart = () => {
  const [currentCartItems, setCurrentCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(null)
  const { cartItems } = useContext(CartContext);
  
  const calcTotalAmount = (items) => {
    let sum = 0
    items.map((item) => {
      sum = sum + item.price * item.count;
    })
    return sum;
  };


  useEffect(() => {
    getCartItems(cartItems)
    .then((res) => setCurrentCartItems(res) )

  }, [cartItems]);

  useEffect(() => {
    setTotalAmount(calcTotalAmount(currentCartItems))
  }, [currentCartItems])


  // const totalAmount = cartItemsArray.reduce((acc, [itemId, count]) => {
  //   const product = PRODUCTS.find((product) => product.id === itemId);
  //   if (product) {
  //     return acc + product.price * count;
  //   }
  //   return acc;
  // }, 0);

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div>
        <h1>Tu carrito</h1>
      </div>
      <div className="cart">
        {currentCartItems.map((item) => {
        
            return (
              <CartItem
                key={item.id}
                data={item}
                count={item.count}
              />
            )
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <p>Subtotal: ${totalAmount}</p>
          <button onClick={() => navigate("/")}>Continue Shopping</button>
          <button>Checkout</button>
        </div>
      ) : (
        <h1>No hay articulos en tu carrito</h1>
      )}
    </div>
  );
};
