import { LibraryItem } from '../types/library.types';
import { therapyCategories, yogaCategories, educationCategories } from '../../content';

export const sampleLibraryItems: LibraryItem[] = [
  {
    id: 'therapy-deep-sleep-recovery',
    title: 'Deep Sleep Recovery',
    description:
      'A gentle wind-down session with soft ambient textures and guided body release to support restful, uninterrupted sleep.',
    category: therapyCategories[1],
    duration: 22,
    difficulty: 'all-levels',
    type: 'therapy',
    libraryType: 'audio',
    createdAt: '2026-05-01',
  },
  {
    id: 'yoga-evening-wind-down',
    title: 'Evening Wind Down',
    description:
      'A soothing sequence designed to calm the nervous system and prepare your body for a restful night of sleep.',
    category: yogaCategories[2],
    duration: 15,
    difficulty: 'beginner',
    type: 'yoga',
    libraryType: 'yoga',
    createdAt: '2026-04-28',
  },
  {
    id: 'lib-article-1',
    title: 'Breathing for Stress',
    description: 'Short primer on simple breath practices.',
    category: educationCategories[0],
    duration: 5,
    difficulty: 'all-levels',
    type: 'education',
    libraryType: 'article',
    createdAt: '2026-05-03',
  },
];
