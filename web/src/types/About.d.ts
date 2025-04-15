type About = {
  documentId: string;
  title?: string;
  display_name?: string;
  github_link: string;
  github_blog_link: string;
  media?: {
    documentId: string;
    url: string;
    alternativeText: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  blocks: {
    id: string;
    body: string;
  }[];
};
