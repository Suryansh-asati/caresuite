import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seedTestUser() {
  try {
    const testEmail = 'test@caresuite.com';
    const testPassword = 'Test@123456';

    // Check if test user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: testEmail },
    });

    if (existingUser) {
      console.log(`[OK] Test user already exists with ID: ${existingUser.id}`);
      console.log(`  Email: ${existingUser.email}`);
      return existingUser;
    }

    // Create test user
    const passwordHash = await bcrypt.hash(testPassword, 10);
    const user = await prisma.user.create({
      data: {
        name: 'Test User',
        email: testEmail,
        passwordHash,
      },
    });

    console.log('[OK] Test user created successfully!');
    console.log(`  ID: ${user.id}`);
    console.log(`  Email: ${user.email}`);
    console.log(`  Name: ${user.name}`);
    console.log('\nUse this account to login:');
    console.log(`  Email: ${testEmail}`);
    console.log('  Password: configured in the seed script; not printed to stdout.');

    return user;
  } catch (error) {
    console.error('Error seeding test user:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedTestUser();
