import React from "react";
import { CartContext } from "../../context/cart-context";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import "./shop.css";

export const Shop = () => {
  return (
    <CartContext.Consumer> 
      {(cartContext) => (
        <div className="shop">
          <div className="shopTitle">
            <h1>LaTiendita de Gilberto</h1>
          </div>

          <div className="products">
            {PRODUCTS.map((product) => (
              <Product key={product.id} data={product} addToCart={cartContext.addToCart} cartItems={cartContext.cartItems} />
            ))}
          </div>
        </div>
      )}
    </CartContext.Consumer>
  );
};
