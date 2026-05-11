export const workoutTypes = [
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

export type WorkoutType = (typeof workoutTypes)[number];
