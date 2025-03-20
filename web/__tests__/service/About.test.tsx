import graphqlClient from "../../src/lib/graphQlClient";
import { getAbout } from "../../src/service/about";

jest.mock("../../src/lib/graphQlClient", () => ({
  request: jest.fn(),
}));

jest.mocked(graphqlClient);

describe("getAbout", () => {
  const mockAboutData: About = {
    documentId: "123",
    title: "This is the about page title",
    github_link: "https://github.com/johndoe",
    github_blog_link: "https://github.com/johndoe/blog",
    createdAt: "2025-03-10T23:11:17.381Z",
    updatedAt: "2025-03-10T23:11:17.381Z",
    publishedAt: "2025-03-10T23:11:17.381Z",
    blocks: [],
  };

  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {}); // Silence console.error
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore original console.error after each test
  });

  it("returns about data", async () => {
    (graphqlClient.request as jest.Mock).mockResolvedValue({
      about: mockAboutData,
    });
    const { data: about } = await getAbout();
    expect(about).toEqual(mockAboutData);
    expect(graphqlClient.request).toHaveBeenCalled();
  });

  it("throws an error when trying to retrieve about data", async () => {
    // Simulates an error to GraphQL
    (graphqlClient.request as jest.Mock).mockRejectedValue(
      new Error("Erro na API")
    );
    await expect(getAbout()).rejects.toThrow("Failed to fetch about");
    expect(graphqlClient.request).toHaveBeenCalled();
  });
});
