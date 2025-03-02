import graphqlClient from "../lib/graphQlClient";
import { GET_ABOUT } from "../lib/queries/about";

const getAbout = async () => {
  try {
    const { about }: { about: About } = await graphqlClient.request(GET_ABOUT);
    return { data: about };
  } catch (error) {
    console.error("Failed to fetch about:", error);
    throw new Error("Failed to fetch about");
  }
};

export { getAbout };
