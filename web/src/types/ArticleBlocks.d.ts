type ArticleBlocks =
  | SharedRichText
  | SharedMedia
  | SharedSlider
  | SharedQuiz
  | SharedDetails;

type SharedRichText = {
  __typename: "ComponentSharedRichText";
  id: Key<string>;
  body: string;
};

type SharedMedia = {
  __typename: "ComponentSharedMedia";
  id: Key<string>;
  file: SharedMediaFile;
};

type SharedSlider = {
  __typename: "ComponentSharedSlider";
  id: Key<string>;
  files: SharedMediaFile[];
};

type SharedQuiz = {
  __typename: "ComponentSharedQuiz";
  id: Key<string>;
  questions: Question[];
};

type Question = {
  uuid: Key;
  question: string;
  options: {
    option: string;
    isCorrect: boolean;
  }[];
};

type SharedDetails = {
  __typename: "ComponentSharedDetails";
  id: Key<string>;
  collapsible: boolean;
  title: string;
  body: string;
};

type SharedMediaFile = {
  documentId: Key<string>;
  url: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
};
