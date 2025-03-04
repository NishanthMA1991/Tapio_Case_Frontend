import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add Authorization token dynamically if needed
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server error
      console.error(
        `Error ${error.response.status}: ${error.response.data.message}`
      );
    } else if (error.request) {
      // No response received
      console.error("Network error: No response from server");
    } else {
      console.error("Request error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
