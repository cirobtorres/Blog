type CommentProps = {
  documentId: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  likedBy: {
    documentId: string;
  }[];
  users_permissions_user: {
    documentId: string;
    confirmed: boolean;
    blocked: boolean;
    username: string;
  };
  comments: SubComments[];
};

type SubComments = {
  documentId: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  likedBy: {
    documentId: string;
  }[];
  users_permissions_user: {
    documentId: string;
    confirmed: boolean;
    blocked: boolean;
    username: string;
  };
};
