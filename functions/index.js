

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
// const express = require ('express')
// const cors =require ('cors')
// const stripe =require('stripe')('sk_test_51O7buhITzAyJfbAGqKxWevglokrrTpPyRTXdFyV2IjrVPiVnlbNTeanLiw8OF1mnJaLYzZ2gg4ah1RumBDDG4UBa00KjSrhj8D')


// //API CONFIG

// const app = express()

// // API MIDELWARE
// app.use(cors({origin:true}))
// app.use (express.json())

// //API ROUTS
// app.get('/', (req, res)=>{

//     res.status(200).send('HELLO WORLD')


// })

// //LISTEEN COMAND
// exports.api=functions.https.onRequest(app)


const functions = require('firebase-functions'); // Import the 'functions' module.

const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(

    'sk_test_51O7buhITzAyJfbAGqKxWevglokrrTpPyRTXdFyV2IjrVPiVnlbNTeanLiw8OF1mnJaLYzZ2gg4ah1RumBDDG4UBa00KjSrhj8D'
    
    );
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
 
    exports.api = functions.https.onRequest(app);

    app.listen(5000,(err)=>{
      if (err) {
        console.log(err.messege)
      } else {
        console.log("listning to 5000")
    
      }
    })