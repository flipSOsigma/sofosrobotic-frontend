export interface INewsItem {
  title: string;
  category: string;
  date: string;
  authorId: string;
  content: string;
  imagePath: string[];
  description: string;
  uniqueId: string;
  excerpt: string;
  status: string;
  publishDate?: string;
  updatedAt?: string;
  views?: number;
}
