import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const yogaSessions = [
  // Beginner Relaxation Sessions
  {
    id: 'yoga-gentle-morning-stretch',
    title: 'Gentle Morning Stretch',
    description:
      'Start your day with a calm, beginner-friendly stretching routine to awaken the body and prepare for the day ahead.',
    category: 'Relaxation',
    level: 'Beginner',
    intensity: 'low',
    duration: 10,
    poseCount: 8,
    thumbnail:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    benefits:
      'Increases flexibility, improves circulation, reduces morning stiffness, promotes mental clarity',
  },
  {
    id: 'yoga-evening-wind-down',
    title: 'Evening Wind Down',
    description:
      'A soothing sequence designed to calm the nervous system and prepare your body for a restful night of sleep.',
    category: 'Relaxation',
    level: 'Beginner',
    intensity: 'low',
    duration: 15,
    poseCount: 10,
    thumbnail:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    benefits: 'Reduces stress, improves sleep quality, releases tension, promotes relaxation',
  },
  {
    id: 'yoga-bed-stretching',
    title: 'Bed Stretching Yoga',
    description:
      'Perfect for anytime, this sequence can be performed on your bed to gently stretch muscles and improve flexibility.',
    category: 'Relaxation',
    level: 'Beginner',
    intensity: 'low',
    duration: 8,
    poseCount: 6,
    thumbnail:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    benefits: 'Alleviates morning stiffness, improves flexibility, increases energy levels',
  },

  // Beginner Energizing Sessions
  {
    id: 'yoga-sun-salutation-basics',
    title: 'Sun Salutation Basics',
    description:
      'Learn the foundational Sun Salutation sequence with clear instructions and modifications for beginners.',
    category: 'Energizing',
    level: 'Beginner',
    intensity: 'low',
    duration: 12,
    poseCount: 12,
    thumbnail:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    benefits: 'Builds body awareness, warms up the body, energizes the mind, improves coordination',
  },
  {
    id: 'yoga-standing-poses-intro',
    title: 'Standing Poses Introduction',
    description:
      'An introduction to essential standing poses to build strength and improve balance in a safe, supported way.',
    category: 'Energizing',
    level: 'Beginner',
    intensity: 'medium',
    duration: 18,
    poseCount: 8,
    thumbnail:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    benefits: 'Builds leg strength, improves balance, enhances posture, increases stability',
  },

  // Beginner Flexibility Sessions
  {
    id: 'yoga-hip-opening-beginners',
    title: 'Hip Opening for Beginners',
    description:
      'Gently open your hips with accessible poses that help release tension stored in this area.',
    category: 'Flexibility',
    level: 'Beginner',
    intensity: 'low',
    duration: 14,
    poseCount: 7,
    thumbnail:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    benefits:
      'Releases hip tension, improves flexibility, reduces lower back pain, enhances mobility',
  },
  {
    id: 'yoga-hamstring-stretches',
    title: 'Hamstring Stretches',
    description:
      'A focused session targeting hamstring muscles to increase flexibility and reduce tightness.',
    category: 'Flexibility',
    level: 'Beginner',
    intensity: 'low',
    duration: 10,
    poseCount: 6,
    thumbnail:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    benefits: 'Improves hamstring flexibility, reduces leg stiffness, supports better posture',
  },

  // Beginner Strength Sessions
  {
    id: 'yoga-core-strengthening-easy',
    title: 'Core Strengthening - Easy',
    description:
      'Build core stability with gentle, beginner-friendly exercises that strengthen without strain.',
    category: 'Strength',
    level: 'Beginner',
    intensity: 'medium',
    duration: 15,
    poseCount: 9,
    thumbnail:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    benefits:
      'Strengthens core muscles, improves posture, supports spinal health, increases stability',
  },
  {
    id: 'yoga-arm-strength-intro',
    title: 'Arm Strength Introduction',
    description:
      'Build arm and shoulder strength with accessible poses and modifications for all fitness levels.',
    category: 'Strength',
    level: 'Beginner',
    intensity: 'medium',
    duration: 16,
    poseCount: 8,
    thumbnail:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    benefits: 'Builds arm and shoulder strength, improves upper body endurance, enhances posture',
  },

  // Intermediate Sessions
  {
    id: 'yoga-vinyasa-flow-intermediate',
    title: 'Vinyasa Flow Intermediate',
    description:
      'A flowing sequence connecting breath with movement, building strength and endurance with intermediate poses.',
    category: 'Energizing',
    level: 'Intermediate',
    intensity: 'medium',
    duration: 30,
    poseCount: 20,
    thumbnail:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    benefits:
      'Builds strength and endurance, improves breath control, increases cardiovascular health, enhances mind-body connection',
  },
  {
    id: 'yoga-deep-flexibility-stretch',
    title: 'Deep Flexibility Stretch',
    description:
      'A comprehensive stretching session targeting all major muscle groups with deeper, longer holds.',
    category: 'Flexibility',
    level: 'Intermediate',
    intensity: 'medium',
    duration: 25,
    poseCount: 12,
    thumbnail:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    benefits:
      'Significantly improves flexibility, reduces muscle tension, enhances range of motion',
  },
  {
    id: 'yoga-balance-and-stability',
    title: 'Balance and Stability',
    description:
      'Challenge your balance with intermediate poses that build stability and body awareness.',
    category: 'Strength',
    level: 'Intermediate',
    intensity: 'medium',
    duration: 20,
    poseCount: 10,
    thumbnail:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    benefits: 'Improves balance, strengthens stabilizer muscles, enhances focus and concentration',
  },
  {
    id: 'yoga-restorative-deep-relaxation',
    title: 'Restorative Deep Relaxation',
    description:
      'A deeply relaxing practice using props and longer holds to activate the parasympathetic nervous system.',
    category: 'Relaxation',
    level: 'Intermediate',
    intensity: 'low',
    duration: 35,
    poseCount: 5,
    thumbnail:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    benefits:
      'Promotes deep relaxation, reduces stress and anxiety, supports nervous system recovery',
  },
] as const;

async function seedYogaSessions() {
  for (const session of yogaSessions) {
    await prisma.yogaSession.upsert({
      where: { id: session.id },
      update: {
        title: session.title,
        description: session.description,
        category: session.category,
        level: session.level,
        intensity: session.intensity,
        duration: session.duration,
        poseCount: session.poseCount,
        thumbnail: session.thumbnail,
        videoUrl: session.videoUrl,
        benefits: session.benefits,
      },
      create: {
        id: session.id,
        title: session.title,
        description: session.description,
        category: session.category,
        level: session.level,
        intensity: session.intensity,
        duration: session.duration,
        poseCount: session.poseCount,
        thumbnail: session.thumbnail,
        videoUrl: session.videoUrl,
        benefits: session.benefits,
      },
    });
  }
}

seedYogaSessions()
  .then(async () => {
    console.log('Yoga sessions seeded successfully.');
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error('Failed to seed yoga sessions:', error);
    await prisma.$disconnect();
    process.exit(1);
  });
