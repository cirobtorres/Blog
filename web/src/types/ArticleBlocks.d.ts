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
