import axiosClient from '../../../shared/lib/axios';
import type { YogaSession, YogaCategory, YogaLevel } from '../types/yoga.types';

const unwrapData = <T>(response: { data: { data: T } }) => response.data.data;

export const yogaApi = {
  getSessions: async (category?: string, level?: string): Promise<YogaSession[]> => {
    const response = await axiosClient.get('/yoga', {
      params: {
        ...(category ? { category } : {}),
        ...(level ? { level } : {}),
      },
    });

    return unwrapData<YogaSession[]>(response);
  },

  getSessionById: async (id: string): Promise<YogaSession> => {
    const response = await axiosClient.get(`/yoga/${id}`);
    return unwrapData<YogaSession>(response);
  },

  getCategories: async (): Promise<YogaCategory[]> => {
    const response = await axiosClient.get('/yoga/categories');
    return unwrapData<YogaCategory[]>(response);
  },

  getLevels: async (): Promise<YogaLevel[]> => {
    const response = await axiosClient.get('/yoga/levels');
    return unwrapData<YogaLevel[]>(response);
  },
};
