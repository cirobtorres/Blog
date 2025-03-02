import { formatDateToYouTubeLikeFormat } from "@/utils/dates";

const CommentHeader = ({
  comment,
  currentUser,
}: {
  comment: CommentProps;
  currentUser: User;
}) => {
  return (
    <p
      className={`flex gap-1 items-end text-sm ${
        currentUser.data?.documentId ===
        comment.users_permissions_user.documentId
          ? "text-blog-foreground-highlight"
          : "text-blog-foreground-readable"
      }`}
    >
      {comment.users_permissions_user.username}
      <span className="text-[#808080]">
        {formatDateToYouTubeLikeFormat(comment.createdAt)}
      </span>
      <span className="text-[#808080]">
        {comment.updatedAt > comment.createdAt && "(editado)"}
      </span>
    </p>
  );
};

export default CommentHeader;
