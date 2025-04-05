import { faker } from "@faker-js/faker";
import {
  mockArticle,
  mockArticles,
  mockArticlesCount,
} from "../../__mocks__/mockArticles";
import { graphqlReadArticleClient } from "../../src/lib/graphQlClient";
import {
  countArticles,
  getArticle,
  getArticles,
} from "../../src/service/articles";
import slugify from "../../src/utils/slugify";

jest.mock("../../src/lib/graphQlClient", () => ({
  graphqlReadArticleClient: {
    request: jest.fn(),
  },
}));

jest.mocked(graphqlReadArticleClient);

describe("countArticles", () => {
  it("returns total articles", async () => {
    (graphqlReadArticleClient.request as jest.Mock).mockResolvedValue(
      mockArticlesCount
    );
    const result = await countArticles();
    expect(result.data).toEqual(mockArticlesCount.articles_connection.pageInfo);
    expect(graphqlReadArticleClient.request).toHaveBeenCalled();
  });

  it("returns total articles (by query string)", async () => {
    const query = "This is my query string!";
    const filters = slugify(query);
    (graphqlReadArticleClient.request as jest.Mock).mockResolvedValue(
      mockArticlesCount
    );
    const result = await countArticles(filters);
    expect(result.data).toEqual(mockArticlesCount.articles_connection.pageInfo);
    expect(graphqlReadArticleClient.request).toHaveBeenCalled();
  });

  it("throws an error when graphqlReadArticleClient.request fails", async () => {
    // Silence console.error
    jest.spyOn(console, "error").mockImplementation(() => {});
    // Simulates an error to GraphQL
    (graphqlReadArticleClient.request as jest.Mock).mockRejectedValue(
      new Error("Erro na API")
    );
    await expect(countArticles()).rejects.toThrow(
      "Failed to fetch count articles"
    );
    expect(graphqlReadArticleClient.request).toHaveBeenCalled();
  });
});

describe("getArticles", () => {
  const mockedArticles = mockArticles();
  it("returns articles", async () => {
    (graphqlReadArticleClient.request as jest.Mock).mockResolvedValue({
      articles: { ...mockedArticles },
    });
    const result = await getArticles();
    expect(result.data).toEqual({ ...mockedArticles });
    expect(graphqlReadArticleClient.request).toHaveBeenCalled();
  });

  it("returns articles sorted by createdAt", async () => {
    (graphqlReadArticleClient.request as jest.Mock).mockResolvedValue({
      articles: { ...mockedArticles },
    });
    const result = await getArticles(null, "createdAt:asc");
    expect(result.data).toEqual({ ...mockedArticles });
    expect(graphqlReadArticleClient.request).toHaveBeenCalled();
  });

  it("throws an error when graphqlReadArticleClient.request fails", async () => {
    // Silence console.error
    jest.spyOn(console, "error").mockImplementation(() => {});
    // Simulates an error to GraphQL
    (graphqlReadArticleClient.request as jest.Mock).mockRejectedValue(
      new Error("Erro na API")
    );
    await expect(getArticles()).rejects.toThrow("Failed to fetch articles");
    expect(graphqlReadArticleClient.request).toHaveBeenCalled();
  });
});

describe("getArticle", () => {
  const mockedArticle = mockArticle;
  it("returns article", async () => {
    (graphqlReadArticleClient.request as jest.Mock).mockResolvedValue({
      article: mockedArticle,
    });
    const result = await getArticle(mockedArticle.documentId);
    expect(result.data).toEqual({ ...mockedArticle });
    expect(graphqlReadArticleClient.request).toHaveBeenCalled();
  });

  it("throws an error when graphqlReadArticleClient.request fails", async () => {
    // Silence console.error
    jest.spyOn(console, "error").mockImplementation(() => {});
    // Simulates an error to GraphQL
    (graphqlReadArticleClient.request as jest.Mock).mockRejectedValue(
      new Error("Erro na API")
    );
    await expect(getArticle(faker.string.uuid())).rejects.toThrow(
      "Failed to fetch article"
    );
    expect(graphqlReadArticleClient.request).toHaveBeenCalled();
  });
});
