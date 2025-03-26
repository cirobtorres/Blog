import DOMPurify from "dompurify";
import Editor from "../Editor";

const CommentBody = ({
  comment,
  isEditing,
  setIsEditing,
  currentUser,
  onUpdate,
}: {
  comment: CommentProps;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  currentUser: User;
  onUpdate: (body: string) => Promise<void>;
}) => {
  const sanitizedHtml = DOMPurify.sanitize(comment.body);

  return currentUser.data?.documentId ===
    comment.users_permissions_user.documentId && isEditing ? (
    <Editor
      autoFocus
      currentUser={currentUser}
      initialContent={sanitizedHtml}
      onSubmit={onUpdate}
      cancel={() => setIsEditing(false)}
    />
  ) : (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      className="text-sm pb-2 border-b border-blog-border"
    />
  );
};

export default CommentBody;
