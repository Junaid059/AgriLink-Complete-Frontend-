import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CircularProgress from './CircularProgress';
import ProductCard from './ProductCard';
import LivestockCard from './LivestockCard';
import ProductCarousel from './ProductCarousal';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-green-600">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <CircularProgress value={75} />
          </CardContent>
        </Card>
        <ProductCard
          title="Featured Product"
          subtitle="Best Seller"
          image="/placeholder.svg"
          price={99.99}
        />
        <LivestockCard
          title="Livestock Status"
          count={150}
          type="Cattle"
          health="Good"
        />
      </div>
      <ProductCarousel />
    </div>
  );
}

export default AdminDashboard;
