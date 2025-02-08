import { GraphQLClient } from "graphql-request";

const endpoint = "http://127.0.0.1:1337/graphql";
const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;
const commentToken = process.env.NEXT_PUBLIC_STRAPI_COMMENT_TOKEN;

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
