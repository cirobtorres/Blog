import { formatDateToCustomFormat } from "../../../utils/dates";
import { Clock, MessageCircle } from "lucide-react";
import Author from "../../Author";
import BreadCrumb from "./BreadCrumb";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "../../Shadcnui/skeleton";
import serverCountComments from "../../../service/comments/server";
import ArticleLikeButton from "./ArticleLikeButton";
import { countArticleLikes } from "../../../service/articles";

const CountComments = async ({ articleId }: { articleId: string }) => {
  const { data: commentLength } = await serverCountComments(articleId);
  return (
    <p data-testid="hero-count-comments">
      {commentLength <= 1
        ? `${commentLength} comentário`
        : `${commentLength} comentários`}
    </p>
  );
};

const ArticleTitle = async ({
  article,
  currentUser,
}: {
  article: Article;
  currentUser: User;
}) => {
  const { data: totalLikes } = await countArticleLikes(article.documentId);
  return (
    <section
      data-testid="hero-article-title"
      className="min-h-[30rem] py-8 mb-4 flex items-center border-y border-blog-border bg-blog-background-2"
    >
      <div className="h-full grid grid-cols-article max-lg:grid-cols-article-800 mx-auto items-center max-w-screen-2xl">
        <div className="col-start-2 max-lg:col-start-1 ml-8 mr-4 max-lg:ml-4">
          {article.topic && (
            <BreadCrumb title={article.title} topic={article.topic} />
          )}
          <div className="blog-heading blog-center-content flex flex-col gap-4">
            <h1
              data-testid="hero-article-title-header"
              className="leading-[4rem] font-extrabold break-words"
            >
              {article.title}
            </h1>
            <p
              data-testid="hero-article-title-description"
              className="text-2xl break-words text-[#808080]"
            >
              {article.description}
            </p>
            <div className="flex flex-wrap items-center gap-8">
              {article.author && <Author author={article.author} />}
              <div className="flex items-center gap-4">
                <Clock className="size-6 stroke-blog-foreground-readable" />
                <div className="flex flex-col justify-center">
                  <p className="text-base">
                    <small>
                      Criado:{" "}
                      <time>{formatDateToCustomFormat(article.createdAt)}</time>
                    </small>
                  </p>
                  {new Date(article.updatedAt).getTime() -
                    new Date(article.createdAt).getTime() >
                    10000 && ( // 10 seconds
                    <p className="text-base leading-3">
                      <small>
                        Atualizado:{" "}
                        <time>
                          {formatDateToCustomFormat(article.updatedAt)}
                        </time>
                      </small>
                    </p>
                  )}
                </div>
              </div>
              <Link
                href="#comment-session-header"
                className="flex items-center gap-4"
              >
                <MessageCircle className="size-6" />
                <Suspense
                  fallback={
                    <Skeleton
                      data-testid="count-comments-loading"
                      className="h-6 w-28"
                    />
                  }
                >
                  <CountComments articleId={article.documentId} />
                </Suspense>
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
export { CountComments };
