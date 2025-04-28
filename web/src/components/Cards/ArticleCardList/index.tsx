import ArticleCard from "../ArticleCard";

const ArticleCardList = ({ articles }: { articles: ArticleCard[] }) => {
  return (
    articles.length > 0 && (
      <div
        id="article-card-list"
        data-testid="article-card-list"
        aria-live="polite" // Updates dynamically
        className="max-w-screen-2xl mx-auto px-4 flex items-center mb-10"
      >
        <h2 id="article-list-title" className="sr-only">
          Lista de Artigos
        </h2>
        <ul
          role="list"
          className="w-full grid grid-cols-3 max-[800px]:grid-cols-2 max-[500px]:grid-cols-1 gap-4"
          aria-labelledby="article-list-title"
        >
          {articles.map((article) => (
            <li
              role="listitem"
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
                " rounded group"
              }
            >
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export { ArticleCardList };
