import axios from 'axios';
// const BASE_URL = import.meta.env.VITE_BACKEND_URL;
import BACKEND_URL from '../url';
const BASE_URL = BACKEND_URL;

const handleResponse = async (response) => {
  try {
    console.log('🚀 ~ handleResponse ~ response:', response);
    if (response.status >= 200 && response.status < 300) {
      return { data: response.data.data, message: response.data.message };
    } else {
      return { error: response.data.message };
    }
  } catch (error) {
    return { error: error };
  }
};

const FarmerCalenderService = {
  getData: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/crop-data`);
      console.log('🚀 ~ getData ~ response', response);
      return handleResponse(response);
    } catch (error) {
      return { error: error };
    }
  },

  getWeatherData: async (city) => {
    try {
      // const response = await axios.get(`${BASE_URL}/forecast/3-day?q=${city}`);
      const response = await axios.get(`${BASE_URL}/history/historical-weather-city?city=${city}`);
      console.log('🚀 ~ getWeatherData ~ response', response);
      return handleResponse(response);
    } catch (error) {
      return { error: error };
    }
  },

  getEndangeredCrops: async (temperatures, country, region, startDate) => {
    try {
      console.log('🚀 ~ getEndangeredCrops ~ temparatures', temperatures);
      console.log('🚀 ~ getEndangeredCrops ~ country', country);
      console.log('🚀 ~ getEndangeredCrops ~ region', region);
      console.log('🚀 ~ getEndangeredCrops ~ startDate', startDate);

      const response = await axios.post(
        `${BASE_URL}/crop-data/crops/endangered`,
        {
          temperatures: temperatures,
          country: country,
          region: region,
          startDate: startDate,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      return handleResponse(response);
    } catch (error) {
      return { error: error };
    }
  },

  getRecommendedCrops: async (temperatures, country, region, startDate) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/crop-data/crops/recommended`,
        {
          temperatures: temperatures,
          country: country,
          region: region,
          startDate: startDate,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      return handleResponse(response);
    } catch (error) {
      return { error: error };
    }
  },

  getCropActivities: async (data) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/farming-activity/crop-activities`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      return handleResponse(response);
    } catch (error) {
      return { error: error };
    }
  },

  getFarmingCalendar: async (data) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/farming-activity/farming-calendar`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      return handleResponse(response);
    } catch (error) {
      return { error: error };
    }
  },

  getActivityAlerts: async (data) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/farming-activity/activity-alerts`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      return handleResponse(response);
    } catch (error) {
      return { error: error };
    }
  },
};

export default FarmerCalenderService;
