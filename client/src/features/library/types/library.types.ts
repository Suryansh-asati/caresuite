import type { ContentItem } from '../../content';

export type LibraryContentType = 'audio' | 'yoga' | 'article';

export interface LibraryItem extends ContentItem {
  libraryType: LibraryContentType;
}
