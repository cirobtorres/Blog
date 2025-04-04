import { graphqlReadGlobalClient } from "../../src/lib/graphQlClient";
import { getGlobal } from "../../src/service/global";

jest.mock("../../src/lib/graphQlClient", () => ({
  graphqlReadGlobalClient: {
    request: jest.fn(),
  },
}));

jest.mocked(graphqlReadGlobalClient);

describe("getGlobal", () => {
  const mockGlobalData: Global = {
    documentId: "123",
    siteName: "MySiteName",
    siteDescription:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam odit consequatur at voluptatem ea iure pariatur aspernatur ab eum reprehenderit voluptates maiores ad inventore assumenda reiciendis unde, itaque dolores! Earum.",
    createdAt: "2025-03-10T23:11:17.381Z",
    updatedAt: "2025-03-10T23:11:17.381Z",
    publishedAt: "2025-03-10T23:11:17.381Z",
    favicon: {
      documentId: "123",
      url: "http://google.com.br",
      alternativeText: "Favicon",
      caption: "Favicon",
      width: 24,
      height: 24,
      createdAt: "2025-03-10T23:11:17.381Z",
      updatedAt: "2025-03-10T23:11:17.381Z",
      publishedAt: "2025-03-10T23:11:17.381Z",
    },
  };

  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {}); // Silence console.error
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore original console.error after each test
  });

  it("returns global data", async () => {
    (graphqlReadGlobalClient.request as jest.Mock).mockResolvedValue({
      global: mockGlobalData,
    });
    const { data: global } = await getGlobal();
    expect(global).toEqual(mockGlobalData);
    expect(graphqlReadGlobalClient.request).toHaveBeenCalled();
  });

  it("throws an error when trying to retrieve global data", async () => {
    // Simulates an error to GraphQL
    (graphqlReadGlobalClient.request as jest.Mock).mockRejectedValue(
      new Error("Erro na API")
    );
    await expect(getGlobal()).rejects.toThrow("Failed to fetch global");
    expect(graphqlReadGlobalClient.request).toHaveBeenCalled();
  });
});
