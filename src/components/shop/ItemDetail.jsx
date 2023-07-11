import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CartContext } from "../../context/cart-context";
import { getItemData } from '../../services/firebase';


export const ItemDetail = () => {
    const [item, setItem] = useState({})
    const [errors, setErrors] = useState(null);
    const { addToCart, cartItems } = useContext(CartContext);
    const id = useParams().id;
    const cartItemCount = cartItems[id];

    useEffect(() => {
        getItemData(id)
        .then((res) => {
        setItem(res);
        })
        .catch((error) => {
            setErrors(error.message);
        });
      }, [id]);
    
      if (errors)
        return (
          <div>
            <h1>Error</h1>
            <p>{errors}</p>
          </div>
        );

    return (
        <div className="item-detail">
        {console.log(item)}
        <img src={item.productImage} alt={item.productName} />
        <div className="description">
            <h2>{item.productName}</h2>
            <p>${item.price}</p>
            <p>${item.detail}</p>
        </div>
        <button className="addToCartBttn" onClick={() => addToCart(idd)}>
            Agregar al carrito {cartItemCount > 0 && <> ({cartItemCount})</>}
        </button>
        <Link to="/">Volver</Link>
    </div>
    );
};
