import React, { useEffect, useState } from "react";
import style from "./Cart.module.css";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const nb = cartItems.length;
  const [total, setTotal] = useState(
    cartItems.reduce((acc, item) => acc + parseFloat(item.totalPrice), 0)
  );

  useEffect(() => {
    const newTotal = cartItems.reduce(
      (acc, item) => acc + parseFloat(item.totalPrice),
      0
    );
    setTotal(newTotal);
  }, [cartItems]);
  if (nb === 0) {
    return (
      <section className={style.wrapper}>
        <div className={style.description}>
          <h1 className={style.header}>cart </h1>
          <p className={style.nbOfProducts}> you have 0 item </p>
          <p className={style.startShopping}> start shopping now!</p>
        </div>
      </section>
    );
  }

  return (
    <section className={style.wrapper}>
      <div className={style.description}>
        <h1 className={style.header}>cart </h1>
        <p className={style.nbOfProducts}>you have {nb} items </p>
      </div>
      <div className={style.displayCards}>
        {cartItems.map((item, index) => (
          <Checkout
            quantity={item.quantity}
            title={item.title}
            price={item.totalPrice}
            key={index}
            image={item.image}
            cartItems={setCartItems}
          />
        ))}
      </div>
      <Link to="" className={style.checkoutBTN}>
        <span className={style.checkout}> Checkout </span>
        <span className={style.total}>{total} $</span>
      </Link>
    </section>
  );
}

export default Cart;
