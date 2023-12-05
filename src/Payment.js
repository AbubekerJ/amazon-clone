import React, { useEffect, useReducer, useState } from 'react';
import { useStateValue } from './StateProvider';
import { Link } from 'react-router-dom';
import './Payment.css';
 import CheckoutProduct from './CheckoutProduct';
import { CardElement,useStripe ,useElements } from '@stripe/react-stripe-js'
import CurrencyFormat from 'react-currency-format';
import axios from './axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { db } from './firebase.js';
import { doc, collection, setDoc } from 'firebase/firestore'



function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const getBasketTotal=(basket)=>{
   return basket?.reduce((amount,item)=>amount+item.price,0)
  }
  const stripe=useStripe()
  const elements=useElements()
  const [disabled, setDisabled]=useState(true)
   const [error ,setError]=useState(null)
   const [succseede ,setSucceeded]=useState(false)
   const [processing, setProcessing]=useState('')
   const [clientSecret ,setClientSecret]=useState()

   const history=useHistory()
   useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
     
      setClientSecret(response.data.clientSecret);
      console.log(response.data)
      console.log('hi')

    };
    getClientSecret();
  }, [basket]);
  console.log("THE SECRET IS >>>", clientSecret);
 

  const handelSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
  
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    }).then(({paymentIntent})=>{

      // db.collection('user')
      // .doc(user?.uid)
      // .collection('orders')
      // .doc(paymentIntent.id)
      // .set({
      //   basket:basket,
      //   amount:paymentIntent.amount,
      //   created:paymentIntent.created,
      // });
      const orderDocRef = doc(collection(db, 'users', user?.uid,'orders'), paymentIntent.id);

      setDoc(orderDocRef, {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      setSucceeded(true);
      setError(null);
      setProcessing(false);
      dispatch({
        type: "EMPTY_BASKET"
      });
      history.replace('/Orders');
    }
    )
  }
  
   const handelChange=  (event)=>{

    setDisabled(event.empty)
    setError(error?error.message :'')
    

   }
  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (
          <Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Payment Method</h3>
          </div>


        <div className='payment__details'>
     
          <form onSubmit={handelSubmit} className='payment__form'>
          <CardElement  onChange={handelChange} className='card_element'/>
          <div className='payment__priceContainer'>
            <CurrencyFormat 
            renderText={(value)=><h3>Order total : {value}</h3>}
            decimalScale={2}
            displayType= {'text'}
            value={getBasketTotal(basket) }

            thousandSeparator={true}
            prefix='$'
            
            />
           <button className='button__text' disabled= {processing || disabled || succseede }>
                <span> {processing? <p>processing</p>:<p>Buy Now</p>}</span>
           </button>
          </div>
          {error&&<div>{error.message}</div>}

          </form>
              
            </div>

        </div>
      </div>
    
    </div>
  );
}

export default Payment;

