import axios from 'axios';
import type { TherapySession, TherapyCategory, TherapyResponse } from '../types';

const API_BASE = '/api/therapy';

/**
 * Fetch all therapy sessions with optional filters
 */
export const fetchTherapySessions = async (
  category?: string,
  limit?: number,
  offset?: number
): Promise<TherapyResponse<TherapySession[]>> => {
  try {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (limit) params.append('limit', String(limit));
    if (offset) params.append('offset', String(offset));

    const url = `${API_BASE}?${params.toString()}`;
    const response = await axios.get<TherapyResponse<TherapySession[]>>(url);
    return response.data;
  } catch (error) {
    const axiosError = error as { response?: { data?: { message?: string } }; message?: string };
    throw new Error(
      axiosError.response?.data?.message || axiosError.message || 'Failed to fetch therapy sessions'
    );
  }
};

/**
 * Fetch a specific therapy session by ID
 */
export const fetchTherapySessionById = async (
  id: string
): Promise<TherapyResponse<TherapySession>> => {
  try {
    const url = `${API_BASE}/${id}`;
    const response = await axios.get<TherapyResponse<TherapySession>>(url);
    return response.data;
  } catch (error) {
    const axiosError = error as { response?: { data?: { message?: string } }; message?: string };
    throw new Error(
      axiosError.response?.data?.message || axiosError.message || 'Failed to fetch therapy session'
    );
  }
};

/**
 * Fetch all available therapy categories
 */
export const fetchTherapyCategories = async (): Promise<TherapyResponse<TherapyCategory[]>> => {
  try {
    const url = `${API_BASE}/categories`;
    const response = await axios.get<TherapyResponse<TherapyCategory[]>>(url);
    return response.data;
  } catch (error) {
    const axiosError = error as { response?: { data?: { message?: string } }; message?: string };
    throw new Error(
      axiosError.response?.data?.message || axiosError.message || 'Failed to fetch categories'
    );
  }
};

export const therapyApi = {
  fetchTherapySessions,
  fetchTherapySessionById,
  fetchTherapyCategories,
};
