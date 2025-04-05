import { getAbout } from "../../src/service/about";
import { graphqlReadAboutClient } from "../../src/lib/graphQlClient";
import { createAboutMock } from "../../__mocks__/mockAbout";

jest.mock("../../src/lib/graphQlClient", () => ({
  graphqlReadAboutClient: {
    request: jest.fn(),
  },
}));

const mockAboutData = createAboutMock();

jest.mocked(graphqlReadAboutClient);

describe("getAbout", () => {
  it("returns about data", async () => {
    (graphqlReadAboutClient.request as jest.Mock).mockResolvedValue({
      about: mockAboutData,
    });
    const { data: about } = await getAbout();
    expect(about).toEqual(mockAboutData);
    expect(graphqlReadAboutClient.request).toHaveBeenCalled();
  });

  it("throws an error when trying to retrieve about data", async () => {
    // Silence console.error
    jest.spyOn(console, "error").mockImplementation(() => {});
    // Simulates an error to GraphQL
    (graphqlReadAboutClient.request as jest.Mock).mockRejectedValue(
      new Error("Erro na API")
    );
    await expect(getAbout()).rejects.toThrow("Failed to fetch about");
    expect(graphqlReadAboutClient.request).toHaveBeenCalled();
  });
});
