import { useState, useEffect } from 'react';
import type { DashboardOverview } from '../types/dashboard.types';
import { dashboardApi } from '../api/dashboard.api';

interface UseDashboardState {
  data: DashboardOverview | null;
  loading: boolean;
  error: string | null;
}

export const useDashboard = () => {
  const [state, setState] = useState<UseDashboardState>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const overview = await dashboardApi.getOverview();
        setState({
          data: overview,
          loading: false,
          error: null,
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load dashboard';
        setState({
          data: null,
          loading: false,
          error: errorMessage,
        });
      }
    };

    fetchDashboard();
  }, []);

  return state;
};
