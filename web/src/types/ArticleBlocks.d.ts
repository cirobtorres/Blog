type ArticleBlocks =
  | SharedRichText
  | SharedQuote
  | SharedMedia
  | SharedSlider
  | SharedFeatured
  | SharedQuiz;

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

type SharedFeatured = {
  __typename: "ComponentSharedFeatured";
  id: string;
  featured: string;
};

type SharedQuiz = {
  __typename: "ComponentSharedQuiz";
  id: string;
  json: {
    opts: { alt: [key: string, boolean] }[];
    quiz: string;
  };
};

type SharedMediaFile = {
  documentId: string;
  url: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
};
