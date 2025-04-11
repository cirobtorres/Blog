import { formatDateToYouTubeLikeFormat } from "@/utils/dates";
import { useMemo } from "react";

const DatetimeFormater = ({
  createdAt,
  updatedAt,
}: {
  createdAt: string;
  updatedAt: string;
}) => {
  return (
    <>
      <span className="text-[#808080]">
        {useMemo(() => formatDateToYouTubeLikeFormat(createdAt), [createdAt])}
      </span>
      <span className="text-[#808080]">
        {updatedAt > createdAt && "(editado)"}
      </span>
    </>
  );
};

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
        comment.users_permissions_user
          ? currentUser.data?.documentId ===
            comment.users_permissions_user.documentId
            ? "text-blog-foreground-highlight"
            : "text-blog-foreground-readable"
          : "text-[#808080]"
      }`}
    >
      {comment.users_permissions_user?.username || "[usuário excluído]"}
      {comment.users_permissions_user ? (
        <DatetimeFormater
          createdAt={comment.createdAt}
          updatedAt={comment.updatedAt}
        />
      ) : null}
    </p>
  );
};

export default CommentHeader;
