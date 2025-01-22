"use server";

import { getArticle } from "../../../../lib/articles";
import { DynamicBody } from "../../../../components/Body";
import Article from "../../../../components/Article";
import Hero from "../../../../components/Hero";
import Categories from "../../../../components/Categories";
import RelatedArticles from "../../../../components/RelatedArticles";

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
        {article.category && (
          <Categories
            category={article.category}
            subCategories={article.subCategories}
            tags={article.tags}
          />
        )}
        <RelatedArticles />
      </DynamicBody>
    );
  }
}
