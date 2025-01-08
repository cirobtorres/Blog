"use server";

import Image from "next/image";
import ArticleContent from "../../../../components/ArticleContent";
import { formatDateToCustomFormat } from "../../../../functions/dates";
import { getCover, getArticle } from "../../../../lib/articles";

interface Params {
  params: {
    id: string;
    slug: string;
  };
}

export default async function ArticlesPage({ params }: Params) {
  const { id } = await params;
  const { data: article } = await getArticle(id);
  const cover = await getCover(article.cover.id);

  if (article) {
    return (
      <main>
        <div className="relative w-full h-[25rem]">
          <Image
            src={`http://127.0.0.1:1337${cover.url}`}
            alt={cover.alternativeText}
            fill
            className="absolute object-cover"
          />
        </div>
        <div className="h-[30rem] flex items-center bg-blog-publication-hero mb-20">
          <div className="blog-center-content flex flex-col gap-4">
            <h1 className="text-5xl leading-[4rem] font-extrabold break-words line-clamp-2">
              {article.title}
            </h1>
            <p className="text-2xl break-words line-clamp-3">
              {article.description}
            </p>
            <div className="flex gap-4">
              <p>Autor</p>
              <time>{formatDateToCustomFormat(article.updatedAt)}</time>
              <time>{formatDateToCustomFormat(article.publishedAt)}</time>
            </div>
          </div>
        </div>
        <ArticleContent id={id} content={article.blocks} />
        <div className="h-40 bg-blog-dark-background" />
      </main>
    );
  }
}
