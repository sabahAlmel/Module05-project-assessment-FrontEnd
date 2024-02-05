import React, { useState } from "react";
import style from "./Checkout.module.css";
import { toast } from "react-toastify";
import placeholder from "../assets/icons/Google.svg";

const Checkout = ({ title, price, quantity, image, cartItems }) => {
  const handleDelete = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const itemIndex = existingCart.findIndex((item) => item.title === title);

    if (itemIndex !== -1) {
      existingCart.splice(itemIndex, 1);

      localStorage.setItem("cart", JSON.stringify(existingCart));
      cartItems(existingCart);
      toast.success("deleted successfully");
      return;
    }
    toast.error(" error try again");
  };

  return (
    <section className={style.wrapper}>
      <div className={style.picture}>
        {image ? (
          <img src={`${process.env.REACT_APP_PATH}${image}`} alt="alt" />
        ) : (
          <img src={placeholder} alt="placeholder" />
        )}
      </div>
      <div className={style.pic}>
        <p>{title}</p>
      </div>
      <div className={style.middle}>
        <p>{quantity}</p>
      </div>

      <p>{price} $</p>

      <aside className={style.left} onClick={handleDelete}>
        <div style={{ color: "red" }}>Delete</div>
      </aside>
    </section>
  );
};

export default Checkout;
