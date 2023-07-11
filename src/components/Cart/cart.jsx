import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/cart-context";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import { createOrderWithStockUpdate, getCartItems } from "../../services/firebase";
import "./style-cart.css";
import CheckoutForm from "../Checkout/Checkout";

export const Cart = () => {
  const [currentCartItems, setCurrentCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(null);
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  const calcTotalAmount = (items) => {
    let sum = 0;
    items.map((item) => {
      sum = sum + item.price * item.count;
    });
    return sum;
  };

  useEffect(() => {
    getCartItems(cartItems).then((res) => setCurrentCartItems(res));
  }, [cartItems]);

  useEffect(() => {
    setTotalAmount(calcTotalAmount(currentCartItems));
  }, [currentCartItems]);

  const handleCheckoutClick = () => {
    setShowCheckoutForm(true);
  };

  const handleCreateOrder = async (userData) => {
    const order = {
      items: currentCartItems,
      buyer: userData,
      date: new Date(),
      price: totalAmount,
    };

    try {
      const id = await createOrderWithStockUpdate(order);
      clearCart();
      navigate(`/order-confirmation/${id}`);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="cart">
      <div>
        <h1>Tu carrito</h1>
      </div>
      <div className="cart">
        {currentCartItems.map((item) => (
          <CartItem key={item.id} data={item} count={item.count} />
        ))}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <p>Subtotal: ${totalAmount}</p>
          <button onClick={() => navigate("/")}>Continue Shopping</button>
          <button onClick={handleCheckoutClick}>Checkout</button>
        </div>
      ) : (
        <h1>No hay artículos en tu carrito</h1>
      )}

      {showCheckoutForm && <CheckoutForm onConfirm={handleCreateOrder} />}
    </div>
  );
};
