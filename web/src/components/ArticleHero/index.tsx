import Image from "next/image";
import { formatDateToCustomFormat } from "../../functions/dates";

export default function ArticleHero({
  title,
  description,
  updatedAt,
  publishedAt,
  author: { name },
  cover: { url, alternativeText },
}: {
  title: string;
  description: string;
  updatedAt: string;
  publishedAt: string;
  author: { id: string; name: string };
  cover: { url: string; alternativeText: string };
}) {
  return (
    <>
      <div className="relative w-full h-[25rem]">
        <Image
          src={`http://127.0.0.1:1337${url}`}
          alt={alternativeText}
          fill
          className="absolute object-cover"
        />
      </div>
      <div className="h-[30rem] mb-20 bg-blog-publication-hero">
        <div className="h-full grid grid-cols-article mx-auto items-center max-w-screen-2xl">
          <div className="col-start-2 max-w-screen-2xl mx-8">
            <div className="blog-center-content flex flex-col gap-4">
              <h1 className="text-5xl leading-[4rem] font-extrabold break-words line-clamp-2">
                {title}
              </h1>
              <p className="text-2xl break-words line-clamp-3">{description}</p>
              <div className="flex gap-4">
                <p>{name}</p>
                <time>{formatDateToCustomFormat(updatedAt)}</time>
                <time>{formatDateToCustomFormat(publishedAt)}</time>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
