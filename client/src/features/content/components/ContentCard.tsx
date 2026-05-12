import React from 'react';
import { CategoryPill } from './CategoryPill';
import { ContentMeta } from './ContentMeta';
import Button from '../../../shared/ui/Button';
import type { ContentItem } from '../types/content.types';

interface ContentCardProps {
  item: ContentItem;
  onClick?: (item: ContentItem) => void;
  ctaLabel?: string;
  onCtaClick?: (item: ContentItem) => void;
  showMeta?: boolean;
  showCategory?: boolean;
  className?: string;
  ariaLabel?: string;
  thumbnailAlt?: string;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  item,
  onClick,
  ctaLabel,
  onCtaClick,
  showMeta = true,
  showCategory = true,
  className = '',
  ariaLabel,
  thumbnailAlt,
}) => {
  const isInteractive = Boolean(onClick);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick(item);
    }
  };

  const metaCategory = showCategory ? undefined : item.category;
  const resolvedCtaLabel = ctaLabel;
  const resolvedCtaClick = onCtaClick ?? onClick;
  const handleCtaClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    resolvedCtaClick?.(item);
  };

  return (
    <div
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
        isInteractive ? 'cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400/60' : ''
      } ${className}`.trim()}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={ariaLabel ?? (isInteractive ? item.title : undefined)}
      onClick={isInteractive ? () => onClick?.(item) : undefined}
      onKeyDown={handleKeyDown}
    >
      {item.thumbnail ? (
        <div className="relative h-40 w-full overflow-hidden">
          <img
            src={item.thumbnail}
            alt={thumbnailAlt ?? item.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
      ) : (
        <div
          className="flex h-40 w-full items-center justify-center bg-gradient-to-br from-emerald-50 to-sky-50"
          aria-hidden="true"
        />
      )}

      <div className="flex flex-1 flex-col gap-3 p-5">
        {showCategory && item.category && <CategoryPill label={item.category} size="sm" />}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">{item.title}</h3>
          {item.description && (
            <p className="text-sm text-slate-600 line-clamp-3">{item.description}</p>
          )}
        </div>

        {showMeta && (
          <ContentMeta
            duration={item.duration}
            difficulty={item.difficulty}
            createdAt={item.createdAt}
            category={metaCategory}
          />
        )}

        {resolvedCtaLabel && resolvedCtaClick && (
          <div className="pt-2">
            <Button variant="secondary" onClick={handleCtaClick}>
              {resolvedCtaLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
