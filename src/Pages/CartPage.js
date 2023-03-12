import React, { useEffect, useState } from "react";
import "./CartPage.css";
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

  const goToHome = () => {
    navigate("/", { state: { skipEffect: false } });
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="cartpage-container">
        <div className="flex-left">
          <div className="cart-header-container">
            <div className="cart-header Lato-Italic">
              My Shopping Cart ({totalQuantity})
            </div>
            <div onClick={() => goToHome()} className="continue-shopping">
              Continue Shopping
            </div>
          </div>

          {items.map((item) => (
            <CartCard item={item} key={item.id} />
          ))}
        </div>
        <div className="flex-right">
          <div className="subtotal-container Lato-Bold">
            <div>Subtotal</div>
            <div>{totalPrice}</div>
          </div>
          <div className="checkout-button">Proceed To Checkout</div>
        </div>
      </div>
    </>
  );
}
