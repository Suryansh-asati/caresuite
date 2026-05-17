import axios from 'axios';
import type { WorkoutSession, WorkoutSessionPayload } from '../types';
import { API_URL } from '../../../config/api';

const apiClient = axios.create({
  baseURL: `${API_URL}/workouts`,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const unwrapData = <T>(response: { data: { data: T } }) => response.data.data;

export const workoutsApi = {
  getWorkouts: async (): Promise<WorkoutSession[]> => {
    const response = await apiClient.get('');
    return unwrapData<WorkoutSession[]>(response);
  },

  getWorkout: async (id: string): Promise<WorkoutSession> => {
    const response = await apiClient.get(`/${id}`);
    return unwrapData<WorkoutSession>(response);
  },

  createWorkout: async (data: WorkoutSessionPayload): Promise<WorkoutSession> => {
    const response = await apiClient.post('', data);
    return unwrapData<WorkoutSession>(response);
  },

  updateWorkout: async (id: string, data: WorkoutSessionPayload): Promise<WorkoutSession> => {
    const response = await apiClient.put(`/${id}`, data);
    return unwrapData<WorkoutSession>(response);
  },

  deleteWorkout: async (id: string): Promise<void> => {
    await apiClient.delete(`/${id}`);
  },
};
