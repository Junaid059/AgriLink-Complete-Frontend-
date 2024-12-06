import axios from "axios";

// Set the base URL for the API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";


// Create a centralized Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
});

// Fetch all products
export const fetchProducts = async () => {
  try {
    const response = await apiClient.get("/search");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

// Search for products by name
export const searchProductsByName = async (name) => {
  try {
    const response = await apiClient.get("/search", {
      params: { name },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching products by name:", error);
    throw new Error("Failed to fetch products");
  }
};

export const searchProducts = async (params) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, { params });
    return response.data;
  } catch (error) {
    console.error("Error searching for products:", error);
    throw error;
  }
};
