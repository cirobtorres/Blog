import { GraphQLClient } from "graphql-request";

const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:1337";
const endpoint = `${backend}/graphql`;
const globalToken = process.env.NEXT_PUBLIC_BACKEND_READ_GLOBAL_TOKEN;
const aboutToken = process.env.NEXT_PUBLIC_BACKEND_READ_ABOUT_TOKEN;
const readArticletoken = process.env.NEXT_PUBLIC_BACKEND_READ_ARTICLE_TOKEN;
const articleLikeToken = process.env.NEXT_PUBLIC_BACKEND_LIKE_ARTICLE_TOKEN;
const commentToken = process.env.NEXT_PUBLIC_BACKEND_COMMENT_TOKEN;

const graphqlReadGlobalClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${globalToken}`,
  },
});

const graphqlReadAboutClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${aboutToken}`,
  },
});

const graphqlReadArticleClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${readArticletoken}`,
  },
});

const graphqlLikeArticleClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${articleLikeToken}`,
  },
});

const graphqlCommentClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${commentToken}`,
  },
});

export {
  graphqlReadGlobalClient,
  graphqlReadAboutClient,
  graphqlReadArticleClient,
  graphqlLikeArticleClient,
  graphqlCommentClient,
};
