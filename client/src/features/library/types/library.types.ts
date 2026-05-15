import type { ContentItem } from '../../content';

export type LibraryContentType = 'audio' | 'yoga' | 'article';

export interface LibraryItem extends ContentItem {
  libraryType: LibraryContentType;
}
import { ContentItem } from '../../content/types/content.types';

export type LibraryContentType = 'audio' | 'yoga' | 'article';

export interface LibraryItem extends ContentItem {
  libraryType: LibraryContentType;
}
