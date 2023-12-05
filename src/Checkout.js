import React from 'react'
import './Checkout.css'
import Subtotal from './Subtotal'
import CheckoutProducts from './CheckoutProduct'
import { useStateValue } from './StateProvider'
import { ListItem } from '@mui/material'

function Checkout() {
const [{basket} , dispatch ]=useStateValue()

  return (
    <div className='checkout'>   
    <div className='checkout-left'>


        <img
          className="checkout__img"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        <h3>Hello </h3>
        <h2 className="checkout__title">Your shopping Basket</h2>
       {basket.map((item) =>(
 <CheckoutProducts id={item.id} image={item.image} title={item.title} price={item.price} rating={item.rating} / > ))  }   
   

    </div>


    <div className='checkout-right'>
    <Subtotal/>

    </div>

    </div>
  )
}

export default Checkout
