import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verifySeed() {
  try {
    const users = await prisma.user.count();
    const therapySessions = await prisma.therapySession.count();
    const yogaSessions = await prisma.yogaSession.count();
    const moodEntries = await prisma.moodEntry.count();
    const journals = await prisma.journalEntry.count();
    const workouts = await prisma.workoutSession.count();

    console.log('✅ Database Setup Complete:');
    console.log(`   Users: ${users}`);
    console.log(`   Therapy Sessions: ${therapySessions}`);
    console.log(`   Yoga Sessions: ${yogaSessions}`);
    console.log(`   Mood Entries: ${moodEntries}`);
    console.log(`   Journal Entries: ${journals}`);
    console.log(`   Workout Sessions: ${workouts}`);
  } catch (error) {
    console.error('Error verifying seed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

verifySeed();
