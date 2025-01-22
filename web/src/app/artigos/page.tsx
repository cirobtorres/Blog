"use server";

import { Suspense } from "react";
import { StaticBody } from "../../components/Body";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "../../components/Shadcnui/pagination";
import { countArticles, getArticles } from "../../lib/articles";
import Link from "next/link";
import Image from "next/image";
import { formatDateToCustomFormat } from "../../utils/dates";

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page) || 1;
  const {
    data: { total: articlesCount },
  } = await countArticles();
  const pageSize = 10;
  const lastPage = Math.ceil(articlesCount / pageSize);
  const { data: articles } = await getArticles("createdAt:desc", {
    page: page,
    pageSize,
  });
  return (
    <>
      <StaticBody>
        <section className="w-full flex-1 flex flex-col gap-4 justify-between my-4 max-w-screen-2xl mx-auto">
          <Suspense fallback={""}>
            <ArticlesList articles={articles} />
          </Suspense>
          {lastPage > 1 && (
            <ArticlesPages page={Number(page)} articlesCount={lastPage} />
          )}
        </section>
      </StaticBody>
    </>
  );
}

const ArticlesList = ({ articles }: { articles: ArticleCard[] }) => {
  return (
    articles && (
      <ul className="w-full max-w-screen-lg mx-auto flex flex-col gap-4">
        {articles.map((article) => (
          <li key={article.documentId}>
            <Link
              href={`/artigos/${article.documentId}/${article.slug}`}
              className="mx-4 flex items-center max-[650px]:flex-col bg-blog-background-2 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-blog-highlight"
            >
              <div className="w-full shrink-0 relative max-w-[40%] max-[650px]:max-w-full aspect-video h-[212px]">
                <Image
                  src={`http://127.0.0.1:1337${article.cover.url}`}
                  alt={article.cover.alternativeText}
                  fill
                  sizes={
                    `(max-width: ${article.cover.width}) 100vw` +
                    `, (max-width: ${article.cover.width / 2}) 50vw`
                  }
                  className="absolute object-cover"
                />
              </div>
              <div className="w-full flex-1 flex flex-col gap-2 justify-center h-[212px] py-2 px-3">
                {/* gaps: 24px */}
                {/* 24px */}
                {article.category && (
                  <div className="shrink-0 h-6 flex flex-wrap items-center gap-4">
                    <p className="text-base truncate max-w-72">
                      {article.category.name}
                    </p>
                    {article.subCategories && (
                      <ul className="flex flex-wrap gap-x-2">
                        {article.subCategories.map((subCategory) => (
                          <li
                            key={subCategory.documentId}
                            className="flex items-center gap-2 text-xs [&_svg]:w-5"
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: subCategory.svg,
                              }}
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
                <h2 className="shrink-0 h-14 text-xl font-bold line-clamp-2 transition-all duration-500 group-hover:text-blog-foreground-highlight">
                  {/* 56px */}
                  {article.title}
                </h2>
                <p className="shrink-0 h-[60px] text-sm text-[#808080] line-clamp-3">
                  {/* 60px */}
                  {article.description}
                </p>
                <div className="h-8 shrink-0 flex flex-col items-end">
                  {/* 32px */}
                  {article.updatedAt > article.createdAt ? (
                    <>
                      <p className="h-4 mt-auto text-xs">
                        <small>
                          Criado:{" "}
                          <time>
                            {formatDateToCustomFormat(article.createdAt)}
                          </time>
                        </small>
                      </p>
                      <p className="h-4 mt-auto text-xs">
                        <small>
                          Atualizado:{" "}
                          <time>
                            {formatDateToCustomFormat(article.updatedAt)}
                          </time>
                        </small>
                      </p>
                    </>
                  ) : (
                    <p className="h-4 mt-auto text-xs">
                      <small>
                        Criado:{" "}
                        <time>
                          {formatDateToCustomFormat(article.createdAt)}
                        </time>
                      </small>
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    )
  );
};

const ArticlesPages = async ({
  page,
  articlesCount,
}: {
  page: number;
  articlesCount: number;
}) => {
  return (
    <Pagination>
      <PaginationContent>
        {page > 2 && (
          <PaginationItem>
            <PaginationLink href="?page=1" className="max-[800px]:text-xs">
              1
            </PaginationLink>
          </PaginationItem>
        )}
        {page > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {page - 1 > 0 && (
          <PaginationItem>
            <PaginationLink
              href={`?page=${page - 1}`}
              className="size-9 max-[800px]:size-8 max-[800px]:text-xs"
            >
              {page - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink
            href={`?page=${page}`}
            isActive
            className="size-9 max-[800px]:size-8 max-[800px]:text-xs"
          >
            {page}
          </PaginationLink>
        </PaginationItem>
        {page + 1 < articlesCount && (
          <PaginationItem>
            <PaginationLink
              href={`?page=${page + 1}`}
              className="size-9 max-[800px]:size-8 max-[800px]:text-xs"
            >
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {page + 2 < articlesCount && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {page < articlesCount && (
          <PaginationItem>
            <PaginationLink
              href={`?page=${articlesCount}`}
              className="size-9 max-[800px]:size-8 max-[800px]:text-xs"
            >
              {articlesCount}
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
