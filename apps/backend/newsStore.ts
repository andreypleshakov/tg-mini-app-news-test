export type NewsItem = {
  id: string;
  caption: string;
  imagePath: string;
  userId: number;
  createdAt: string;
};

let latestNews: NewsItem | null = null;

export const addNews = (item: NewsItem) => {
  latestNews = item;
};

export const getNews = () => {
  return latestNews;
};
