import React, { useContext } from "react";
import { CartContext } from "../../context/cart-context";
import { Link } from "react-router-dom";

export const Product = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { addToCart, cartItems } = useContext(CartContext);

  const cartItemCount = cartItems[id];

  return (
    <div className="product">
      <Link to={`/${id}`}>
        <img src={productImage} />
        <div className="description">
          <p>
            <b>{productName}</b>
          </p>
          <p> ${price}</p>
        </div>
      </Link>
      <button className="addToCartBttn" onClick={() => addToCart(id)}>
        Agregar al carrito {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
  );
};
