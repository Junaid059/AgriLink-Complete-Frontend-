import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import Home from './Comps/Home.jsx';
import LoginSignup from './Auth/LoginSignup.jsx';

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
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
