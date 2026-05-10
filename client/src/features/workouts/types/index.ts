export interface WorkoutExercise {
  id: string;
  name: string;
  sets?: number | null;
  reps?: number | null;
  weight?: number | null;
  workoutId: string;
  createdAt: string;
}

export interface WorkoutSession {
  id: string;
  title: string;
  workoutType: string;
  duration?: number | null;
  calories?: number | null;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  exercises: WorkoutExercise[];
}

export interface WorkoutExercisePayload {
  name: string;
  sets?: number;
  reps?: number;
  weight?: number;
}

export interface WorkoutSessionPayload {
  title: string;
  workoutType: string;
  duration?: number;
  calories?: number;
  notes?: string;
  exercises?: WorkoutExercisePayload[];
}
