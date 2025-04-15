"use server";

import { Suspense } from "react";
import { StaticBody } from "../../components/Body";
import { countArticles, getArticles } from "../../service/articles";
import slugify from "../../utils/slugify";
import ArticlesPages from "../../components/Pagination";
import ArticlesList from "@/components/Cards/ArticlesPaginationList";

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query || null;
  const page = Number(resolvedSearchParams?.page) || 1;

  const filters = query
    ? typeof query === "string"
      ? slugify(query)
      : slugify(query.join(" "))
    : null;

  const {
    data: { total: articlesCount },
  } = await countArticles(filters);

  const pageSize = 10;
  const lastPage = Math.ceil(articlesCount / pageSize);

  const { data: articleList } = await getArticles("createdAt:desc", filters, {
    page,
    pageSize,
  });

  return (
    <StaticBody>
      <section className="border-t border-blog-border">
        <div className="flex flex-col justify-between gap-4 my-4 max-w-screen-2xl mx-auto">
          <Suspense fallback={<h1>Carregando...</h1>}>
            <ArticlesList articles={articleList} />
          </Suspense>
          {lastPage > 1 && (
            <ArticlesPages page={Number(page)} articlesCount={lastPage} />
          )}
        </div>
      </section>
    </StaticBody>
  );
}
