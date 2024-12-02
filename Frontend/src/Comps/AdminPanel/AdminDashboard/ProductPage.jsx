import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ProductCard from './ProductCard';
import ProductCarousel from './ProductCarousal';

function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const products = [
    {
      title: 'Organic Fertilizer',
      subtitle: 'Nutrient-rich soil enhancer',
      image: '/placeholder.svg',
      price: 19.99,
    },
    {
      title: 'Precision Seeder',
      subtitle: 'Efficient planting tool',
      image: '/placeholder.svg',
      price: 129.99,
    },
    {
      title: 'Drip Irrigation Kit',
      subtitle: 'Water-saving system',
      image: '/placeholder.svg',
      price: 79.99,
    },
    {
      title: 'Harvest Basket',
      subtitle: 'Durable produce collector',
      image: '/placeholder.svg',
      price: 34.99,
    },
    {
      title: 'Pest Control Spray',
      subtitle: 'Organic pest management',
      image: '/placeholder.svg',
      price: 24.99,
    },
    {
      title: 'Garden Gloves',
      subtitle: 'Comfortable hand protection',
      image: '/placeholder.svg',
      price: 14.99,
    },
  ];

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0;
  });

  return (
    <div className="space-y-8 p-6 bg-green-50 min-h-screen">
      <h1 className="text-4xl font-bold text-green-800">
        Agricultural Products
      </h1>

      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-green-700">
            Featured Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProductCarousel />
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
        <Input
          className="max-w-sm"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No products found.</p>
      )}

      <div className="flex justify-center mt-8">
        <Button className="bg-green-500 hover:bg-green-600 text-white">
          Load More Products
        </Button>
      </div>
    </div>
  );
}

export default ProductsPage;
