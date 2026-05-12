import React from 'react';
import { CategoryPill } from './CategoryPill';
import type { ContentCategory } from '../types/content.types';

interface CategoryFilterProps {
  categories: ContentCategory[];
  selectedCategory?: ContentCategory | 'all' | null;
  onSelect?: (category: ContentCategory | 'all') => void;
  includeAll?: boolean;
  allLabel?: string;
  className?: string;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory = 'all',
  onSelect,
  includeAll = true,
  allLabel = 'All',
  className = '',
}) => {
  const items = includeAll ? (['all', ...categories] as const) : categories;

  return (
    <div className={`-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto ${className}`.trim()}>
      <div className="flex gap-2 pb-2">
        {items.map((category) => {
          const label = category === 'all' ? allLabel : category;
          const isActive = selectedCategory === category;

          return (
            <CategoryPill
              key={category}
              label={label}
              value={category}
              active={isActive}
              onClick={onSelect}
            />
          );
        })}
      </div>
    </div>
  );
};
