import axios from "axios";
// const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const handleResponse = async (response) => {
  try {
    console.log("🚀 ~ handleResponse ~ response:", response);
    if (response.status >= 200 && response.status < 300) {
      return { data: response.data, message: response.data.message };
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
      return handleResponse(response);
    } catch (error) {
      return { error: error };
    }
  },
};

export default FarmerCalenderService;