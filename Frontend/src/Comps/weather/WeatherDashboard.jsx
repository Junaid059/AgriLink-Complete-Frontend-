'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { LineChart } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';

function WeatherDashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <LineChart className="h-6 w-6 text-green-500" />
            Weather Dashboard
          </h1>
          <div className="flex gap-4">
            <Button variant="outline" size="sm">
              Real Time
            </Button>
            <Button variant="outline" size="sm">
              7 Days History
            </Button>
            <Button variant="outline" size="sm">
              3 Days Forecast
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Weather Graph */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="aspect-[2/1] bg-gray-100 rounded-md mb-4">
              {/* Graph placeholder */}
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Weather Graph
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Forecast Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2 mt-4">
                <Checkbox id="extreme" />
                <label htmlFor="extreme" className="text-sm">
                  Get Extreme Weather Alerts
                </label>
              </div>

              <Button className="w-full mt-4 bg-green-500 hover:bg-green-600">
                Get Customizable Weather Alerts
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Custom Alert Form</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">
                    Weather Condition
                  </label>
                  <Input placeholder="Enter weather condition" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">
                    Threshold
                  </label>
                  <Input placeholder="Enter threshold value" />
                </div>
                <Button className="w-full bg-green-500 hover:bg-green-600">
                  Get Custom Alert
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default WeatherDashboard;
