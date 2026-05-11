import React from 'react';
import type { WorkoutSession } from '../types';

interface WorkoutListProps {
  workouts: WorkoutSession[];
  loading: boolean;
  deletingId: string | null;
  selectedWorkoutId?: string | null;
  onView: (workout: WorkoutSession) => void;
  onEdit: (workout: WorkoutSession) => void;
  onDelete: (id: string) => Promise<boolean>;
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));

export const WorkoutList: React.FC<WorkoutListProps> = ({
  workouts,
  loading,
  deletingId,
  selectedWorkoutId,
  onView,
  onEdit,
  onDelete,
}) => {
  if (loading && workouts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center text-sm text-slate-500">
        Loading workouts...
      </div>
    );
  }

  if (workouts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center">
        <p className="text-base font-medium text-slate-700">No workouts yet.</p>
        <p className="mt-1 text-sm text-slate-500">
          Log a calm, consistent session to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {workouts.map((workout) => {
        const isDeleting = deletingId === workout.id;
        const exerciseCount = workout.exercises.length;
        const isSelected = selectedWorkoutId === workout.id;

        return (
          <article
            key={workout.id}
            className={`rounded-2xl border bg-white p-5 shadow-sm transition-colors ${
              isSelected ? 'border-slate-900' : 'border-slate-200'
            }`}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <button
                type="button"
                onClick={() => onView(workout)}
                className="min-w-0 flex-1 text-left"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-base font-semibold text-slate-900">{workout.title}</h3>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                    {workout.workoutType}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-600">
                  <span>{workout.duration ?? 0} min</span>
                  <span>
                    {exerciseCount} exercise{exerciseCount === 1 ? '' : 's'}
                  </span>
                  {workout.calories != null ? <span>{workout.calories} cal</span> : null}
                  <span>{formatDate(workout.createdAt)}</span>
                </div>
              </button>

              <div className="flex shrink-0 items-center gap-2 sm:pt-0.5">
                <button
                  type="button"
                  onClick={() => onView(workout)}
                  className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  View
                </button>
                <button
                  type="button"
                  onClick={() => onEdit(workout)}
                  className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(workout.id)}
                  disabled={isDeleting}
                  className="rounded-full border border-rose-200 px-3 py-1.5 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};
