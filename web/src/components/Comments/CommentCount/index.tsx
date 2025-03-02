"use client";

import { useEffect, useState } from "react";
import { clientCountComments } from "../../../service/comments/client";

const CommentCount = ({ articleId }: { articleId: string }) => {
  const [commentLength, setCommentLength] = useState<number | null>(null);

  useEffect(() => {
    clientCountComments(articleId).then((data) => {
      setCommentLength(data);
    });
  }, [articleId]);

  if (commentLength === null) {
    return `0 comentário`;
  }

  return commentLength <= 1
    ? `${commentLength} comentário`
    : `${commentLength} comentários`;
};

export default CommentCount;
