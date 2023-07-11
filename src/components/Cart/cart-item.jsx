import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/cart-context";
import { Trash } from "phosphor-react";


export const CartItem = (props) => {
  
  const { count } = props;
  const { id, productName, price, productImage } = props.data; 
  const { cartItems, addToCart, removeFromCart, removeItemFromCart, updateCartItemCount } = useContext(CartContext); 
  const [cartCount, setCartCount] = useState(count);



  useEffect(() => {
    setCartCount(count);
  }, [count]);

  const decreaseCount = () => {
    if (cartCount > 1) {
      setCartCount(cartCount - 1);
      updateCartItemCount(id, cartCount - 1);
    } else {
      removeFromCart(id);
    }
  };

  const increaseCount = () => {
    setCartCount(cartCount + 1);
    addToCart(id);
  };

  const handleCountChange = (e) => {
    const newCount = Number(e.target.value);
    if (newCount >= 0) {
      setCartCount(newCount);
      updateCartItemCount(id, newCount);
      if (newCount === 0) {
        removeFromCart(id);
      }
    }
  };

  return (
    <div className="cartItem">
      <img src={productImage} alt={productName} />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p>Price: ${price}</p>
        <div className="countHandler">
          <button onClick={decreaseCount}>-</button>
          <input value={cartCount} onChange={handleCountChange} />
          <button onClick={increaseCount}>+</button>
        </div>
      </div>
      <button className="deleteButton" onClick={() => removeItemFromCart(id)}>

        <Trash size={32}/>

      </button>
    </div>
  );
  
};




