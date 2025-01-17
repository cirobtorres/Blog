import graphqlClient from "./graphQlClient";
import { GET_ARTICLE, GET_ARTICLES } from "./queries/articles";

const getArticles = async (
  sorting: string = "createdAt:desc",
  pagination: {
    page: string | null;
    pageSize: string | null;
    start: string | null;
    limit: string | null;
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
        sorting,
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
