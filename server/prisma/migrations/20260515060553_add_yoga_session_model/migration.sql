/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "YogaSession" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "thumbnail" TEXT,
    "videoUrl" TEXT NOT NULL,
    "poseCount" INTEGER,
    "intensity" TEXT,
    "benefits" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "YogaSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "YogaSession_category_idx" ON "YogaSession"("category");

-- CreateIndex
CREATE INDEX "YogaSession_level_idx" ON "YogaSession"("level");

-- CreateIndex
CREATE INDEX "YogaSession_createdAt_idx" ON "YogaSession"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
