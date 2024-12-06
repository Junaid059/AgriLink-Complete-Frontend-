
const API_BASE_URL = 'https://database-microservice-agrilink.onrender.com';

export const fetchHourlyWeatherFromDB = async () => {
    try {
        
      const response = await fetch(`${API_BASE_URL}/hourlyWeather`);
      const data = await response.json();
      
      console.log(data)
      
      if (data.length > 0) {
        const firstWeather = data[0];  
        const id = firstWeather._id;   
        
        console.log('Fetched weather data ID:', id); 
        
        return { ...firstWeather, id }; 
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching hourly weather from DB:', error);
      throw error;
    }
  };
  

export const updateHourlyWeatherInDB = async (weatherData, ID) => {
    try {
      console.log("Updating weather data:", weatherData);
  
     
      const formattedData = {
        current: {
          temp_c: weatherData.current.temp_c,
          condition: { text: weatherData.current.condition.text },
          wind_kph: weatherData.current.wind_kph,
          humidity: weatherData.current.humidity,
          vis_km: weatherData.current.vis_km,
        },
        forecast: {
          forecastday: [
            {
              hour: weatherData.forecast.forecastday[0].hour.map(hour => ({
                time: hour.time,
                temp_c: hour.temp_c,
                humidity: hour.humidity,
                wind_kph: hour.wind_kph,
              })),
            },
          ],
        },
      };
  
     
      const response = await fetch(`${API_BASE_URL}/hourlyWeather/${ID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData),
      });
  
      const updatedData = await response.json();
      return updatedData;
    } catch (error) {
      console.error('Error updating hourly weather in DB:', error);
      throw error;
    }
  };
  

export const createHourlyWeatherInDB = async (weatherData) => {
    try {
      
      console.log("kakaka", weatherData)
      const formattedData = {
        current: {
          temp_c: weatherData.current.temp_c,
          condition: { text: weatherData.current.condition.text },
          wind_kph: weatherData.current.wind_kph,
          humidity: weatherData.current.humidity,
          vis_km: weatherData.current.vis_km,
        },
        forecast: {
          forecastday: [
            {
              hour: weatherData.forecast.forecastday[0].hour.map(hour => ({
                time: hour.time,
                temp_c: hour.temp_c,
                humidity: hour.humidity,
                wind_kph: hour.wind_kph,
              })),
            },
          ],
        },
      };
  
      const response = await fetch(`${API_BASE_URL}/hourlyWeather`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData),
      });
      const newData = await response.json();
      return newData;
    } catch (error) {
      console.error('Error creating hourly weather in DB:', error);
      throw error;
    }
  };