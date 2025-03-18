import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "../Shadcnui/skeleton";

const Author = ({ author }: { author: Author }) => {
  return (
    <div data-id="author" className="flex gap-2 items-center">
      <Link href="/sobre" className="group">
        <div className="relative flex size-10 shrink-0 overflow-hidden rounded-full">
          <Image
            src={
              author.avatar
                ? `http://127.0.0.1:1337${author.avatar.url}`
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
      <Link href="/sobre">
        <p className="transition-colors duration-500 hover:text-blog-foreground-readable-hover text-blog-foreground-highlight">
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
