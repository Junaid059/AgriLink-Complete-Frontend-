import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ShoppingCart, BarChart2, List, UserCircle } from 'lucide-react';

function Sidebar() {
  return (
    <div className="bg-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        <Link
          href="/"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-500 hover:text-white"
        >
          <Button variant="ghost" className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" /> Dashboard
          </Button>
        </Link>
        <Link
          href="/products"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-500 hover:text-white"
        >
          <Button variant="ghost" className="w-full justify-start">
            <ShoppingCart className="mr-2 h-4 w-4" /> Products
          </Button>
        </Link>
        <Link
          href="/charts"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-500 hover:text-white"
        >
          <Button variant="ghost" className="w-full justify-start">
            <BarChart2 className="mr-2 h-4 w-4" /> Charts
          </Button>
        </Link>
        <Link
          href="/table"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-500 hover:text-white"
        >
          <Button variant="ghost" className="w-full justify-start">
            <List className="mr-2 h-4 w-4" /> Table
          </Button>
        </Link>
        <Link
          href="/form"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-500 hover:text-white"
        >
          <Button variant="ghost" className="w-full justify-start">
            <UserCircle className="mr-2 h-4 w-4" /> Form
          </Button>
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
