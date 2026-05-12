import React from 'react';
import { EmptyContent } from './EmptyContent';

interface ContentGridProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  emptyState?: React.ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
}

export const ContentGrid = <T,>({
  items,
  renderItem,
  emptyState,
  emptyTitle = 'No content yet',
  emptyDescription = 'New items will appear here as they are added.',
  className = '',
}: ContentGridProps<T>) => {
  if (!items.length) {
    return (
      <div className={className}>
        {emptyState ?? <EmptyContent title={emptyTitle} description={emptyDescription} />}
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4 ${className}`.trim()}
    >
      {items.map((item) => renderItem(item))}
    </div>
  );
};
