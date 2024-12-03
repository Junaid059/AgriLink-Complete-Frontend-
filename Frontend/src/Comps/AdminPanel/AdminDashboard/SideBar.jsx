import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Home,
  ShoppingCart,
  BarChart2,
  List,
  UserCircle,
  Church,
  LayoutGrid,
  Container,
} from 'lucide-react';

function Sidebar() {
  return (
    <div className="bg-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav className="space-y-2">
        <NavLink
          to="/admin-panel"
          end
          className={({ isActive }) =>
            `w-full block ${
              isActive
                ? 'bg-green-500 text-white'
                : 'hover:bg-green-100 hover:text-green-500'
            }`
          }
        >
          <Button variant="ghost" className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" /> Dashboard
          </Button>
        </NavLink>
        <NavLink
          to="/admin-panel/products"
          className={({ isActive }) =>
            `w-full block ${
              isActive
                ? 'bg-green-500 text-white'
                : 'hover:bg-green-100 hover:text-green-500'
            }`
          }
        >
          <Button variant="ghost" className="w-full justify-start">
            <ShoppingCart className="mr-2 h-4 w-4" /> Products
          </Button>
        </NavLink>
        <NavLink
          to="/admin-panel/charts"
          className={({ isActive }) =>
            `w-full block ${
              isActive
                ? 'bg-green-500 text-white'
                : 'hover:bg-green-100 hover:text-green-500'
            }`
          }
        >
          <Button variant="ghost" className="w-full justify-start">
            <BarChart2 className="mr-2 h-4 w-4" /> Charts
          </Button>
        </NavLink>
        <NavLink
          to="/admin-panel/gov-dashboard"
          className={({ isActive }) =>
            `w-full block ${
              isActive
                ? 'bg-green-500 text-white'
                : 'hover:bg-green-100 hover:text-green-500'
            }`
          }
        >
          <Button variant="ghost" className="w-full justify-start">
            <Church className="mr-2 h-4 w-4" /> Gov
          </Button>
        </NavLink>
        <NavLink
          to="/admin-panel/management"
          className={({ isActive }) =>
            `w-full block ${
              isActive
                ? 'bg-green-500 text-white'
                : 'hover:bg-green-100 hover:text-green-500'
            }`
          }
        >
          <Button variant="ghost" className="w-full justify-start">
            <LayoutGrid className="mr-2 h-4 w-4" /> Management
          </Button>
        </NavLink>
        <NavLink
          to="/admin-panel/supply-chain"
          end
          className={({ isActive }) =>
            `w-full block ${
              isActive
                ? 'bg-green-500 text-white'
                : 'hover:bg-green-100 hover:text-green-500'
            }`
          }
        >
          <Button variant="ghost" className="w-full justify-start">
            <Container className="mr-2 h-4 w-4" /> Supply Chain
          </Button>
        </NavLink>
        <NavLink
          to="/admin-panel/table"
          className={({ isActive }) =>
            `w-full block ${
              isActive
                ? 'bg-green-500 text-white'
                : 'hover:bg-green-100 hover:text-green-500'
            }`
          }
        >
          <Button variant="ghost" className="w-full justify-start">
            <List className="mr-2 h-4 w-4" /> Table
          </Button>
        </NavLink>
        <NavLink
          to="/admin-panel/form"
          className={({ isActive }) =>
            `w-full block ${
              isActive
                ? 'bg-green-500 text-white'
                : 'hover:bg-green-100 hover:text-green-500'
            }`
          }
        >
          <Button variant="ghost" className="w-full justify-start">
            <UserCircle className="mr-2 h-4 w-4" /> Form
          </Button>
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
