import LogoutButton from "../../Authentication/Logout";
import Editor from "./Editor";

const CommentCreate = async ({
  articleDocumentId,
  user,
}: {
  articleDocumentId: string;
  user: User;
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      {user.ok && (
        <div className="flex justify-between items-center mb-3">
          <p>{user.data?.username}</p>
          <LogoutButton />
        </div>
      )}
      <Editor user={user} articleDocumentId={articleDocumentId} />
    </div>
  );
};

export default CommentCreate;
