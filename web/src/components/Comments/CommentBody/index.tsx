import DOMPurify from "dompurify";
import Editor from "../Editor";
import {
  clientUpdateComment,
  useAsyncFn,
} from "../../../service/comments/client";
import { toast } from "../../../hooks/useToast";

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
  onUpdate: (updatedComment: CommentProps) => void;
}) => {
  const sanitizedHtml = DOMPurify.sanitize(comment.body);
  const updateCommentFn = useAsyncFn(clientUpdateComment, [], false);

  function onCommentUpdate(body: string): Promise<void> {
    return updateCommentFn
      .execute({ documentId: comment.documentId, body })
      .then((updatedComment) => {
        onUpdate(updatedComment as CommentProps);
        setIsEditing(false);
      })
      .then(() => {
        toast({ description: "Comentário editado!" });
      })
      .catch((error) => {
        toast({ description: "Erro ao editar comentário" });
        console.error(error);
      });
  }

  return currentUser.data?.documentId ===
    comment.users_permissions_user.documentId && isEditing ? (
    <Editor
      autoFocus
      initialContent={sanitizedHtml}
      onSubmit={onCommentUpdate}
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
