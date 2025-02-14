"use client";

import { useState } from "react";
import { formatDateToYouTubeLikeFormat } from "../../../utils/dates";
import SafeHTML from "./SafeHTML";
import ReplyEditor from "../CommentCreate/ReplyEditor";

const CommentRow = ({
  articleDocumentId,
  loggedUser,
  comment,
}: {
  articleDocumentId: string;
  loggedUser: User;
  comment: CommentProps;
}) => {
  const [click, setClick] = useState(false);
  const [reply, setReply] = useState(false);
  const handleAnswer = async () => {
    setClick(!click);
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
                <div>
                  {comment.comments.map((subcomment: SubComments) => (
                    <div
                      key={subcomment.documentId}
                      className="flex flex-col gap-2 my-3 pl-6"
                    >
                      <p className="text-sm text-[#808080]">
                        <button className="transition-colors duration-500 text-blog-foreground-highlight hover:text-blog-foreground-readable-hover">
                          @{subcomment.users_permissions_user.username}
                        </button>{" "}
                        {formatDateToYouTubeLikeFormat(subcomment.createdAt)}{" "}
                        {subcomment.updatedAt > subcomment.createdAt &&
                          "(editado)"}
                      </p>
                      <SafeHTML html={subcomment.body} />
                      <div className="flex items-center gap-4">
                        <button
                          type="submit"
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
                        {subcomment.liked_by.length}
                        <button className="text-sm transition-colors duration-500 text-blog-foreground-readable hover:text-blog-foreground-readable-hover">
                          Responder
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
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

export default CommentRow;
