import { GraphQLClient } from "graphql-request";

const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:1337";
const endpoint = `${backend}/graphql`;
const token = process.env.NEXT_PUBLIC_BACKEND_READ_ARTICLE_TOKEN;
const commentToken = process.env.NEXT_PUBLIC_BACKEND_COMMENT_TOKEN;

const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const graphqlCommentClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${commentToken}`,
  },
});

export default graphqlClient;
export { graphqlCommentClient };
