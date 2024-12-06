import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import Footer from '../Footer';
import { useState } from 'react';

function Market() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleProductClick = (id) => {
    // Navigate to the product page with the specified id
    navigate(`/marketplace/product/${id}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    //  api to get products from ur database

    console.log('Searching for:', searchTerm);
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
      {/* Hero */}
      <div className="relative h-48 bg-[url('/placeholder.svg')] bg-cover bg-center">
        <div className="relative">
          <div
            className="h-48 bg-cover bg-center flex items-center justify-center"
            style={{
              backgroundImage: "url('/placeholder.svg?height=192&width=1920')",
            }}
          >
            <h1 className="text-4xl font-bold text-white">Our Shop</h1>
          </div>
          <form
            onSubmit={handleSearch}
            className="absolute top-4 right-4 flex z-10"
          >
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 mr-2 bg-white shadow-md focus:ring-2 focus:ring-primary"
            />
            <Button
              type="submit"
              variant="default"
              size="icon"
              className="bg-primary text-white hover:bg-primary/90"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
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
      <Footer />
    </div>
  );
}

export default Market;
