import { sampleLibraryItems } from '../data/sampleData';

export const useLibrary = () => {
  const items = sampleLibraryItems;
  const loading = false;

  return { items, loading };
};
