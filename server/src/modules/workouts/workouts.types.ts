export interface WorkoutExerciseInput {
  name: string;
  sets?: number | null;
  reps?: number | null;
  weight?: number | null;
}

export interface WorkoutSessionInput {
  title: string;
  workoutType: string;
  duration?: number | null;
  calories?: number | null;
  notes?: string | null;
  exercises?: WorkoutExerciseInput[];
}

export interface WorkoutExerciseResponse {
  id: string;
  name: string;
  sets: number | null;
  reps: number | null;
  weight: number | null;
  workoutId: string;
  createdAt: Date;
}

export interface WorkoutSessionResponse {
  id: string;
  title: string;
  workoutType: string;
  duration: number | null;
  calories: number | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  exercises: WorkoutExerciseResponse[];
}
