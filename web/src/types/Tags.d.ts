type Topic = {
  documentId: string;
  name: string;
  slug: string;
  description: string;
};

type Tool = {
  documentId: string;
  name: string;
  slug: string;
  link: string;
  file: {
    documentId: string;
    url: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
  };
};

type Tag = {
  documentId: string;
  name: string;
};
