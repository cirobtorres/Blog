import Image from "next/image";
import Link from "next/link";
import { formatDateToCustomFormat } from "../../../utils/dates";

const ArticleCardList = ({ articles }: { articles: ArticleCard[] }) => {
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
                " border border-blog-border rounded-xl transition-shadow duration-500 bg-blog-background-2 hover:shadow-blog-highlight group"
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
      href={`/artigos/[documentId]/[slug]`}
      as={`/artigos/${article.documentId}/${article.slug}`}
      className="overflow-hidden h-full w-full flex flex-col rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-blog-foreground-readable-hover"
    >
      <div className="shrink-0 relative h-[200px] mb-2">
        <Image
          src={`http://127.0.0.1:1337${article.cover.url}`}
          alt={article.cover.alternativeText}
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
          className={
            "max-h-[calc(1.5rem_*_3)] line-clamp-3" + // max text height before ellipsis (3-lines)
            " font-extrabold text-blog-foreground-readable" +
            " text-base transition-all duration-500"
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

export default ArticleCardList;
export { ArticleCard };
