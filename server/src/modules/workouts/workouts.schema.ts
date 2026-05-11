import { z } from 'zod';

const workoutTypes = [
  'Running',
  'Walking',
  'Cycling',
  'Yoga',
  'Strength Training',
  'Stretching',
  'Meditation',
  'Cardio',
  'Swimming',
  'Other',
] as const;

const workoutExerciseSchema = z.object({
  name: z.string().trim().min(1, 'Exercise name is required').max(120),
  sets: z.coerce.number().int().min(1).optional(),
  reps: z.coerce.number().int().min(1).optional(),
  weight: z.coerce.number().positive().optional(),
});

const workoutTitleSchema = z.string().trim().min(1, 'Title is required').max(120);

export const createWorkoutSchema = z.object({
  body: z.object({
    title: workoutTitleSchema,
    workoutType: z.enum(workoutTypes),
    duration: z.coerce.number().int().min(1, 'Duration must be at least 1 minute').optional(),
    calories: z.coerce.number().int().min(0).optional(),
    notes: z.string().trim().max(2000).optional(),
    exercises: z.array(workoutExerciseSchema).optional(),
  }),
});

export const updateWorkoutSchema = z.object({
  body: z.object({
    title: workoutTitleSchema,
    workoutType: z.enum(workoutTypes),
    duration: z.coerce.number().int().min(1, 'Duration must be at least 1 minute'),
    calories: z.coerce.number().int().min(0),
    notes: z.string().trim().max(2000),
    exercises: z.array(workoutExerciseSchema),
  }),
});

export const workoutIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Workout id is required'),
  }),
});

export type CreateWorkoutInput = z.infer<typeof createWorkoutSchema>['body'];
export type UpdateWorkoutInput = z.infer<typeof updateWorkoutSchema>['body'];
export type WorkoutExerciseInput = z.infer<typeof workoutExerciseSchema>;
export { workoutTypes };
