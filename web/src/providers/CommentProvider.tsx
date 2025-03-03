"use client";

import { clientGetComments, useAsync } from "@/service/comments/client";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import EditorLoading from "../components/Comments/EditorLoading";
import CommentLoading from "../components/Comments/CommentLoading";
import { Skeleton } from "../components/Shadcnui/skeleton";

type CommentProviderProps = {
  comments: CommentProps[];
  rootComments: CommentProps[];
  getReplies: (parentId: string) => CommentProps[];
  createLocalComment: (comment: CommentProps) => void;
  updateLocalComment: (updatedComment: CommentProps) => void;
  deleteLocalComment: (documentId: string) => void;
  toggleLocalCommentLike: (myDocumentId: string, addLike: boolean) => void;
};

export const CommentContext = React.createContext<CommentProviderProps>({
  comments: [],
  rootComments: [],
  getReplies: () => [],
  createLocalComment: () => {},
  updateLocalComment: () => {},
  deleteLocalComment: () => {},
  toggleLocalCommentLike: () => {},
});

export function CommentProvider({ children }: { children: React.ReactNode }) {
  const { id } = useParams();
  const {
    loading,
    // error,
    value: initialComments,
  } = useAsync(
    async () => clientGetComments(id as string, { limit: 10 }),
    [id as string]
  );
  const [comments, setComments] = useState<CommentProps[]>([]);

  useEffect(() => {
    if (!initialComments || !Array.isArray(initialComments)) return;
    setComments(initialComments);
  }, [initialComments]);

  const commentsByParentId = useMemo(() => {
    const group: { [key: string]: CommentProps[] } = {};
    comments.forEach((comment: CommentProps) => {
      const parentId = comment.parent_id?.documentId ?? "root";
      group[parentId] ||= [];
      group[parentId].push(comment);
    });
    return group;
  }, [comments]);

  function getReplies(parentId: string) {
    return commentsByParentId[parentId];
  }

  function createLocalComment(comment: CommentProps) {
    setComments((prevComments) => {
      return [comment, ...prevComments];
    });
  }

  function updateLocalComment(updatedComment: CommentProps) {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment.documentId === updatedComment.documentId) {
          return { ...comment, body: updatedComment.body };
        } else {
          return comment;
        }
      });
    });
  }

  function deleteLocalComment(documentId: string) {
    setComments((prevComments) => {
      return prevComments.filter(
        (comment) => comment.documentId !== documentId
      );
    });
  }

  function toggleLocalCommentLike(myDocumentId: string, addLike: boolean) {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (myDocumentId === comment.documentId) {
          if (addLike) {
            return {
              ...comment,
              liked_by: [...comment.liked_by, { documentId: myDocumentId }],
            };
          } else {
            return {
              ...comment,
              liked_by: comment.liked_by.filter(
                (likedUser) => likedUser.documentId !== myDocumentId
              ),
            };
          }
        } else {
          return comment;
        }
      });
    });
  }

  return (
    <CommentContext.Provider
      value={{
        comments,
        rootComments: commentsByParentId["root"],
        getReplies,
        createLocalComment,
        updateLocalComment,
        deleteLocalComment,
        toggleLocalCommentLike,
      }}
    >
      {loading ? (
        <div className="max-w-screen-md mx-auto shrink-0 flex-1 flex flex-col justify-center mb-20 pt-12 px-4">
          <div className="w-full flex-1 shrink-0 flex justify-center gap-2 mb-8">
            <Skeleton className="shrink-0 size-8" />
            <Skeleton className="shrink-0 w-48 h-8" />
          </div>
          <EditorLoading />
          <CommentLoading rows={2} />
        </div>
      ) : (
        // ) : error ? (
        //   error
        children
      )}
    </CommentContext.Provider>
  );
}
