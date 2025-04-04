import { graphqlReadArticleClient } from "../../../src/lib/graphQlClient";
import serverCountComments from "../../../src/service/comments/server";

jest.mock("../../../src/lib/graphQlClient", () => ({
  graphqlReadArticleClient: {
    request: jest.fn(),
  },
}));

jest.mocked(graphqlReadArticleClient);

describe("serverCountComments (server)", () => {
  const mockPageData = {
    comments_connection: {
      pageInfo: {
        total: 100,
      },
    },
  };

  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {}); // Silence console.error
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore original console.error after each test
  });

  it("returns comment count for article documentId", async () => {
    (graphqlReadArticleClient.request as jest.Mock).mockResolvedValue(
      mockPageData
    );
    const result = await serverCountComments("2110");

    expect(result.data).toEqual(
      mockPageData.comments_connection.pageInfo.total
    );
    expect(graphqlReadArticleClient.request).toHaveBeenCalled();
  });

  it("throws comment count error for article documentId", async () => {
    // Simulates an error to GraphQL
    (graphqlReadArticleClient.request as jest.Mock).mockRejectedValue(
      new Error("Erro na API")
    );

    await expect(serverCountComments("2110")).rejects.toThrow(
      "Failed to fetch count comments"
    );

    expect(graphqlReadArticleClient.request).toHaveBeenCalled();
  });
});
