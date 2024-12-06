import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const WeatherIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 30 30">
      <path fill="#19263b" d="M.32 21.06c0 .23.08.43.25.59q.255.24.63.24h18.71c.24 0 .44-.08.61-.24s.25-.35.25-.59s-.08-.44-.25-.6a.82.82 0 0 0-.61-.25H1.2c-.25 0-.46.08-.63.25s-.25.36-.25.6m2.62-3.14c0 .23.08.43.25.58a.8.8 0 0 0 .6.27h18.72c.23 0 .43-.08.59-.25q.24-.255.24-.6a.84.84 0 0 0-.23-.59a.8.8 0 0 0-.59-.24H3.8q-.36 0-.6.24c-.17.17-.26.36-.26.59m.13-2.4c0 .09.05.13.16.13h1.43c.07 0 .14-.05.21-.16c.24-.52.59-.94 1.06-1.27s.99-.52 1.56-.56l.54-.07c.11 0 .17-.06.17-.18l.07-.51c.11-1.08.56-1.98 1.37-2.71c.81-.72 1.76-1.09 2.86-1.09c1.08 0 2.03.36 2.84 1.08s1.27 1.61 1.38 2.68l.07.58c0 .11.06.17.19.17h1.61c.64 0 1.23.17 1.76.52c.53.34.92.8 1.18 1.37c.07.11.13.16.2.16h1.44c.13 0 .18-.07.13-.23l-.2-.55c.76-.94 1.13-2.04 1.13-3.31c0-.71-.14-1.38-.41-2.03s-.64-1.2-1.11-1.67c-.46-.47-1.02-.84-1.67-1.12s-1.32-.4-2.04-.4c-1.54 0-2.82.56-3.82 1.68c-.85-.42-1.74-.63-2.68-.63c-1.4 0-2.65.44-3.74 1.32s-1.79 2-2.1 3.37c-1.78.47-2.98 1.58-3.58 3.35c-.01.01-.01.04-.01.08m1.62 8.61q0 .36.27.6c.16.17.35.26.59.26h18.74c.23 0 .43-.08.6-.25s.25-.37.25-.61c0-.23-.08-.42-.25-.58a.88.88 0 0 0-.6-.23H5.55a.9.9 0 0 0-.61.23c-.17.16-.25.35-.25.58m6.57-19.47c0 .24.08.43.23.59l.65.64c.17.18.36.27.58.27s.42-.08.6-.25c.17-.17.26-.37.26-.61s-.08-.45-.25-.63l-.64-.61a.8.8 0 0 0-.6-.26c-.24 0-.44.08-.6.25c-.15.16-.23.37-.23.61m5.32 4.38c.67-.68 1.48-1.01 2.43-1.01c.98 0 1.82.35 2.51 1.04s1.04 1.53 1.04 2.5c0 .65-.16 1.25-.49 1.8c-.95-.95-2.11-1.42-3.47-1.42h-.34q-.435-1.77-1.68-2.91m1.6-5.23c0 .23.08.43.24.59s.35.24.59.24q.375 0 .63-.24c.17-.16.25-.35.25-.59V1.76c0-.23-.09-.43-.26-.6A.88.88 0 0 0 19 .91c-.23 0-.43.08-.59.25q-.24.255-.24.6v2.05zm5.49 2.27c0 .22.08.43.24.6q.555.54 1.23 0l1.43-1.43c.16-.18.24-.39.24-.64c0-.23-.08-.43-.24-.59a.8.8 0 0 0-.59-.24q-.36 0-.6.24l-1.46 1.47c-.17.18-.25.38-.25.59m.81 11.8c0 .24.09.44.26.6l.64.65c.16.16.36.24.58.24c.21 0 .41-.08.61-.24c.16-.17.24-.39.24-.64c0-.22-.08-.41-.24-.56l-.65-.66a.88.88 0 0 0-.6-.24c-.24 0-.44.08-.6.25q-.24.24-.24.6m1.48-6.31c0 .24.09.44.26.6c.15.17.35.25.59.25h2.05c.23 0 .43-.08.59-.25q.24-.255.24-.6q0-.36-.24-.6a.8.8 0 0 0-.59-.24h-2.05c-.24 0-.44.08-.6.25c-.17.16-.25.36-.25.59"></path>
    </svg>
  )
}




const ChatRecommendation = () => {
  const [crop, setCrop] = useState('');
  const [disease, setDisease] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [weatherRecommendations, setWeatherRecommendations] = useState(null);
  const [city, setCity] = useState('');

  const BASE_URL = "http://localhost:5000"; // for chat recommendation microservice
  
  const getCityFromGeolocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    });
  };


  const getDummyWeatherData = () => {
    const variations = [
      {
        forecast: {
          forecastday: [
            {
              date: '2023-10-01',
              day: {
                maxtemp_c: 30,
                mintemp_c: 20,
                avghumidity: 70,
                maxwind_kph: 15,
                condition: { text: 'Sunny' },
                uv: 5,
              },
              astro: { sunrise: '06:00 AM', sunset: '06:00 PM' },
            },
            {
              date: '2023-10-02',
              day: {
                maxtemp_c: 28,
                mintemp_c: 18,
                avghumidity: 65,
                maxwind_kph: 10,
                condition: { text: 'Partly cloudy' },
                uv: 4,
              },
              astro: { sunrise: '06:01 AM', sunset: '05:59 PM' },
            },
          ],
        },
      },
      {
        forecast: {
          forecastday: [
            {
              date: '2023-10-03',
              day: {
                maxtemp_c: 25,
                mintemp_c: 15,
                avghumidity: 60,
                maxwind_kph: 12,
                condition: { text: 'Rainy' },
                uv: 3,
              },
              astro: { sunrise: '06:02 AM', sunset: '05:58 PM' },
            },
            {
              date: '2023-10-04',
              day: {
                maxtemp_c: 27,
                mintemp_c: 17,
                avghumidity: 68,
                maxwind_kph: 8,
                condition: { text: 'Overcast' },
                uv: 4,
              },
              astro: { sunrise: '06:03 AM', sunset: '05:57 PM' },
            },
          ],
        },
      },
      {
        forecast: {
          forecastday: [
            {
              date: '2023-10-05',
              day: {
                maxtemp_c: 32,
                mintemp_c: 22,
                avghumidity: 75,
                maxwind_kph: 20,
                condition: { text: 'Windy' },
                uv: 6,
              },
              astro: { sunrise: '06:04 AM', sunset: '05:56 PM' },
            },
            {
              date: '2023-10-06',
              day: {
                maxtemp_c: 29,
                mintemp_c: 19,
                avghumidity: 65,
                maxwind_kph: 10,
                condition: { text: 'Clear skies' },
                uv: 5,
              },
              astro: { sunrise: '06:05 AM', sunset: '05:55 PM' },
            },
          ],
        },
      },
    ];
  
    const randomIndex = Math.floor(Math.random() * variations.length);
    return variations[randomIndex];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // let weatherData;
    // if (city !== "") {
    //   // Fetch weather data from the API using the city input
    //   const weatherResponse = await fetch(
    //     `https://weather-and-environmental-data-service.onrender.com/forecast/3-day?q=${city}`
    //   );

    //   if (!weatherResponse.ok) {
    //     throw new Error('Failed to fetch weather data');
    //   }

    //   weatherData = await weatherResponse.json();
    // } else {
    //   {
    //     try {
    //       const { latitude, longitude } = await getCityFromGeolocation();
    //       const cityName = await getCityName(latitude, longitude);

    //       weatherResponse = await fetch(
    //         `https://weather-and-environmental-data-service.onrender.com/forecast/3-day?q=${cityName}`
    //       );
    //       weatherData = await weatherResponse.json();
    //     } catch (err) {
    //       setError(err.message);
    //     }

    //   }


    const weatherData = getDummyWeatherData();

    try {
      const response = await fetch(BASE_URL + '/get-advice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cropName: crop,
          healthLabel: disease,
          forecast: weatherData
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recommendation');
      }

      const data = await response.json();
      console.log("DATAAAAAAAAAAAA", data)
      setRecommendation(data.advice);
      setWeatherRecommendations(data.weatherAdvice);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

   // Function to format advice text
   const formatAdvice = (text) => {
    const lines = text.split(/\n+/);
    return lines.map((line, index) => {
      if (/^\s*\d+\./.test(line)) {
        return (
          <li key={index} className="ml-4">
            {line.trim()}
          </li>
        );
      } else if (/^\s*[-•]/.test(line)) {
        return (
          <li key={index} className="ml-4 list-disc">
            {line.trim().replace(/^[-•]\s*/, '')}
          </li>
        );
      } else {
        return (
          <p key={index} className="mb-2">
            {line.trim()}
          </p>
        );
      }
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-green-800">Chat Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Label htmlFor="crop" className="text-green-700">
            Crop Name
          </Label>
          <Input
            type="text"
            placeholder="Enter crop name"
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            required
          />
          <Label htmlFor="disease" className="text-green-700 my-4">
            Disease Name
          </Label>
          <Input
            type="text"
            placeholder="Enter diseaase name"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            required
          />
           <Label htmlFor="city" className="text-green-700">
            City
          </Label>
          <Input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <Button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Get Recommendation'}
          </Button>
        </form>
        {error && (
          <div className="mt-4 p-4 bg-red-100 rounded-md">
            <p className="text-red-800">{error}</p>
          </div>
        )}
        {recommendation && (
          <div className="mt-4 p-4 bg-green-100 rounded-md">
            <h3 className="font-semibold mb-2 text-green-700">
              Recommendation:
            </h3>
            <p className="text-green-800">
            {formatAdvice(recommendation)}
            </p>
          </div>
        )}
         {weatherRecommendations && (
          <div className="mt-4 p-4 bg-blue-100 rounded-md">
            <div className="flex items-center mb-2">
              <WeatherIcon />
              <h3 className="font-semibold ml-2 text-blue-700">
                Keeping the weather in mind
              </h3>
            </div>
            <p className="text-blue-800">{weatherRecommendations}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChatRecommendation;