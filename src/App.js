
import Header from './Header.js';
import Home from './Home.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Checkout from './Checkout.js';
import Login from './Login.js';
import { useStateValue } from './StateProvider.js';
import { auth } from './firebase.js';
import { useEffect } from 'react';
import Payment from './Payment.js';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Orders.js';
function App() {
  const [ ,dispatch ]=useStateValue()
  const  Promise =loadStripe ('pk_test_51O7buhITzAyJfbAGoFB6H5IpPIblRzKYRPVcerEemUIX9iu2yqHyzCoqm0bhNC9ecYXxQYKklZqfqtqZZweZRjge00aTOnsGoB')

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser
        })
      } else {
        dispatch({
          type: "SET_USER",
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/Login">
            <Login />
          </Route>

          <Route path="/Orders">
          <Header />
            <Orders />
          </Route>


          <Route path="/checkout">
            <Header /> {/* Display Header component for the checkout page */}
            <Checkout />
          </Route>
          <Route path="/Payment">
            <Header /> {/* Display Header component for the payment page */}
            <Elements  stripe={Promise}>
            <Payment />
            </Elements>
          
          </Route>
          <Route path="/">
            <Header /> 
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
