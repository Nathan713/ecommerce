const express = require("express");
const app = express();
// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51MlWxwEHRdXBGCKXtdr9aqmZt0ZOb1rmIv3NRE5w1jIqhc1JlETLlruZticuosu9YrYkUoY9JlxDsQBa02aOJQWZ00Ur0brvzh"
);

app.use(express.static("public"));
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // replace with your domain or * to allow all origins
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
const calculateOrderAmount = (totalPrice) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return totalPrice;
};

app.post("/create-payment-intent", async (req, res) => {
  // const { items } = req.body;
  const totalPrice = parseInt(req.body.totalPrice);
  console.log(totalPrice);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    // amount: calculateOrderAmount(items),
    amount: totalPrice * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));
