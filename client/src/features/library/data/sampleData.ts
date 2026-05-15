import { LibraryItem } from '../types/library.types';
import { therapyCategories, yogaCategories, educationCategories } from '../../content';

export const sampleLibraryItems: LibraryItem[] = [
  {
    id: 'lib-audio-1',
    title: 'Calm & Center',
    description: 'A grounding audio session to restore balance.',
    category: therapyCategories[0],
    duration: 12,
    difficulty: 'all-levels',
    type: 'therapy',
    libraryType: 'audio',
    createdAt: '2026-05-01',
  },
  {
    id: 'lib-yoga-1',
    title: 'Evening Unwind Flow',
    description: 'Gentle sequence to release the day.',
    category: yogaCategories[2],
    duration: 20,
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
