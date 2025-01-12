"use server";

import Image from "next/image";
import { formatDateToCustomFormat } from "../../functions/dates";
import BreadCrumb from "../BreadCrumb";
import { getAuthor } from "../../lib/author";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcnui/avatar";
import { Skeleton } from "../shadcnui/skeleton";
import Link from "next/link";

export default async function ArticleHero(article: Article) {
  const { data: author } = await getAuthor(article.author.documentId);
  return (
    <>
      <div className="h-[30rem] bg-blog-background-2 mb-4">
        <div className="h-full grid grid-cols-article mx-auto items-center max-w-screen-2xl">
          <div className="col-start-2 mx-8">
            <BreadCrumb title={article.title} />
            <div className="blog-center-content flex flex-col gap-4">
              <h1 className="text-5xl leading-[4rem] font-extrabold break-words line-clamp-2">
                {article.title}
              </h1>
              <p className="text-2xl break-words line-clamp-3">
                {article.description}
              </p>
              <div className="flex gap-8">
                <div className="flex gap-4 items-center">
                  <Avatar>
                    <AvatarImage
                      src={`http://127.0.0.1:1337${author.avatar.url}`}
                    />
                    <AvatarFallback>
                      <Skeleton className="w-full h-full rounded" />
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-blog-foreground-highlight">
                    <strong>
                      <Link
                        href="/sobre-mim"
                        className="transition-colors duration-500 hover:text-blog-foreground-readable-hover"
                      >
                        {author.name}
                      </Link>
                    </strong>
                  </p>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-sm">
                    Criado:{" "}
                    <time>{formatDateToCustomFormat(article.createdAt)}</time>
                  </p>
                  {article.updatedAt && (
                    <p className="text-sm">
                      Atualizado:{" "}
                      <time>{formatDateToCustomFormat(article.updatedAt)}</time>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-article mx-auto max-w-screen-2xl mb-20">
        <figure className="flex flex-col gap-3 col-start-2 mx-8 h-[25rem]">
          <div className="shrink-0 relative h-full">
            <Image
              src={`http://127.0.0.1:1337${article.cover.url}`}
              alt={article.cover.alternativeText}
              fill
              className="absolute object-cover"
            />
          </div>
          <figcaption className="text-xs">{article.cover.caption}</figcaption>
        </figure>
      </div>
    </>
  );
}
