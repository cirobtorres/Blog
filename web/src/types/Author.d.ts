type Author = {
  documentId: string;
  name: string;
  avatar: Avatar | null;
};

type Avatar = {
  documentId: string;
  url: string;
  alternativeText: string;
};
