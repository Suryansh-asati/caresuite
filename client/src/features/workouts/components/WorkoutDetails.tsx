import React from 'react';
import type { WorkoutSession } from '../types';

interface WorkoutDetailsProps {
  workout: WorkoutSession | null;
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));

export const WorkoutDetails: React.FC<WorkoutDetailsProps> = ({ workout }) => {
  if (!workout) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center text-sm text-slate-500">
        Select a workout to see the session details.
      </div>
    );
  }

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{workout.title}</h3>
          <p className="mt-1 text-sm text-slate-500">{workout.workoutType}</p>
        </div>
        <span className="text-sm text-slate-500">{formatDate(workout.createdAt)}</span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-slate-50 px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Duration</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            {workout.duration ?? 0} minutes
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Calories</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            {workout.calories != null ? workout.calories : 'Not added'}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Exercises</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">{workout.exercises.length}</p>
        </div>
      </div>

      {workout.notes ? (
        <div className="mt-5">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Notes</p>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
            {workout.notes}
          </p>
        </div>
      ) : null}

      <div className="mt-6">
        <h4 className="mb-3 text-sm font-semibold text-slate-900">Exercise log</h4>

        {workout.exercises.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-200 px-4 py-4 text-sm text-slate-500">
            No exercises were logged for this session.
          </p>
        ) : (
          <div className="space-y-3">
            {workout.exercises.map((exercise) => (
              <div key={exercise.id} className="rounded-xl border border-slate-200 px-4 py-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-medium text-slate-900">{exercise.name}</p>
                  <p className="text-sm text-slate-500">
                    {exercise.sets ?? '-'} sets{' '}
                    {exercise.reps != null ? `| ${exercise.reps} reps` : ''}
                    {exercise.weight != null ? ` | ${exercise.weight} weight` : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};
