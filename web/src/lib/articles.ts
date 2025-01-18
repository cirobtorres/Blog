import graphqlClient from "./graphQlClient";
import { GET_ARTICLE, GET_ARTICLES } from "./queries/articles";

const getArticles = async (
  sort?: string | null,
  pagination: {
    page?: number | null;
    pageSize?: number | null;
    start?: number | null;
    limit?: number | null;
  } = {
    page: null,
    pageSize: null,
    start: null,
    limit: null,
  }
) => {
  try {
    const { articles }: { articles: ArticleCards } =
      await graphqlClient.request(GET_ARTICLES, {
        sort,
        pagination,
      });
    return { data: articles };
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    throw new Error("Failed to fetch articles");
  }
};

const getArticle = async (documentId: string) => {
  try {
    const { article }: { article: Article } = await graphqlClient.request(
      GET_ARTICLE,
      {
        documentId,
      }
    );
    return { data: article };
  } catch (error) {
    console.error("Failed to fetch article:", error);
    throw new Error("Failed to fetch article");
  }
};

export { getArticles, getArticle };
