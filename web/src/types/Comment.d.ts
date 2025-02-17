type CommentProps = {
  documentId: Key<string>;
  body: string;
  createdAt: string;
  updatedAt: string;
  parent_id: string | null;
  liked_by: string[] | [];
  comments: {
    documentId: string;
  }[];
  users_permissions_user: {
    documentId: string;
    confirmed: boolean;
    blocked: boolean;
    username: string;
  };
};

type SubComment = {
  documentId: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  liked_by: string[] | [];
  users_permissions_user: {
    documentId: string;
    confirmed: boolean;
    blocked: boolean;
    username: string;
  };
};
