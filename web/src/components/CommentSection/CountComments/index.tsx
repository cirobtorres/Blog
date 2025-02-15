import { countComments } from "../../../lib/comments";

const CountComments = async ({ articleId }: { articleId: string }) => {
  const { data: commentLength } = await countComments(articleId);
  if (commentLength)
    return commentLength <= 1
      ? `${commentLength} comentário`
      : `${commentLength} comentários`;
};

export default CountComments;
