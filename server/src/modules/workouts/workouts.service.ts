import { PrismaClient } from '@prisma/client';
import type { CreateWorkoutInput, UpdateWorkoutInput } from './workouts.schema';

const prisma = new PrismaClient();

const workoutInclude = {
  exercises: {
    orderBy: {
      createdAt: 'asc' as const,
    },
  },
} as const;

const createHttpError = (statusCode: number, message: string) => {
  const error = new Error(message) as Error & { statusCode: number };
  error.statusCode = statusCode;
  return error;
};

const normalizeNotes = (notes?: string | null) => {
  const trimmedNotes = notes?.trim();
  return trimmedNotes ? trimmedNotes : null;
};

export class WorkoutsService {
  async createWorkout(userId: string, data: CreateWorkoutInput) {
    const exercises = data.exercises ?? [];

    return prisma.workoutSession.create({
      data: {
        title: data.title.trim(),
        workoutType: data.workoutType,
        duration: data.duration ?? null,
        calories: data.calories ?? null,
        notes: normalizeNotes(data.notes),
        userId,
        exercises: exercises.length
          ? {
              create: exercises.map((exercise) => ({
                name: exercise.name.trim(),
                sets: exercise.sets ?? null,
                reps: exercise.reps ?? null,
                weight: exercise.weight ?? null,
              })),
            }
          : undefined,
      },
      include: workoutInclude,
    });
  }

  async getWorkoutsByUserId(userId: string) {
    return prisma.workoutSession.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: workoutInclude,
    });
  }

  async getWorkoutById(workoutId: string, userId: string) {
    const workout = await prisma.workoutSession.findUnique({
      where: { id: workoutId },
      include: workoutInclude,
    });

    if (!workout) {
      throw createHttpError(404, 'Workout session not found');
    }

    if (workout.userId !== userId) {
      throw createHttpError(403, 'Forbidden to access this workout');
    }

    return workout;
  }

  async updateWorkout(workoutId: string, userId: string, data: UpdateWorkoutInput) {
    const existingWorkout = await prisma.workoutSession.findUnique({
      where: { id: workoutId },
    });

    if (!existingWorkout) {
      throw createHttpError(404, 'Workout session not found');
    }

    if (existingWorkout.userId !== userId) {
      throw createHttpError(403, 'Forbidden to update this workout');
    }

    const exercises = data.exercises;

    return prisma.workoutSession.update({
      where: { id: workoutId },
      data: {
        title: data.title.trim(),
        workoutType: data.workoutType,
        duration: data.duration ?? null,
        calories: data.calories ?? null,
        notes: normalizeNotes(data.notes),
        exercises:
          exercises === undefined
            ? undefined
            : {
                deleteMany: {},
                create: exercises.map((exercise) => ({
                  name: exercise.name.trim(),
                  sets: exercise.sets ?? null,
                  reps: exercise.reps ?? null,
                  weight: exercise.weight ?? null,
                })),
              },
      },
      include: workoutInclude,
    });
  }

  async deleteWorkout(workoutId: string, userId: string) {
    const existingWorkout = await prisma.workoutSession.findUnique({
      where: { id: workoutId },
    });

    if (!existingWorkout) {
      throw createHttpError(404, 'Workout session not found');
    }

    if (existingWorkout.userId !== userId) {
      throw createHttpError(403, 'Forbidden to delete this workout');
    }

    return prisma.workoutSession.delete({
      where: { id: workoutId },
    });
  }
}

export const workoutsService = new WorkoutsService();
