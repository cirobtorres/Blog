type CommentProps = {
  documentId: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  users_permissions_user: {
    documentId: string;
    confirmed: boolean;
    blocked: boolean;
    username: string;
  };
};
