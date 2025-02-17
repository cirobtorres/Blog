"use server";

import { formatDateToCustomFormat } from "../../../utils/dates";
import { Clock, MessageCircle, ThumbsUp } from "lucide-react";
import Author from "../../Author";
import BreadCrumb from "./BreadCrumb";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "../../Shadcnui/skeleton";
import CountComments from "../../CommentSection/CountComments";

const ArticleTitle = async ({ article }: { article: Article }) => {
  return (
    <section className="min-h-[30rem] py-8 mb-4 flex items-center border-b border-blog-border bg-blog-background-2">
      <div className="h-full grid grid-cols-article max-lg:grid-cols-article-800 mx-auto items-center max-w-screen-2xl">
        <div className="col-start-2 max-lg:col-start-1 ml-8 mr-4 max-lg:ml-4">
          {article.category && (
            <BreadCrumb title={article.title} category={article.category} />
          )}
          <div className="blog-heading blog-center-content flex flex-col gap-4">
            <h1 className="leading-[4rem] font-extrabold break-words">
              {article.title}
            </h1>
            <p className="text-2xl break-words text-[#808080]">
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
              <div className="flex items-center gap-4">
                <Link href="#comment-session">
                  <MessageCircle className="size-6" />
                </Link>
                <Suspense fallback={<Skeleton className="h-6 w-28" />}>
                  <p>
                    <CountComments articleId={article.documentId} />
                  </p>
                </Suspense>
              </div>
              <div className="flex items-center gap-4">
                <button type="button">
                  <ThumbsUp className="size-6" />
                </button>
                <p>4 likes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleTitle;
