"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Popover } from "@/components/Shadcnui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { dislikeArticle, likeArticle } from "../../../../service/articles";
import PopoverLoginContent from "@/components/Authentication/PopoverLoginContent";

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
          <svg
            id="halb-icon-active"
            data-testid="halb-icon-active"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`lucide lucide-heart-icon lucide-heart size-6 text-transparent ${
              hasLiked
                ? "stroke-blog-foreground-highlight fill-blog-foreground-highlight"
                : "stroke-blog-foreground-readable fill-transparent"
            }`}
            aria-hidden="true"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
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
          <svg
            id="halb-icon"
            data-testid="halb-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-heart-icon lucide-heart size-6 stroke-blog-foreground-readable fill-transparent"
            aria-hidden="true"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <p>{formatLikeCount(likeCount.length)}</p>
        </PopoverTrigger>
        <PopoverLoginContent align="center" />
      </Popover>
    </div>
  );
}

export default ArticleLikeButton;
