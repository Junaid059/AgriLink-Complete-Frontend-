import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Icon Components
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

function FacebookIcon(props) {
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TwitterIcon(props) {
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
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function Market() {
  const navigate = useNavigate();
  const handleProductClick = (id) => {
    // Navigate to the product page with the specified id
    navigate(`/marketplace/product/${id}`);
  };
  const products = [
    {
      id: 1,
      name: 'Apples',
      price: 2.99,
      rating: 4.5,
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 2,
      name: 'Bananas',
      price: 1.99,
      rating: 4.3,
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 3,
      name: 'Carrots',
      price: 1.49,
      rating: 4.4,
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 4,
      name: 'Garlic',
      price: 0.99,
      rating: 4.2,
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 5,
      name: 'Grapes',
      price: 3.99,
      rating: 4.6,
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 6,
      name: 'Lettuce',
      price: 1.99,
      rating: 4.3,
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 7,
      name: 'Onions',
      price: 1.29,
      rating: 4.1,
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 8,
      name: 'Potatoes',
      price: 2.49,
      rating: 4.4,
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 9,
      name: 'Red Grapes',
      price: 4.99,
      rating: 4.7,
      image: '/placeholder.svg?height=200&width=200',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
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
                'Home',
                'About',
                'Services',
                'MarketPlace',
                'News',
                'Blog',
                'Contact',
              ].map((item, index) => (
                <Link
                  key={index}
                  to={`/${item.toLowerCase()}`}
                  className="text-sm hover:text-green-600 transition-colors"
                >
                  {item}
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

      {/* Hero */}
      <div className="relative h-48 bg-[url('/placeholder.svg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4">
          <h1 className="relative pt-16 text-center text-3xl font-bold text-white">
            Our Shop
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto flex-1 px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Sidebar */}
          <aside className="space-y-6">
            <div>
              <h2 className="mb-4 font-semibold">Price</h2>
              <Slider defaultValue={[50]} max={100} step={1} />
              <div className="mt-2 flex items-center gap-2">
                <Input placeholder="Min" type="number" />
                <span>-</span>
                <Input placeholder="Max" type="number" />
                <Button size="sm" variant="secondary">
                  Go
                </Button>
              </div>
            </div>
            <div>
              <h2 className="mb-4 font-semibold">Categories</h2>
              <div className="space-y-2">
                {['Fresh Vegetables', 'Fresh Fruits', 'Organic Foods'].map(
                  (category, index) => (
                    <Link
                      key={index}
                      to="#"
                      className="block text-sm hover:text-green-600"
                    >
                      {category}
                    </Link>
                  )
                )}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="col-span-3 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                <CardContent className="p-4">
                  <img
                    alt={product.name}
                    className="mb-4 aspect-square rounded-lg object-cover"
                    height={200}
                    src={product.image}
                    width={200}
                  />
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{product.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm text-gray-600">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    ${product.price.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">AgGro</h4>
              <p className="text-gray-400 text-sm">
                Your trusted source for fresh produce.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Explore</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white">
                    Products
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
              <h4 className="text-lg font-semibold mb-4">Help</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white">
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700"
                />
                <Button variant="secondary">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Market;
