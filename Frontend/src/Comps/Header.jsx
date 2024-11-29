import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import CartButton from './cart/CartButton';
import CartPanel from './cart/CartPanel';

export default function Header() {
  const location = useLocation();
  const isCropPage = location.pathname === '/crop';

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-2xl font-bold text-green-600 hover:text-green-700 transition-colors"
          >
            AgriLink
          </Link>

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { name: 'Home', path: '/' },
              { name: 'Crop Diagnosis', path: '/crop' },
              { name: 'Services', path: '/services' },
              { name: 'Marketplace', path: '/marketplace' },
              { name: 'Weather', path: '/weather' },
              { name: 'Blog', path: '/blogs' },
              { name: 'Subsidy Regulations', path: '/subsidyregulations' },
              { name: 'Feedback', path: '/feedback' },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm ${
                  location.pathname === item.path
                    ? 'text-green-600 font-bold'
                    : 'hover:text-green-600'
                } transition-colors`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right-side Actions */}
        <div className="flex items-center gap-4">
          {/* Dynamic Links for Crop Page */}
          {isCropPage && (
            <nav className="flex items-center gap-4">
              <Link
                to="/dataset"
                className="text-sm hover:text-green-600 transition-colors"
              >
                Dataset
              </Link>
              <Link
                to="/contribute"
                className="text-sm hover:text-green-600 transition-colors"
              >
                Contribute
              </Link>
              <Link
                to="/profile"
                className="text-sm hover:text-green-600 transition-colors"
              >
                Profile
              </Link>
            </nav>
          )}

          {/* Calendar Button */}
          <Link
            to="/farmerCalendar"
            className="flex items-center text-sm text-gray-600 hover:text-green-600 transition-colors"
          >
            <Calendar className="h-5 w-5 mr-1" />
            Farmer Calendar
          </Link>

          {/* Cart Button and Panel */}
          <CartButton />
          <CartPanel />
        </div>
      </div>
    </header>
  );
}
