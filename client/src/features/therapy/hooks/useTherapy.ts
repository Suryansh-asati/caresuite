import { useState, useEffect } from 'react';
import type { TherapySession, TherapyCategory } from '../types';
import { therapyApi } from '../api';

interface UseTherapySessionsResult {
  sessions: TherapySession[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useTherapySessions = (
  category?: string,
  limit?: number,
  offset?: number
): UseTherapySessionsResult => {
  const [sessions, setSessions] = useState<TherapySession[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await therapyApi.fetchTherapySessions(category, limit, offset);
      setSessions(response.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch therapy sessions';
      setError(errorMessage);
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [category, limit, offset]);

  return { sessions, loading, error, refetch: fetchSessions };
};

interface UseTherapySessionByIdResult {
  session: TherapySession | null;
  loading: boolean;
  error: string | null;
}

export const useTherapySessionById = (id: string): UseTherapySessionByIdResult => {
  const [session, setSession] = useState<TherapySession | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await therapyApi.fetchTherapySessionById(id);
        setSession(response.data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch therapy session';
        setError(errorMessage);
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSession();
    }
  }, [id]);

  return { session, loading, error };
};

interface UseTherapyCategoriesResult {
  categories: TherapyCategory[];
  loading: boolean;
  error: string | null;
}

export const useTherapyCategories = (): UseTherapyCategoriesResult => {
  const [categories, setCategories] = useState<TherapyCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await therapyApi.fetchTherapyCategories();
        setCategories(response.data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch categories';
        setError(errorMessage);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};
