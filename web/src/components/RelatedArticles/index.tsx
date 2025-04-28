import { getArticles } from "../../service/articles";
import ArticleCard from "../Cards/ArticleCard";
import { Carousel, CarouselContent, CarouselItem } from "../Shadcnui/carousel";

const RelatedArticles = async () => {
  const { data: articles } = await getArticles("createdAt:desc", null, {
    pageSize: 5,
  });
  return (
    articles.length > 0 && (
      <section
        id="ra-container" // related-article
        data-testid="ra-container" // related-article
        className={
          `flex flex-col justify-center` +
          ` border-y border-blog-border` +
          ` bg-blog-background-3` +
          ` py-8`
        }
      >
        <div className="w-full max-w-screen-lg grid grid-cols-1 mx-auto mb-8">
          <div className="blog-heading text-center col-start-1 max-lg:px-4 px-8">
            <h2>Artigos relacionados</h2>
          </div>
        </div>
        <div
          id="rac-container" // related-article-carousel
          data-testid="rac-container" // related-article-carousel
          className="grid grid-cols-1 max-w-screen-lg mx-auto"
        >
          <div>
            <Carousel opts={{ loop: true, dragFree: true }}>
              <CarouselContent className="mx-1">
                {articles.map((article) => (
                  <CarouselItem
                    id={`rac-item-${article.documentId}`} // related-article-carousel
                    data-testid={`rac-item-${article.documentId}`} // related-article-carousel
                    key={article.documentId}
                    className="max-w-96 my-2 group"
                  >
                    <ArticleCard article={article} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </section>
    )
  );
};

export default RelatedArticles;
