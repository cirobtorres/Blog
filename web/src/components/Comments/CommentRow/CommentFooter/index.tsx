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
  const [released, setReleased] = useState(true);
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
      comment.users_permissions_user && (
        <div className="flex items-center gap-4">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={toggleLike}
              onPointerDown={() => setReleased(false)}
              onPointerUp={() => setReleased(true)}
              onPointerLeave={() => setReleased(true)}
              className={`rounded-full border ${
                released
                  ? "transition-[border-color] duration-700 ease-in border-transparent"
                  : "border-blog-border bg-blog-border"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`lucide lucide-thumbs-up p-0.5 ${
                  hasLiked
                    ? "stroke-blog-foreground-highlight fill-blog-foreground-highlight"
                    : "stroke-current fill-none"
                }`}
              >
                <path d="M9 18v-6H5l7-7 7 7h-4v6H9z" />
              </svg>
            </button>
            <span className="text-sm p-1">{likeCount.length}</span>
          </div>
          <button
            type="button"
            onClick={() => setIsReplying(!isReplying)}
            className={`text-sm p-1 transition-colors duration-500 text-blog-foreground-readable hover:text-blog-foreground-readable-hover ${
              isReplying
                ? "text-blog-foreground-highlight"
                : "text-blog-foreground-readable"
            }`}
          >
            Responder
          </button>
          {currentUser.data.documentId !==
            comment.users_permissions_user.documentId && (
            <button className="text-sm p-1 flex items-center gap-1 transition-colors duration-500 text-blog-foreground-readable hover:text-blog-foreground-readable-hover">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-flag-icon lucide-flag"
              >
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                <line x1="4" x2="4" y1="22" y2="15" />
              </svg>
              Reportar
            </button>
          )}
        </div>
      )
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Popover>
        <div className="flex items-center gap-3">
          <PopoverTrigger>
            <div
              onPointerDown={() => setReleased(false)}
              onPointerUp={() => setReleased(true)}
              onPointerLeave={() => setReleased(true)}
              className={`rounded-full border ${
                released
                  ? "transition-[border-color] duration-700 ease-in border-transparent"
                  : "border-blog-border bg-blog-border"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-thumbs-up p-0.5 stroke-current fill-none"
              >
                <path d="M9 18v-6H5l7-7 7 7h-4v6H9z" />
              </svg>
            </div>
          </PopoverTrigger>
          <span className="text-sm p-1">{likeCount.length}</span>
          <PopoverTrigger>
            <div className="text-sm p-1 transition-colors duration-500 hover:text-blog-foreground-readable-hover text-blog-foreground-readable">
              Responder
            </div>
          </PopoverTrigger>
          {/* <PopoverTrigger>
            <div className="text-sm p-1 flex items-center gap-1 transition-colors duration-500 text-blog-foreground-readable hover:text-blog-foreground-readable-hover">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-flag-icon lucide-flag"
              >
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                <line x1="4" x2="4" y1="22" y2="15" />
              </svg>
              Reportar
            </div>
          </PopoverTrigger> */}
        </div>
        <PopoverLoginContent align="center" />
      </Popover>
    </div>
  );
};

export default CommentFooter;
