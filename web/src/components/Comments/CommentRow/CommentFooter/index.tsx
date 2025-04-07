import { useState } from "react";
import { Popover, PopoverTrigger } from "../../../Shadcnui/popover";
import PopoverLoginContent from "@/components/Authentication/PopoverLoginContent";
import {
  dislikeComment,
  likeComment,
} from "../../../../service/comments/client";

const CommentFooter = ({
  comment,
  currentUser,
  isReplying,
  setIsReplying,
}: {
  comment: CommentProps;
  currentUser: User;
  setIsReplying: (value: boolean) => void;
  isReplying: boolean;
}) => {
  const [likeCount, setLikeCount] = useState(comment.comment_likes);
  const [commentLikeId, setCommentLikeId] = useState<string | null>(
    likeCount.filter(
      (like) =>
        like.users_permissions_user.documentId === currentUser.data?.documentId
    )[0]?.documentId
  );
  const [hasLiked, setHasLiked] = useState<boolean>(
    comment.comment_likes.some(
      (like) =>
        like.users_permissions_user.documentId === currentUser.data?.documentId
    )
  );

  if (currentUser.ok && currentUser.data) {
    const toggleLike = async () => {
      if (hasLiked) {
        setLikeCount((prevLikes) => {
          return prevLikes.filter(
            (like) =>
              like.users_permissions_user.documentId !==
              currentUser.data.documentId
          );
        });

        setHasLiked(!hasLiked);

        try {
          if (commentLikeId) {
            await dislikeComment(commentLikeId);
            setCommentLikeId(null);
          }
        } catch (error) {
          console.error("Error while disliking article:", error);
          // Revert local state if update fails
          setLikeCount((prevLikes) =>
            hasLiked ? [...prevLikes] : prevLikes.slice(0, -1)
          );
          setHasLiked(hasLiked);
        }
      } else {
        setLikeCount((prevLikes) => {
          return [
            ...prevLikes,
            {
              documentId: currentUser.data.documentId,
              users_permissions_user: {
                documentId: currentUser.data.documentId,
              },
            },
          ];
        });

        setHasLiked(!hasLiked);

        try {
          const { data } = await likeComment(
            commentLikeId || comment.documentId,
            currentUser.data.documentId
          );
          setCommentLikeId(data.documentId);
        } catch (error) {
          console.error("Error while liking article:", error);
          // Revert local state if update fails
          setLikeCount((prevLikes) =>
            hasLiked ? [...prevLikes] : prevLikes.slice(0, -1)
          );
          setHasLiked(hasLiked);
        }
      }
    };

    return (
      <div className="flex items-center gap-4">
        <div className="flex gap-3">
          <button type="button" onClick={toggleLike}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`lucide lucide-thumbs-up ${
                hasLiked
                  ? "stroke-blog-foreground-highlight fill-blog-foreground-highlight"
                  : "stroke-current fill-none"
              }`}
            >
              <path d="M7 10v12" />
              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
            </svg>
          </button>
          <span className="text-sm p-1">{likeCount.length}</span>
        </div>
        <button
          type="button"
          onClick={() => setIsReplying(!isReplying)}
          className={`p-1 text-sm transition-colors duration-500 hover:text-blog-foreground-readable-hover ${
            isReplying
              ? "text-blog-foreground-highlight"
              : "text-blog-foreground-readable"
          }`}
        >
          Responder
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Popover>
        <div className="flex items-center gap-3">
          <PopoverTrigger>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-thumbs-up"
            >
              <path d="M7 10v12" />
              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
            </svg>
          </PopoverTrigger>
          <span className="text-sm p-1">{likeCount.length}</span>
        </div>
        <PopoverLoginContent align="center" />
      </Popover>
    </div>
  );
};

export default CommentFooter;
