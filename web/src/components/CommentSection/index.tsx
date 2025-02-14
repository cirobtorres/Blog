import CommentRow from "./CommentRow";
import CommentCreate from "./CommentCreate";
import ProviderLogin from "../Authentication/Logins";
import CommentHeader from "./CommentHeader";

const CommentSection = ({
  articleDocumentId,
  comments,
  loggedUser,
}: {
  articleDocumentId: string;
  comments: CommentProps[];
  loggedUser: User;
}) => {
  return (
    <section
      id="comment-session"
      className="max-w-screen-2xl mx-auto mb-20 pt-12 px-4"
    >
      <CommentHeader commentLength={comments.length} />
      {loggedUser.ok === false && <ProviderLogin />}
      <CommentCreate articleDocumentId={articleDocumentId} user={loggedUser} />
      {comments.length > 0 ? (
        comments.map(
          (comment: CommentProps) =>
            comment.parent_id === null && (
              <CommentRow
                key={comment.documentId}
                articleDocumentId={articleDocumentId}
                loggedUser={loggedUser}
                comment={comment}
              />
            )
        )
      ) : (
        <div className="text-center mt-12 mb-8">
          <h3 className="text-xl">Nenhum comentário ainda!</h3>
        </div>
      )}
    </section>
  );
};

export default CommentSection;
