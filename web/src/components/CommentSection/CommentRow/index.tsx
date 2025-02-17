"use client";

import { useActionState, useRef, useState } from "react";
import { formatDateToYouTubeLikeFormat } from "../../../utils/dates";
import SafeHTML from "./SafeHTML";
import ReplyEditor from "../CommentCreate/ReplyEditor";
import { getNestedComments, likeComment } from "../../../lib/comments";

const CommentRow = ({
  articleDocumentId,
  loggedUser,
  comment,
}: {
  articleDocumentId: string;
  loggedUser: User;
  comment: CommentProps;
}) => {
  const [subcomments, setSubcomments] = useState<SubComment[] | []>([]);
  const [click, setClick] = useState(false);
  const [reply, setReply] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleAnswer = async () => {
    setClick(!click);
    if (subcomments.length === 0) {
      await handleClick();
    }
  };

  const handleClick = async () => {
    setLoading(true);
    const { data } = await getNestedComments(comment.documentId, page);
    const { nodes, pageInfo } = data;
    if (nodes.length > 0) {
      setSubcomments((prev) => [...prev, ...nodes]);
    }
    if (pageInfo.page === pageInfo.pageCount) setHasMore(false);
    else setPage((prev) => prev + 1);
    setLoading(false);
  };

  if (
    comment.users_permissions_user.confirmed &&
    !comment.users_permissions_user.blocked
  ) {
    return (
      <div className="max-w-5xl mx-auto grid grid-cols-12 my-6">
        <div className="col-span-1">
          {/* <div className="relative flex size-10 shrink-0 overflow-hidden rounded-full">
          <Image
            src={
              author.avatar
                ? `http://127.0.0.1:1337${author.avatar.url}`
                : "/images/not-authenticated.png"
            }
            alt={
              author.avatar
                ? author.avatar.alternativeText
                : `Avatar de ${author.name}`
            }
            fill
            sizes="(max-width: 40px) 100vw"
            className="transition-all duration-500 absolute object-cover group-hover:brightness-50"
          />
        </div> */}
        </div>
        <div className="col-span-11 flex flex-col gap-2">
          <p className="text-sm text-[#808080]">
            <button className="transition-colors duration-500 text-blog-foreground-highlight hover:text-blog-foreground-readable-hover">
              @{comment.users_permissions_user.username}
            </button>{" "}
            {formatDateToYouTubeLikeFormat(comment.createdAt)}{" "}
            {comment.updatedAt > comment.createdAt && "(editado)"}
          </p>
          <SafeHTML html={comment.body} />
          {loggedUser.ok && (
            <>
              <div className="flex items-center gap-4">
                <button type="submit" className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-thumbs-up"
                  >
                    <path d="M7 10v12" />
                    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                  </svg>
                </button>
                {comment.liked_by.length}
                <button
                  onClick={() => setReply(!reply)}
                  className="text-sm transition-colors duration-500 text-blog-foreground-readable hover:text-blog-foreground-readable-hover"
                >
                  Responder
                </button>
              </div>
              {reply && (
                <div className="px-4">
                  <ReplyEditor
                    articleDocumentId={articleDocumentId}
                    userRepliedTo={comment.documentId}
                    user={loggedUser}
                    close={setReply}
                  />
                </div>
              )}
            </>
          )}
          {comment.comments.length > 0 && (
            <div>
              <button
                onClick={handleAnswer}
                className="flex items-center w-fit text-blog-foreground-highlight"
              >
                Respostas
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-down transition-all duration-200"
                  style={{ rotate: click ? "180deg" : "0deg" }}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {click && (
                <>
                  {subcomments.map((subcomment, index) => (
                    <SubComment
                      key={`${subcomment.documentId}-${index}`}
                      articleDocumentId={articleDocumentId}
                      comment={subcomment}
                      user={loggedUser}
                    />
                  ))}
                  {hasMore && (
                    <button onClick={handleClick}>Carregar Mais</button>
                  )}
                  {loading && <p>Loading...</p>}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    );
  } else if (
    comment.users_permissions_user.confirmed &&
    comment.users_permissions_user.blocked
  ) {
    return <div>Usuário suspenso</div>;
  } else {
    // User not confirmed
    return null;
  }
};

const SubComment = ({
  articleDocumentId,
  comment,
  user: loggedUser,
}: {
  articleDocumentId: string;
  comment: SubComment;
  user: User;
}) => {
  const [reply, setReply] = useState(false);
  const [documentId, setDocumentId] = useState("");
  const [loggedUserDocumentId, setLoggedUserDocumentId] = useState("");
  const ref = useRef(null);
  // const [submitCount, setSubmitCount] = useState(0);

  const [, formAction] = useActionState<{ message: boolean | null }, FormData>(
    (prevState, formData) => {
      formData.append("liked-comment-document-id", documentId);
      formData.append("user-like-document-id", loggedUserDocumentId);
      const result = likeComment(prevState, formData);
      // setSubmitCount((count) => count + 1);
      return result;
    },
    { message: null }
  );

  return (
    <div className="flex flex-col gap-2 my-3 pl-6">
      <p className="text-sm text-[#808080]">
        <button className="transition-colors duration-500 text-blog-foreground-highlight hover:text-blog-foreground-readable-hover">
          @{comment.users_permissions_user.username}
        </button>{" "}
        {formatDateToYouTubeLikeFormat(comment.createdAt)}{" "}
        {comment.updatedAt > comment.createdAt && "(editado)"}
      </p>
      <SafeHTML html={comment.body} />
      <div className="flex items-center gap-4">
        <form action={formAction}>
          <button
            type="submit"
            onClick={() => {
              setDocumentId(() => comment.documentId);
              setLoggedUserDocumentId(() => loggedUser.data?.documentId || "");
            }}
            className="flex items-center gap-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-thumbs-up"
            >
              <path d="M7 10v12" />
              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
            </svg>
          </button>
        </form>
        {comment.liked_by.length}
        <button
          onClick={() => setReply((reply) => !reply)}
          className="text-sm transition-colors duration-500 text-blog-foreground-readable hover:text-blog-foreground-readable-hover"
        >
          Responder
        </button>
      </div>
      {reply && (
        <div ref={ref} className="px-4">
          <ReplyEditor
            articleDocumentId={articleDocumentId}
            userRepliedTo={comment.documentId}
            user={loggedUser}
            close={setReply}
          />
        </div>
      )}
    </div>
  );
};

export default CommentRow;
