type CommentProps = {
  documentId: Key<string>;
  body: string;
  createdAt: string;
  updatedAt: string;
  liked_by: {
    documentId: string;
  }[];
  comments: {
    documentId: string;
  }[];
  parent_id: { documentId: string } | null;
  users_permissions_user: {
    documentId: string;
    confirmed: boolean;
    blocked: boolean;
    username: string;
  };
};

type PageInfo = {
  page: number | null;
  pageCount: number | null;
  pageSize: number | null;
  total: number | null;
};
