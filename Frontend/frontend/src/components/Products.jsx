import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import style from "./Product.module.css";
import { fetchProducts } from "../db/fetchProduct";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { UserContext } from "../userContext/userContext";

function Products() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  let { isLoading, data: products } = useQuery("products", fetchProducts, {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const handleClick = (product) => {
    const { title, price, images } = product;

    const initialQuantity = 1;

    const productInfo = {
      title,
      price,
      totalPrice: price * initialQuantity,
      image: images && images.length > 0 ? images[0] : null,
      quantity: initialQuantity,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProductIndex = existingCart.findIndex(
      (item) => item.title === productInfo.title
    );

    if (existingProductIndex !== -1) {
      existingCart[existingProductIndex].quantity += initialQuantity;
      existingCart[existingProductIndex].totalPrice += productInfo.totalPrice;
    } else {
      existingCart.push(productInfo);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    if (user) navigate("/cart", { replace: true });
    else {
      navigate("/login", { replace: true });
    }
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <section className={style.productSection}>
      {products.length == 0 ? (
        <h3 className={style.loading}> no products available </h3>
      ) : (
        products?.products.map((element) => (
          <div className={style.productHolder} key={element._id}>
            <img
              src={`${process.env.REACT_APP_PATH}images/${element.images[0]}`}
              alt="product"
            />
            <div className={style.details}>
              <div>
                <h4>{element.title}</h4>
                <p>${element.price}</p>
              </div>
              <Link
                className={style.addToCart}
                onClick={() => handleClick(element)}
              >
                add to cart
              </Link>
            </div>
          </div>
        ))
      )}
    </section>
  );
}

export default Products;
