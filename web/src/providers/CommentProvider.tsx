"use client";

import React, { useCallback, useState } from "react";
import { useParams } from "next/navigation";
import {
  clientCountComments,
  clientGetComments,
  useAsync,
} from "@/service/comments/client";
// import { CommentLoadingSkeleton } from "../components/Comments/CommentLoading";

type CommentProviderProps = {
  comments: CommentProps[];
  pageLengthMemmorized: boolean;
  loading: boolean;
  loadMore: () => void;
  changeSorting: (documentId: string[]) => void;
  createLocalComment: (comment: CommentProps) => void;
  updateLocalComment: (updatedComment: CommentProps) => void;
  createLocalReply: (updatedComment: CommentProps) => void;
  deleteLocalComment: (documentId: string) => void;
};

export const CommentContext = React.createContext<CommentProviderProps>({
  comments: [],
  pageLengthMemmorized: false,
  loading: false,
  loadMore: () => {},
  changeSorting: () => {},
  createLocalComment: () => {},
  updateLocalComment: () => {},
  createLocalReply: () => {},
  deleteLocalComment: () => {},
});

export function CommentProvider({ children }: { children: React.ReactNode }) {
  const { documentId } = useParams();
  const [page, setPage] = useState(1);

  const pageSize = 5;

  const [comments, setComments] = useState<CommentProps[]>([]);
  const [totalComments, setTotalComments] = useState<number>(0);
  const [sort, setSort] = useState(["createdAt:desc"]);

  const { loading } = useAsync(async () => {
    const [moreComments, total] = await Promise.all([
      clientGetComments(documentId as string, { page, pageSize }, null, sort),
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
  }, [documentId, page, sort]);

  const pageLengthMemmorized = totalComments > comments.length;

  const changeSorting = useCallback((sorting: string[]) => {
    setSort(sorting);
    setPage(1);
    setComments([]);
  }, []);

  const loadMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const createLocalComment = useCallback((comment: CommentProps) => {
    setComments((prev) => [comment, ...prev]);
  }, []);

  const createLocalReply = useCallback((child: CommentProps) => {
    if (child.parent_id) {
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
    }
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
        changeSorting,
        createLocalComment,
        updateLocalComment,
        createLocalReply,
        deleteLocalComment,
      }}
    >
      {children}
      {/* {loading && page === 1 ? (
        <div className="mt-20 mb-20">
          <CommentLoadingSkeleton />
        </div>
      ) : (
        children
      )} */}
    </CommentContext.Provider>
  );
}
