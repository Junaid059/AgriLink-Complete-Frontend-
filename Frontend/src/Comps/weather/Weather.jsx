import { Link } from 'react-router-dom';
import { ShoppingCart, Mail, MapPin, Phone } from 'lucide-react';

function Weather({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
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
                { name: 'Contact', path: '/contact' },
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
            {/* <Button size="icon" variant="ghost">
              <SearchIcon className="h-4 w-4" />
            </Button> */}
            <Button size="icon" variant="ghost">
              {/* <ShoppingCartIcon className="h-4 w-4" /> */}
              <CartButton />
              <CartPanel />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <span className="text-green-500">AgriLink</span>
            </h2>
            <p className="mt-4 text-sm text-gray-400">
              There are many variations of passages of Lorem Ipsum available,
              but the majority suffered.
            </p>
            <div className="flex items-center space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-400 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">News</h3>
            <ul className="space-y-4">
              <li>
                <Link to="#" className="text-gray-400 hover:text-white">
                  <h4 className="font-semibold text-sm">
                    Bringing Food Production Back To Cities
                  </h4>
                  <span className="text-xs text-green-500">July 5, 2022</span>
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white">
                  <h4 className="font-semibold text-sm">
                    The Future of Farming, Smart Irrigation Solutions
                  </h4>
                  <span className="text-xs text-green-500">July 5, 2022</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center">
                <Phone className="h-6 w-6 text-green-500 mr-3" />
                666 888 0000
              </li>
              <li className="flex items-center">
                <Mail className="h-6 w-6 text-green-500 mr-3" />
                needhelp@company.com
              </li>
              <li className="flex items-center">
                <MapPin className="h-6 w-6 text-green-500 mr-3" />
                80 Brooklyn Golden Street Line, New York, USA
              </li>
            </ul>
            <form className="mt-4">
              <div className="flex items-center">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full px-3 py-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-l-md focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white text-sm rounded-r-md hover:bg-green-600"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-sm text-gray-500 text-center">
          <p>
            © All Copyright 2024 by Shawonetc Themes |{' '}
            <Link to="#" className="hover:text-white">
              Terms of Use
            </Link>{' '}
            |{' '}
            <Link to="#" className="hover:text-white">
              Privacy Policy
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Weather;
