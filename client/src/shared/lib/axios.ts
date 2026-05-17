import axios from 'axios';
import { getToken } from '../utils/auth';
import { API_URL } from '../../config/api';

const axiosClient = axios.create({
  baseURL: API_URL,
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
