type ArticleBlocks =
  | SharedRichText
  | SharedMedia
  | SharedSlider
  | SharedQuiz
  | SharedDetails;

type SharedRichText = {
  __typename: "ComponentSharedRichText";
  id: string;
  body: string;
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

type SharedQuiz = {
  __typename: "ComponentSharedQuiz";
  id: string;
  json: Record<string, Quiz>; // Dynamic keys
};

type SharedDetails = {
  __typename: "ComponentSharedDetails";
  id: string;
  collapsible: boolean;
  title: string;
  body: string;
};

type Quiz = {
  key: string;
  opts: { alt: [string, boolean] }[];
  quiz: string;
};

type SharedMediaFile = {
  documentId: string;
  url: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
};
