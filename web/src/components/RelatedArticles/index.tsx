import { getArticles } from "../../lib/articles";
import { ArticleCard } from "../Cards/ArticleCardList";
import { Carousel, CarouselContent, CarouselItem } from "../Shadcnui/carousel";

const RelatedArticles = async () => {
  const { data: articles } = await getArticles();
  return (
    <section className="bg-blog-background-2 py-8 flex flex-col justify-center">
      <div className="w-full grid grid-cols-article max-lg:grid-cols-article-800 items-center max-w-screen-2xl mx-auto">
        <div className="blog-heading col-start-2 max-lg:col-start-1 px-8 max-lg:px-4">
          <h2>Artigos relacionados</h2>
        </div>
      </div>
      <div className="grid grid-cols-article max-lg:grid-cols-article-800 items-center max-w-screen-2xl mx-auto">
        <div className="col-start-2 max-lg:col-start-1 mx-8 max-lg:mx-4">
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
