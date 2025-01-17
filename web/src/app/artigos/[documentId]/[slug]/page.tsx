"use server";

import { getArticle, getArticles } from "../../../../lib/articles";
import Article from "../../../../components/Article";
import Hero from "../../../../components/Hero";
import { DynamicBody } from "../../../../components/Body";
import { ArticleCard } from "../../../../components/Cards";

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

const Relateds = async () => {
  const { data: articles } = await getArticles();
  return (
    <section className="px-4 flex items-center bg-blog-background-2">
      <ul className="py-10 w-full max-w-screen-2xl mx-auto grid grid-cols-3 max-[800px]:grid-cols-2 max-[500px]:grid-cols-1 gap-4">
        {articles.map((article) => (
          <li
            key={article.documentId}
            className={
              "w-full max-h-[calc(200px_+_0.5rem_+_1.5rem_*_3_+_1.25rem_*_3_+_1rem_+_0.5rem_*_2_+_0.5rem)]" +
              // calc:
              //    Image Height (200px) +
              //    Image Bottom Margin (0.5rem) +
              //    Title Max Line Height (1.5rem * 3) +
              //    SubTitle Max Line Height (1.25rem * 3) +
              //    CreatedAt Line Height (1rem) +
              //    Flex Col Gap (0.5rem * 2) +
              //    Bottom Padding (0.5rem)
              " transition-all ease-in-out duration-200" +
              " focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blog-foreground-highlight" +
              " overflow-hidden bg-blog-background-2 group"
            }
          >
            <ArticleCard article={article} />
          </li>
        ))}
      </ul>
    </section>
  );
};
