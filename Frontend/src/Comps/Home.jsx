import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import backgroundImg from '../public/h1.png';
import techImg from '../public/h2.png';
import organicImg from '../public/h3.png';
import ecoImg from '../public/h4.png';
import h5 from '../public/h5.png';
import h6 from '../public/h6.png';
import h7 from '../public/h7.png';
import h8 from '../public/h8.png';
import h9 from '../public/h9.png';
import h10 from '../public/h10.png';
import h11 from '../public/h11.png';
import h12 from '../public/h12.png';
import h13 from '../public/h13.png';
import h14 from '../public/h14.png';
import { Play, ArrowRight, Mail, MapPin, Phone } from 'lucide-react';

const images = [h12];

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

function Home() {
  const handleAddToCart = (product) => {
    addToCart(product); // This adds the product to the cart
  };
  return (
    <div className="min-h-screen w-full flex flex-col">
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
      <section className="relative h-[600px]">
        <img
          src={backgroundImg}
          alt="Agriculture background"
          width={1920}
          height={600}
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-6">
              Agriculture & Eco Farming
            </h1>
            <Button className="bg-green-600 hover:bg-green-700">
              Discover More
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "We're using a new technology",
              icon: 'tech',
              image: techImg,
            },
            {
              title: 'Good to export organic services',
              icon: 'organic',
              image: organicImg,
            },
            { title: 'Reforming in the modern', icon: 'eco', image: ecoImg },
          ].map((feature) => (
            <Card
              key={feature.title}
              className="p-6 bg-white shadow-lg text-center"
            >
              <img
                src={feature.image}
                alt={feature.icon}
                width={80}
                height={80}
                className="mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            </Card>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="rounded-full overflow-hidden">
              <img
                src={h5}
                alt="Farm landscape"
                width={400}
                height={400}
                className="w-full"
              />
            </div>
            <div className="absolute -bottom-10 -right-10">
              <img
                src={h6}
                alt="Farming detail"
                width={200}
                height={200}
                className="rounded-full border-4 border-white"
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Agriculture & Organic Product Farm
            </h2>
            <p className="text-gray-600 mb-6">
              AgriLink is the largest global organic farm that delivers organic
              produce and food directly from our fields to your home.
            </p>
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <p className="text-sm">Growing Fresh vegetables</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <p className="text-sm">Tips for growing fresh fruits</p>
              </div>
            </div>
            <Button className="bg-green-600 hover:bg-green-700">
              Discover More
            </Button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Fresh Fruits', image: h7 },
            { name: 'Products', image: h8 },
            { name: 'Vegetables', image: h9 },
            { name: 'Products', image: h10 },
          ].map((product) => (
            <div key={product.name} className="relative group">
              <img
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="rounded-lg w-full object-cover aspect-square"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg opacity-100 transition-opacity">
                <Button
                  variant="outline"
                  className="bg-green-500 absolute bottom-4 left-4 text-white border-none hover:bg-green-600 hover:text-white"
                >
                  {product.name}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Section */}
      <section className="relative h-[400px] mt-20">
        <img
          src={h11}
          alt="Agriculture video background"
          width={1920}
          height={400}
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h2 className="text-4xl font-bold mb-4">
              Agriculture Matters to the Future of Development
            </h2>
            <Button
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-black"
            >
              <Play className="mr-2 h-4 w-4" />
              Watch Video
            </Button>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">
              Today's Market Agriculture
            </h3>
            <p className="text-gray-600 mb-4">
              Learn about the latest trends and developments in agricultural
              markets.
            </p>
            <Button variant="outline" className="flex items-center">
              Read More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Why Choose Agrico</h3>
            <p className="text-gray-600 mb-4">
              Discover the benefits of choosing our organic farming solutions.
            </p>
            <Button variant="outline" className="flex items-center">
              Read More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-yellow-500 font-bold uppercase">From The Blog</p>
          <h2 className="text-3xl md:text-4xl font-bold">News & Articles</h2>
        </div>

        {/* Articles */}
        <div className="flex flex-wrap justify-center gap-6">
          {/* Article 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 w-full sm:w-64">
            <img
              src={h12}
              alt="Bringing Food Production Back To Cities"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <span className="text-green-600 text-xs font-semibold bg-green-100 px-3 py-1 rounded-full inline-block mb-3">
                05 July 2022
              </span>
              <h3 className="text-lg font-bold text-gray-800">
                Bringing Food Production Back To Cities
              </h3>
              <div className="flex items-center text-sm text-gray-500 mt-3">
                <span className="mr-2">👤 Kevin Martin</span>
                <span>💬 1 Comment</span>
              </div>
            </div>
          </div>

          {/* Article 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 w-full sm:w-64">
            <img
              src={h14}
              alt="The Future of Farming, Smart Irrigation Solutions"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <span className="text-green-600 text-xs font-semibold bg-green-100 px-3 py-1 rounded-full inline-block mb-3">
                05 July 2022
              </span>
              <h3 className="text-lg font-bold text-gray-800">
                The Future of Farming, Smart Irrigation Solutions
              </h3>
              <div className="flex items-center text-sm text-gray-500 mt-3">
                <span className="mr-2">👤 Kevin Martin</span>
                <span>💬 0 Comments</span>
              </div>
            </div>
          </div>

          {/* Article 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 w-full sm:w-64">
            <img
              src={h13}
              alt="Agronomy and relation to Other Sciences"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <span className="text-green-600 text-xs font-semibold bg-green-100 px-3 py-1 rounded-full inline-block mb-3">
                05 July 2022
              </span>
              <h3 className="text-lg font-bold text-gray-800">
                Agronomy and relation to Other Sciences
              </h3>
              <div className="flex items-center text-sm text-gray-500 mt-3">
                <span className="mr-2">👤 Kevin Martin</span>
                <span>💬 0 Comments</span>
              </div>
            </div>
          </div>
        </div>
      </section>

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

export default Home;
