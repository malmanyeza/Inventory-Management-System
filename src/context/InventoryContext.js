import { createContext, useContext, useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useApp } from './AppContext';

const InventoryContext = createContext();

export function InventoryProvider({ children }) {
  const { setLoading, setError } = useApp();
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, []);

  // Fetch all inventory items from Firestore
  const fetchInventory = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'inventory'));
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setInventory(items);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new product to Firestore
  const addProduct = async (productData) => {
    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, 'inventory'), productData);
      setInventory(prev => [...prev, { id: docRef.id, ...productData }]);
      return docRef.id;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Update an existing product in Firestore
  const updateProduct = async (productId, updatedData) => {
    try {
      setLoading(true);
      await updateDoc(doc(db, 'inventory', productId), updatedData);
      setInventory(prev => 
        prev.map(item => item.id === productId ? { ...item, ...updatedData } : item)
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <InventoryContext.Provider value={{ inventory, addProduct, updateProduct }}>
      {children}
    </InventoryContext.Provider>
  );
}

export const useInventory = () => useContext(InventoryContext);
