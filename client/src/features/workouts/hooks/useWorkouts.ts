import { useCallback, useState } from 'react';
import { workoutsApi } from '../api/workoutsApi';
import type { WorkoutSession, WorkoutSessionPayload } from '../types';
import { getErrorMessage } from '../utils/getErrorMessage';

export const useWorkouts = () => {
  const [workouts, setWorkouts] = useState<WorkoutSession[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkouts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await workoutsApi.getWorkouts();
      setWorkouts(data);
    } catch (error: unknown) {
      setError(getErrorMessage(error, 'Failed to fetch workouts'));
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWorkoutById = useCallback(async (id: string) => {
    setError(null);

    try {
      const workout = await workoutsApi.getWorkout(id);
      setWorkouts((currentWorkouts) => {
        const existingIndex = currentWorkouts.findIndex((item) => item.id === workout.id);

        if (existingIndex === -1) {
          return [workout, ...currentWorkouts];
        }

        return currentWorkouts.map((item) => (item.id === workout.id ? workout : item));
      });

      return workout;
    } catch (error: unknown) {
      setError(getErrorMessage(error, 'Failed to fetch workout'));
      return null;
    }
  }, []);

  const createWorkout = async (payload: WorkoutSessionPayload) => {
    setSaving(true);
    setError(null);

    try {
      const workout = await workoutsApi.createWorkout(payload);
      setWorkouts((currentWorkouts) => [workout, ...currentWorkouts]);
      return workout;
    } catch (error: unknown) {
      setError(getErrorMessage(error, 'Failed to create workout'));
      return null;
    } finally {
      setSaving(false);
    }
  };

  const updateWorkout = async (id: string, payload: WorkoutSessionPayload) => {
    setSaving(true);
    setError(null);

    try {
      const updatedWorkout = await workoutsApi.updateWorkout(id, payload);
      setWorkouts((currentWorkouts) =>
        currentWorkouts.map((workout) => (workout.id === id ? updatedWorkout : workout))
      );
      return updatedWorkout;
    } catch (error: unknown) {
      setError(getErrorMessage(error, 'Failed to update workout'));
      return null;
    } finally {
      setSaving(false);
    }
  };

  const deleteWorkout = async (id: string) => {
    setDeletingId(id);
    setError(null);

    try {
      await workoutsApi.deleteWorkout(id);
      setWorkouts((currentWorkouts) => currentWorkouts.filter((workout) => workout.id !== id));
      return true;
    } catch (error: unknown) {
      setError(getErrorMessage(error, 'Failed to delete workout'));
      return false;
    } finally {
      setDeletingId(null);
    }
  };

  return {
    workouts,
    loading,
    saving,
    deletingId,
    error,
    fetchWorkouts,
    fetchWorkoutById,
    createWorkout,
    updateWorkout,
    deleteWorkout,
  };
};
