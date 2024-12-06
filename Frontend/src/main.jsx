import React, { useContext } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from 'react-router-dom';
import './index.css';
import UserHeader from './Comps/UserHeader';
import { CartProvider } from './Comps/context/CartContext.jsx';
import Home from './Comps/Home.jsx';
import LoginSignup from './Auth/LoginSignup.jsx';
import Market from './Comps/marketplace/Market.jsx';
import Product from './Comps/marketplace/Product.jsx';
import Service from './Comps/service/service';
import Tools from './Comps/service/tools';
import Chat from './Comps/collaboration/Chat';
import Blog from './Comps/collaboration/blog';
import FeedbackForm from './Comps/supportAndFeedBack/FeedbackForm';
import WeatherDashboard from './Comps/weather/WeatherDashboard';
import FarmerCalendar from './Comps/weather/FarmerCalender';
import SubsidyRegulations from './Comps/ReguSubsidies/SubsidyRegulations';
// import Admin from './Comps/AdminPanel/Admin';
import DashboardPage from './Comps/Gov-dashboard/DashboardPage';
import CropDash from './Comps/Crops/CropDash';
import Layout from './Comps/Crops/Layout';
import ContributePage from './Comps/Crops/ContributePage';
import DatasetPage from './Comps/Crops/DataSetPage';
import ProfilePage from './Comps/Crops/ProfilePage';
import LoanPage from './Comps/loan/LoanPage';
import ExpertForum from './Comps/collaboration/ExpertForum';
import Page from './Comps/AdminPanel/SupplyChain/Page';

import ManagementPage from './Comps/AdminPanel/Management/ManagementPage';
import FarmerDashboardPage from './Comps/AdminPanel/Farmer/FarmerDashboardPage';
import FarmerProfilePage from './Comps/AdminPanel/Farmer/FarmerProfilePage';
import AdminDashboard from './Comps/AdminPanel/AdminDashboard/AdminDashboard';
import AdminLayout from './Comps/AdminPanel/AdminDashboard/AdminLayout';
import AnalyticsPage from './Comps/AdminPanel/Analytics/AnalyticsPage';
import FormPage from './Comps/AdminPanel/AdminDashboard/FormPage';
import ProductsPage from './Comps/AdminPanel/AdminDashboard/ProductPage';

function ProtectedRoute({ children, requiredRole }) {
  const role = localStorage.getItem('role');

  if (!role) {
    return <Navigate to="/signup" />;
  }

  return role === requiredRole ? children : <Navigate to="/" />;
}

function AppLayout() {
  return (
    <>
      <UserHeader />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/signup', element: <LoginSignup /> },
      {
        path: '/',
        element: (
          <ProtectedRoute requiredRole="user">
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: '/marketplace',
        element: (
          <ProtectedRoute requiredRole="user">
            <Market />
          </ProtectedRoute>
        ),
      },
      {
        path: '/marketplace/product/:id',
        element: (
          <ProtectedRoute requiredRole="user">
            <Product />
          </ProtectedRoute>
        ),
      },
      {
        path: '/services',
        element: (
          <ProtectedRoute requiredRole="user">
            <Service />
          </ProtectedRoute>
        ),
      },
      {
        path: '/service/tools/:id',
        element: (
          <ProtectedRoute requiredRole="user">
            <Tools />
          </ProtectedRoute>
        ),
      },
      {
        path: '/blogs',
        element: (
          <ProtectedRoute requiredRole="user">
            <Blog />
          </ProtectedRoute>
        ),
      },
      {
        path: '/weather',
        element: (
          <ProtectedRoute requiredRole="user">
            <WeatherDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/feedback',
        element: (
          <ProtectedRoute requiredRole="user">
            <FeedbackForm />
          </ProtectedRoute>
        ),
      },
      {
        path: '/farmerCalendar',
        element: (
          <ProtectedRoute requiredRole="user">
            <FarmerCalendar />
          </ProtectedRoute>
        ),
      },
      {
        path: '/subsidyregulations',
        element: (
          <ProtectedRoute requiredRole="user">
            <SubsidyRegulations />
          </ProtectedRoute>
        ),
      },
      {
        path: '/crop',
        element: (
          <ProtectedRoute requiredRole="user">
            <Layout>
              <CropDash />
            </Layout>
          </ProtectedRoute>
        ),
      },
      {
        path: '/contribute',
        element: (
          <ProtectedRoute requiredRole="user">
            <Layout>
              <ContributePage />
            </Layout>
          </ProtectedRoute>
        ),
      },
      {
        path: '/dataset',
        element: (
          <ProtectedRoute requiredRole="user">
            <Layout>
              <DatasetPage />
            </Layout>
          </ProtectedRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute requiredRole="user">
            <Layout>
              <ProfilePage />
            </Layout>
          </ProtectedRoute>
        ),
      },
      {
        path: '/loan',
        element: (
          <ProtectedRoute requiredRole="user">
            <LoanPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/expert-forum',
        element: (
          <ProtectedRoute requiredRole="user">
            <ExpertForum />
          </ProtectedRoute>
        ),
      },
      // {
      //   path: '/supply-chain',
      //   element: (
      //     <ProtectedRoute requiredRole="user">
      //       <Page />
      //     </ProtectedRoute>
      //   ),
      // },
      // {
      //   path: '/Management',
      //   element: (
      //     <ProtectedRoute requiredRole="user">
      //       <ManagementPage />
      //     </ProtectedRoute>
      //   ),
      // },
      {
        path: '/farmer',
        element: (
          <ProtectedRoute requiredRole="user">
            <FarmerDashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/farmer-Profile',
        element: (
          <ProtectedRoute requiredRole="user">
            <FarmerProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/admin-panel',
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'home', element: <AdminDashboard /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'analytics', element: <AnalyticsPage /> },
      { path: 'gov-dashboard', element: <DashboardPage /> },
      { path: 'management', element: <ManagementPage /> },
      { path: 'supply-chain', element: <Page /> },
      { path: 'form', element: <FormPage /> },
    ],
  },
]);

function Root() {
  return (
    <StrictMode>
      {/* <AuthProvider> */}
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
      {/* </AuthProvider> */}
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<Root />);
