import graphqlClient from "../lib/graphQlClient";
import { GET_GLOBAL } from "../lib/queries/global";

const getGlobal = async () => {
  try {
    const { global }: { global: Global } = await graphqlClient.request(
      GET_GLOBAL
    );
    return { data: global };
  } catch (error) {
    console.error("Failed to fetch global:", error);
    throw new Error("Failed to fetch global");
  }
};

export { getGlobal };
