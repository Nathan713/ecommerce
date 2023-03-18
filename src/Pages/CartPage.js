import React, { useEffect, useState } from "react";
import styles from "./CartPage.module.css";
import commerce from "../lib/commerce";
import { useSelector } from "react-redux";
import CartCard from "../Components/CartCard";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { items, totalQuantity, totalPrice, loading } = useSelector(
    (state) => state.cart
  );
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // commerce.cart.empty().then((response) => console.log(response));
    commerce.cart.contents().then((items) => {
      setCartItems(items);
      console.log(items);
    });
  }, []);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const goToHome = () => {
    navigate("/", { state: { skipEffect: false } });
  };
  const goToCheckout = () => {
    console.log("checkout");
    navigate("/checkout");
  };

  return (
    <>
      <Navbar></Navbar>
      <div className={styles.cartpage_container}>
        <div className={styles.flex_left}>
          <div className={styles.cart_header_container}>
            <div className={styles.cart_header}>
              My Shopping Cart ({totalQuantity})
            </div>
            <div
              onClick={() => goToHome()}
              className={styles.continue_shopping}
            >
              Continue Shopping
            </div>
          </div>

          {items.map((item) => (
            <CartCard item={item} key={item.id} />
          ))}
        </div>
        <div className={styles.flex_right}>
          <div className={styles.subtotal_container}>
            <div>Subtotal</div>
            <div>{formatter.format(totalPrice)}</div>
          </div>
          <div
            className={styles.checkout_button}
            onClick={() => goToCheckout()}
          >
            Proceed To Checkout
          </div>
        </div>
      </div>
    </>
  );
}
