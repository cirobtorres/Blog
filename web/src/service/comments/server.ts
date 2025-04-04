import { graphqlReadArticleClient } from "../../lib/graphQlClient";
import { COUNT_COMMENTS } from "../../lib/queries/comments";

const serverCountComments = async (documentId: string) => {
  try {
    const {
      comments_connection,
    }: { comments_connection: { pageInfo: { total: number } } } =
      await graphqlReadArticleClient.request(COUNT_COMMENTS, {
        filters: {
          article: {
            documentId: {
              eq: documentId,
            },
          },
        },
      });
    return { data: comments_connection.pageInfo.total };
  } catch (error) {
    console.error("Failed to fetch count comments:", error);
    throw new Error("Failed to fetch count comments");
  }
};

export default serverCountComments;
