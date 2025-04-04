import Image from "next/image";
import Link from "next/link";
import { formatDateToCustomFormat } from "../../../utils/dates";

const ArticleCardList = ({ articles }: { articles: ArticleCard[] }) => {
  return (
    articles.length > 0 && (
      <div
        id="article-card-list"
        data-testid="article-card-list"
        aria-live="polite" // Updates dynamically
        className="max-w-screen-2xl mx-auto px-4 flex items-center mb-10"
      >
        <h2 id="article-list-title" className="sr-only">
          Lista de Artigos
        </h2>
        <ul
          role="list"
          className="w-full grid grid-cols-3 max-[800px]:grid-cols-2 max-[500px]:grid-cols-1 gap-4"
          aria-labelledby="article-list-title"
        >
          {articles.map((article) => (
            <li
              role="listitem"
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
                " p-1 rounded-lg transition-shadow duration-500 hover:shadow-blog-highlight group"
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
      id="article-card-link"
      data-testid="article-card-link"
      role="link"
      href={`/artigos/[documentId]/[slug]`}
      as={`/artigos/${article.documentId}/${article.slug}`}
      className="border border-blog-border overflow-hidden h-full w-full flex flex-col rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-blog-foreground-readable-hover"
      aria-label="Clique para ler mais sobre o artigo"
    >
      <div
        data-testid="article-card-image"
        className="relative h-[200px] shrink-0 mb-2"
      >
        <Image
          role="img"
          src={`http://127.0.0.1:1337${article.cover.url}`}
          alt={article.cover.alternativeText || "Imagem de capa do artigo"}
          fill
          sizes={
            `(max-width: ${article.cover.width}) 100vw` +
            `, (max-width: ${article.cover.width / 2}) 50vw` +
            `, 33vw`
          }
          className="absolute object-cover"
        />
      </div>
      <div className="h-full flex flex-col gap-2 px-2 pb-2">
        <p
          data-testid="article-card-title"
          className={
            "max-h-[calc(1.5rem_*_3)] line-clamp-3" + // max text height before ellipsis (3-lines)
            " font-extrabold text-blog-foreground-readable" +
            " text-base transition-all duration-500"
          }
        >
          {article.title}
        </p>
        <p
          data-testid="article-card-description"
          className={
            "max-h-[calc(1.25rem_*_3)] line-clamp-3" + // max text height before ellipsis (3-lines)
            " text-[hsl(0,0%,55%)]" +
            " text-sm group-hover:underline"
          }
        >
          {article.description}
        </p>
        <p data-testid="article-card-datetime" className="mt-auto text-xs">
          <small>
            <time>{formatDateToCustomFormat(article.createdAt)}</time>
          </small>
        </p>
      </div>
    </Link>
  );
};

export { ArticleCardList, ArticleCard };
