import React, { useEffect, useState } from 'react';
import { workoutTypes } from '../constants/workoutTypes';
import type { WorkoutType } from '../constants/workoutTypes';
import type { WorkoutSession, WorkoutSessionPayload } from '../types';

type ExerciseDraft = {
  id: string;
  name: string;
  sets: string;
  reps: string;
  weight: string;
};

interface WorkoutFormProps {
  initialWorkout?: WorkoutSession | null;
  onSubmit: (payload: WorkoutSessionPayload) => Promise<boolean>;
  isLoading?: boolean;
  onCancel?: () => void;
}

const createEmptyExercise = (): ExerciseDraft => ({
  id:
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`,
  name: '',
  sets: '',
  reps: '',
  weight: '',
});

const createExerciseFromWorkout = (
  exercise: WorkoutSession['exercises'][number]
): ExerciseDraft => ({
  id: exercise.id,
  name: exercise.name,
  sets: exercise.sets?.toString() ?? '',
  reps: exercise.reps?.toString() ?? '',
  weight: exercise.weight?.toString() ?? '',
});

const isWorkoutType = (value: string): value is WorkoutType =>
  workoutTypes.includes(value as WorkoutType);

export const WorkoutForm: React.FC<WorkoutFormProps> = ({
  initialWorkout = null,
  onSubmit,
  isLoading,
  onCancel,
}) => {
  const [title, setTitle] = useState('');
  const [workoutType, setWorkoutType] = useState<WorkoutType>(workoutTypes[0]);
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');
  const [notes, setNotes] = useState('');
  const [exercises, setExercises] = useState<ExerciseDraft[]>([createEmptyExercise()]);
  const [error, setError] = useState('');

  const isEditing = Boolean(initialWorkout);

  useEffect(() => {
    if (initialWorkout) {
      setTitle(initialWorkout.title);
      setWorkoutType(
        isWorkoutType(initialWorkout.workoutType) ? initialWorkout.workoutType : workoutTypes[0]
      );
      setDuration(initialWorkout.duration?.toString() ?? '');
      setCalories(initialWorkout.calories?.toString() ?? '');
      setNotes(initialWorkout.notes ?? '');
      setExercises(
        initialWorkout.exercises.length > 0
          ? initialWorkout.exercises.map(createExerciseFromWorkout)
          : [createEmptyExercise()]
      );
    } else {
      setTitle('');
      setWorkoutType(workoutTypes[0]);
      setDuration('');
      setCalories('');
      setNotes('');
      setExercises([createEmptyExercise()]);
    }

    setError('');
  }, [initialWorkout]);

  const updateExercise = (index: number, field: keyof ExerciseDraft, value: string) => {
    setExercises((currentExercises) =>
      currentExercises.map((exercise, exerciseIndex) =>
        exerciseIndex === index ? { ...exercise, [field]: value } : exercise
      )
    );
  };

  const addExercise = () => {
    setExercises((currentExercises) => [...currentExercises, createEmptyExercise()]);
  };

  const removeExercise = (index: number) => {
    setExercises((currentExercises) => {
      if (currentExercises.length === 1) {
        return [createEmptyExercise()];
      }

      return currentExercises.filter((_, exerciseIndex) => exerciseIndex !== index);
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setError('Title is required.');
      return;
    }

    if (!duration.trim()) {
      setError('Duration is required.');
      return;
    }

    const cleanedExercises = exercises
      .map((exercise) => ({
        name: exercise.name.trim(),
        sets: exercise.sets.trim(),
        reps: exercise.reps.trim(),
        weight: exercise.weight.trim(),
      }))
      .filter(
        (exercise) =>
          exercise.name.length > 0 ||
          exercise.sets.length > 0 ||
          exercise.reps.length > 0 ||
          exercise.weight.length > 0
      );

    if (cleanedExercises.some((exercise) => !exercise.name)) {
      setError('Each exercise needs a name.');
      return;
    }

    if (
      cleanedExercises.some(
        (exercise) => exercise.weight.length > 0 && Number(exercise.weight) <= 0
      )
    ) {
      setError('Weight must be greater than 0 when provided.');
      return;
    }

    const payload: WorkoutSessionPayload = {
      title: title.trim(),
      workoutType,
      duration: Number(duration),
      calories: calories.trim() ? Number(calories) : undefined,
      notes: notes.trim() ? notes.trim() : undefined,
      exercises: cleanedExercises.map((exercise) => ({
        name: exercise.name,
        sets: exercise.sets ? Number(exercise.sets) : undefined,
        reps: exercise.reps ? Number(exercise.reps) : undefined,
        weight: exercise.weight ? Number(exercise.weight) : undefined,
      })),
    };

    setError('');
    const success = await onSubmit(payload);

    if (success && !isEditing) {
      setTitle('');
      setWorkoutType(workoutTypes[0]);
      setDuration('');
      setCalories('');
      setNotes('');
      setExercises([createEmptyExercise()]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            {isEditing ? 'Edit workout' : 'New workout'}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Keep it simple: log the session, then note the exercises you want to remember.
          </p>
        </div>
        {isEditing && onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>
        ) : null}
      </div>

      {error ? (
        <p className="mb-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="workout-title" className="mb-1 block text-sm font-medium text-slate-700">
            Title
          </label>
          <input
            id="workout-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Upper body session"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
          />
        </div>

        <div>
          <label htmlFor="workout-type" className="mb-1 block text-sm font-medium text-slate-700">
            Workout type
          </label>
          <select
            id="workout-type"
            value={workoutType}
            onChange={(event) => {
              if (isWorkoutType(event.target.value)) {
                setWorkoutType(event.target.value);
              }
            }}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
          >
            {workoutTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="duration" className="mb-1 block text-sm font-medium text-slate-700">
            Duration (minutes)
          </label>
          <input
            id="duration"
            type="number"
            min="1"
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
            placeholder="45"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
          />
        </div>

        <div>
          <label htmlFor="calories" className="mb-1 block text-sm font-medium text-slate-700">
            Calories (optional)
          </label>
          <input
            id="calories"
            type="number"
            min="0"
            value={calories}
            onChange={(event) => setCalories(event.target.value)}
            placeholder="320"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="notes" className="mb-1 block text-sm font-medium text-slate-700">
            Notes (optional)
          </label>
          <textarea
            id="notes"
            rows={4}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="How did the session feel?"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
          />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Exercises</h3>
            <p className="text-sm text-slate-500">
              Add only the sets you want to keep. Empty rows are ignored.
            </p>
          </div>
          <button
            type="button"
            onClick={addExercise}
            className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Add exercise
          </button>
        </div>

        <div className="space-y-3">
          {exercises.map((exercise, index) => (
            <div key={exercise.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-slate-700">Exercise {index + 1}</p>
                <button
                  type="button"
                  onClick={() => removeExercise(index)}
                  className="text-sm font-medium text-slate-500 transition-colors hover:text-rose-600"
                >
                  Remove
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
                    Name
                  </label>
                  <input
                    type="text"
                    value={exercise.name}
                    onChange={(event) => updateExercise(index, 'name', event.target.value)}
                    placeholder="Bench Press"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
                    Sets
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={exercise.sets}
                    onChange={(event) => updateExercise(index, 'sets', event.target.value)}
                    placeholder="3"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
                    Reps
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={exercise.reps}
                    onChange={(event) => updateExercise(index, 'reps', event.target.value)}
                    placeholder="10"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
                    Weight
                  </label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={exercise.weight}
                    onChange={(event) => updateExercise(index, 'weight', event.target.value)}
                    placeholder="60"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isEditing ? 'Save changes' : 'Save workout'}
        </button>
      </div>
    </form>
  );
};
