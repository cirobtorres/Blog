import { getArticles } from "../../service/articles";
import { ArticleCard } from "../Cards/ArticleCardList";
import { Carousel, CarouselContent, CarouselItem } from "../Shadcnui/carousel";

const RelatedArticles = async () => {
  const { data: articles } = await getArticles("createdAt:desc", null, {
    pageSize: 5,
  });
  return (
    <section
      id="rel-art-container"
      data-testid="rel-art-container"
      className="border-y border-blog-border bg-blog-background-3 py-8 flex flex-col justify-center"
    >
      <div className="w-full max-w-screen-lg mx-auto mb-8 grid grid-cols-1">
        <div className="text-center blog-heading col-start-1 px-8 max-lg:px-4">
          <h2>Artigos relacionados</h2>
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto grid grid-cols-1">
        <div>
          <Carousel opts={{ loop: true, dragFree: true }}>
            <CarouselContent className="mx-1">
              {articles.map((article) => (
                <CarouselItem
                  key={article.documentId}
                  className="p-2 my-2 max-w-96 rounded-lg transition-shadow duration-500 hover:shadow-blog-highlight group"
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
