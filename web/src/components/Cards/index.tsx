"use server";

import Link from "next/link";
import { getArticles } from "../../service/articles";
import LastPublishedArticleCard from "./LastPublishedArticleCard";
import { ArticleCardList } from "./ArticleCardList";

const Cards = async () => {
  const { data: articles } = await getArticles("createdAt:desc");
  const lastArticlePublished = articles.shift() as ArticleCard | undefined;

  return lastArticlePublished !== undefined ? (
    <>
      <LastPublishedArticleCard article={lastArticlePublished} />
      <ArticleCardList articles={articles} />
      {articles.length > 10 && (
        <div className="max-w-screen-2xl mx-auto px-4 flex items-center mb-10">
          <div className="mx-auto">
            <Link href="/artigos">Mais antigos</Link>
          </div>
        </div>
      )}
    </>
  ) : (
    <div className="h-full flex justify-center items-center mx-4">
      <p className="text-5xl max-[1000px]:text-3xl font-extrabold">
        Nenhum artigo publicado ainda :&#40;
      </p>
    </div>
  );
};

export default Cards;
