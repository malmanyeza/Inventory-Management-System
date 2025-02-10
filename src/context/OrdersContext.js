// context/OrdersContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useApp } from './AppContext';

const OrdersContext = createContext();

export function OrdersProvider({ children }) {
  const { setLoading, setError } = useApp();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'orders'));
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addOrder = async (orderData) => {
    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, 'orders'), orderData);
      setOrders(prev => [...prev, { id: docRef.id, ...orderData }]);
      return docRef.id;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}

export const useOrders = () => useContext(OrdersContext);