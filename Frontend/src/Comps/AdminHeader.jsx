import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Settings, FileText } from 'lucide-react';

export default function AdminHeader() {
  const location = useLocation();

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link
            to="/admin-home"
            className="text-2xl font-bold text-green-600 hover:text-green-700 transition-colors"
          >
            AgriAdmin
          </Link>

          {/* Admin Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { name: 'Home', path: '/admin-home' },
              { name: 'Supply Chain', path: '/admin-panel/supply-chain' },
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
          {/* Reports Button */}
          <Link
            to="/admin-reports"
            className="flex items-center text-sm text-gray-600 hover:text-green-600 transition-colors"
          >
            <FileText className="h-5 w-5 mr-1" />
            Reports
          </Link>

          {/* Settings Button */}
          <Link
            to="/admin-settings"
            className="flex items-center text-sm text-gray-600 hover:text-green-600 transition-colors"
          >
            <Settings className="h-5 w-5 mr-1" />
            Settings
          </Link>
        </div>
      </div>
    </header>
  );
}
