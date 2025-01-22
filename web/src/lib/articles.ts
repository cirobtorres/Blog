import graphqlClient from "./graphQlClient";
import { COUNT_ARTICLES, GET_ARTICLE, GET_ARTICLES } from "./queries/articles";

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
    const { articles }: { articles: ArticleCard[] } =
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

const countArticles = async () => {
  try {
    const {
      articles_connection: { pageInfo },
    }: {
      articles_connection: {
        __typename: string;
        pageInfo: {
          __typename: string;
          page: number;
          pageCount: number;
          pageSize: number;
          total: number;
        };
      };
    } = await graphqlClient.request(COUNT_ARTICLES);
    return { data: pageInfo };
  } catch (error) {
    console.error("Failed to fetch count articles:", error);
    throw new Error("Failed to fetch count articles");
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

export { getArticles, countArticles, getArticle };
