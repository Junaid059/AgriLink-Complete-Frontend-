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
import ChatScreen from './Comps/Chat';
import ChatScreen2 from './Comps/Chat2';
import ChatList from './Comps/ChatList';

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
  {
    path: '/chat',
    element: (
      <ProtectedRoute>
        <ChatScreen />
      </ProtectedRoute>
    ),
  },
  {
    path: '/chat2',
    element: (
      <ProtectedRoute>
        <ChatScreen2 />
      </ProtectedRoute>
    ),
  },
  {
    path: '/chats',
    element: (
      <ProtectedRoute>
        <ChatList />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
