"use server";

import Image from "next/image";
import { formatDateToCustomFormat } from "../../functions/dates";
import BreadCrumb from "../BreadCrumb";
import { getAuthor } from "../../lib/author";
import { Skeleton } from "../shadcnui/skeleton";
import Link from "next/link";
import { Suspense } from "react";

export default async function ArticleHero(article: Article) {
  return (
    <>
      <Hero article={article} />
      <ArticleImage cover={article.cover} />
    </>
  );
}

const Hero = ({ article }: { article: Article }) => {
  return (
    <div className="min-h-[30rem] py-8 mb-4 flex items-center bg-blog-background-2">
      <div className="h-full grid grid-cols-article max-lg:grid-cols-article-800 mx-auto items-center max-w-screen-2xl">
        <div className="col-start-2 max-lg:col-start-1 ml-8 mr-4 max-lg:ml-4">
          <BreadCrumb title={article.title} />
          <div className="blog-center-content flex flex-col gap-4">
            <h1 className="text-5xl leading-[4rem] font-extrabold break-words">
              {article.title}
            </h1>
            <p className="text-2xl break-words text-[hsl(0,0%,55%)]">
              {article.description}
            </p>
            <div className="flex gap-8">
              <Suspense
                fallback={
                  <div className="flex gap-4 items-center">
                    <Skeleton className="w-10 h-10 shrink-0 overflow-hidden rounded-full" />
                    <Skeleton className="w-24 h-4 rounded-full" />
                  </div>
                }
              >
                <Author documentId={article.author.documentId} />
              </Suspense>
              <div className="flex flex-col justify-center">
                <p className="text-base">
                  <small>
                    Criado:{" "}
                    <time>{formatDateToCustomFormat(article.createdAt)}</time>
                  </small>
                </p>
                {article.updatedAt && (
                  <p className="text-base leading-3">
                    <small>
                      Atualizado:{" "}
                      <time>{formatDateToCustomFormat(article.updatedAt)}</time>
                    </small>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Author = async ({ documentId }: { documentId: string }) => {
  const { data: author }: { data: Author } = await getAuthor(documentId);
  return (
    <div className="flex gap-4 items-center">
      <Link href="/sobre-mim" className="group">
        <div className="relative flex w-10 h-10 shrink-0 overflow-hidden rounded-full">
          <Image
            src={`http://127.0.0.1:1337${author.avatar.url}`}
            alt={author.avatar.alternativeText}
            fill
            className="transition-all duration-500 absolute object-cover group-hover:brightness-50"
          />
        </div>
      </Link>
      <Link href="/sobre-mim">
        <p className="transition-colors duration-500 hover:text-blog-foreground-readable-hover text-blog-foreground-highlight">
          <strong>{author.name}</strong>
        </p>
      </Link>
    </div>
  );
};

const ArticleImage = ({ cover }: { cover: Cover }) => {
  return (
    <div
      className={
        "grid grid-cols-article" +
        " max-lg:grid-cols-article-800" +
        " max-w-screen-2xl mx-auto mb-20"
      }
    >
      <figure
        className={
          "flex flex-col gap-3 h-[25rem]" +
          " col-start-2 max-lg:col-start-1" +
          " ml-4 mr-4 pl-4 max-lg:pl-0"
        }
      >
        <div className="shrink-0 relative h-full">
          <Image
            src={`http://127.0.0.1:1337${cover.url}`}
            alt={cover.alternativeText}
            fill
            className="absolute object-cover"
          />
        </div>
        <figcaption className="text-xs">{cover.caption}</figcaption>
      </figure>
    </div>
  );
};
