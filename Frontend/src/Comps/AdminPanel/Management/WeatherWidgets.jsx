import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sun, Cloud, CloudRain, Wind } from 'lucide-react';

function WeatherWidgets() {
  const [weatherData, setWeatherData] = useState({
    today: { temp: 24, condition: 'Sunny', windSpeed: 15, windDir: 'North-East' },
    tomorrow: { temp: 22, condition: 'Cloudy', windSpeed: 10, windDir: 'East' },
    dayAfter: { temp: 19, condition: 'Rain', windSpeed: 12, windDir: 'South-West' },
  });

  useEffect(() => {
    const fetchWeather = async () => {
      const API_KEY = '0ccb252b7089455c84b40538240612'; // Your WeatherAPI key
      const city = 'Islamabad'; // Specify the city name
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Debug the API response to check data structure
        console.log('API Data:', data);

        // Update state based on API data
        setWeatherData({
          today: {
            temp: data.current.temp_c,
            condition: data.current.condition.text,
            windSpeed: data.current.wind_kph,
            windDir: data.current.wind_dir,
          },
          tomorrow: {
            temp: data.forecast.forecastday[1].day.avgtemp_c,
            condition: data.forecast.forecastday[1].day.condition.text,
            windSpeed: data.forecast.forecastday[1].day.maxwind_kph,
            windDir: data.forecast.forecastday[1].day.maxwind_kph > 15 ? 'East' : 'West', // Sample logic
          },
          dayAfter: {
            temp: data.forecast.forecastday[2].day.avgtemp_c,
            condition: data.forecast.forecastday[2].day.condition.text,
            windSpeed: data.forecast.forecastday[2].day.maxwind_kph,
            windDir: data.forecast.forecastday[2].day.maxwind_kph > 15 ? 'South' : 'North', // Sample logic
          },
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Today</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Sun className="h-12 w-12 text-yellow-500 mb-2" />
          <div className="text-2xl font-bold">{weatherData.today.temp}°C</div>
          <p>{weatherData.today.condition}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Tomorrow</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Cloud className="h-12 w-12 text-gray-500 mb-2" />
          <div className="text-2xl font-bold">{weatherData.tomorrow.temp}°C</div>
          <p>{weatherData.tomorrow.condition}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Day After</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <CloudRain className="h-12 w-12 text-blue-500 mb-2" />
          <div className="text-2xl font-bold">{weatherData.dayAfter.temp}°C</div>
          <p>{weatherData.dayAfter.condition}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Wind</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Wind className="h-12 w-12 text-green-500 mb-2" />
          <div className="text-2xl font-bold">{weatherData.today.windSpeed} km/h</div>
          <p>{weatherData.today.windDir}</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default WeatherWidgets;
