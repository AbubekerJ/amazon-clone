
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCHH2w-a3jVtLkfZt2xuHd6E6Q79kvk4uI",
  authDomain: "clone-ecbdc.firebaseapp.com",
  projectId: "clone-ecbdc",
  storageBucket: "clone-ecbdc.appspot.com",
  messagingSenderId: "257572038297",
  appId: "1:257572038297:web:0f16c4d9fae1e06fc6fa08",
  measurementId: "G-4H77GR27ZT"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);
export { db, auth };
