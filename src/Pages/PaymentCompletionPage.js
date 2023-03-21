import React, { useEffect } from "react";
import styles from "./PaymentCompletionPage.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeAll } from "../features/cart/cartSlice";

const PaymentCompletionPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onHome = () => {
    navigate("/");
  };

  useEffect(() => {
    dispatch(removeAll());
  }, []);

  return (
    <div className={styles.payment_completion_page}>
      <h1>Payment Completed</h1>
      <p>Your payment of has been successfully processed.</p>
      <p>Thank You For Shopping.</p>
      <div className={styles.home} onClick={() => onHome()}>
        Back To Home
      </div>
    </div>
  );
};

export default PaymentCompletionPage;
