import { StrictMode, useState } from 'react';
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

function ProtectedRoute({ children }) {
  // Replace this with actual authentication check
  const isAuthenticated = true; // Set to true if user is authenticated

  return isAuthenticated ? children : <Navigate to="/signup" />;
}

const router = createBrowserRouter([
  {
    path: '/signup',
    element: <LoginSignup />,
  },
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
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
