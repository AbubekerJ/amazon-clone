import React from 'react'
import { createContext, useState } from "react";
import './Login.css'
// import { useState } from 'react'
import { Link } from 'react-router-dom'
 import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'


  import { auth } from './firebase'
  import { createUserWithEmailAndPassword, signInWithEmailAndPassword ,getAuth } from 'firebase/auth'
  

function Login() {
const [email , setEmail]=useState('');
const [password , setPassword] = useState('')
const history = useHistory()

const signIn =(e)=>{
  e.preventDefault();
  signInWithEmailAndPassword(auth , email , password ).then(  (auth)=>{
    if (auth){
      history.push('/')
      
    }
  }).catch((error)=>{
    alert(error.message)
  })

}
const creatAccount =(e)=>{
  e.preventDefault();
createUserWithEmailAndPassword(auth , email , password )
.then( (auth)=>{
  if (auth){
    history.push('/')
    
  }
}
).catch((error)=>{
  alert(error.message)
})
}
  return (
    <div>
  

  <div className='login'>
            <Link to='/'>
                <img
                    className="login__logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
                />
            </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button onClick={signIn} type='submit' className='login__signInButton'>Sign In</button>
                </form>

                <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button onClick={creatAccount} className='login__registerButton'>Create your Amazon Account</button>
            </div>
        </div>
    





    </div>
  )
}

export default Login

