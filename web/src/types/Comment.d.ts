type CommentProps = {
  documentId: Key<string>;
  body: string;
  createdAt: string;
  updatedAt: string;
  parent_id: {
    documentId: Key<string>;
  };
  liked_by: {
    documentId: Key<string>;
  }[];
  comments: SubComments[];
  users_permissions_user: {
    documentId: Key<string>;
    confirmed: boolean;
    blocked: boolean;
    username: string;
  };
};

type SubComments = {
  documentId: Key<string>;
  body: string;
  createdAt: string;
  updatedAt: string;
  liked_by: {
    documentId: Key<string>;
  }[];
  users_permissions_user: {
    documentId: Key<string>;
    confirmed: boolean;
    blocked: boolean;
    username: string;
  };
};
