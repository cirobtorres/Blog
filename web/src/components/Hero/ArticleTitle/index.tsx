import { formatDateToCustomFormat } from "../../../utils/dates";
import { Clock, MessageCircle } from "lucide-react";
import Author from "../../Author";
import BreadCrumb from "./BreadCrumb";
import Link from "next/link";
import ArticleLikeButton from "./ArticleLikeButton";
import { countArticleLikes } from "../../../service/articles";
import serverCountComments from "../../../service/comments/server";
import { Skeleton } from "../../Shadcnui/skeleton";

const ArticleTitle = async ({
  article,
  currentUser,
}: {
  article: Article;
  currentUser: User;
}) => {
  const { data: totalLikes } = await countArticleLikes(article.documentId);
  const { data: commentLength } = await serverCountComments(article.documentId);
  return (
    <section
      id="hat-main-container" // hat = hero-article-title
      data-testid="hat-main-container"
      role="region"
      aria-labelledby="hat-header"
      className="flex items-center min-h-[30rem] py-8 mb-4 border-y border-blog-border bg-blog-background-2"
    >
      <div
        id="hat-grid-container"
        data-testid="hat-grid-container"
        className="h-full grid grid-cols-article max-lg:grid-cols-article-800 mx-auto items-center max-w-screen-2xl"
      >
        <div
          id="hat-grid-item"
          data-testid="hat-grid-item"
          className="col-start-2 max-lg:col-start-1 ml-8 mr-4 max-lg:ml-4"
        >
          {article.topic && (
            <BreadCrumb title={article.title} topic={article.topic} />
          )}
          <div
            id="hat-content-container"
            data-testid="hat-content-container"
            className="blog-heading blog-center-content flex flex-col gap-4"
          >
            <h1
              id="hat-header"
              data-testid="hat-header"
              className="leading-[4rem] font-extrabold break-words"
            >
              {article.title}
            </h1>
            <p
              id="hat-description"
              data-testid="hat-description"
              className="text-2xl break-words text-[#808080]"
            >
              {article.description}
            </p>
            <div
              id="hat-footer"
              data-testid="hat-footer"
              className="flex flex-wrap items-center gap-8"
            >
              {article.author && <Author author={article.author} />}
              <div
                id="hat-iso-date"
                data-testid="hat-iso-date"
                className="flex items-center gap-4"
              >
                <Clock className="size-6 stroke-blog-foreground-readable" />
                <div className="flex flex-col justify-center">
                  <p className="text-base">
                    <small>
                      Criado:{" "}
                      <time dateTime={article.createdAt}>
                        {formatDateToCustomFormat(article.createdAt)}
                      </time>
                    </small>
                  </p>
                  {new Date(article.updatedAt).getTime() -
                    new Date(article.createdAt).getTime() >
                    10000 && ( // 10 seconds
                    <p className="text-base leading-3">
                      <small>
                        Atualizado:{" "}
                        <time dateTime={article.createdAt}>
                          {formatDateToCustomFormat(article.updatedAt)}
                        </time>
                      </small>
                    </p>
                  )}
                </div>
              </div>
              <Link
                id="hat-link-to-comment-session"
                data-testid="hat-link-to-comment-session"
                href="#comment-session-header"
                className="flex items-center gap-4"
                aria-label={`Ir para a seção de comentários (${commentLength} ${
                  commentLength === 1 ? "comentário" : "comentários"
                })`}
              >
                <MessageCircle className="size-6" />
                {commentLength === undefined || commentLength === null ? (
                  <Skeleton
                    id="hat-skeleton-comment-count"
                    data-testid="hat-skeleton-comment-count"
                    className="h-6 w-28"
                  />
                ) : (
                  <p>
                    {commentLength === 1
                      ? `${commentLength} comentário`
                      : `${commentLength} comentários`}
                  </p>
                )}
              </Link>
              <ArticleLikeButton
                currentUser={currentUser}
                totalLikes={totalLikes}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleTitle;
