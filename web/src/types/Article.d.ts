type ArticleCard = {
  documentId: string;
  title: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover: Cover;
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
  topic: Topic;
  tools: Tool[];
  tags: Tag[];
  blocks: ArticleBlocks[];
};

type Cover = {
  documentId: string;
  url: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
};

type ArticleContent = {
  documentId: string;
  content: ArticleBlocks[];
};
