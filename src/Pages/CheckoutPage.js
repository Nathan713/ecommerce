import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import CheckoutForm from "../Components/CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51MlWxwEHRdXBGCKXlwUOr4OB5OSmCZQT0DEJJisHLGSxrjNDD7M7zxpkv6we3T8NaV80tw0ND4UqjxwfIcIRxG8800UqKMEOjO"
);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");
  const { totalPrice, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(
      "https://qoa5ud3uee.execute-api.us-east-1.amazonaws.com/latest/create-payment-intent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ totalPrice: totalPrice }),
      }
    )
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [totalPrice]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
