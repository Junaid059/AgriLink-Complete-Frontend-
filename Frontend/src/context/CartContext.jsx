import React, { createContext, useState } from 'react';
import { Toaster } from '@/components/ui/toaster';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to add item to cart
  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);

    // Show a success message using Toaster
    toast.success('Item added to cart!');
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
      <Toaster position="top-right" />{' '}
      {/* Add Toaster component to display notifications */}
    </CartContext.Provider>
  );
};

export default CartProvider;
