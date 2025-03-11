import { graphqlCommentClient } from "../../../src/lib/graphQlClient";
import {
  clientCountComments,
  clientDeleteComment,
  clientGetComments,
  clientSaveComment,
  clientUpdateComment,
} from "../../../src/service/comments/client";

jest.mock("../../../src/lib/graphQlClient", () => ({
  graphqlCommentClient: {
    request: jest.fn(),
  },
}));

const mockedGraphQLClient = jest.mocked(graphqlCommentClient);

describe("Service Comments (client)", () => {
  // it("useAsync", () => {});
  // it("useAsyncFn", () => {});

  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {}); // Silence console.error
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore original console.error after each test
  });

  describe("clientCountComments", () => {
    it("returns total comment count", async () => {
      (mockedGraphQLClient.request as jest.Mock).mockResolvedValue({
        comments_connection: { pageInfo: { total: 10 } },
      });
      const result = await clientCountComments("123");
      expect(result).toBe(10);
      expect(mockedGraphQLClient.request).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          filters: { article: { documentId: { eq: "123" } }, parent_id: null },
        })
      );
    });

    it("rejects promise and print a warning", async () => {
      (mockedGraphQLClient.request as jest.Mock).mockRejectedValue(
        new Error("API Error")
      );
      await expect(clientCountComments("123")).rejects.toContain(
        "Failed to fetch count comments"
      );
    });
  });

  describe("clientGetComments", () => {
    it("returns a list of comments", async () => {
      const mockComments = [
        { id: "1", body: "Primeiro comentário" },
        { id: "2", body: "Segundo comentário" },
      ];

      mockedGraphQLClient.request.mockResolvedValue({
        comments_connection: { nodes: mockComments },
      });

      const result = await clientGetComments("123");

      expect(result).toEqual(mockComments);
      expect(mockedGraphQLClient.request).toHaveBeenCalled();
    });

    it("rejects promise and print a warning", async () => {
      mockedGraphQLClient.request.mockRejectedValue(new Error("Erro na API"));

      await expect(clientGetComments("123")).rejects.toContain(
        "Failed to fetch get comments"
      );
    });
  });

  describe("clientSaveComment", () => {
    it("saves a comment", async () => {
      const mockComment = { id: "1", body: "Comentário salvo" };

      mockedGraphQLClient.request.mockResolvedValue({
        createComment: mockComment,
      });

      const result = await clientSaveComment({
        documentId: "123",
        body: "Comentário salvo",
        userId: "user1",
      });

      expect(result).toEqual(mockComment);
      expect(mockedGraphQLClient.request).toHaveBeenCalled();
    });

    it("fails to save a comment", async () => {
      mockedGraphQLClient.request.mockRejectedValue(new Error("Erro na API"));

      await expect(
        clientSaveComment({ documentId: "123", body: "Falha", userId: "user1" })
      ).rejects.toContain("Failed to fetch save comment");
    });
  });

  describe("clientUpdateComment", () => {
    it("updates a comment", async () => {
      const updatedComment = { id: "1", body: "Comentário atualizado" };

      mockedGraphQLClient.request.mockResolvedValue({
        updateComment: updatedComment,
      });

      const result = await clientUpdateComment({
        documentId: "123",
        body: "Comentário atualizado",
      });

      expect(result).toEqual(updatedComment);
      expect(mockedGraphQLClient.request).toHaveBeenCalled();
    });

    it("fails to update a comment", async () => {
      mockedGraphQLClient.request.mockRejectedValue(new Error("Erro na API"));

      await expect(
        clientUpdateComment({ documentId: "123", body: "Falha" })
      ).rejects.toContain("Failed to fetch update comment");
    });
  });

  describe("clientDeleteComment", () => {
    it("deve deletar um comentário e retornar o documentId", async () => {
      mockedGraphQLClient.request.mockResolvedValue({
        deleteComment: { documentId: "123" },
      });

      const result = await clientDeleteComment({ documentId: "123" });

      expect(result).toBe("123");
      expect(mockedGraphQLClient.request).toHaveBeenCalled();
    });

    it("deve tratar erro ao falhar na deleção", async () => {
      mockedGraphQLClient.request.mockRejectedValue(new Error("Erro na API"));

      await expect(
        clientDeleteComment({ documentId: "123" })
      ).rejects.toContain("Failed to fetch delete comment");
    });
  });
});
