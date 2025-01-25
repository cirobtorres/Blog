import { getArticles } from "../../lib/articles";
import { ArticleCard } from "../Cards/ArticleCardList";
import { Carousel, CarouselContent, CarouselItem } from "../Shadcnui/carousel";

const RelatedArticles = async () => {
  const { data: articles } = await getArticles();
  return (
    <section className="border-t border-blog-border bg-blog-background-3 py-8 flex flex-col justify-center">
      <div
        className="w-full max-w-screen-lg mx-auto mb-8 grid grid-cols-1" // grid grid-cols-article max-lg:grid-cols-article-800 items-center
      >
        <div className="text-center blog-heading col-start-1 px-8 max-lg:px-4">
          <h2>Artigos relacionados</h2>
        </div>
      </div>
      <div
        className="max-w-screen-lg mx-auto grid grid-cols-1" // grid grid-cols-article max-lg:grid-cols-article-800 items-center
      >
        <div
          className="mx-4" // col-start-2 max-lg:col-start-1 mx-8 max-lg:mx-4
        >
          <Carousel opts={{ loop: true, dragFree: true }}>
            <CarouselContent>
              {articles.map((article) => (
                <CarouselItem
                  key={article.documentId}
                  className="max-w-96 group"
                >
                  <ArticleCard article={article} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;
