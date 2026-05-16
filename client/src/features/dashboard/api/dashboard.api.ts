import axios from 'axios';
import type { DashboardOverview } from '../types/dashboard.types';
import { API_URL } from '../../../config/api';

const apiClient = axios.create({
  baseURL: `${API_URL}/dashboard`,
});

// Request interceptor to add bearer token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const dashboardApi = {
  getOverview: async (): Promise<DashboardOverview> => {
    const response = await apiClient.get('/overview');
    return response.data.data;
  },
};
