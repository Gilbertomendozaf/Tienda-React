import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import { CartContext } from "../../context/cart-context"; // Importa el contexto del carrito
import "./navbar.css";

export const Navbar = () => {
  const { cartItems } = useContext(CartContext); // Obtiene el estado del carrito del contexto

  // Calcula la cantidad total de artículos en el carrito
  const totalItems = Object.values(cartItems).reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="navbar">
      <div className="links">
        <Link to="/"> Tienda </Link>
        <Link to="/cart">
          <ShoppingCart size={32} />
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </Link>
      </div>
    </div>
  );
};