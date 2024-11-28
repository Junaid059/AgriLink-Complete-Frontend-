import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, ShoppingCart } from 'lucide-react';
import CartButton from './cart/CartButton';
import CartPanel from './cart/CartPanel';

function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-xl font-bold text-green-600 hover:text-green-700 transition-colors"
          >
            AgriLink
          </Link>
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { name: 'Home', path: '/' },
              { name: 'About', path: '/about' },
              { name: 'Services', path: '/services' },
              { name: 'MarketPlace', path: '/marketplace' },
              { name: 'Weather', path: '/weather' },
              { name: 'Blog', path: '/blogs' },
              { name: 'SubsidyRegulations', path: '/subsidyregulations' },
              { name: 'Feedback', path: '/feedback' },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="text-sm hover:text-green-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button size="icon" variant="ghost" asChild>
            <Link to="/farmerCalendar">
              <Calendar className="h-4 w-4" />
              <span className="sr-only">Farmer Calendar</span>
            </Link>
          </Button>
          <CartButton />
          <CartPanel />
        </div>
      </div>
    </header>
  );
}

export default Header;
