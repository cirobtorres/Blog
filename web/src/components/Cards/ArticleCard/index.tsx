import Image from "next/image";
import Link from "next/link";
import { formatDateToCustomFormat } from "../../../utils/dates";

const ArticleCard = ({ article }: { article: ArticleCard }) => {
  return (
    <Link
      id="article-card-link"
      data-testid="article-card-link"
      role="link"
      href={`/artigos/[documentId]/[slug]`}
      as={`/artigos/${article.documentId}/${article.slug}`}
      className={
        `w-full h-full flex flex-col` +
        ` border border-blog-border overflow-hidden rounded` +
        ` transition-shadow duration-500 hover:shadow-blog-highlight` +
        ` focus-visible:outline focus-visible:outline-2 focus-visible:outline-blog-foreground-readable-hover`
      }
      aria-label="Clique para ler mais sobre o artigo"
    >
      <div
        data-testid="article-card-image"
        className="relative h-[200px] shrink-0 mb-2"
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
          role="img"
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
            "max-h-[calc(1.5rem_*_3)] line-clamp-3" +
            " font-extrabold text-blog-foreground-readable" +
            " text-base transition-all duration-500"
          }
        >
          {article.title}
        </p>
        <p
          data-testid="article-card-description"
          className={
            "max-h-[calc(1.25rem_*_3)] line-clamp-3" +
            " text-[hsl(0,0%,55%)]" +
            " text-sm"
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

export default ArticleCard;
