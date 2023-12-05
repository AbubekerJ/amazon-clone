import React, { useEffect, useState } from "react";
import "./Orders.css";
 import  Order  from "./Order";
import { db } from "./firebase";
import { useStateValue } from './StateProvider';
import { doc, collection, onSnapshot, getDocs, orderBy , query } from 'firebase/firestore';

function Orders() {
  
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]); 


  
  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        const userOrdersRef = collection(db, 'users', user.uid, 'orders');
        const ordersQuery = query(userOrdersRef, orderBy('created', 'desc'));
        const snapshot = await getDocs(ordersQuery);

        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      } else {
        setOrders([]);
      }
    };

    fetchOrders();
  }, [user]);
  
  
  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders_order">
        {orders?.map((order) => (
          <Order  order={order} /> 
        ))}
      </div>
    </div>
  );
}

export default Orders;

