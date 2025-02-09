"use server";

import { Suspense } from "react";
import { StaticBody } from "../../components/Body";
import { countArticles, getArticles } from "../../lib/articles";
import Link from "next/link";
import Image from "next/image";
import { formatDateToCustomFormat } from "../../utils/dates";
import slugify from "../../utils/slugify";
import ArticlesPages from "../../components/Pagination";

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

  const pageSize = 2;
  const lastPage = Math.ceil(articlesCount / pageSize);

  const { data: articleList } = await getArticles("createdAt:desc", filters, {
    page: page,
    pageSize,
  });

  return (
    <>
      <StaticBody>
        <section className="w-full flex-1 flex flex-col gap-4 justify-between my-4 max-w-screen-2xl mx-auto">
          <Suspense fallback={""}>
            <ArticlesList articles={articleList} />
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
  if (articles.length > 0) {
    <ul className="w-full max-w-screen-lg mx-auto flex flex-col gap-4">
      {articles.map((article) => (
        <li key={article.documentId}>
          <Link
            href={`/artigos/${article.documentId}/${article.slug}`}
            className="mx-4 flex items-center max-[650px]:flex-col border border-blog-border bg-blog-background-2 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-blog-highlight"
          >
            <div className="w-full shrink-0 relative max-w-[40%] max-[650px]:max-w-full aspect-video h-[212px]">
              <Image
                src={`http://127.0.0.1:1337${article.cover.url}`}
                alt={article.cover.alternativeText}
                fill
                priority
                sizes={
                  `(max-width: ${article.cover.width}) 100vw` +
                  `, (max-width: ${article.cover.width / 2}) 50vw`
                }
                className="absolute object-cover"
              />
            </div>
            <div className="w-full flex-1 flex flex-col gap-2 justify-center h-[212px] py-2 px-3 overflow-hidden">
              {article.category && (
                <div className="shrink-0 h-6 flex items-center gap-4">
                  <p className="text-base truncate flex-[0_0_auto]">
                    {article.category.name}
                  </p>
                  {article.subCategories && (
                    <ul className="flex gap-x-2 overflow-x-auto blog-hide-scrollbar">
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
                {article.title}
              </h2>
              <p className="shrink-0 h-[60px] text-sm text-[#808080] line-clamp-3">
                {article.description}
              </p>
              <div className="h-8 shrink-0 flex flex-col items-end">
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
                  <p className="h-4 mb-auto text-xs">
                    <small>
                      Criado:{" "}
                      <time>{formatDateToCustomFormat(article.createdAt)}</time>
                    </small>
                  </p>
                )}
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>;
  } else {
    return (
      <div className="w-full h-full max-w-screen-lg mx-auto flex justify-center items-center">
        <h1 className="text-3xl font-extrabold">Nenhum artigo publicado</h1>
      </div>
    );
  }
};
