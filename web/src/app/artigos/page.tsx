"use server";

import { Suspense } from "react";
import { StaticBody } from "../../components/Body";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/Shadcnui/pagination";
import { getArticles } from "../../lib/articles";
import Link from "next/link";
import Image from "next/image";
import { formatDateToCustomFormat } from "../../utils/dates";

export default async function ArticlesPage() {
  const { data: articles } = await getArticles("createdAt:desc", {
    page: 5,
    pageSize: 1,
  });
  return (
    <>
      <StaticBody>
        <div className="flex-1 flex flex-col justify-between my-8 max-w-screen-2xl mx-auto">
          <Suspense fallback={""}>
            <ArticlesList articles={articles} />
          </Suspense>
          <ArticlesPages />
        </div>
      </StaticBody>
    </>
  );
}

const ArticlesList = ({ articles }: { articles: ArticleCard[] }) => {
  return (
    articles && (
      <ul className="w-full max-w-screen-lg">
        {articles.map((article) => (
          <li key={article.documentId}>
            <Link
              href={`/artigos/${article.documentId}/${article.slug}`}
              className="flex"
            >
              <div className="shrink-0 relative w-96 h-64">
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
              <div className="w-full h-64">
                <p className="">{article.category.name}</p>
                <h2 className="text-base">{article.title}</h2>
                <p className="text-sm">{article.description}</p>
                <p className="text-sm">{article.author.name}</p>
                <p className="mt-auto text-xs">
                  <small>
                    <time>{formatDateToCustomFormat(article.createdAt)}</time>
                  </small>
                </p>
                <p className="mt-auto text-xs">
                  <small>
                    <time>{formatDateToCustomFormat(article.updatedAt)}</time>
                  </small>
                </p>
                {article.tags && (
                  <ul className="flex flex-wrap gap-x-2">
                    {article.tags.map((tag) => (
                      <li
                        key={tag.documentId}
                        className="text-sm text-[#808080] italic"
                      >
                        {tag.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    )
  );
};

const ArticlesPages = () => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            5
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">6</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">11</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
