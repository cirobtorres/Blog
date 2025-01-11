"use server";

import { getArticle } from "../../../../lib/articles";
import ArticleContent from "../../../../components/ArticleContent";
import ArticleHero from "../../../../components/ArticleHero";

interface Params {
  params: {
    id: string;
    slug: string;
  };
}

export default async function ArticlesPage({ params }: Params) {
  const { id } = await params;
  const { data: article } = await getArticle(id);

  if (article) {
    return (
      <main>
        <ArticleHero {...article} />
        <ArticleContent id={id} content={article.blocks} />
        <ArticlesRelated />
      </main>
    );
  }
}

const ArticlesRelated = () => {
  return <div className="h-40 bg-blog-background-2" />;
};
