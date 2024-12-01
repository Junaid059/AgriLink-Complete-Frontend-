import ProductCard from './ProductCard';

export default function ProductsPage() {
  const products = [
    {
      title: 'Product 1',
      subtitle: 'Description 1',
      image: '/placeholder.svg',
      price: 19.99,
    },
    {
      title: 'Product 2',
      subtitle: 'Description 2',
      image: '/placeholder.svg',
      price: 29.99,
    },
    {
      title: 'Product 3',
      subtitle: 'Description 3',
      image: '/placeholder.svg',
      price: 39.99,
    },
    {
      title: 'Product 4',
      subtitle: 'Description 4',
      image: '/placeholder.svg',
      price: 49.99,
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-green-600">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
}
