"use client";

import { useState } from "react";
import { Popover } from "@/components/Shadcnui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { ThumbsUp } from "lucide-react";
import PopoverLoginContent from "@/components/Authentication/PopoverLoginContent";
import { dislikeArticle, likeArticle } from "../../../../service/articles";
import { useParams } from "next/navigation";

function ArticleLikeButton({
  currentUser,
  totalLikes,
}: {
  currentUser: User;
  totalLikes: {
    documentId: string;
    users_permissions_user: {
      documentId: string;
    };
  }[];
}) {
  const { documentId: articleDocumentId }: { documentId: string } = useParams();
  const [likeCount, setLikeCount] = useState(totalLikes);
  const [articleLikeId, setArticleLikeId] = useState(
    totalLikes.filter(
      (like) =>
        like.users_permissions_user.documentId === currentUser.data?.documentId
    )[0]?.documentId
  );
  const [hasLiked, setHasLiked] = useState<boolean>(
    totalLikes.some(
      (like) =>
        like.users_permissions_user.documentId === currentUser.data?.documentId
    )
  );

  const formatLikeCount = (count: number) => {
    if (count <= 0) return "0 like";
    if (count === 1) return "1 like";
    return `${count} likes`;
  };

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
          await dislikeArticle(articleLikeId);
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
          const { data } = await likeArticle(
            articleDocumentId,
            currentUser.data.documentId
          );
          setArticleLikeId(data);
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

    // Accessibility------------------------------------------------------------
    const handleKeyPress = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleLike();
      }
    };

    const buttonAriaLabel = hasLiked
      ? "Remover curtida do artigo"
      : "Curtir artigo";

    // currentUser.ok === true
    return (
      <div
        id="halb-user" // halb = hero-article-like-button
        data-testid="halb-user"
        className="flex items-center gap-4"
      >
        <button
          id="halb-button"
          data-testid="halb-button"
          type="button"
          onClick={toggleLike}
          onKeyDown={handleKeyPress}
          aria-pressed={hasLiked}
          aria-label={buttonAriaLabel}
          className="flex items-center gap-2"
        >
          <ThumbsUp
            id="halb-icon-active"
            data-testid="halb-icon-active"
            className={`size-6 ${
              hasLiked
                ? "fill-blog-foreground-highlight text-blog-foreground-highlight"
                : "fill-transparent text-blog-foreground-readable"
            }`}
            aria-hidden="true"
          />
          <p>{formatLikeCount(likeCount.length)}</p>
        </button>
      </div>
    );
  }

  // currentUser.ok === false
  return (
    <div id="halb" data-testid="halb" className="flex items-center gap-4">
      <Popover>
        <PopoverTrigger className="flex items-center gap-2">
          <ThumbsUp
            id="halb-icon"
            data-testid="halb-icon"
            className="size-6"
            aria-hidden="true"
          />
          <p>{formatLikeCount(likeCount.length)}</p>
        </PopoverTrigger>
        <PopoverLoginContent align="center" />
      </Popover>
    </div>
  );
}

export default ArticleLikeButton;
