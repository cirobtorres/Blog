import Image from "next/image";
import Link from "next/link";
import { formatDateToCustomFormat } from "../../../utils/dates";

const LastPublishedArticleCard = ({ article }: { article: ArticleCard }) => {
  return (
    <div
      id="last-published-article-card-container"
      data-testid="last-published-article-card-container"
      className="w-full py-4 mb-10 border-y border-blog-border bg-blog-background-2"
    >
      <div className="max-w-screen-2xl mx-auto flex items-center">
        <Link
          id="last-published-article-card-link"
          data-testid="last-published-article-card-link"
          href={`artigos/${article.documentId}/${article.slug}`}
          className="w-full"
        >
          <div
            id="last-published-article-card-image-container"
            data-testid="last-published-article-card-image-container"
            className="relative h-[500px]"
          >
            <Image
              src={
                article.cover
                  ? process.env.NEXT_PUBLIC_BACKEND_IP + article.cover.url
                  : "https://placehold.co/1920x1080/171717/FFFFFF/png"
              }
              alt={
                article.cover
                  ? article.cover.alternativeText
                  : `Imagem de destaque da capa do artigo ${article.documentId}`
              }
              fill
              sizes={
                `(max-width: ${article.cover.width}) 100vw`
                // + `, (max-width: ${article.cover.width / 2}) 50vw`
                // + `, 33vw`
              }
              className="absolute object-cover"
            />
            <div
              id="last-published-article-card-paragraph-container"
              data-testid="last-published-article-card-paragraph-container"
              className="w-full absolute bottom-0 flex flex-col gap-2 px-20 max-[800px]:px-12 max-[500px]:px-4 py-4 backdrop-blur-xl backdrop-brightness-150"
            >
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
