import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function CropTab() {
  const [crops, setCrops] = useState([]);
  const [selectCrop, setSelectCrop] = useState('Wheat');
  const [startDate, setStartDate] = useState('2022-12-06');
  const [endDate, setEndDate] = useState('2024-12-06');
  const [lineChartData, setLineChartData] = useState();
  const [cropString, setCropString] = useState('Wheat');
  const [cropPrice, setCropPrice] = useState([]);
  const [selectCropPrice, setSelectCropPrice] = useState('Wheat');
  const [cropPriceDate, setCropPriceDate] = useState('2023-12-06');
  const [cropPriceString, setCropPriceString] = useState('Wheat');
  
 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const formatDateForApi = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const fetchWheatData = async (wheatId) => {
    try {
      const formattedStartDate = formatDateForApi(startDate);
      const formattedEndDate = formatDateForApi(endDate);
      const formattedPriceDate = formatDateForApi(cropPriceDate);

      const chartResponse = await axios.get(
        `http://localhost:3000/amis/commodity/analytics?commodityId=${wheatId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`
      );
      if (chartResponse.status === 200) {
        setLineChartData(chartResponse.data);
      }

      const priceResponse = await axios.get(
        `http://localhost:3000/amis/commodity/price?commodityId=${wheatId}&date=${formattedPriceDate}`
      );
      if (priceResponse.status === 200) {
        setCropPrice(priceResponse.data);
        setCropPriceString('Wheat');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await axios.get('http://localhost:3000/amis/commodities/names/list');
        if (response.status === 200) {
          setCrops(response.data);
          
          const wheat = response.data.find(crop => crop.Name === 'Wheat');
          if (wheat) {
            await fetchWheatData(wheat.commodityId);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    
    fetchCrops();
  }, []);

  const onSearchCropButtonClick = async () => {
    try {
      const selectedCrop = crops.find(crop => crop.Name === selectCrop);
      if (!selectedCrop) return;
      
      const commodity = selectedCrop.commodityId;
      const formattedStartDate = formatDateForApi(startDate);
      const formattedEndDate = formatDateForApi(endDate);
      
      const response = await axios.get(
        `http://localhost:3000/amis/commodity/analytics?commodityId=${commodity}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`
      );
      
      if (response.status === 200) {
        setLineChartData(response.data);
      } else {
        setLineChartData(null);
        setCropString(selectCrop);
      }
    } catch (err) {
      console.log(err);
      setLineChartData(null);
      setCropString(selectCrop);
    }
  };

  const onCropPriceButtonClick = async () => {
    try {
      const selectedCropPrice = crops.find(crop => crop.Name === selectCropPrice);
      if (!selectedCropPrice) return;
      
      const commodity = selectedCropPrice.commodityId;
      const formattedDate = formatDateForApi(cropPriceDate);
      
      const response = await axios.get(
        `http://localhost:3000/amis/commodity/price?commodityId=${commodity}&date=${formattedDate}`
      );
      
      if (response.status === 200) {
        setCropPrice(response.data);
        setCropPriceString(response.data.commodity);
      } else {
        setCropPrice({ prices: [] });
        setCropPriceString(selectCropPrice);
      }
    } catch (err) {
      console.log(err);
      setCropPrice({ prices: [] });
      setCropPriceString(selectCropPrice);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cropPrice?.prices?.slice(indexOfFirstItem, indexOfLastItem) || [];
  const totalPages = Math.ceil((cropPrice?.prices?.length || 0) / itemsPerPage);

  const handleDateChange = (e, setter) => {
    setter(e.target.value);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <Select value={selectCrop} onValueChange={setSelectCrop}>
          <SelectTrigger id="selectcrop">
            <SelectValue placeholder="Select Crop" />
          </SelectTrigger>
          <SelectContent>
            {crops.map((crop) => (
              <SelectItem key={crop.Name} value={crop.Name}>
                {crop.Name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input 
          type="date" 
          value={startDate}
          onChange={(e) => handleDateChange(e, setStartDate)}
          min={new Date(new Date().setFullYear(new Date().getFullYear() - 2)).toISOString().split('T')[0]}
        />
        <Input 
          type="date"
          value={endDate}
          onChange={(e) => handleDateChange(e, setEndDate)}
          max={new Date().toISOString().split('T')[0]}
        />
        <Button onClick={onSearchCropButtonClick}>Search Crop</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{selectCrop || "Wheat"} Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            {lineChartData ? (
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="price" stroke="#5c534a" strokeWidth={1} />
                <Line type="monotone" dataKey="min" stroke="#4ebf4e" strokeWidth={1} />
                <Line type="monotone" dataKey="max" stroke="#9d9cdb" strokeWidth={1} />
              </LineChart>
            ) : (
              <div className="flex items-center justify-center h-full text-2xl font-semibold text-gray-500">
                No data for {cropString} available
              </div>
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{cropPriceString || 'Wheat'} Price List</CardTitle>
          <div className="grid grid-cols-3 gap-4">
            <Select value={selectCropPrice} onValueChange={setSelectCropPrice}>
              <SelectTrigger id="selectcropprice">
                <SelectValue placeholder="Select Crop" />
              </SelectTrigger>
              <SelectContent>
                {crops.map((crop) => (
                  <SelectItem key={crop.Name} value={crop.Name}>
                    {crop.Name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input 
              type="date"
              value={cropPriceDate}
              onChange={(e) => handleDateChange(e, setCropPriceDate)}
              min={new Date(new Date().setFullYear(new Date().getFullYear() - 2)).toISOString().split('T')[0]}
            />
            <Button onClick={onCropPriceButtonClick}>Search Crop</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-green-100">
                <TableHead className="text-green-700 hover:text-green-900">District</TableHead>
                <TableHead className="text-green-700 hover:text-green-900">Min Price</TableHead>
                <TableHead className="text-green-700 hover:text-green-900">Max Price</TableHead>
                <TableHead className="text-green-700 hover:text-green-900">Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.city}</TableCell>
                    <TableCell>{item.min || 0}</TableCell>
                    <TableCell>{item.max || 0}</TableCell>
                    <TableCell>{item.quantity || 0}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">No data available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              <Button 
                variant="outline"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="flex items-center px-4">
                Page {currentPage} of {totalPages}
              </span>
              <Button 
                variant="outline"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default CropTab;