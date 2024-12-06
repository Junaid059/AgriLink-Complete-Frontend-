import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function Products() {
  const [product, setProduct] = useState('Fertilizer');
  const [searchQuery, setSearchQuery] = useState('');
  const [productData, setProductData] = useState(null); // New state for API data
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/products/analytics?searchString=${product}`, { timeout: 30000 });
        if (response.status === 200) {
          setProductData(response.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [product]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchQuery.trim() === '') return; 
    setProduct(searchQuery);
    setSearchQuery(''); 
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-row justify-between items-center gap-x-4">
        <Input placeholder="Search products" value={searchQuery} onChange={handleSearch} />
        <Button onClick={handleSearchClick} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </div>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>{product} Product Analytics</CardTitle>
        </CardHeader>
        {loading ? (
          <CardContent className="flex items-center justify-center p-8">
            <div className="animate-spin h-8 w-8 border-4 border-blue-600 rounded-full border-t-transparent"></div>
          </CardContent>
        ) : productData ? (
          <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="col-span-1 flex flex-col space-y-2">
              <div className="border border-gray-300 p-2 rounded-lg shadow-lg">
                <h3 className="text-sm font-medium">Product Name</h3>
                <p className="text-blue-600 font-bold">{productData.products[0]?.title || 'Fertilizer'}</p>
              </div>
              <div className="border border-gray-300 p-2 rounded-lg shadow-lg">
                <h3 className="text-sm font-medium">Suggested Price</h3>
                <p className="font-bold">{productData.products[0]?.price}</p>
              </div>
              <div className="border border-gray-300 p-2 rounded-lg shadow-lg">
                <h3 className="text-sm font-medium">Total Products Found</h3>
                <p className="font-bold">{productData.products.length}</p>
              </div>
            </div>
            <div className="col-span-1 flex justify-center items-center border border-gray-300 rounded-lg shadow-lg">
              <img
                src={productData.products[0]?.imageUrl}
                alt={productData.products[0]?.title}
                className="max-w-full h-auto"
              />
            </div>
            <div className="col-span-1 flex justify-center items-center border border-gray-300 rounded-lg shadow-lg">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie dataKey="value" name="name" data={productData.analytics?.pieChartData} fill="#FBBF24" label />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        ) : (
          <CardContent className="flex items-center justify-center p-8">
            <p>No data found for the product.</p>
          </CardContent>
        )}
      </Card>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>{product||'Fertilizer'} Product Analytics</CardTitle>
        </CardHeader>
        {loading ? (
          <CardContent className="flex items-center justify-center p-8">
            <div className="animate-spin h-8 w-8 border-4 border-blue-600 rounded-full border-t-transparent"></div>
          </CardContent>
        ) : productData?.analytics ? (
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={productData?.analytics?.lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="price" stroke="#9d9cdb" strokeWidth={1} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        ) : (
          <CardContent className="flex items-center justify-center p-8">
            <p>No analytics data found for the product.</p>
          </CardContent>
        )}
      </Card>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>{product||'Fertilizer'} Products List</CardTitle>
        </CardHeader>
        {loading ? (
          <CardContent className="flex items-center justify-center p-8">
            <div className="animate-spin h-8 w-8 border-4 border-blue-600 rounded-full border-t-transparent"></div>
          </CardContent>
        ) : productData?.products ? (
          <CardContent>
            <div className="flex flex-col space-y-2 max-h-[200px] overflow-y-auto">
              {productData?.products?.map((product, index) => (
                <div key={index} className="flex flex-row justify-between items-center border border-gray-300 p-2 rounded-lg shadow-lg">
                  <p className="text-blue-600 font-bold truncate max-w-[600px]">{product.title || 'Fertilizer'}</p>
                  <a className="p-2 bg-black text-white rounded-lg hover:cursor-pointer" href={product.productUrl} target="_blank" rel="noreferrer">
                    View Product
                  </a>
                </div>
              ))}
            </div>
          </CardContent>
        ) : (
          <CardContent className="flex items-center justify-center p-8">
            <p>No products found for the search query.</p>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

export default Products;
