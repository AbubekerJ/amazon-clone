

import React from 'react';
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider';
import { useHistory } from 'react-router-dom';
import './Payment.js';

function Subtotal() {
  const [{ basket }] = useStateValue();
  const myhistory=useHistory()  

  // Calculate the total price of items in the basket
  const calculateTotalPrice = (basket) => {
    return basket?.reduce((amount, item) => item.price + amount, 0);
  };

  return (
    <div>
      <CurrencyFormat
        renderText={(value) => (
          <div className="subtotal">
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
            <button onClick={e=>{myhistory.push ('./Payment')} }className="subtotal__button">
              Proceed to Checkout
            </button>
          </div>
        )}
        decimalScale={2}
        value={calculateTotalPrice(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
}

export default Subtotal;
