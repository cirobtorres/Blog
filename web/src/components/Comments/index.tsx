"use client";

import Editor from "./Editor";
import ProviderLogin from "../Authentication/Logins";
import { useParams } from "next/navigation";
import { clientSaveComment, useAsyncFn } from "../../service/comments/client";
import Image from "next/image";
import { useState } from "react";
import Avatar from "./Avatar";
import CommentHeader from "./CommentHeader";
import CommentFooter from "./CommentFooter";
import CommentOptions from "./CommentOptions";
import { useComment } from "../../hooks/useComment";
import CommentBody from "./CommentBody";
import CommentCount from "./CommentCount";
import { toast } from "../../hooks/useToast";

export default function Comments({ currentUser }: { currentUser: User }) {
  const params: { documentId: string; slug: string } = useParams();
  const { documentId }: { documentId: string } = params;

  const commentContext = useComment();
  const rootComments = commentContext?.rootComments;
  const createLocalComment = commentContext?.createLocalComment;
  const updateLocalComment = commentContext?.updateLocalComment;

  const { execute: createCommentFn } = useAsyncFn(clientSaveComment, [], false);

  function onCommentCreate(body: string) {
    return createCommentFn({
      documentId, // Article's document id
      body,
      userId: currentUser.data?.documentId,
    })
      .then((comment) => {
        createLocalComment(comment as CommentProps);
        toast({ description: "Comentário criado!" });
      })
      .catch((error) => {
        console.error(error);
        toast({ description: "Erro ao criar comentário" });
      });
  }

  return (
    <section
      id="comment-session"
      className="max-w-screen-md mx-auto flex flex-col mb-20 pt-12 px-4"
    >
      <div className="flex justify-center items-center gap-4 mb-12">
        <h3 className="text-2xl font-extrabold">
          <CommentCount articleId={documentId} />
        </h3>
        <button className="flex">
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
            className="lucide lucide-arrow-down-wide-narrow"
          >
            <path d="m3 16 4 4 4-4" />
            <path d="M7 20V4" />
            <path d="M11 4h10" />
            <path d="M11 8h7" />
            <path d="M11 12h4" />
          </svg>
          Ordenar por:
        </button>
        <span>mais recente</span>
      </div>
      {!currentUser.ok && <ProviderLogin />}
      {currentUser.ok && (
        <div className="flex flex-col mb-8">
          <Avatar currentUser={currentUser as UserOn} />
          <Editor onSubmit={onCommentCreate} />
        </div>
      )}
      {rootComments !== null &&
        rootComments?.map((comment: CommentProps) => (
          <CommentRow
            key={comment.documentId}
            comment={comment}
            currentUser={currentUser}
            onUpdate={updateLocalComment}
          />
        ))}
    </section>
  );
}

const CommentRow = ({
  comment,
  currentUser,
  onUpdate,
}: {
  comment: CommentProps;
  currentUser: User;
  onUpdate: (updatedComment: CommentProps) => void;
}) => {
  const params: { documentId: string; slug: string } = useParams();
  const { documentId }: { documentId: string } = params;
  const [areChildrenHidden, setAreChildrenHidden] = useState(true);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { getReplies, createLocalComment } = useComment();
  const createCommentFn = useAsyncFn(clientSaveComment, [], false);
  const childComments = getReplies(comment.documentId);

  function onCommentReply(body: string) {
    return createCommentFn
      .execute({
        documentId, // Article's document id
        body,
        userId: currentUser.data?.documentId,
        parentId: comment.documentId, // This comment's document id
      })
      .then((comment) => {
        setIsReplying(false);
        createLocalComment(comment as CommentProps);
        toast({ description: "Comentário criado!" });
      })
      .catch((error) => {
        console.error(error);
        toast({ description: "Erro ao criar comentário" });
      });
  }

  return (
    <div key={comment.documentId} className="flex flex-col">
      <div className="py-4 grid grid-cols-[48px_repeat(10,_1fr)_48px]">
        <div className="col-span-1">
          <div className="relative flex size-10 shrink-0 overflow-hidden rounded-full">
            <Image
              src={
                "/images/not-authenticated.png"
                // author.avatar
                //   ? `http://127.0.0.1:1337${author.avatar.url}`
                // : "/images/not-authenticated.png"
              }
              alt={
                ""
                // author.avatar
                // ? author.avatar.alternativeText
                // : `Avatar de ${author.name}`
              }
              fill
              sizes="(max-width: 40px) 100vw"
              className="transition-all duration-500 absolute object-cover group-hover:brightness-50"
            />
          </div>
        </div>
        <div className="col-span-10 flex flex-col gap-2 mt-2">
          <CommentHeader comment={comment} currentUser={currentUser} />
          <CommentBody
            comment={comment}
            isEditing={isEditing}
            currentUser={currentUser}
            setIsEditing={setIsEditing}
            onUpdate={onUpdate}
          />
          <CommentFooter
            comment={comment}
            isReplying={isReplying}
            setIsReplying={setIsReplying}
          />
        </div>
        <CommentOptions
          comment={comment}
          isEditing={isEditing}
          currentUser={currentUser}
          setIsEditing={setIsEditing}
        />
      </div>
      {isReplying && (
        <div className="px-12">
          <Avatar currentUser={currentUser as UserOn} />
          <Editor
            autoFocus
            onSubmit={onCommentReply}
            cancel={() => setIsReplying(false)}
          />
        </div>
      )}
      {childComments?.length > 0 && (
        <div className="pl-12">
          <button
            onClick={() => setAreChildrenHidden(!areChildrenHidden)}
            className="flex items-center gap-2 text-sm text-blog-foreground-highlight hover:text-blog-foreground-readable-hover"
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
              className="lucide lucide-chevron-down"
              style={{ rotate: areChildrenHidden ? "0deg" : "180deg" }}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          <div className={`${areChildrenHidden ? "hidden" : "block"}`}>
            {childComments.map((comment: CommentProps) => (
              <CommentRow
                key={comment.documentId}
                comment={comment}
                currentUser={currentUser}
                onUpdate={onUpdate}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
