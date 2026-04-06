import { CategoryType, LinkItem } from './types';
import linksData from './data/links.json';

export const CATEGORIES = Object.values(CategoryType);

type RawLinkItem = Omit<LinkItem, 'category'> & { category: string };

const categorySet = new Set<string>(Object.values(CategoryType));

const toCategoryType = (value: string): CategoryType => {
  if (categorySet.has(value)) {
    return value as CategoryType;
  }
  return CategoryType.ALL;
};

export const MOCK_LINKS: LinkItem[] = (linksData as RawLinkItem[]).map((link) => ({
  ...link,
  category: toCategoryType(link.category)
}));
