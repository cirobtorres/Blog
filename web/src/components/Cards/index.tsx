"use server";

import Link from "next/link";
import { getArticles } from "../../lib/articles";
import Image from "next/image";
import { formatDateToCustomFormat } from "../../utils/dates";
import { Skeleton } from "../shadcnui/skeleton";

const Cards = async () => {
  const { data: articles } = await getArticles();
  const lastArticlePublished = articles.shift() as ArticleCard | undefined;

  return lastArticlePublished !== undefined ? (
    <>
      <ArticleCardLastPublished article={lastArticlePublished} />
      <ArticleList articles={articles} />
    </>
  ) : (
    <div className="h-full flex justify-center items-center">
      <p className="text-5xl font-extrabold">
        Nenhum artigo publicado ainda :&#40;
      </p>
    </div>
  );
};

const ArticleCardLastPublished = ({ article }: { article: ArticleCard }) => {
  return (
    <div className="w-full py-4 bg-blog-background-2 mb-10">
      <div className="max-w-screen-2xl mx-auto flex items-center">
        <Link
          href={`artigos/${article.documentId}/${article.slug}`}
          className="w-full"
        >
          <div className="relative h-[500px]">
            <Image
              src={`http://127.0.0.1:1337${article.cover.url}`}
              alt={article.cover.alternativeText}
              fill
              className="absolute object-cover"
            />
            <div className="flex flex-col gap-2 w-full absolute bottom-0 px-20 max-[800px]:px-12 max-[500px]:px-4 py-4 backdrop-blur-xl backdrop-brightness-150">
              <p
                className={
                  "text-white font-extrabold" +
                  " text-4xl max-[800px]:text-3xl max-[500px]:text-2xl"
                }
              >
                {article.title}
              </p>
              <p
                className={
                  "text-white" +
                  " text-xl max-[800px]:text-lg max-[500px]:text-base" +
                  " max-h-[calc(1.75rem_*_3)] line-clamp-3" +
                  // " max-[800px]:max-h-[calc(1.75rem_*_3)] max-[800px]:line-clamp-3" +
                  " max-[500px]:max-h-[calc(1.5rem_*_2)] max-[500px]:line-clamp-2"
                }
              >
                {article.description}
              </p>
              <p>
                <small className="flex justify-center text-white text-xs">
                  <time>{formatDateToCustomFormat(article.createdAt)}</time>
                </small>
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

const ArticleList = ({ articles }: { articles: ArticleCards }) => {
  return (
    articles.length > 0 && (
      <div className="max-w-screen-2xl mx-auto px-4 flex items-center mb-10">
        <ul className="w-full grid grid-cols-3 max-[800px]:grid-cols-2 max-[500px]:grid-cols-1 gap-4">
          {articles.map((article) => (
            <li
              key={article.documentId}
              className={
                "w-full max-h-[calc(200px_+_0.5rem_+_1.5rem_*_3_+_1.25rem_*_3_+_1rem_+_0.5rem_*_2_+_0.5rem)]" +
                // calc:
                //    Image Height (200px) +
                //    Image Bottom Margin (0.5rem) +
                //    Title Max Line Height (1.5rem * 3) +
                //    SubTitle Max Line Height (1.25rem * 3) +
                //    CreatedAt Line Height (1rem) +
                //    Flex Col Gap (0.5rem * 2) +
                //    Bottom Padding (0.5rem)
                " transition-all ease-in-out duration-200" +
                " focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blog-foreground-highlight" +
                " rounded-xl overflow-hidden bg-blog-background-2 shadow-lg group"
              }
            >
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

const ArticleCard = ({ article }: { article: ArticleCard }) => {
  return (
    <Link
      href={`artigos/${article.documentId}/${article.slug}`}
      className="h-full w-full flex flex-col"
    >
      <div className="shrink-0 relative h-[200px] mb-2">
        <Image
          src={`http://127.0.0.1:1337${article.cover.url}`}
          alt={article.cover.alternativeText}
          fill
          className="absolute object-cover"
        />
      </div>
      <div className="h-full flex flex-col gap-2 px-2 pb-2">
        <p
          className={
            "max-h-[calc(1.5rem_*_3)] line-clamp-3" + // max text height before ellipsis (3-lines)
            " font-extrabold text-blog-foreground-readable" +
            " text-base group-hover:underline"
          }
        >
          {article.title}
        </p>
        <p
          className={
            "max-h-[calc(1.25rem_*_3)] line-clamp-3" + // max text height before ellipsis (3-lines)
            " text-[hsl(0,0%,55%)]" +
            " text-sm group-hover:underline"
          }
        >
          {article.description}
        </p>
        <p className="mt-auto text-xs">
          <small>
            <time>{formatDateToCustomFormat(article.createdAt)}</time>
          </small>
        </p>
      </div>
    </Link>
  );
};

const LoadingCards = () => {
  return (
    <>
      <div className="relative max-w-screen-2xl mx-auto h-[400px] flex items-center mb-10">
        <Skeleton className="w-full h-full rounded" />
      </div>
      <div className="max-w-screen-2xl mx-auto flex items-center mb-10">
        <ul className="w-full grid grid-cols-3 max-[800px]:grid-cols-2 max-[500px]:grid-cols-1 gap-4">
          {Array.from({ length: 3 }, (_, key) => key).map((_, key: number) => (
            <li key={key}>
              <Skeleton className="w-full h-[200px] mb-2 rounded" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Cards;
export { ArticleCardLastPublished, ArticleCard, LoadingCards };
