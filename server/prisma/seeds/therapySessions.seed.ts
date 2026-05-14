import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const therapySessions = [
  {
    id: 'therapy-deep-sleep-recovery',
    title: 'Deep Sleep Recovery',
    description:
      'A gentle wind-down session with soft ambient textures and guided body release to support restful, uninterrupted sleep.',
    category: 'Sleep',
    duration: 22,
    thumbnail:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: 'therapy-anxiety-reset-5-min',
    title: '5-Minute Anxiety Reset',
    description:
      'A short grounding practice using paced breathing and calm narration to reduce immediate mental overwhelm.',
    category: 'Anxiety Relief',
    duration: 5,
    thumbnail:
      'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&w=1200&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: 'therapy-morning-clarity-meditation',
    title: 'Morning Clarity Meditation',
    description:
      'A clear and uplifting meditation to settle the mind and set a steady tone for the day ahead.',
    category: 'Meditation',
    duration: 12,
    thumbnail:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    id: 'therapy-ocean-breathing-session',
    title: 'Ocean Breathing Session',
    description:
      'Synchronize your breath to slow ocean-inspired cues for deeper calm and nervous system recovery.',
    category: 'Breathing',
    duration: 10,
    thumbnail:
      'https://images.unsplash.com/photo-1468581264429-2548ef9eb732?auto=format&fit=crop&w=1200&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
  {
    id: 'therapy-focus-restoration',
    title: 'Focus Restoration',
    description:
      'A distraction-light sound bed designed to help you return to deep work with steady concentration.',
    category: 'Focus',
    duration: 18,
    thumbnail:
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  },
  {
    id: 'therapy-stress-relief-soundscape',
    title: 'Stress Relief Soundscape',
    description:
      'Layered nature tones and low-frequency textures to release tension after a demanding day.',
    category: 'Relaxation',
    duration: 16,
    thumbnail:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
  },
] as const;

async function seedTherapySessions() {
  for (const session of therapySessions) {
    await prisma.therapySession.upsert({
      where: { id: session.id },
      update: {
        title: session.title,
        description: session.description,
        category: session.category,
        duration: session.duration,
        thumbnail: session.thumbnail,
        audioUrl: session.audioUrl,
      },
      create: {
        id: session.id,
        title: session.title,
        description: session.description,
        category: session.category,
        duration: session.duration,
        thumbnail: session.thumbnail,
        audioUrl: session.audioUrl,
      },
    });
  }
}

seedTherapySessions()
  .then(async () => {
    console.log('Therapy sessions seeded successfully.');
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error('Failed to seed therapy sessions:', error);
    await prisma.$disconnect();
    process.exit(1);
  });
