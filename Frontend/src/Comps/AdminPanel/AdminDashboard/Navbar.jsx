import { Link } from 'react-router-dom';
import Search from './search';
import { Button } from '@/components/ui/button';
import { Bell, Settings } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-green-600">
              Green Dashboard
            </Link>
          </div>
          <div className="flex items-center">
            <Search />
            <Button variant="ghost" size="icon" className="ml-2">
              <Bell className="h-5 w-5 text-green-600" />
            </Button>
            <Button variant="ghost" size="icon" className="ml-2">
              <Settings className="h-5 w-5 text-green-600" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
