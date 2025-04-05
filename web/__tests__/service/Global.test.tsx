import { graphqlReadGlobalClient } from "../../src/lib/graphQlClient";
import { getGlobal } from "../../src/service/global";
import { mockGlobalData } from "../../__mocks__/mockGlobal";

jest.mock("../../src/lib/graphQlClient", () => ({
  graphqlReadGlobalClient: {
    request: jest.fn(),
  },
}));

jest.mocked(graphqlReadGlobalClient);

describe("getGlobal", () => {
  it("returns global data", async () => {
    (graphqlReadGlobalClient.request as jest.Mock).mockResolvedValue({
      global: mockGlobalData,
    });
    const { data: global } = await getGlobal();
    expect(global).toEqual(mockGlobalData);
    expect(graphqlReadGlobalClient.request).toHaveBeenCalled();
  });

  it("throws an error when trying to retrieve global data", async () => {
    // Silence console.error
    jest.spyOn(console, "error").mockImplementation(() => {});
    // Simulates an error to GraphQL
    (graphqlReadGlobalClient.request as jest.Mock).mockRejectedValue(
      new Error("Erro na API")
    );
    await expect(getGlobal()).rejects.toThrow("Failed to fetch global");
    expect(graphqlReadGlobalClient.request).toHaveBeenCalled();
  });
});
