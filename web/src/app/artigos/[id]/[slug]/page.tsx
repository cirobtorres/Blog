"use server";

import { getArticle } from "../../../../lib/articles";
import ArticleContent from "../../../../components/ArticleContent";
import ArticleHero from "../../../../components/ArticleHero";
import { ArticleBody } from "../../../../components/Body";

interface Params {
  params: {
    id: string;
    slug: string;
  };
}

export default async function ArticlesPage({ params }: Params) {
  const { id } = await params;
  const { data: article }: { data: Article } = await getArticle(id);

  if (article) {
    return (
      <ArticleBody documentId={id}>
        <ArticleHero {...article} />
        <ArticleContent id={id} content={article.blocks} />
        <ArticlesRelated />
      </ArticleBody>
    );
  }
}

const ArticlesRelated = () => {
  return <div className="h-40 bg-blog-background-2" />;
};
