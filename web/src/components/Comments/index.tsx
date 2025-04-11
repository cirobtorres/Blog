"use client";

import { useParams } from "next/navigation";
import { clientSaveComment, useAsyncFn } from "../../service/comments/client";
import { useCallback } from "react";
import { useComment } from "../../hooks/useComment";
import { toast } from "../../hooks/useToast";
import CommentRow from "./CommentRow";
import Editor from "./Editor";
import Avatar from "./Avatar";
import LoadMoreButton from "./LoadMoreButton";
import CommentSectionHeader from "./CommentSectionHeader";

export default function Comments({ currentUser }: { currentUser: User }) {
  const params: { documentId: string; slug: string } = useParams();
  const { documentId }: { documentId: string } = params;

  const commentContext = useComment();
  const comments = commentContext?.comments;
  const pageLengthMemmorized = commentContext?.pageLengthMemmorized;
  const loading = commentContext?.loading;
  const createLocalComment = commentContext?.createLocalComment;
  const loadMore = commentContext?.loadMore;

  const { execute: createCommentFn } = useAsyncFn(clientSaveComment, [], false);

  const onCommentCreate = useCallback(
    async (body: string) => {
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
    },
    [
      createCommentFn,
      createLocalComment,
      currentUser.data?.documentId,
      documentId,
    ]
  );

  return (
    <section
      id="comment-session"
      className="max-w-screen-md mx-auto flex flex-col mb-20 px-4"
    >
      <CommentSectionHeader articleId={documentId} comments={comments} />
      <div className="flex flex-col mb-8">
        <Avatar currentUser={currentUser} />
        <Editor currentUser={currentUser} onSubmit={onCommentCreate} />
      </div>
      {comments?.map((comment: CommentProps) => (
        <CommentRow
          key={comment.documentId}
          comment={comment}
          currentUser={currentUser}
        />
      ))}
      {comments?.length === 0 && (
        <div className="mt-10">
          <h3 className="text-xl text-center text-[#747474]">
            Ninguém comentou ainda...
          </h3>
        </div>
      )}
      {pageLengthMemmorized && (
        <LoadMoreButton func={loadMore} loadFunc={loading} />
      )}
    </section>
  );
}
