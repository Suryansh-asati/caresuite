import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { WorkoutDetails } from '../components/WorkoutDetails';
import { WorkoutForm } from '../components/WorkoutForm';
import { WorkoutList } from '../components/WorkoutList';
import { useWorkouts } from '../hooks/useWorkouts';
import type { WorkoutSession, WorkoutSessionPayload } from '../types';

export const WorkoutsPage: React.FC = () => {
  const {
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
  } = useWorkouts();
  const navigate = useNavigate();
  const { id: workoutId } = useParams();
  const [editingWorkout, setEditingWorkout] = useState<WorkoutSession | null>(null);
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutSession | null>(null);
  const [missingWorkoutId, setMissingWorkoutId] = useState<string | null>(null);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  useEffect(() => {
    if (workoutId) {
      const matchedWorkout = workouts.find((workout) => workout.id === workoutId);

      if (matchedWorkout) {
        setSelectedWorkout(matchedWorkout);
        setMissingWorkoutId(null);
        return;
      }

      if (missingWorkoutId === workoutId) {
        setSelectedWorkout(null);
        return;
      }

      setSelectedWorkout(null);

      if (!loading) {
        void fetchWorkoutById(workoutId).then((workout) => {
          if (workout) {
            setSelectedWorkout(workout);
            setMissingWorkoutId(null);
            return;
          }

          setMissingWorkoutId(workoutId);
        });
      }

      return;
    }

    setMissingWorkoutId(null);

    if (!selectedWorkout && workouts.length > 0) {
      setSelectedWorkout(workouts[0]);
    }
  }, [fetchWorkoutById, loading, missingWorkoutId, selectedWorkout, workoutId, workouts]);

  const handleSubmit = async (payload: WorkoutSessionPayload) => {
    if (editingWorkout) {
      const updatedWorkout = await updateWorkout(editingWorkout.id, payload);

      if (!updatedWorkout) {
        return false;
      }

      setEditingWorkout(null);
      setSelectedWorkout(updatedWorkout);
      navigate(`/workouts/${updatedWorkout.id}`, { replace: true });
      return true;
    }

    const createdWorkout = await createWorkout(payload);
    if (!createdWorkout) {
      return false;
    }

    setSelectedWorkout(createdWorkout);
    navigate(`/workouts/${createdWorkout.id}`, { replace: true });
    return true;
  };

  const handleEdit = (workout: WorkoutSession) => {
    setEditingWorkout(workout);
    setSelectedWorkout(workout);
    navigate(`/workouts/${workout.id}`);
  };

  const handleCancelEdit = () => {
    setEditingWorkout(null);
  };

  const handleView = (workout: WorkoutSession) => {
    setEditingWorkout(null);
    setSelectedWorkout(workout);
    navigate(`/workouts/${workout.id}`);
  };

  const handleDelete = async (id: string) => {
    const deleted = await deleteWorkout(id);

    if (deleted) {
      if (editingWorkout?.id === id) {
        setEditingWorkout(null);
      }

      if (selectedWorkout?.id === id) {
        setSelectedWorkout(null);
        navigate('/workouts', { replace: true });
      }
    }

    return deleted;
  };

  const isBusy = loading || saving;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Workout Tracker</h1>
        <p className="mt-2 text-sm text-slate-500">
          Log light, consistent sessions with a small exercise list and simple progress history.
        </p>
      </div>

      {error ? (
        <div className="mb-6 rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      {workoutId ? (
        <div className="mb-6 flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
          <span>
            {missingWorkoutId === workoutId
              ? 'This workout could not be loaded. It may not exist or you may not have access.'
              : 'Viewing a specific workout session.'}
          </span>
          <button
            type="button"
            onClick={() => navigate('/workouts')}
            className="rounded-full border border-slate-200 px-3 py-1.5 font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Back to history
          </button>
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="space-y-6">
          <WorkoutForm
            initialWorkout={editingWorkout}
            onSubmit={handleSubmit}
            isLoading={isBusy}
            onCancel={editingWorkout ? handleCancelEdit : undefined}
          />

          <section>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Workout history</h2>
              <p className="mt-1 text-sm text-slate-500">Newest sessions appear first.</p>
            </div>

            <WorkoutList
              workouts={workouts}
              loading={loading}
              deletingId={deletingId}
              selectedWorkoutId={selectedWorkout?.id ?? null}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </section>
        </div>

        <div className="lg:sticky lg:top-6 lg:self-start">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Workout details</h2>
            <p className="mt-1 text-sm text-slate-500">Review the session and its exercise log.</p>
          </div>

          <WorkoutDetails workout={selectedWorkout} />
        </div>
      </div>
    </div>
  );
};

export default WorkoutsPage;
