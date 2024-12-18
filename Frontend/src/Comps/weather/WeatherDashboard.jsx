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
import WeatherHistoryTable from './WeatherTable'; 
import {
  fetchHourlyWeatherFromDB,
  updateHourlyWeatherInDB,
  createHourlyWeatherInDB,
} from './weatherApi'; 
import {
  fetchWeatherForecastFromDB,
  updateWeatherForecastInDB,
  createWeatherForecastInDB,
} from './weatherForecast '; 
import {
  fetchWeatherHistoryFromDB,
  updateWeatherHistoryInDB,
  createWeatherHistoryInDB,
} from './weatherHistory'; 

function WeatherDashboard() {
  const [hourlyData, setHourlyData] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [view, setView] = useState('real-time');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

   // Fetch farmer profile to get latitude and longitude
   
    useEffect(() => {
      const fetchFarmLocation = async () => {
        try {
          const response = await fetch(
            'https://database-microservice-agrilink.onrender.com/farmerProfiles/6751ec705047ab3b9f544908'
          );
          const result = await response.json();
          const lat = result.farmDetails.farmLocation.latitude;
          const long  = result.farmDetails.farmLocation.longitude;
          console.log("mama")
          setLatitude(lat);
          setLongitude(long);
          console.log("lat", latitude, "long", longitude)
        } catch (error) {
          console.error('Error fetching farm location:', error);
        }
      };

      fetchFarmLocation();
    }, []);

    useEffect(() => {
    if (latitude && longitude) {
      // Fetch hourly weather data
      const fetchWeatherData = async () => {
        try {
        
          const response = await fetch(`http://localhost:3001/forecast/hourly?q=${latitude},${longitude}`);
          const data = await response.json();

          if (data) {
            setHourlyData(data.data || []);
            console.log('Hourly Data from API:', data);

            // Check if weather data exists in the DB, if not, create new entry
            const dbData = await fetchHourlyWeatherFromDB();
            console.log("huh")
            if (!dbData) {
              // Create new weather data in DB if not found
              const newData = await createHourlyWeatherInDB(data.data);
              console.log('Created new hourly weather data in DB:', newData);
            } else {
              // Update the existing data in DB
              const IDobject= await fetchHourlyWeatherFromDB()
              const updatedData = await updateHourlyWeatherInDB(data.data, IDobject._id);
              console.log('Updated hourly weather data in DB:', updatedData);
            }
          }
        } catch (error) {
          console.error('Error fetching hourly weather from external API, falling back to DB:', error);

          // If external API call fails, attempt to fetch data from the database
          try {
            const dbData = await fetchHourlyWeatherFromDB();
            if (dbData) {
              setHourlyData(dbData);
              console.log('Hourly Data from DB:', dbData);
            } else {
              console.error('No data available in DB either');
            }
          } catch (dbError) {
            console.error('Error fetching hourly weather from DB:', dbError);
          }
        }
      };

      fetchWeatherData();
    }
  }, [latitude, longitude]);


  const fetchHistoricalData = async () => {
    try {
     
      const response = await fetch(
        `http://localhost:3001/history/historical-weather?lat=${latitude}&lon=${longitude}`
      );
      const result = await response.json();
  
      if (result && result.data) {
        setHistoricalData(result.data || []);
        console.log('Historical Data from API:', result);
  
        // Check if historical data exists in the DB, if not, create new entry
        const dbData = await fetchWeatherHistoryFromDB();
        if (!dbData) {
          // If no data in the DB, create new data
          const newData = await createWeatherHistoryInDB(result.data); 
          console.log('Created new historical weather data in DB:', newData);
        } else {
          // If data exists, update the DB with the new data
          const updatedData = await updateWeatherHistoryInDB(result.data, dbData._id);
          console.log('Updated historical weather data in DB:', updatedData);
        }
      } else {
        console.error('No historical data found from API');
      }
    } catch (error) {
      console.error('Error fetching historical data:', error);
  
      // If external API call fails, attempt to fetch data from the database
      try {
        const dbData = await fetchWeatherHistoryFromDB();
        if (dbData) {
          setHistoricalData(dbData);
          console.log('Historical Data from DB:', dbData);
        } else {
          console.error('No historical data available in DB either, creating new entry');
          // Create new entry if no data in DB
          const newData = await createWeatherHistoryInDB({ data: [] });
          console.log('Created new historical data in DB:', newData);
        }
      } catch (dbError) {
        console.error('Error fetching historical weather from DB:', dbError);
      }
    }
  };
  

  const fetchForecastData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/forecast/3-day?q=${latitude},${longitude}`
      );
      const result = await response.json();

      if (result) {
        setForecastData(result.data || []);
        console.log('Forecast Data from API:', result);

        // Check if forecast data exists in the DB, if not, create new entry
        const dbData = await fetchWeatherForecastFromDB();
        if (!dbData) {
          const newData = await createWeatherForecastInDB(result.data);
          console.log('Created new forecast weather data in DB:', newData);
        } else {
          const updatedData = await updateWeatherForecastInDB(result.data, dbData._id);
          console.log('Updated forecast weather data in DB:', updatedData);
        }
      }
    } catch (error) {
      console.error('Error fetching forecast data:', error);

      // If external API call fails, attempt to fetch data from the database
      try {
        const dbData = await fetchWeatherForecastFromDB();
        if (dbData) {
          setForecastData(dbData);
          console.log('Forecast Data from DB:', dbData);
        } else {
          console.error('No forecast data available in DB either');
        }
      } catch (dbError) {
        console.error('Error fetching forecast weather from DB:', dbError);
      }
    }
  };

  const handleViewChange = (newView) => {
    setView(newView);
    if (newView === 'history') {
      fetchHistoricalData();
    }
    if (newView === 'forecast') {
      fetchForecastData();
    }
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
            <Button variant="outline" size="sm" onClick={() => handleViewChange('real-time')}>
              Real Time
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleViewChange('history')}>
              7 Days History
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleViewChange('forecast')}>
              3 Days Forecast
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Weather Graph with Info */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold mb-4">Weather Graph</h2>
            <div className="w-full max-w-4xl md:w-full lg:w-10/12 xl:w-3/4 mx-auto">
              <WeatherGraph data={hourlyData} />
            </div>

            <div className="mt-4 space-y-4">
              {view === 'real-time' && hourlyData && hourlyData.current && (
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 max-w-lg mx-auto">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    Current Weather in <span className="text-black-600"></span>
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Condition:</span>
                      <span className="text-gray-800 font-medium">{hourlyData.current.condition.text}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Temperature:</span>
                      <span className="text-gray-800 font-medium">{hourlyData.current.temp_c}°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Wind:</span>
                      <span className="text-gray-800 font-medium">{hourlyData.current.wind_kph} km/h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Humidity:</span>
                      <span className="text-gray-800 font-medium">{hourlyData.current.humidity}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Visibility:</span>
                      <span className="text-gray-800 font-medium">{hourlyData.current.vis_km} km</span>
                    </div>
                  </div>
                </div>
              )}
              {/* Historical Data Table */}
              {view === 'history' && historicalData && (
                <WeatherHistoryTable historicalData={historicalData} />
              )}
              {/* Forecast Data Table */}
              {view === 'forecast' && forecastData && (
                <WeatherHistoryTable historicalData={forecastData} />
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
