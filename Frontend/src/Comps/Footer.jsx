import React from 'react';
import { Play, ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
function Footer() {
  return (
    <div>
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
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

          {/* Explore Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* News Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">News</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  <h4 className="font-semibold text-sm">
                    Bringing Food Production Back To Cities
                  </h4>
                  <span className="text-xs text-green-500">July 5, 2022</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  <h4 className="font-semibold text-sm">
                    The Future of Farming, Smart Irrigation Solutions
                  </h4>
                  <span className="text-xs text-green-500">July 5, 2022</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
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

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-sm text-gray-500 text-center">
          <p>
            © All Copyright 2024 by Shawonetc Themes |{' '}
            <a href="#" className="hover:text-white">
              Terms of Use
            </a>{' '}
            |{' '}
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
