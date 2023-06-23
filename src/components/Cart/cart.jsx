// import React, { useContext } from "react";
// import { CartContext, CartContextProvider } from "../../context/cart-context";
// import { CartItem } from "./cart-item";
// import { useNavigate } from "react-router-dom";
// import { PRODUCTS } from "../../products";

// import "./style-cart.css";



// export const Cart = () => {
//   const { cartItems, updateCartItemCount } = useContext(CartContext);
//   const cartItemsArray = Object.entries(cartItems); // Convierte el objeto cartItems en un array de [itemId, count]
//   // console.log(cartItemsArray)


//    // Calcula el total correctamente
//   const totalAmount = cartItemsArray.reduce((acc, [itemId, count]) => {
//     const product = PRODUCTS.find((product) => product.id === itemId);
//     if (product) {
//       return acc + product.price * count;
//     }
//     return acc;
//   }, 0);
//   //

//   const navigate = useNavigate();

//   return (
//     <CartContextProvider>

//     <div className="cart">
//       <div>
//         <h1>Tu carrito</h1>
//       </div>
//       <div className="cart">
//       {cartItemsArray.map(([itemId, count]) => {
//         // console.log(itemId)
//     const product = PRODUCTS.find((product) => product.id === itemId);
//         console.log(product);
//     if (count !== 0 && product) {
//       return <CartItem key={itemId} data={product} count={count} updateCartItemCount={updateCartItemCount} />;
//     }
//     return null;
//   })}
//       </div>

//       {totalAmount > 0 ? (
//         <div className="checkout">
//           <p>Subtotal: ${totalAmount}</p>
//           <button onClick={() => navigate("/")}>Continue Shopping</button>
//           <button>
//             Checkout
//           </button>
//         </div>
//       ) : (
//         <h1>Carrito vacio</h1>
//         )}
//     </div>
//         </CartContextProvider>
//   );
// };

import React, { useContext } from "react";
import { CartContext } from "../../context/cart-context";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from "../../products";

import "./style-cart.css";

export const Cart = () => {
  const { cartItems } = useContext(CartContext);
  const cartItemsArray = Object.entries(cartItems);

  const totalAmount = cartItemsArray.reduce((acc, [itemId, count]) => {
    const product = PRODUCTS.find((product) => product.id === itemId);
    if (product) {
      return acc + product.price * count;
    }
    return acc;
  }, 0);

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div>
        <h1>Tu carrito</h1>
      </div>
      <div className="cart">
        {cartItemsArray.map(([itemId, count]) => {
          const product = PRODUCTS.find((product) => product.id === itemId);
          if (count !== 0 && product) {
            return (
              <CartItem
                key={itemId}
                data={product}
                count={count}
              />
            );
          }
          return null;
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
