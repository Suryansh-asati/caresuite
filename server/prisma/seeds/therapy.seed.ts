import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const therapySessions = [
  {
    title: 'Deep Sleep Recovery',
    description:
      "A guided meditation designed to help you drift into a peaceful, restorative sleep. Let go of the day's stress and tension as you journey through calming soundscapes.",
    category: 'Sleep',
    duration: 28,
    thumbnail: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    title: '5-Minute Anxiety Reset',
    description:
      'A powerful grounding exercise to calm your nervous system in just 5 minutes. Perfect for moments when you need quick relief and clarity.',
    category: 'Anxiety Relief',
    duration: 5,
    thumbnail: 'https://images.unsplash.com/photo-1533928298208-27ff66555d23?w=500&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    title: 'Morning Clarity Meditation',
    description:
      'Start your day with intention and focus. This gentle meditation sets the tone for a productive, peaceful day ahead.',
    category: 'Meditation',
    duration: 12,
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    title: 'Ocean Breathing Session',
    description:
      'Connect with the rhythm of the ocean through this therapeutic breathing exercise. Calm your mind and balance your energy.',
    category: 'Breathing',
    duration: 15,
    thumbnail: 'https://images.unsplash.com/photo-1505375967303-4d71bcdd2d5b?w=500&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
  {
    title: 'Focus Restoration',
    description:
      'Restore your mental clarity and concentration with this scientifically-designed audio session. Perfect for work breaks and study sessions.',
    category: 'Focus',
    duration: 20,
    thumbnail: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  },
  {
    title: 'Stress Relief Soundscape',
    description:
      'Immerse yourself in soothing natural sounds layered with calming music. Let your worries melt away as you find your center.',
    category: 'Relaxation',
    duration: 25,
    thumbnail: 'https://images.unsplash.com/photo-1487867552963-612f2a64c276?w=500&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
  },
  {
    title: 'Progressive Body Scan',
    description:
      'A comprehensive body scan meditation that guides you through systematic relaxation of each part of your body. Ideal for stress release.',
    category: 'Meditation',
    duration: 30,
    thumbnail: 'https://images.unsplash.com/photo-1528991435120-da109993812d?w=500&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
  },
  {
    title: 'Bedtime Wind Down',
    description:
      'Prepare your mind and body for sleep with this gentle guided journey. Release the tension from your day and embrace restful sleep.',
    category: 'Sleep',
    duration: 22,
    thumbnail: 'https://images.unsplash.com/photo-1518186285046-004ad4b834d9?w=500&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
  },
  {
    title: 'Mindful Walking Guide',
    description:
      'Enhance your walks with mindfulness. This audio guide helps you stay present and connected during your daily movement.',
    category: 'Meditation',
    duration: 18,
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
  },
  {
    title: 'Relaxing Rain Sounds',
    description:
      'The gentle patter of rain combined with ambient music creates the perfect backdrop for relaxation, focus, or sleep.',
    category: 'Relaxation',
    duration: 35,
    thumbnail: 'https://images.unsplash.com/photo-1505372182798-1b31b5c7a41d?w=500&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
  },
  {
    title: 'Panic Attack Relief',
    description:
      'When anxiety strikes, this guided technique can help ground you and bring you back to calm. Listen whenever you need support.',
    category: 'Anxiety Relief',
    duration: 8,
    thumbnail: 'https://images.unsplash.com/photo-1500595046891-503bc9a3f8bb?w=500&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
  },
  {
    title: 'Box Breathing Exercise',
    description:
      'Master this simple yet powerful breathing technique used by athletes and soldiers. Regulate your nervous system in minutes.',
    category: 'Breathing',
    duration: 10,
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
  },
  {
    title: 'Forest Immersion Therapy',
    description:
      'Transport yourself to a serene forest with binaural audio. Experience the healing power of nature from anywhere.',
    category: 'Relaxation',
    duration: 32,
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
  },
  {
    title: 'Afternoon Energy Boost',
    description:
      'Combat that mid-afternoon slump with this revitalizing session. Energize without caffeine and maintain your momentum.',
    category: 'Focus',
    duration: 12,
    thumbnail: 'https://images.unsplash.com/photo-1493208522019-e9a91eca0ae3?w=500&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
  },
  {
    title: 'Loving-Kindness Meditation',
    description:
      'Cultivate compassion and positive energy through this transformative meditation. Extend kindness to yourself and others.',
    category: 'Meditation',
    duration: 24,
    thumbnail: 'https://images.unsplash.com/photo-1512535541542-48517adb6b9a?w=500&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
  },
  {
    title: 'Chakra Balancing Session',
    description:
      'Align and balance your energy centers through guided chakra meditation and gentle soundwork.',
    category: 'Meditation',
    duration: 28,
    thumbnail: 'https://images.unsplash.com/photo-1515895917675-15e08d303fab?w=500&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
  },
];

async function seed() {
  try {
    console.log('🌱 Starting therapy session seeding...');

    // Clear existing therapy sessions
    await prisma.therapySession.deleteMany({});
    console.log('🧹 Cleared existing therapy sessions');

    // Create new therapy sessions
    const createdSessions = await prisma.therapySession.createMany({
      data: therapySessions,
      skipDuplicates: true,
    });

    console.log(`✅ Created ${createdSessions.count} therapy sessions`);

    // Get categories summary
    const categories = await prisma.therapySession.groupBy({
      by: ['category'],
      _count: { id: true },
    });

    console.log('\n📊 Therapy Sessions by Category:');
    categories.forEach((cat) => {
      console.log(`   ${cat.category}: ${cat._count.id} sessions`);
    });

    console.log('\n🎉 Seeding complete!');
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
