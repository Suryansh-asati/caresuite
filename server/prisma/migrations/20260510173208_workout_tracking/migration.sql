/*
  Warnings:

  - You are about to drop the `WorkoutEntry` table after backfilling rows into `WorkoutSession`.

*/
-- CreateTable
CREATE TABLE "WorkoutSession" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "workoutType" TEXT NOT NULL,
    "duration" INTEGER,
    "calories" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "WorkoutSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutExercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sets" INTEGER,
    "reps" INTEGER,
    "weight" DOUBLE PRECISION,
    "workoutId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkoutExercise_pkey" PRIMARY KEY ("id")
);

  -- Backfill old workout rows into the new session table.
  INSERT INTO "WorkoutSession" (
    "id",
    "title",
    "workoutType",
    "duration",
    "calories",
    "notes",
    "createdAt",
    "updatedAt",
    "userId"
  )
  SELECT
    "id",
    COALESCE(NULLIF(TRIM("type"), ''), 'Workout Session') AS "title",
    CASE
      WHEN "type" IS NULL OR TRIM("type") = '' THEN 'Other'
      WHEN LOWER(TRIM("type")) = 'running' THEN 'Running'
      WHEN LOWER(TRIM("type")) IN ('walk', 'walking') THEN 'Walking'
      WHEN LOWER(TRIM("type")) IN ('cycle', 'cycling') THEN 'Cycling'
      WHEN LOWER(TRIM("type")) = 'yoga' THEN 'Yoga'
      WHEN LOWER(TRIM("type")) IN ('strength', 'strength training') THEN 'Strength Training'
      WHEN LOWER(TRIM("type")) IN ('stretch', 'stretching') THEN 'Stretching'
      WHEN LOWER(TRIM("type")) IN ('meditate', 'meditation') THEN 'Meditation'
      WHEN LOWER(TRIM("type")) IN ('cardio', 'aerobic', 'aerobics') THEN 'Cardio'
      WHEN LOWER(TRIM("type")) IN ('swim', 'swimming') THEN 'Swimming'
      ELSE 'Other'
    END AS "workoutType",
    "durationMins" AS "duration",
    "calories",
    CASE
      WHEN "intensity" IS NULL OR TRIM("intensity") = '' THEN NULL
      ELSE CONCAT('Intensity: ', "intensity")
    END AS "notes",
    "date" AS "createdAt",
    "date" AS "updatedAt",
    "userId"
  FROM "WorkoutEntry";

-- CreateIndex
CREATE INDEX "WorkoutSession_userId_idx" ON "WorkoutSession"("userId");

-- CreateIndex
CREATE INDEX "WorkoutSession_createdAt_idx" ON "WorkoutSession"("createdAt");

-- CreateIndex
CREATE INDEX "WorkoutExercise_workoutId_idx" ON "WorkoutExercise"("workoutId");

-- AddForeignKey
ALTER TABLE "WorkoutSession" ADD CONSTRAINT "WorkoutSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "WorkoutSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "WorkoutEntry" DROP CONSTRAINT "WorkoutEntry_userId_fkey";

-- DropTable
DROP TABLE "WorkoutEntry";
