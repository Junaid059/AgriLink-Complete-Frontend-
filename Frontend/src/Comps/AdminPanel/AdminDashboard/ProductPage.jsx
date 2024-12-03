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
import { Plus } from 'lucide-react';
import ProductCard from './ProductCard';
import ProductCarousel from './ProductCarousal';
import AddProductModal from './AddProductModal';

function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([
    {
      id: '1',
      title: 'Organic Fertilizer',
      subtitle: 'Nutrient-rich soil enhancer',
      image: '/placeholder.svg',
      price: 19.99,
    },
    {
      id: '2',
      title: 'Precision Seeder',
      subtitle: 'Efficient planting tool',
      image: '/placeholder.svg',
      price: 129.99,
    },
    {
      id: '3',
      title: 'Drip Irrigation Kit',
      subtitle: 'Water-saving system',
      image: '/placeholder.svg',
      price: 79.99,
    },
    {
      id: '4',
      title: 'Harvest Basket',
      subtitle: 'Durable produce collector',
      image: '/placeholder.svg',
      price: 34.99,
    },
    {
      id: '5',
      title: 'Pest Control Spray',
      subtitle: 'Organic pest management',
      image: '/placeholder.svg',
      price: 24.99,
    },
    {
      id: '6',
      title: 'Garden Gloves',
      subtitle: 'Comfortable hand protection',
      image: '/placeholder.svg',
      price: 14.99,
    },
  ]);

  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: Date.now().toString(),
    };
    setProducts([...products, productWithId]);
  };

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
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-green-800">
          Agricultural Products
        </h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

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
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
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

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProduct={addProduct}
      />
    </div>
  );
}

export default ProductsPage;
