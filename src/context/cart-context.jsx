import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const calculateTotalItems = () => {
      let totalItems = 0;
      for (const item in cartItems) {
        totalItems += cartItems[item];
      }
      setCartItemCount(totalItems);
    };

    calculateTotalItems();
  }, [cartItems]);

  const addToCart = (itemId) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = { ...prevCartItems };
      updatedCartItems[itemId] = updatedCartItems[itemId] ? updatedCartItems[itemId] + 1 : 1;
      return updatedCartItems;
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = { ...prevCartItems };
      if (updatedCartItems[itemId] && updatedCartItems[itemId] > 0) {
        updatedCartItems[itemId] -= 1;
        if (updatedCartItems[itemId] === 0) {
          delete updatedCartItems[itemId]; // Eliminar el elemento del carrito si la cantidad llega a cero
        }
      }
      return updatedCartItems;
    });
  };

  const removeItemFromCart = (itemId) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = { ...prevCartItems };
      delete updatedCartItems[itemId]; // Eliminar el elemento del carrito si la cantidad llega a cero
      return updatedCartItems;
    })
  }

  const updateCartItemCount = (itemId, newCount) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = { ...prevCartItems };
      if (newCount > 0) {
        updatedCartItems[itemId] = newCount;
      } else {
        delete updatedCartItems[itemId]; // Eliminar el elemento del carrito si la nueva cantidad es cero o negativa
      }
      return updatedCartItems;
    });
  };

  const clearCart = () => {
    setCartItems({});
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    clearCart,
    cartItemCount,
    removeItemFromCart,
  };

  return <CartContext.Provider value={contextValue}>{props.children}</CartContext.Provider>;
};
