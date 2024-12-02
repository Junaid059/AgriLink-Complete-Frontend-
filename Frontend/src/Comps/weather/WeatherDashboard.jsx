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
    // Fetch Hourly Data
    fetch('http://localhost:3001/forecast/hourly?q=33.626057,73.071442')
      .then(response => response.json())
      .then(data => {
        setHourlyData(data.hourly);
        setCurrentWeather(data.current);
      })
      .catch(error => console.error('Error fetching weather data:', error));
  }, []);

  useEffect(() => {
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

  const chartData = {
    labels: hourlyData?.map(item => 
      new Date(item.time_epoch * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    ) || [],
    datasets: [
      {
        label: 'Temperature (°C)',
        data: hourlyData?.map(item => item.temp_c) || [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

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
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Weather Graph</h2>
            <WeatherGraph data={weatherData} />
            <div className="mt-4 space-y-2">
              {weatherData && (
                <div className="current-weather">
                  <h3>Current Weather in {weatherData.location.name}</h3>
                  <p>Condition: {weatherData.current.condition.text}</p>
                  <p>Temperature: {weatherData.current.temp_c}°C</p>
                  <p>Wind: {weatherData.current.wind_kph} km/h</p>
                  <p>Humidity: {weatherData.current.humidity}%</p>
                  <p>Visibility: {weatherData.current.vis_km} km</p>
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
