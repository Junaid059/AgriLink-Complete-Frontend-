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
import { CartProvider } from '/src/Comps/context/CartContext.jsx'; // Default import
import Service from './Comps/service/service';
import Tools from './Comps/service/tools';
import Chat from './Comps/collaboration/Chat';
import Blog from './Comps/collaboration/blog';
import FeedbackForm from './Comps/supportAndFeedBack/FeedbackForm';
import WeatherDashboard from './Comps/weather/WeatherDashboard';
import FarmerCalendar from './Comps/weather/FarmerCalender';
import SubsidyRegulations from './Comps/ReguSubsidies/SubsidyRegulations';
import Admin from './Comps/AdminPanel/Admin';
import RegulationManagement from './Comps/Gov-dashboard/RegulationManagement';
import SubsidyManagement from './Comps/Gov-dashboard/SubsidyManagement';
import DashboardPage from './Comps/Gov-dashboard/DashboardPage';

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
    path: '/admin-panel',
    element: (
      <ProtectedRoute>
        <Admin />
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
]);

const Root = () => (
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
      <Chat></Chat>
    </CartProvider>
  </StrictMode>
);

createRoot(document.getElementById('root')).render(<Root />);
