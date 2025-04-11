import DOMPurify from "dompurify";
import Editor from "../../Editor";

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

  return comment.users_permissions_user ? (
    currentUser.data?.documentId ===
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
        className="[&_p]:break-words [&_p]:mb-4 last:[&_p]:mb-0 text-sm pb-2 border-b border-blog-border"
      />
    )
  ) : (
    <div className="mb-4 pb-2 border-b border-blog-border">
      <p className="text-sm text-[#808080]">&#91;comentário excluído&#93;</p>
    </div>
  );
};

export default CommentBody;
