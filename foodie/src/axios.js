import axios from 'axios';
import { apiUrl } from '../config';

// Create an Axios instance with default headers
const axiosInstance = axios.create({
  // Replace 'your-base-url' with your API base URL
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    // common: {
    //   'X-CSRFToken': fetchCsrfToken(), // Use your function to get the CSRF token
      // You can add other common headers here if needed
    // },
  },
});

export default axiosInstance;
