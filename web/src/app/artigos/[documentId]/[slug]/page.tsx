"use server";

import { Suspense } from "react";
import { getArticle } from "../../../lib/articles";
import { DynamicBody } from "../../../components/Body";
import Hero from "../../../components/Hero";
import Article from "../../../components/Article";
import Categories from "../../../components/Categories";
import RelatedArticles from "../../../components/RelatedArticles";
import CommentSection from "@/app/components/CommentSection";

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
        <Suspense fallback={<p>Loading...</p>}>
          <CommentSection articleDocumentId={article.documentId} />
        </Suspense>
        <RelatedArticles />
      </DynamicBody>
    );
  }
}
