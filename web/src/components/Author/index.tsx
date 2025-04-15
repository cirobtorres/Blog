import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "../Shadcnui/skeleton";

const Author = ({ author }: { author: Author }) => {
  return (
    <div
      id="author-container"
      data-testid="author-container"
      className="flex items-center gap-2"
    >
      <Link
        id="author-avatar-link"
        data-testid="author-avatar-link"
        href="/sobre"
        className="group"
      >
        <div
          id="author-avatar-container"
          data-testid="author-avatar-container"
          className="relative flex size-10 shrink-0 rounded-full overflow-hidden"
        >
          <Image
            id="author-avatar-image"
            data-testid="author-avatar-image"
            src={
              author.avatar
                ? process.env.NEXT_PUBLIC_BACKEND_IP + author.avatar.url
                : "/images/not-authenticated.png"
            }
            alt={
              author.avatar
                ? author.avatar.alternativeText
                : `Avatar de ${author.name}`
            }
            fill
            sizes="(max-width: 40px) 100vw"
            className="transition-all duration-500 absolute object-cover group-hover:brightness-50"
          />
        </div>
      </Link>
      <Link
        id="author-username-link"
        data-testid="author-username-link"
        href="/sobre"
      >
        <p className="transition-colors duration-500 text-blog-foreground-highlight hover:text-blog-foreground-readable-hover">
          <strong>@{author.name}</strong>
        </p>
      </Link>
    </div>
  );
};

const AuthorSkeleton = () => {
  return (
    <div className="flex gap-4 items-center">
      <Skeleton className="size-10 shrink-0 rounded-full" />
      <Skeleton className="w-20 h-4 shrink-0 rounded-full" />
    </div>
  );
};

export default Author;
export { AuthorSkeleton };
