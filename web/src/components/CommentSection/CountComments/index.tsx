import { countComments } from "../../../lib/comments";

const CountComments = async ({ articleId }: { articleId: string }) => {
  const { data: commentLength } = await countComments(articleId);
  if (commentLength)
    return commentLength <= 1
      ? `${commentLength} comentário`
      : `${commentLength} comentários`;
  return `0 comentário`;
};

export default CountComments;
