import React, { useEffect, useState } from 'react';
import Header from '../UserHeader';
import Footer from '../Footer';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';

import CropCalendar from './components/CropCalendar';
import { Crop } from 'lucide-react';
import FarmerCalenderService from '../../services/FarmerCalenderService';

const months = ['January', 'February', 'March', 'April'];
const crops = ['Corn', 'Wheat', 'Soybeans', 'Rice'];
const activities = {
  Corn: ['Planting', 'Growing', 'Growing', 'Harvest'],
  Wheat: ['Harvest', 'Dormant', 'Growing', 'Growing'],
  Soybeans: ['Prepare Soil', 'Planting', 'Growing', 'Growing'],
  Rice: ['Dormant', 'Prepare Soil', 'Planting', 'Growing'],
};

function FarmerCalendar() {
  const [data, setData] = useState();
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedRegion, setSelectedRegion] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [selectedCrop, setSelectedCrop] = useState();

  useEffect(() => {

  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Farming Calendar</h1>

          <div className="text-sm text-muted-foreground">
            Providing crop recommendations based on region and weather forecast
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Country</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pakistan">Pakistan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Select Region</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="region">Region</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Enter City</label>
              <Input type="text" placeholder="Enter City" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Select Crop</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="corn">Corn</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button className="w-full md:w-auto bg-green-500 hover:bg-green-600">
            Get Activity Alerts
          </Button>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default FarmerCalendar;
