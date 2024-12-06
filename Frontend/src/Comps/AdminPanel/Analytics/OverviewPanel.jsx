import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Wind } from 'lucide-react';
import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
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


function OverviewPanel({onTabChange}) {
  const [product, setproduct] = useState('Fertilizer');
  const [crop,setCrop]=useState('Wheat');
  const [LineData, setLineData] = useState(null);
  const [livestock,setLivestock]=useState([]);

  useEffect(() => {
    const fetchProduct=async()=>{
      try{
        const response = await axios.get(`http://localhost:3000/products/analytics?searchString=${product}`,{timeout:30000});
        if(response.status===200){
          setproduct(response.data);
          console.log(product);
        }
      }
      catch(err){
        console.log(err);
      }
    };
    fetchProduct();
  }
  , []);

  useEffect(() => {
    const fetchLineChartData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/amis/commodity/analytics?commodityId=1&startDate=12/5/2022&endDate=12/5/2024`);
        if (response.status === 200) {
          setLineData(response.data);
          console.log(LineData);
        }
      } catch (error) {
        console.error('Error fetching line chart data:', error);
      }
    }
    fetchLineChartData();
  }, []);

  useEffect(() => {
    const fetchLiveStock=async()=>{
      try{
        const response = await axios.get(`http://localhost:3000/farmGhar/listings?searchString=goat`,{timeout:30000});
        if(response.status===200){
          setLivestock(response.data);
        }
      }
      catch(err){
        console.log(err);
      }
    };
    fetchLiveStock();
  }
  , []);
  

  useEffect(() => {
    if(livestock){
      console.log(livestock);
    }
  }
  , [livestock]);

  return (
    <div>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Average Wheat Sales
          </CardTitle>
          <Leaf className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">8705</div>
          <p className="text-xs text-muted-foreground">+20% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Featured Product
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Liquid Fertilizer</div>
          <p className="text-xs text-muted-foreground">VC 10</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Livestock Sales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Goats</div>
          <p className="text-xs text-muted-foreground">+10% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            New Products
          </CardTitle>
          <Wind className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
          <div className="text-2xl font-bold">Hose</div>
          </div>
          <p className="text-xs text-muted-foreground">
            Last updated: 2 hours ago
          </p>
        </CardContent>
      </Card>
    </div>
    <div className="space-y-6 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <Card>
          <CardHeader className='flex flex-row justify-between items-center'>
            <CardTitle>{crop} Crop Analytics</CardTitle>
            <Button onClick={()=>onTabChange('crops')}>Explore More</Button>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={LineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#5c534a"
                  strokeWidth={1}
                />
                <Line
                  type="monotone"
                  dataKey="min"
                  stroke="#4ebf4e"
                  strokeWidth={1}
                />
                <Line
                  type="monotone"
                  dataKey="max"
                  stroke="#9d9cdb"
                  strokeWidth={1}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
            <Card>
              <CardHeader className='flex flex-row justify-between items-center'>
                <CardTitle>Fertilizer Product Analytics</CardTitle>
                <Button onClick={()=>onTabChange('products')}>Explore More</Button>
              </CardHeader>
              {product?.products ? (
              <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="col-span-1 flex flex-col space-y-2 ">
                  <div className='border border-gray-300 p-2 rounded-lg shadow-lg'>
                    <h3 className="text-sm font-medium">Product Name</h3>
                    <p className="text-blue-600 font-bold">{product.products[0]?.title||'Fertilizer'}</p>
                  </div>
                  <div className='border border-gray-300 p-2 rounded-lg shadow-lg'>
                    <h3 className="text-sm font-medium">Suggested Price</h3>
                    <p className="font-bold">{product.products[0]?.price}</p>
                  </div>
                  <div className='border border-gray-300 p-2 rounded-lg shadow-lg'>
                    <h3 className="text-sm font-medium">Total Products Found</h3>
                    <p className="font-bold">{product.products.length}</p>
                  </div>
                </div>
                <div className="col-span-1 flex justify-center items-center border border-gray-300 rounded-lg shadow-lg">
                  <img
                    src={product.products[0]?.imageUrl}
                    alt={product.products[0]?.title}
                    className="max-w-full h-auto"
                  />
                </div>
                <div className="col-span-1 flex justify-center items-center border border-gray-300 rounded-lg shadow-lg">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie dataKey="value" name="name" data={product.analytics?.pieChartData} fill="#FBBF24" label />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              ) : (
                <CardContent className="flex items-center justify-center p-8">
                  <div className="animate-spin h-8 w-8 border-4 border-blue-600 rounded-full border-t-transparent"></div>
                  </CardContent>
                )}  
            </Card>        
            <Card>
          <CardHeader className='flex flex-row justify-between items-center'>
            <CardTitle>{product.products?.[0]?.title||'Fertilizer'} Product Analytics</CardTitle>
          </CardHeader>
          {product?.analytics ? (
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={product?.analytics?.lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#9d9cdb"
                  strokeWidth={1}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
          ) : (
            <CardContent className="flex items-center justify-center p-8">
              <div className="animate-spin h-8 w-8 border-4 border-blue-600 rounded-full border-t-transparent"></div>
              </CardContent>
            )}  
        </Card>
        <Card>
              <CardHeader className='flex flex-row justify-between items-center'>
                <CardTitle>Products List</CardTitle>
              </CardHeader>
              {product?.products ? (
              <CardContent>
                <div className="flex flex-col space-y-2 max-h-[200px] overflow-y-auto">
                  {product?.products?.map((product, index) => (
                    <div className='flex flex-row justify-between items-center border border-gray-300 p-2 rounded-lg shadow-lg'>
                      <p className="text-blue-600 font-bold truncate max-w-[600px]">{product.title||'Fertilizer'}</p>
                      <a className="p-2 bg-black text-white rounded-lg hover:cursor-pointer" href={product.productUrl} target="_blank" rel="noreferrer">View Product</a>
                    </div>
                  ))}
                </div>
                </CardContent>
              ) : (
                <CardContent className="flex items-center justify-center p-8">
                  <div className="animate-spin h-8 w-8 border-4 border-blue-600 rounded-full border-t-transparent"></div>
                  </CardContent>
                )}
                </Card>
                <Card>
                  <CardHeader className='flex flex-row justify-between items-center'>
                    <CardTitle>Goats Market Pricing</CardTitle>
                    <Button onClick={()=>onTabChange('livestock')}>Explore More</Button>
                  </CardHeader>
                  {livestock && livestock.length>0 ? (
                    <CardContent>
                      <div className="flex flex-col space-y-2 max-h-[400px] overflow-y-auto">
                        {livestock?.map((live, index) => (
                          <div className='flex flex-row justify-between items-center border border-gray-300 p-2 rounded-lg shadow-lg'>
                            <div className='flex flex-row justify-between items-center'>
                              <img className='h-16 w-16' src={live.img[0]} alt={live.description}/>
                              <div className='ml-4'>
                                <p className="text-blue-600 font-bold truncate max-w-[600px]">{live.description||'Goat'}</p>
                                <p className="ml-4 text-black">Rs. {live.price}</p>
                              </div>
                            </div>
                            <p className='text-blue-600'>{live.district}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  ) : (
                    <CardContent className="flex items-center justify-center p-8">
                      <div className="animate-spin h-8 w-8 border-4 border-blue-600 rounded-full border-t-transparent"></div>
                    </CardContent>
                  )}
                </Card>
      </div>
    </div>
    </div>
  );
}

export default OverviewPanel;
