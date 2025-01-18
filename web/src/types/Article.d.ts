// -----
// Props for homepage cards
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

// -----
// Props for article page, which includes ArticleHero and ArticleContent
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
  tags: Tag[];
  blocks: ArticleBlocks[];
};

type Cover = {
  url: string;
  alternativeText: string;
  caption: string;
};

type Author = {
  name: string;
  avatar: Avatar;
};

type Avatar = {
  url: string;
  alternativeText: string;
};

type Category = { name: string; slug: string };

type Tag = {
  documentId: string;
  name: string;
  slug: string;
  link?: string;
  svg?: string;
};

// -----
// Props for article blocks
type ArticleContent = {
  documentId: string;
  content: ArticleBlocks[];
};

type ArticleBlocks = SharedRichText | SharedQuote | SharedMedia | SharedSlider;

type SharedRichText = {
  __typename: "ComponentSharedRichText";
  id: string;
  body: string;
};

type SharedQuote = {
  __typename: "ComponentSharedQuote";
  id: string;
  body: string;
  title: string;
};

type SharedMedia = {
  __typename: "ComponentSharedMedia";
  id: string;
  file: SharedMediaFile;
};

type SharedSlider = {
  __typename: "ComponentSharedSlider";
  id: string;
  files: SharedMediaFile[];
};

type SharedMediaFile = {
  documentId: string;
  url: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
};
