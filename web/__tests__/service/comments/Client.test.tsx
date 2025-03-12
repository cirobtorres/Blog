import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { graphqlCommentClient } from "../../../src/lib/graphQlClient";
import {
  clientCountComments,
  clientDeleteComment,
  clientGetComments,
  clientSaveComment,
  clientUpdateComment,
  useAsync,
  useAsyncFn,
} from "../../../src/service/comments/client";

jest.mock("../../../src/lib/graphQlClient", () => ({
  graphqlCommentClient: {
    request: jest.fn(),
  },
}));

const mockedGraphQLClient = jest.mocked(graphqlCommentClient);

const TestUseAsyncFnComponent = ({
  asyncFunction,
}: {
  asyncFunction: () => Promise<
    CommentProps | CommentProps[] | number | string | void
  >;
}) => {
  const { value, error, loading, execute } = useAsyncFn(asyncFunction, []);

  return (
    <div>
      {loading && <p data-testid="loading">Loading...</p>}
      {value !== undefined && <p data-testid="result">{String(value)}</p>}
      {error && <p data-testid="error">{error}</p>}
      <button onClick={() => execute()}>Fetch Data</button>
    </div>
  );
};

const TestUseAsyncComponent = ({
  asyncFunction,
}: {
  asyncFunction: () => Promise<
    CommentProps | CommentProps[] | number | string | void
  >;
}) => {
  const { value, error, loading } = useAsync(asyncFunction, []);

  return (
    <div>
      {loading && <p data-testid="loading">Loading...</p>}
      {value !== undefined && <p data-testid="result">{String(value)}</p>}
      {error && <p data-testid="error">{error}</p>}
    </div>
  );
};

describe("Service Comments (client)", () => {
  describe("useAsyncFn", () => {
    it("displays loading and then the result of a request", async () => {
      const mockAsyncFunction = jest.fn().mockResolvedValue("Dados carregados");

      render(<TestUseAsyncFnComponent asyncFunction={mockAsyncFunction} />);

      const button = screen.getByText("Fetch Data");
      fireEvent.click(button);

      expect(screen.getByTestId("loading")).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByTestId("result")).toHaveTextContent(
          "Dados carregados"
        );
      });

      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });

    it("throws error when request fails", async () => {
      const mockAsyncFunction = jest
        .fn()
        .mockRejectedValue(new Error("Erro na API"));

      render(<TestUseAsyncFnComponent asyncFunction={mockAsyncFunction} />);

      const button = screen.getByText("Fetch Data");
      fireEvent.click(button);

      expect(screen.getByTestId("loading")).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByTestId("error")).toHaveTextContent("Erro na API");
      });

      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });
  });

  describe("useAsync", () => {
    it("displays loading and then the result of a request", async () => {
      const mockAsyncFunction = jest.fn().mockResolvedValue("Dados carregados");

      render(<TestUseAsyncComponent asyncFunction={mockAsyncFunction} />);

      expect(screen.getByTestId("loading")).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByTestId("result")).toHaveTextContent(
          "Dados carregados"
        );
      });

      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });
  });

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
      await expect(clientCountComments("123")).rejects.toThrow(
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

      await expect(clientGetComments("123")).rejects.toThrow(
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
      ).rejects.toThrow("Failed to fetch save comment");
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
      ).rejects.toThrow("Failed to fetch update comment");
    });
  });

  describe("clientDeleteComment", () => {
    it("deletes a comment and returns documentId", async () => {
      mockedGraphQLClient.request.mockResolvedValue({
        deleteComment: { documentId: "123" },
      });

      const result = await clientDeleteComment({ documentId: "123" });

      expect(result).toBe("123");
      expect(mockedGraphQLClient.request).toHaveBeenCalled();
    });

    it("fails do delete a comment", async () => {
      mockedGraphQLClient.request.mockRejectedValue(new Error("Erro na API"));

      await expect(clientDeleteComment({ documentId: "123" })).rejects.toThrow(
        "Failed to fetch delete comment"
      );
    });
  });
});
