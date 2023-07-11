import React, { useEffect, useState } from "react";
import { CartContext } from "../../context/cart-context";
import { getCategoryData, getData } from "../../services/firebase";
import { useParams } from "react-router-dom";
// import { PRODUCTS } from "../../products";
import { Product } from "./product";
import "./shop.css";


export const Shop = () => {
  const [products, setProducts] = useState([]);
  const { categoryid } = useParams();

  const isCategory = categoryid === undefined ? getData : getCategoryData;

  useEffect(() => {
    isCategory(categoryid)
    .then((res) => setProducts(res))
  }, [categoryid]);
  
  return (
    <CartContext.Consumer>
      {(cartContext) => (
        <div className="shop">
          <div className="shopTitle">
            <h1>LaTiendita de Gilberto</h1>
          </div>

          <div className="products">
            {products.map((product) =>{
              
              return  (
                <Product
                  key={product.id}
                  data={product}
                  addToCart={cartContext.addToCart}
                  cartItems={cartContext.cartItems}
                />
              )})
            }
          
          </div>
        </div>
      )}
    </CartContext.Consumer>
  );
};
