import graphqlClient from "../lib/graphQlClient";
import {
  COUNT_ARTICLES,
  GET_ARTICLE,
  GET_ARTICLES,
} from "../lib/queries/articles";

const getArticles = async (
  sort?: string | null,
  sortBy?: string | null,
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
    const searchTerms = sortBy
      ? sortBy.split("-").filter((term) => term.trim() !== "")
      : null;

    const filters = {
      and: searchTerms?.map((term) => ({
        or: [
          { slug: { contains: term } },
          { category: { slug: { contains: term } } },
          { subCategories: { slug: { contains: term } } },
          { tags: { slug: { contains: term } } },
        ],
      })),
    };

    const { articles }: { articles: ArticleCard[] } =
      await graphqlClient.request(GET_ARTICLES, {
        sort,
        filters,
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

const countArticles = async (sortBy?: string | null) => {
  try {
    const searchTerms = sortBy
      ? sortBy.split("-").filter((term) => term.trim() !== "")
      : null;

    const filters = {
      and: searchTerms?.map((term) => ({
        or: [
          { slug: { contains: term } },
          { category: { slug: { contains: term } } },
          { subCategories: { slug: { contains: term } } },
          { tags: { slug: { contains: term } } },
        ],
      })),
    };

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
    } = await graphqlClient.request(COUNT_ARTICLES, {
      filters,
    });
    return { data: pageInfo };
  } catch (error) {
    console.error("Failed to fetch count articles:", error);
    throw new Error("Failed to fetch count articles");
  }
};

export { getArticles, getArticle, countArticles };
