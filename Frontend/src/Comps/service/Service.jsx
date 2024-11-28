import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';

function Service() {
  const navigate = useNavigate();
  const handleProductClick = (id) => {
    navigate(`/service/tools/${id}`);
  };
  const products = [
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

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Header />
      {/* Hero */}
      <div className="relative h-48 bg-[url('/placeholder.svg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4">
          <h1 className="relative pt-16 text-center text-3xl font-bold text-white">
            Our Services
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
                {['Tolls', 'Machinery'].map((category, index) => (
                  <Link
                    key={index}
                    to="#"
                    className="block text-sm hover:text-green-600"
                  >
                    {category}
                  </Link>
                ))}
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
      <Footer></Footer>
    </div>
  );
}

export default Service;
