import axios from 'axios';
import { getToken } from '../utils/auth';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

axiosClient.interceptors.request.use((config) => {
  const token = getToken();
  // Ensure headers object exists before assigning
  if (!config.headers) config.headers = {};
  if (token) {
    // use bracket notation to be safe
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
