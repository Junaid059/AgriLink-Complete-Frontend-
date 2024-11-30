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
import Admin from './Comps/AdminPanel/Admin';
import DashboardPage from './Comps/Gov-dashboard/DashboardPage';
import CropDash from './Comps/Crops/CropDash';
import Layout from './Comps/Crops/Layout';
import ContributePage from './Comps/Crops/ContributePage';
import DatasetPage from './Comps/Crops/DataSetPage';
import ProfilePage from './Comps/Crops/ProfilePage';
import LoanPage from './Comps/loan/LoanPage';
import ExpertForum from './Comps/collaboration/ExpertForum';
import Page from './Comps/AdminPanel/SupplyChain/Page';
import { AuthContext } from './Comps/context/AuthContext';
import { AuthProvider } from './Comps/context/AuthContext';
import AdminHeader from './Comps/AdminHeader';
import ManagementPage from './Comps/AdminPanel/Management/ManagementPage';

function ProtectedRoute({ children }) {
  const isAuthenticated = true; // Replace with actual authentication check
  return isAuthenticated ? children : <Navigate to="/signup" />;
}

// function AdminProtectedRoute({ children }) {
//   const { role } = useContext(AuthContext); // Context-based role check
//   console.log('Current role:', role); // Log role to debug
//   return role === 'admin' ? children : <Navigate to="/admin-panel" />;
// }

function AppLayout() {
  // const { role } = useContext(AuthContext);
  return (
    <>
      {/* {role === 'admin' ? <AdminHeader /> : <UserHeader />} */}
      <UserHeader />
      {/* <AdminHeader/> */}
      <Outlet />
      {/* <Chat/> */}
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
      {
        path: '/blogs',
        element: (
          <ProtectedRoute>
            <Blog />
          </ProtectedRoute>
        ),
      },
      {
        path: '/weather',
        element: (
          <ProtectedRoute>
            <WeatherDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/feedback',
        element: (
          <ProtectedRoute>
            <FeedbackForm />
          </ProtectedRoute>
        ),
      },
      {
        path: '/farmerCalendar',
        element: (
          <ProtectedRoute>
            <FarmerCalendar />
          </ProtectedRoute>
        ),
      },
      {
        path: '/subsidyregulations',
        element: (
          <ProtectedRoute>
            <SubsidyRegulations />
          </ProtectedRoute>
        ),
      },
      {
        path: '/crop',
        element: (
          <ProtectedRoute>
            <Layout>
              <CropDash />
            </Layout>
          </ProtectedRoute>
        ),
      },
      {
        path: '/contribute',
        element: (
          <ProtectedRoute>
            <Layout>
              <ContributePage />
            </Layout>
          </ProtectedRoute>
        ),
      },
      {
        path: '/dataset',
        element: (
          <ProtectedRoute>
            <Layout>
              <DatasetPage />
            </Layout>
          </ProtectedRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <Layout>
              <ProfilePage />
            </Layout>
          </ProtectedRoute>
        ),
      },
      {
        path: '/loan',
        element: (
          <ProtectedRoute>
            <LoanPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/expert-forum',
        element: (
          <ProtectedRoute>
            <ExpertForum />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin-panel',
        element: (
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        ),
      },
      {
        path: '/supply-chain',
        element: (
          <ProtectedRoute>
            <Page />
          </ProtectedRoute>
        ),
      },
      {
        path: '/gov-dashboard',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/Management',
        element: (
          <ProtectedRoute>
            <ManagementPage />
          </ProtectedRoute>
        ),
      },
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
