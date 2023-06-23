import React, { useContext } from "react";
import { CartContext } from "../../context/cart-context";

export const Product = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { addToCart, cartItems } = useContext(CartContext);

  const cartItemCount = cartItems[id];

  return (
    <div className="product">
      <img src={productImage} />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p> ${price}</p>
      </div>
      <button className="addToCartBttn" onClick={() => addToCart(id)}>
        Agregar al carrito {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
  );
};
