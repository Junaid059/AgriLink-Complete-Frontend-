// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';
import './index.css';
import Home from './Comps/Home.jsx';
import LoginSignup from './Auth/LoginSignup.jsx';
import Market from './Comps/marketplace/Market.jsx';
import Product from './Comps/marketplace/Product.jsx';
import CartProvider from './context/CartContext';
import { Toaster } from './components/ui/toaster';
import Service from './Comps/service/service';
import Tools from './Comps/service/tools';

function ProtectedRoute({ children }) {
  const isAuthenticated = true; // Replace with actual authentication check
  return isAuthenticated ? children : <Navigate to="/signup" />;
}

const router = createBrowserRouter([
  { path: '/signup', element: <LoginSignup /> },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/marketplace',
    element: (
      <ProtectedRoute>
        <Market />
      </ProtectedRoute>
    ),
  },
  {
    path: '/marketplace/product/:id',
    element: (
      <ProtectedRoute>
        <Product />
      </ProtectedRoute>
    ),
  },
  {
    path: '/services',
    element: (
      <ProtectedRoute>
        <Service />
      </ProtectedRoute>
    ),
  },
  {
    path: '/service/tools/:id',
    element: (
      <ProtectedRoute>
        <Tools />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
);
