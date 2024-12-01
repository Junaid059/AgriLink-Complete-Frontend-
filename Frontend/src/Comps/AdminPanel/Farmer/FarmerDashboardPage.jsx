import { MainNav } from './MainNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Overview } from './Overview';
import { SupplyChainStatus } from './SupplyChainStatus';
import { DateRangePicker } from './DateRangePicker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function FarmerDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-green-700">
            Welcome back, Farmer 1
          </h2>
          <div className="flex items-center space-x-2">
            <DateRangePicker />
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select crop type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wheat">Wheat</SelectItem>
                <SelectItem value="corn">Corn</SelectItem>
                <SelectItem value="rice">Rice</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border border-green-200">
            <CardHeader>
              <CardTitle className="text-green-700">Crop Health</CardTitle>
            </CardHeader>
            <CardContent>
              <Overview />
            </CardContent>
          </Card>
          <Card className="border border-green-200">
            <CardHeader>
              <CardTitle className="text-green-700">Market Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <Overview />
            </CardContent>
          </Card>
          <Card className="border border-green-200">
            <CardHeader>
              <CardTitle className="text-green-700">
                Supply Chain Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SupplyChainStatus />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default FarmerDashboardPage;
