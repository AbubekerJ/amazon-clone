


// const functions = require('firebase-functions'); // Import the 'functions' module.

// const express = require('express');
// const cors = require('cors');
// const stripe = require('stripe')(

//     'sk_test_51O7buhITzAyJfbAGqKxWevglokrrTpPyRTXdFyV2IjrVPiVnlbNTeanLiw8OF1mnJaLYzZ2gg4ah1RumBDDG4UBa00KjSrhj8D'
    
//     );
//     const app = express();

//     app.use(cors({ origin: true }));
//     app.use(express.json());
    
//     app.get("/", (request, response) => response.status(200).send("hello world"));
    
//     app.post("/payments/create", async (request, response) => {
//       const total = request.query.total;
    
//       console.log("Payment Request Reaceived for this amount >>>>", total);
    
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount: total,
//         currency: "usd",
//       });
//       response.status(201).send({
//         clientSecret: paymentIntent.client_secret,
//       });
//     });
 
//     exports.api = functions.https.onRequest(app);

//     app.listen(5000,(err)=>{
//       if (err) {
//         console.log(err.messege)
//       } else {
//         console.log("listning to 5000")
    
//       }
//     })


const functions = require('firebase-functions'); // Import the 'functions' module.

const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(

    'sk_test_51O7buhITzAyJfbAGqKxWevglokrrTpPyRTXdFyV2IjrVPiVnlbNTeanLiw8OF1mnJaLYzZ2gg4ah1RumBDDG4UBa00KjSrhj8D'
    
    );
    const CHAPA_AUTH_KEY = 'CHASECK_TEST-Diu7oee4GKx5cRxJo7PSjzhV8WPyvCmx'
    const app = express();

    app.use(cors({ origin: true }));
    app.use(express.json());
    
    app.get("/", (request, response) => response.status(200).send("hello world"));
    
    app.post("/payments/create", async (request, response) => {
      const total = request.query.total;
    
      console.log("Payment Request Reaceived for this amount >>>>", total);
    
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
      });
      response.status(201).send({
        clientSecret: paymentIntent.client_secret,
      });
    });





//chapa_payment
app.post("/accept-payment", async (req, res) => {
  const {
    amount,
    email,
    first_name,
    last_name,
    phone_number,
    tx_ref,
    currency, // Add currency to the destructuring
  } = req.body;

  console.log("Chapa Payment Request Body:", req.body);

  try {
    const header = {
      Authorization: `Bearer ${CHAPA_AUTH_KEY}`,
      "Content-Type": "application/json",
    };

    const body = {
      amount: amount,
      email: email,
      first_name: first_name,
      last_name: last_name,
      phone_number: phone_number,
      tx_ref: tx_ref,
      currency: currency, // Include currency in the request body
      return_url: "https://kenash-market-790c0.web.app/", // Set your return URL
    };

    const response = await fetch("https://api.chapa.co/v1/transaction/initialize", {
      method: 'POST',
      headers: header,
      body: JSON.stringify(body),
    });

    const responseData = await response.json();
    console.log("Chapa API Response:", responseData);

    res.status(response.status).json(responseData);
  } catch (e) {
    console.error("Chapa API Error:", e);
    res.status(500).json({
      error_code: e.code,
      message: e.message,
    });
  }
});

    app.listen(5000,(err)=>{
      if (err) {
        console.log(err.messege)
      } else {
        console.log("listning to 5000")
    
      }
    })

