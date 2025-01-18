type ArticleCards = ArticleCard[];

type ArticleCard = {
  documentId: string;
  title: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover: Cover;
  category: Category;
  author: Author;
};

type Article = {
  documentId: string;
  title: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover: Cover;
  author: Author;
  category: Category;
  subCategories: SubCategory[];
  tags: Tag[];
  blocks: ArticleBlocks[];
};

type Cover = {
  url: string;
  alternativeText: string;
  caption: string;
};

type ArticleContent = {
  documentId: string;
  content: ArticleBlocks[];
};
