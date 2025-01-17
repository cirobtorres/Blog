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
  cover: {
    documentId: string;
    url: string;
    alternativeText: string;
  };
  category: { name: string; slug: string };
  author: {
    name: string;
    avatar: { documentId: string; url: string; alternativeText: string };
  };
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
  cover: {
    url: string;
    alternativeText: string;
    caption: string;
  };
  author: {
    name: string;
    avatar: {
      url: string;
      alternativeText: string;
    };
  };
  category: { name: string };
  tags: [{ name: string; slug: string }, { name: string; slug: string }];
  blocks: ArticleBlocks[];
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
  file: {
    documentId: string;
    url: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
  };
};

type SharedSlider = {
  __typename: "ComponentSharedSlider";
  id: string;
  files: {
    documentId: string;
    url: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
  }[];
};
