import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { Play, ArrowRight, Mail, MapPin, Phone } from 'lucide-react';

// Mock Data (Replace with actual API call)
const mockProducts = [
  {
    id: 1,
    name: 'Tractor',
    price: 15000.99,
    rating: 4.8,
    image: '/tractor.svg?height=200&width=200',
  },
  {
    id: 2,
    name: 'Plough',
    price: 499.99,
    rating: 4.5,
    image: '/plough.svg?height=200&width=200',
  },
  {
    id: 3,
    name: 'Seed Drill',
    price: 1200.49,
    rating: 4.6,
    image: '/seed-drill.svg?height=200&width=200',
  },
  {
    id: 4,
    name: 'Harvester',
    price: 25000.99,
    rating: 4.7,
    image: '/harvester.svg?height=200&width=200',
  },
  {
    id: 5,
    name: 'Sprinkler System',
    price: 799.99,
    rating: 4.4,
    image: '/sprinkler-system.svg?height=200&width=200',
  },
  {
    id: 6,
    name: 'Rotavator',
    price: 349.99,
    rating: 4.3,
    image: '/rotavator.svg?height=200&width=200',
  },
  {
    id: 7,
    name: 'Hand Tiller',
    price: 99.49,
    rating: 4.1,
    image: '/hand-tiller.svg?height=200&width=200',
  },
  {
    id: 8,
    name: 'Water Pump',
    price: 399.99,
    rating: 4.2,
    image: '/water-pump.svg?height=200&width=200',
  },
  {
    id: 9,
    name: 'Cultivator',
    price: 599.49,
    rating: 4.6,
    image: '/cultivator.svg?height=200&width=200',
  },
];

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

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  // Fetch product data based on the ID
  useEffect(() => {
    const fetchedProduct = mockProducts.find(
      (product) => product.id === parseInt(id)
    );
    setProduct(fetchedProduct);
  }, [id]);

  const handleAddToCart = (selectedProduct) => {
    const cartItem = {
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      quantity: quantity,
    };
    setCartItems([...cartItems, cartItem]);
  };

  const cartCount = cartItems.length;

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b p-4 flex justify-end">
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
              <div className="cart-info">
                <span>
                  <ShoppingCartIcon className="h-4 w-4" /> {cartCount}
                </span>
              </div>
            </Button>
          </div>
        </div>
      </header>

      {/* Banner */}
      <div
        className="h-48 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('/placeholder.svg?height=192&width=1920')",
        }}
      >
        <h1 className="text-4xl font-bold text-white">Our Shop</h1>
      </div>

      {/* Product Section */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white p-8 rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="mx-auto"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold">{product.name}</h2>
              <p className="text-2xl font-semibold text-primary mt-2">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {[...Array(Math.round(product.rating))].map((_, index) => (
                <Star
                  key={index}
                  className="w-4 h-4 fill-primary text-primary"
                />
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded">
                <Input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-20 border-0"
                />
              </div>
              <Button
                className="bg-primary text-white"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </Button>
            </div>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">
            Reviews for {product.name}
          </h3>

          {/* Existing Review */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt="Reviewer"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <h4 className="font-semibold">Martin Smith</h4>
                  <div className="flex items-center gap-2 mt-1">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className="w-4 h-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-muted-foreground">
                    These tomatoes are incredibly fresh and flavorful. Perfect
                    for my salads.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add Review Form */}
          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold mb-4">Add a review</h4>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Button
                        key={star}
                        variant="ghost"
                        size="icon"
                        className="hover:text-primary"
                      >
                        <Star className="w-4 h-4" />
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your Review
                  </label>
                  <Textarea
                    placeholder="Write your review here..."
                    className="min-h-[100px]"
                  />
                </div>
                <Button>Submit Review</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

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

export default Product;
