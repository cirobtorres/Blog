import { faker } from "@faker-js/faker";
import { render, screen, waitFor } from "@testing-library/react";
import { createArticleMock } from "../../../__mocks__/mockArticles";
import {
  createAuthenticatedUser,
  unauthorizedUserMock,
} from "../../../__mocks__/mockUser";
import { resolvedComponentWithProps } from "../../../__mocks__/utilities/resolvedComponent";
import { formatDateToCustomFormat } from "../../../src/utils/dates";
import { graphqlReadArticleClient } from "../../../src/lib/graphQlClient";
import ArticleTitle from "../../../src/components/Hero/ArticleTitle";

faker.seed(5); // Snapshot

const articleMock = {
  ...createArticleMock(),
  createdAt: "2025-03-20T01:42:30.824Z",
  updatedAt: "2025-03-20T01:42:30.824Z", // Increase it by >10s in order to test "Atualizado"
};

const userMock = createAuthenticatedUser();

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useParams: jest.fn().mockReturnValue({ documentId: "mock-id" }),
}));

jest.mock("../../../src/service/articles", () => ({
  countArticleLikes: jest.fn().mockResolvedValue({
    data: [
      {
        documentId: "4136cd0b-d90b-4af7-b485-5d1ded8db252",
        users_permissions_user: {
          documentId: "4136cd0b-d90b-4af7-b485-5d1ded8db252",
        },
      },
    ],
  }),
}));

jest.mock("../../../src/lib/graphQlClient", () => ({
  graphqlReadArticleClient: {
    request: jest.fn().mockResolvedValue({
      comments_connection: {
        pageInfo: {
          total: 3,
        },
      },
    }),
  },
}));

describe("ArticleTitle", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_BACKEND_IP = "http://127.0.0.1:1337";
  });

  describe("User on", () => {
    let fragment: DocumentFragment;

    beforeEach(async () => {
      const ArticleTitleResolved = await resolvedComponentWithProps(
        ArticleTitle,
        {
          article: articleMock,
          currentUser: userMock,
        }
      );
      const { asFragment } = render(<ArticleTitleResolved />);
      fragment = asFragment();
    });

    afterAll(async () => {
      jest.restoreAllMocks();
    });

    it("renders hero article title main container", async () => {
      await waitFor(() => {
        const articleTitle = screen.getByTestId("hat-main-container");
        expect(articleTitle).toBeInTheDocument();
        expect(articleTitle).toHaveAttribute("role", "region");
        expect(articleTitle).toHaveAttribute("aria-labelledby", "hat-header");
        expect(articleTitle).toHaveClass(
          "flex items-center min-h-[30rem] py-8 mb-4 border-y border-blog-border bg-blog-background-2"
        );
      });
    });

    it("renders hero article title grid container", async () => {
      await waitFor(() => {
        const GridContainer = screen.getByTestId("hat-grid-container");
        expect(GridContainer).toBeInTheDocument();
        expect(GridContainer).toHaveClass(
          "h-full grid grid-cols-article max-lg:grid-cols-article-800 mx-auto items-center max-w-screen-2xl"
        );
      });
    });

    it("renders hero article title grid item", async () => {
      await waitFor(() => {
        const gridItem = screen.getByTestId("hat-grid-item");
        expect(gridItem).toBeInTheDocument();
        expect(gridItem).toHaveClass(
          "col-start-2 max-lg:col-start-1 ml-8 mr-4 max-lg:ml-4"
        );
      });
    });

    it("renders breadcrumb", async () => {
      await waitFor(() => {
        const breadcrumb = screen.getByTestId("breadcrumb");
        expect(breadcrumb).toBeInTheDocument();
      });
    });

    it("renders hero article title content container", async () => {
      await waitFor(() => {
        const titleContainer = screen.getByTestId("hat-content-container");
        expect(titleContainer).toBeInTheDocument();
        expect(titleContainer).toHaveClass(
          "blog-heading blog-center-content flex flex-col gap-4"
        );
      });
    });

    it("renders hero article title header", async () => {
      await waitFor(() => {
        const title = screen.getByTestId("hat-header");
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent(articleMock.title);
        expect(title).toHaveClass("leading-[4rem] font-extrabold break-words");
      });
    });

    it("renders hero article title description", async () => {
      await waitFor(() => {
        const description = screen.getByTestId("hat-description");
        expect(description).toBeInTheDocument();
        expect(description).toHaveTextContent(articleMock.description);
        expect(description).toHaveClass("text-2xl break-words text-[#808080]");
      });
    });

    it("renders hero article title footer container", async () => {
      await waitFor(() => {
        const footer = screen.getByTestId("hat-footer");
        expect(footer).toBeInTheDocument();
        expect(footer).toHaveClass("flex flex-wrap items-center gap-8");
      });
    });

    it("renders author container", async () => {
      await waitFor(() => {
        const articleTitle = screen.getByTestId("author-container");
        expect(articleTitle).toBeInTheDocument();
      });
    });

    it("renders hero article title iso date", async () => {
      await waitFor(() => {
        const dateContainer = screen.getByTestId("hat-iso-date");
        expect(dateContainer).toBeInTheDocument();
        expect(dateContainer).toHaveClass("flex items-center gap-4");
        const smallTime1 = screen.queryByText(/Criado:/i)?.children[0]; // Flag i: case-insensitive
        const smallTime2 = screen.queryByText(/Atualizado:/i)?.children[0]; // Flag i: case-insensitive
        expect(smallTime1).toBeInTheDocument();
        expect(smallTime2).toBeUndefined();
        expect(smallTime1).toHaveAttribute("datetime", articleMock.createdAt);
        expect(smallTime1).toHaveTextContent(
          formatDateToCustomFormat(articleMock.createdAt)
        );
      });
    });

    it("renders hero article title link to comment session", async () => {
      await waitFor(() => {
        const anchorLink = screen.getByTestId("hat-link-to-comment-session");
        expect(anchorLink).toBeInTheDocument();
        expect(anchorLink).toHaveAttribute("href", "#comment-session-header");
      });
    });

    it("renders hero article like button when current user is logged in", async () => {
      await waitFor(() => {
        const likeButton1 = screen.queryByTestId("halb-user")?.children[0];
        const likeButton2 = screen.queryByTestId("halb")?.children[0];
        expect(likeButton1).toBeInTheDocument();
        expect(likeButton2).toBeUndefined();
      });
    });

    // TODO: FIX
    it("matches the snapshot", () => {
      expect(fragment).toMatchSnapshot();
    });
  });

  describe("User off", () => {
    it("renders hero article like button when current user is logged off", async () => {
      const ArticleTitleResolved = await resolvedComponentWithProps(
        ArticleTitle,
        {
          article: articleMock,
          currentUser: unauthorizedUserMock,
        }
      );
      render(<ArticleTitleResolved />);

      await waitFor(() => {
        const likeButton1 = screen.queryByTestId("halb-user")?.children[0];
        const likeButton2 = screen.queryByTestId("halb")?.children[0];
        expect(likeButton1).toBeUndefined();
        expect(likeButton2).toBeInTheDocument();
      });
    });
  });

  describe("totalLikes", () => {
    // let clear: () => void;
    let total = 0;

    beforeEach(async () => {
      (graphqlReadArticleClient.request as jest.Mock).mockResolvedValueOnce({
        comments_connection: {
          pageInfo: {
            total,
          },
        },
      });
      total += 1;
      const ArticleTitleResolved = await resolvedComponentWithProps(
        ArticleTitle,
        {
          article: articleMock,
          currentUser: unauthorizedUserMock,
        }
      );
      render(<ArticleTitleResolved />);
      // const { unmount } = render(<ArticleTitleResolved />);
      // clear = unmount;
    });

    // afterEach(() => {
    //   clear();
    // });

    it("renders '0 comentários'", async () => {
      await waitFor(() => {
        const anchorLink = screen.getByTestId("hat-link-to-comment-session");
        expect(anchorLink).toHaveAttribute(
          "aria-label",
          "Ir para a seção de comentários (0 comentários)"
        );
        expect(anchorLink).toHaveTextContent(/0 comentários/i); // Flag i: case-insensitive
      });
    });

    it("renders '1 comentário'", async () => {
      await waitFor(() => {
        const anchorLink = screen.getByTestId("hat-link-to-comment-session");
        expect(anchorLink).toHaveAttribute(
          "aria-label",
          "Ir para a seção de comentários (1 comentário)"
        );
        expect(anchorLink).toHaveTextContent(/1 comentário/i); // Flag i: case-insensitive
      });
    });

    it("renders '2 comentários'", async () => {
      await waitFor(() => {
        const anchorLink = screen.getByTestId("hat-link-to-comment-session");
        expect(anchorLink).toHaveAttribute(
          "aria-label",
          "Ir para a seção de comentários (2 comentários)"
        );
        expect(anchorLink).toHaveTextContent(/2 comentários/i); // Flag i: case-insensitive
      });
    });
  });
});
