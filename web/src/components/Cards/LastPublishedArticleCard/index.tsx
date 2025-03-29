import Image from "next/image";
import Link from "next/link";
import { formatDateToCustomFormat } from "../../../utils/dates";

const LastPublishedArticleCard = ({ article }: { article: ArticleCard }) => {
  return (
    <div className="w-full py-4 bg-blog-background-2 mb-10 border-y border-blog-border">
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
              sizes={
                `(max-width: ${article.cover.width}) 100vw`
                // + `, (max-width: ${article.cover.width / 2}) 50vw`
                // + `, 33vw`
              }
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

export default LastPublishedArticleCard;
