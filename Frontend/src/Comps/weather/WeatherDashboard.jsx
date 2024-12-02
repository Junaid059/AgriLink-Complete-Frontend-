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
import { useEffect, useState } from 'react';
import WeatherGraph from './WeatherGraph';
import { LineChart } from 'lucide-react';
import Header from '../UserHeader';
import Footer from '../Footer';

function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);

  useEffect(() => {
  //hourly
    fetch('http://localhost:3001/forecast/hourly?q=33.626057,73.071442')
      .then(response => response.json())
      .then(data => {
      
        setHourlyData(data || []); 
        console.log('Hourly Datas:', hourlyData.data);
      })
      .catch(error => console.error('Error fetching weather data:', error));
  }, []);

  useEffect(() => {
    //current
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          'http://localhost:3001/weather/current?lat=33.5651091&lon=73.016914'
        );
        const result = await response.json();
        setWeatherData(result.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);


  return (
    <div className="min-h-screen flex flex-col">
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
          {/* Weather Graph with Info */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">Weather Graph</h2>
            <div className="w-full max-w-2xl">
                <WeatherGraph data={hourlyData.data} />
              </div>
            <div className="mt-4 space-y-4">
              {weatherData && (
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 max-w-lg mx-auto">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    Current Weather in <span className="text-black-600">{weatherData.location.name}</span>
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Condition:</span>
                      <span className="text-gray-800 font-medium">{weatherData.current.condition.text}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Temperature:</span>
                      <span className="text-gray-800 font-medium">{weatherData.current.temp_c}°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Wind:</span>
                      <span className="text-gray-800 font-medium">{weatherData.current.wind_kph} km/h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Humidity:</span>
                      <span className="text-gray-800 font-medium">{weatherData.current.humidity}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Visibility:</span>
                      <span className="text-gray-800 font-medium">{weatherData.current.vis_km} km</span>
                    </div>
                  </div>
                </div>
              )}
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
