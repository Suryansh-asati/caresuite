import axiosClient from '../../../shared/lib/axios';
import type { TherapyCategory, TherapySession } from '../types/therapy.types';

const unwrapData = <T>(response: { data: { data: T } }) => response.data.data;

export const therapyApi = {
  getSessions: async (category?: string): Promise<TherapySession[]> => {
    const response = await axiosClient.get('/therapy', {
      params: category ? { category } : undefined,
    });

    return unwrapData<TherapySession[]>(response);
  },

  getSessionById: async (id: string): Promise<TherapySession> => {
    const response = await axiosClient.get(`/therapy/${id}`);
    return unwrapData<TherapySession>(response);
  },

  getCategories: async (): Promise<TherapyCategory[]> => {
    const response = await axiosClient.get('/therapy/categories');
    return unwrapData<TherapyCategory[]>(response);
  },
};
