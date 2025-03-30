import graphqlClient from "../../src/lib/graphQlClient";
import {
  countArticles,
  getArticle,
  getArticles,
} from "../../src/service/articles";
import slugify from "../../src/utils/slugify";

jest.mock("../../src/lib/graphQlClient", () => ({
  request: jest.fn(),
}));

jest.mocked(graphqlClient);

describe("Article Libs", () => {
  const mockDatas = {
    articles: [
      {
        documentId: "2101",
        title: "Title Test 1",
        slug: "title-test-1",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat recusandae earum dolore nisi accusantium officiis neque.",
        createdAt: "2025-03-10T23:11:17.381Z",
        updatedAt: "2025-03-10T23:11:17.381Z",
        publishedAt: "2025-03-10T23:11:17.381Z",
        cover: {
          documentId: "11",
          url: "http://test",
          alternativeText: "test alt text",
          caption: "Test caption",
          width: 380,
          height: 380,
        },
        author: {
          name: "Author",
          avatar: {
            url: "http://test",
            alternativeText: "test alt author",
          },
        },
        topic: {},
        tools: [],
        tags: [],
        blocks: [],
      },
      {
        documentId: "2102",
        title: "Title Test 2",
        slug: "title-test-2",
        description:
          "Libero suscipit totam laboriosam nobis similique qui, deserunt odio dolorem tempore necessitatibus fugiat! Similique.",
        createdAt: "",
        updatedAt: "",
        publishedAt: "",
        cover: {
          documentId: "11",
          url: "http://test",
          alternativeText: "test alt text",
          caption: "Test caption",
          width: 380,
          height: 380,
        },
        author: {
          name: "Author",
          avatar: {
            url: "http://test",
            alternativeText: "test alt author",
          },
        },
        topic: {},
        tools: [],
        tags: [],
        blocks: [],
      },
    ],
  };

  const mockData = {
    article: {
      documentId: "2101",
      title: "Title Test 1",
      slug: "title-test-1",
      description:
        "Libero suscipit totam laboriosam nobis similique qui, deserunt odio dolorem tempore necessitatibus fugiat! Similique.",
      createdAt: "2025-03-10T23:11:17.381Z",
      updatedAt: "2025-03-10T23:11:17.381Z",
      publishedAt: "2025-03-10T23:11:17.381Z",
      cover: {
        documentId: "11",
        url: "http://test",
        alternativeText: "test alt text",
        caption: "Test caption",
        width: 380,
        height: 380,
      },
      author: {
        name: "Author",
        avatar: {
          url: "http://test",
          alternativeText: "test alt author",
        },
      },
      topic: {},
      tools: [],
      tags: [],
      blocks: [],
    },
  };

  const mockPageData = {
    articles_connection: {
      pageInfo: { total: 100, pageCount: 10, pageSize: 10, page: 1 },
    },
  };

  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {}); // Silence console.error
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore original console.error after each test
  });

  // --------------------------------------------------
  test("countArticles returns total articles", async () => {
    (graphqlClient.request as jest.Mock).mockResolvedValue(mockPageData);
    const result = await countArticles();
    expect(result.data).toEqual(mockPageData.articles_connection.pageInfo);
    expect(graphqlClient.request).toHaveBeenCalled();
  });

  test("countArticles returns total articles", async () => {
    const query = "This is my query string!";
    const filters = slugify(query);
    (graphqlClient.request as jest.Mock).mockResolvedValue(mockPageData);
    const result = await countArticles(filters);

    expect(result.data).toEqual(mockPageData.articles_connection.pageInfo);
    expect(graphqlClient.request).toHaveBeenCalled();
  });

  test("countArticles throws an error when graphqlClient.request fails", async () => {
    // Simulates an error to GraphQL
    (graphqlClient.request as jest.Mock).mockRejectedValue(
      new Error("Erro na API")
    );

    await expect(countArticles()).rejects.toThrow(
      "Failed to fetch count articles"
    );
    expect(graphqlClient.request).toHaveBeenCalled();
  });

  // --------------------------------------------------
  test("getArticles returns articles", async () => {
    (graphqlClient.request as jest.Mock).mockResolvedValue(mockDatas);
    const result = await getArticles();

    expect(result.data).toEqual(mockDatas.articles);
    expect(graphqlClient.request).toHaveBeenCalled();
  });

  test("getArticles returns articles sorted by createdAt", async () => {
    (graphqlClient.request as jest.Mock).mockResolvedValue(mockDatas);
    const result = await getArticles(null, "createdAt:asc");

    expect(result.data).toEqual(mockDatas.articles);
    expect(graphqlClient.request).toHaveBeenCalled();
  });

  test("getArticles throws an error when graphqlClient.request fails", async () => {
    // Simulates an error to GraphQL
    (graphqlClient.request as jest.Mock).mockRejectedValue(
      new Error("Erro na API")
    );

    await expect(getArticles()).rejects.toThrow("Failed to fetch articles");

    expect(graphqlClient.request).toHaveBeenCalled();
  });

  // --------------------------------------------------
  test("getArticle returns article", async () => {
    (graphqlClient.request as jest.Mock).mockResolvedValue(mockData);
    const result = await getArticle("2101");

    expect(result.data).toEqual(mockData.article);
    expect(graphqlClient.request).toHaveBeenCalled();
  });

  test("getArticle throws an error when graphqlClient.request fails", async () => {
    // Simulates an error to GraphQL
    (graphqlClient.request as jest.Mock).mockRejectedValue(
      new Error("Erro na API")
    );

    await expect(getArticle("2101")).rejects.toThrow("Failed to fetch article");

    expect(graphqlClient.request).toHaveBeenCalled();
  });
});
