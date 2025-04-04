import {
  graphqlReadArticleClient,
  graphqlLikeArticleClient,
} from "../lib/graphQlClient";
import {
  COUNT_ARTICLES,
  COUNT_LIKES,
  DISLIKE_ARTICLE,
  GET_ARTICLE,
  GET_ARTICLES,
  LIKE_ARTICLE,
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
          { topic: { slug: { contains: term } } },
          { tools: { slug: { contains: term } } },
          { tags: { slug: { contains: term } } },
        ],
      })),
    };

    const { articles }: { articles: ArticleCard[] } =
      await graphqlReadArticleClient.request(GET_ARTICLES, {
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
    const { article }: { article: Article } =
      await graphqlReadArticleClient.request(GET_ARTICLE, {
        documentId,
      });

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
          { topic: { slug: { contains: term } } },
          { tools: { slug: { contains: term } } },
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
    } = await graphqlReadArticleClient.request(COUNT_ARTICLES, {
      filters,
    });

    return { data: pageInfo };
  } catch (error) {
    console.error("Failed to fetch count articles:", error);
    throw new Error("Failed to fetch count articles");
  }
};

const countArticleLikes = async (articleDocumentId: string) => {
  try {
    const filters = {
      article: {
        documentId: {
          eq: articleDocumentId,
        },
      },
    };

    const {
      articleLikes,
    }: {
      articleLikes: {
        documentId: string;
        users_permissions_user: {
          documentId: string;
        };
      }[];
    } = await graphqlLikeArticleClient.request(COUNT_LIKES, {
      filters,
    });

    return { data: articleLikes };
  } catch (error) {
    console.error("Failed to count article likes:", error);
    throw new Error("Failed to count article likes");
  }
};

const likeArticle = async (
  articleDocumentId: string,
  userDocumentId: string
) => {
  try {
    const data = {
      article: articleDocumentId,
      users_permissions_user: userDocumentId,
    };

    const {
      createArticleLike: { documentId },
    }: {
      createArticleLike: {
        documentId: string;
        users_permissions_user: string;
      };
    } = await graphqlLikeArticleClient.request(LIKE_ARTICLE, {
      documentId: articleDocumentId,
      data,
    });

    return { data: documentId };
  } catch (error) {
    console.error("Failed to like article:", error);
    throw new Error("Failed to like article");
  }
};

const dislikeArticle = async (articleDocumentId: string) => {
  try {
    const {
      deleteArticleLike: { documentId },
    }: {
      deleteArticleLike: {
        documentId: string;
      };
    } = await graphqlLikeArticleClient.request(DISLIKE_ARTICLE, {
      documentId: articleDocumentId,
    });

    return { data: documentId };
  } catch (error) {
    console.error("Failed to dislike article:", error);
    throw new Error("Failed to dislike article");
  }
};

export {
  getArticles,
  getArticle,
  countArticles,
  countArticleLikes,
  likeArticle,
  dislikeArticle,
};
