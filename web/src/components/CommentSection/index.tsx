import CommentCreate from "./CommentCreate";
import ProviderLogin from "../Authentication/Logins";
import CommentHeader from "./CommentHeader";
import Comments from "./Comments";
import { getComments } from "../../lib/comments";

const CommentSection = async ({
  articleDocumentId,
  loggedUser,
}: {
  articleDocumentId: string;
  loggedUser: User;
}) => {
  const firstPage = 1;
  const {
    data: { nodes },
  } = await getComments(articleDocumentId, firstPage);
  return (
    <section
      id="comment-session"
      className="max-w-screen-2xl mx-auto mb-20 pt-12 px-4"
    >
      <CommentHeader articleDocumentId={articleDocumentId} />
      {loggedUser.ok === false && <ProviderLogin />}
      <CommentCreate articleDocumentId={articleDocumentId} user={loggedUser} />
      <Comments
        articleDocumentId={articleDocumentId}
        firstComments={nodes}
        firstPage={firstPage}
        loggedUser={loggedUser}
      />
    </section>
  );
};

export default CommentSection;
