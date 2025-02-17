"use client";

import { useState } from "react";
import CommentRow from "../CommentRow";
import { getComments } from "../../../lib/comments";
import { Skeleton } from "../../Shadcnui/skeleton";

const Comments = ({
  articleDocumentId,
  loggedUser,
  firstComments,
  firstPage,
}: {
  articleDocumentId: string;
  loggedUser: User;
  firstComments: CommentProps[];
  firstPage: number;
}) => {
  const [comments, setComments] = useState<CommentProps[]>(firstComments);
  const [page, setPage] = useState(firstPage + 1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleClick = async () => {
    setLoading(true);
    setPage((prev) => prev + 1);
    const { data } = await getComments(articleDocumentId, page);
    const { nodes, pageInfo } = data;
    if (nodes.length > 0) {
      setComments((prev) => [...prev, ...nodes]);
    }
    if (pageInfo.page === pageInfo.pageCount) setHasMore(false);
    setLoading(false);
  };

  return comments.length > 0 ? (
    <>
      {comments.map(
        (comment: CommentProps) =>
          comment.parent_id === null && (
            <CommentRow
              key={comment.documentId}
              articleDocumentId={articleDocumentId}
              loggedUser={loggedUser}
              comment={comment}
            />
          )
      )}
      {hasMore && (
        <div className="text-center">
          <button type="button" onClick={handleClick}>
            Carregar Mais
          </button>
        </div>
      )}
      {loading && <CommentSectionLoading />}
    </>
  ) : (
    <div className="text-center mt-12 mb-8">
      <h3 className="text-xl">Nenhum comentário ainda!</h3>
    </div>
  );
};

const CommentSectionLoading = ({ rows }: { rows?: number }) => {
  return (
    <div className="mb-12">
      {Array.from({ length: rows || 3 }, (v) => v).map((v, index) => (
        <div
          key={index}
          id="comment-session"
          className="flex gap-2 max-w-5xl mx-auto mb-8 px-4"
        >
          <Skeleton className="shrink-0 size-12 rounded-full" />
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="w-48 h-4" />
            <div className="flex flex-col gap-1">
              <Skeleton className="w-[91%] h-4" />
              <Skeleton className="w-[64%] h-4" />
              <Skeleton className="w-[78%] h-4" />
              <Skeleton className="w-[39%] h-4" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="size-4" />
              <Skeleton className="size-4" />
              <Skeleton className="w-[15%] h-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
