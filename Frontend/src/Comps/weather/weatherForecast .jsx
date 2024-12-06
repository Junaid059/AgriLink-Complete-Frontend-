
const API_BASE_URL = 'https://database-microservice-agrilink.onrender.com';

export const fetchWeatherForecastFromDB = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/weatherForecasts`);
    const data = await response.json();

    console.log("in forevast", data)


    if (data.length > 0) {
      const firstForecast = data[0];  
      const id = firstForecast._id;  

      console.log('Fetched weather forecast data ID:', id);  

      return { ...firstForecast, id }; 
    } else {
        return null;
    }
  } catch (error) {
    console.error('Error fetching weather forecast from DB:', error);
    throw error;
  }
};

export const updateWeatherForecastInDB = async (forecastData, ID) => {
    try {
      console.log("Updating weather forecast data:", forecastData);
  
      const formattedData = {
        forecast: {
          forecastday: forecastData.forecast.forecastday.map(day => ({
            date: day.date,
            day: {
              maxtemp_c: day.day.maxtemp_c,
              mintemp_c: day.day.mintemp_c,
              avghumidity: day.day.avghumidity,
              maxwind_kph: day.day.maxwind_kph,
              condition: {
                text: day.day.condition.text,
              },
              uv: day.day.uv,
            },
            astro: {
              sunrise: day.astro.sunrise,
              sunset: day.astro.sunset,
            }
          }))
        }
      };
  
     
      const response = await fetch(`${API_BASE_URL}/weatherForecasts/${ID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData),
      });
  
      const updatedData = await response.json();
      return updatedData;
    } catch (error) {
      console.error('Error updating weather forecast in DB:', error);
      throw error;
    }
  };

export const createWeatherForecastInDB = async (forecastData) => {
    try {
      console.log("Creating new weather forecast data:", forecastData);
  

      const formattedData = {
        forecast: {
          forecastday: forecastData.forecast.forecastday.map(day => ({
            date: day.date,
            day: {
              maxtemp_c: day.day.maxtemp_c,
              mintemp_c: day.day.mintemp_c,
              avghumidity: day.day.avghumidity,
              maxwind_kph: day.day.maxwind_kph,
              condition: {
                text: day.day.condition.text,
              },
              uv: day.day.uv,
            },
            astro: {
              sunrise: day.astro.sunrise,
              sunset: day.astro.sunset,
            }
          }))
        }
      };
  
      const response = await fetch(`${API_BASE_URL}/weatherForecasts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData),
      });
  
      const newData = await response.json();
      return newData;
    } catch (error) {
      console.error('Error creating weather forecast in DB:', error);
      throw error;
    }
  };
    