import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, Mail, MapPin, Phone } from 'lucide-react';

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ShoppingCartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function Blog() {
  return (
    <div className="flex min-h-screen flex-col">
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
                { name: 'News', path: '/news' },
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
            <Button size="icon" variant="ghost">
              <SearchIcon className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost">
              <ShoppingCartIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <div className="relative h-[300px] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=300&width=1200')",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative flex h-full items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Our Blog</h1>
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-8 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2">
          {/* Blog Posts */}
          <div className="space-y-8">
            <Card>
              <CardContent className="p-0">
                <img
                  alt="Farm hay bales"
                  className="h-[200px] w-full object-cover"
                  src="/placeholder.svg?height=200&width=400"
                />
              </CardContent>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500">Agriculture</Badge>
                  <span className="text-sm text-gray-500">March 15, 2024</span>
                </div>
                <h2 className="text-2xl font-bold">
                  Bringing Food Production Back To Cities
                </h2>
                <p className="text-gray-600">
                  Urban farming initiatives are revolutionizing how we think
                  about food production in metropolitan areas...
                </p>
              </CardHeader>
              <CardFooter>
                <Button
                  variant="link"
                  className="text-green-600 hover:text-green-700"
                >
                  Read More
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardContent className="p-0">
                <img
                  alt="Smart irrigation"
                  className="h-[200px] w-full object-cover"
                  src="/placeholder.svg?height=200&width=400"
                />
              </CardContent>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500">Technology</Badge>
                  <span className="text-sm text-gray-500">March 12, 2024</span>
                </div>
                <h2 className="text-2xl font-bold">
                  The Future of Farming: Smart Irrigation Solutions
                </h2>
                <p className="text-gray-600">
                  Modern irrigation technologies are helping farmers optimize
                  water usage and improve crop yields...
                </p>
              </CardHeader>
              <CardFooter>
                <Button
                  variant="link"
                  className="text-green-600 hover:text-green-700"
                >
                  Read More
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Search */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input className="pl-8" placeholder="Search..." type="search" />
              </div>
            </CardContent>
          </Card>

          {/* Latest Posts */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Latest Posts</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <img
                    alt={`Latest post ${i}`}
                    className="h-16 w-16 rounded-md object-cover"
                    src="/placeholder.svg?height=64&width=64"
                  />
                  <div>
                    <h3 className="font-semibold">
                      Sustainable Farming Practices
                    </h3>
                    <p className="text-sm text-gray-500">March 10, 2024</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Categories</h2>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  'Agriculture',
                  'Technology',
                  'Sustainability',
                  'Urban Farming',
                ].map((category) => (
                  <li key={category}>
                    <Button
                      variant="link"
                      className="text-gray-600 hover:text-green-700"
                    >
                      {category}
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Tags</h2>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {[
                'Farming',
                'Technology',
                'Irrigation',
                'Sustainable',
                'Urban',
              ].map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer hover:bg-gray-200"
                >
                  {tag}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
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

export default Blog;
