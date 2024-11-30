import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add a rating
export const addRating = async (ratingData) => {
  const response = await api.post('/addrating', ratingData);
  return response.data;
};

// Add feedback
export const addFeedback = async (feedbackData) => {
  const response = await api.post('/add-feedback', feedbackData);
  return response.data;
};

// Track feedback
export const trackFeedback = async (queryParams) => {
  const response = await api.get('/api/user/track-feedback', {
    params: queryParams,
  });
  return response.data;
};

export default api;
