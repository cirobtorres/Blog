"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  clientCountComments,
  clientGetComments,
  useAsync,
} from "@/service/comments/client";

type CommentProviderProps = {
  comments: CommentProps[];
  hasDbMoreComments: boolean;
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
  hasDbMoreComments: false,
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
  const [start, setStart] = useState(0);
  const [counterDelete, setCounterDelete] = useState(0);

  const limit = 5;

  const [comments, setComments] = useState<CommentProps[]>([]);
  const [countDBComments, setCountDBComments] = useState<number>(0);
  const [sort, setSort] = useState(["createdAt:desc"]);

  const { loading } = useAsync(async () => {
    const [moreComments, total] = await Promise.all([
      clientGetComments(documentId as string, { start, limit }, null, sort),
      clientCountComments(documentId as string, { documentId: { eq: null } }),
    ]);
    if (moreComments.length === 0) return;
    setComments((prevComments) => {
      const newComments = moreComments.filter(
        (newComment: CommentProps) =>
          !prevComments.some(
            (prevComment) => prevComment.documentId === newComment.documentId
          )
      );
      return [...prevComments, ...newComments];
    });
    setCountDBComments(() => total);
  }, [documentId, start, sort]);

  const hasDbMoreComments = useMemo(() => {
    return countDBComments > comments.length;
  }, [countDBComments, comments]);

  const changeSorting = useCallback((sorting: string[]) => {
    setSort(sorting);
    setStart(0);
    setComments([]);
  }, []);

  const loadMore = useCallback(() => {
    setStart((prev) => prev + 5 - counterDelete);
    setCounterDelete(0);
  }, [counterDelete]);

  const createLocalComment = useCallback((comment: CommentProps) => {
    setComments((prev) => [comment, ...prev]);
    setCountDBComments((prev) => prev + 1);
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
    setCountDBComments((prev) => prev - 1);
    setCounterDelete((prev) => prev + 1);
  }, []);

  return (
    <CommentContext.Provider
      value={{
        comments,
        hasDbMoreComments,
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
    </CommentContext.Provider>
  );
}
