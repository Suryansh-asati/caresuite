-- CreateTable
CREATE TABLE "TherapySession" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "thumbnail" TEXT,
    "audioUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TherapySession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TherapySession_category_idx" ON "TherapySession"("category");

-- CreateIndex
CREATE INDEX "TherapySession_createdAt_idx" ON "TherapySession"("createdAt");
