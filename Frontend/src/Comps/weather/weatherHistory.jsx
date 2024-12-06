
const API_BASE_URL = 'https://database-microservice-agrilink.onrender.com';

export const fetchWeatherHistoryFromDB = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/weatherHistories`);
    const data = await response.json();

    if (data.length > 0) {
      const firstForecast = data[0]; 
      const id = firstForecast._id;   

      console.log('Fetched weather forecast data ID:', id);  

      return { ...firstForecast, id };  
    } else {
        return null;
    }
  } catch (error) {
    console.error('Error fetching weather history from DB:', error);
    throw error;
  }
};


export const updateWeatherHistoryInDB = async (historyData, ID) => {
    try {
      console.log("Updating weather history data:", historyData);
  
      // Format
      const formattedData = {
        forecast: {
          forecastday: historyData.forecast.forecastday.map(day => ({
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
  
     
      const response = await fetch(`${API_BASE_URL}/weatherHistories/${ID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData),
      });
  
      const updatedData = await response.json();
      return updatedData;
    } catch (error) {
      console.error('Error updating weather history in DB:', error);
      throw error;
    }
  };

export const createWeatherHistoryInDB = async (historyData) => {
    try {
      console.log("Creating new weather history data:", historyData);

      const formattedData = {
        forecast: {
          forecastday: historyData.forecast.forecastday.map(day => ({
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
  
      const response = await fetch(`${API_BASE_URL}/weatherHistories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData),
      });
  
      const newData = await response.json();
      return newData;
    } catch (error) {
      console.error('Error creating weather history in DB:', error);
      throw error;
    }
  };
    