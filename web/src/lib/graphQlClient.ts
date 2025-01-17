import { GraphQLClient } from "graphql-request";

const endpoint = "http://127.0.0.1:1337/graphql";
const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default graphqlClient;
