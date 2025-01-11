import Image from "next/image";
import { formatDateToCustomFormat } from "../../functions/dates";
import BreadCrumb from "../BreadCrumb";

export default function ArticleHero({
  title,
  description,
  updatedAt,
  publishedAt,
  author: { name },
  cover: { url, alternativeText, caption },
}: {
  title: string;
  description: string;
  updatedAt: string;
  publishedAt: string;
  author: { id: string; name: string };
  cover: { url: string; alternativeText: string; caption: string };
}) {
  return (
    <>
      <div className="h-[30rem] bg-blog-background-2 mb-4">
        <div className="h-full grid grid-cols-article mx-auto items-center max-w-screen-2xl">
          <div className="col-start-2 mx-8">
            <BreadCrumb title={title} />
            <div className="blog-center-content flex flex-col gap-4">
              <h1 className="text-5xl leading-[4rem] font-extrabold break-words line-clamp-2">
                {title}
              </h1>
              <p className="text-2xl break-words line-clamp-3">{description}</p>
              <div className="flex gap-8">
                <p className="text-blog-foreground-highlight">
                  <strong>{name}</strong>
                </p>
                {updatedAt && updatedAt > publishedAt ? (
                  <time>{formatDateToCustomFormat(updatedAt)}</time>
                ) : null}
                <time>{formatDateToCustomFormat(publishedAt)}</time>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-article mx-auto max-w-screen-2xl mb-20">
        <figure className="flex flex-col gap-3 col-start-2 mx-8 h-[25rem]">
          <div className="shrink-0 relative h-full">
            <Image
              src={`http://127.0.0.1:1337${url}`}
              alt={alternativeText}
              fill
              className="absolute object-cover"
            />
          </div>
          <figcaption className="text-xs">{caption}</figcaption>
        </figure>
      </div>
    </>
  );
}
