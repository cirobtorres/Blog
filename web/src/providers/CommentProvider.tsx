"use client";

import {
  clientCountComments,
  clientGetComments,
  useAsync,
} from "@/service/comments/client";
import { useParams } from "next/navigation";
import React, { useCallback, useState } from "react";
import CommentLoading from "../components/Comments/CommentLoading";

type CommentProviderProps = {
  comments: CommentProps[];
  pageLengthMemmorized: boolean;
  loading: boolean;
  loadMore: () => void;
  createLocalComment: (comment: CommentProps) => void;
  updateLocalComment: (updatedComment: CommentProps) => void;
  updateLocalReply: (updatedComment: CommentProps) => void;
  deleteLocalComment: (documentId: string) => void;
};

export const CommentContext = React.createContext<CommentProviderProps>({
  comments: [],
  pageLengthMemmorized: false,
  loading: false,
  loadMore: () => {},
  createLocalComment: () => {},
  updateLocalComment: () => {},
  updateLocalReply: () => {},
  deleteLocalComment: () => {},
});

export function CommentProvider({ children }: { children: React.ReactNode }) {
  const { documentId } = useParams();
  const [page, setPage] = useState(1);

  const pageSize = 5;

  const [comments, setComments] = useState<CommentProps[]>([]);
  const [totalComments, setTotalComments] = useState<number>(0);

  const { loading } = useAsync(async () => {
    const [moreComments, total] = await Promise.all([
      clientGetComments(documentId as string, { page, pageSize }),
      clientCountComments(documentId as string, { documentId: { eq: null } }),
    ]);

    setComments((prevComments) => {
      const newComments = moreComments.filter(
        (newComment) =>
          !prevComments.some(
            (prevComment) => prevComment.documentId === newComment.documentId
          )
      );
      return [...prevComments, ...newComments];
    });

    setTotalComments(total);
  }, [documentId as string, page]);

  const pageLengthMemmorized = totalComments > comments.length;

  const loadMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const createLocalComment = useCallback((comment: CommentProps) => {
    setComments((prev) => [...prev, comment]);
  }, []);

  const updateLocalReply = useCallback((child: CommentProps) => {
    if (child.parent_id)
      setComments((prev) =>
        prev.map((parentComment) =>
          parentComment.documentId === child.parent_id
            ? {
                ...parentComment,
                comments: {
                  ...parentComment.comments,
                  documentId: child.documentId,
                },
              }
            : parentComment
        )
      );
  }, []);

  const updateLocalComment = useCallback((updatedComment: CommentProps) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.documentId === updatedComment.documentId
          ? { ...comment, body: updatedComment.body }
          : comment
      )
    );
  }, []);

  const deleteLocalComment = useCallback((documentId: string) => {
    setComments((prev) =>
      prev.filter((comment) => comment.documentId !== documentId)
    );
  }, []);

  return (
    <CommentContext.Provider
      value={{
        comments,
        pageLengthMemmorized,
        loading,
        loadMore,
        createLocalComment,
        updateLocalComment,
        updateLocalReply,
        deleteLocalComment,
      }}
    >
      {loading && page === 1 ? (
        <div className="mt-20 mb-20">
          <CommentLoading />
        </div>
      ) : (
        children
      )}
    </CommentContext.Provider>
  );
}
