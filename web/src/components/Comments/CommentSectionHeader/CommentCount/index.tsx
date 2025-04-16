"use client";

import { useEffect, useState } from "react";
import { clientCountComments } from "../../../../service/comments/client";
import { useComment } from "@/hooks/useComment";
import { Skeleton } from "@/components/Shadcnui/skeleton";

const CommentCount = ({ articleId }: { articleId: string }) => {
  const { comments } = useComment();
  const [commentLength, setCommentLength] = useState<number | null>(null);

  useEffect(() => {
    clientCountComments(articleId).then((data) => {
      setCommentLength(data);
    });
  }, [articleId, comments]);

  if (commentLength === null) {
    return (
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10" />
        Comentários
      </div>
    );
  }

  return commentLength <= 1
    ? `${commentLength} Comentário`
    : `${commentLength} Comentários`;
};

export default CommentCount;
