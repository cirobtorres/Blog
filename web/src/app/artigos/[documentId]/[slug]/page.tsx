"use server";

import { getArticle } from "../../../../lib/articles";
import Article from "../../../../components/Article";
import Hero from "../../../../components/Hero";
import { DynamicBody } from "../../../../components/Body";

interface Params {
  params: {
    documentId: string;
    slug: string;
  };
}

export default async function ArticlesPage({ params }: Params) {
  const { documentId } = await params;
  const { data: article } = await getArticle(documentId);

  if (article) {
    return (
      <DynamicBody documentId={documentId}>
        <Hero {...article} />
        <Article documentId={documentId} content={article.blocks} />
        <Relateds />
      </DynamicBody>
    );
  }
}

const Relateds = () => {
  return <div className="h-40 bg-blog-background-2" />;
};
