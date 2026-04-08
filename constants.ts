import { CategoryType, LinkItem } from './types';
import linksData from './data/links.json';

export const CATEGORIES = Object.values(CategoryType);

type RawLinkItem = Omit<LinkItem, 'category' | 'hash'> & { category: string };

const categorySet = new Set<string>(Object.values(CategoryType));

const toCategoryType = (value: string): CategoryType => {
  if (categorySet.has(value)) {
    return value as CategoryType;
  }
  return CategoryType.ALL;
};

// Simple hash function for generating unique identifiers
function generateHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
}

const mappedLinks: LinkItem[] = (linksData as RawLinkItem[]).map((link) => {
  const hash = generateHash(link.url);
  return {
    hash,
    ...link,
    category: toCategoryType(link.category)
  };
});

// Random shuffle function
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const MOCK_LINKS: LinkItem[] = shuffleArray(mappedLinks);
