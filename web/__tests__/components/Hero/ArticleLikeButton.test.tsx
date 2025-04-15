import { faker } from "@faker-js/faker";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import ArticleLikeButton from "../../../src/components/Hero/ArticleTitle/ArticleLikeButton";
import {
  createAuthenticatedUser,
  unauthorizedUserMock,
} from "../../../__mocks__/mockUser";
// import { randomInt } from "../../../__mocks__/utilities/randomInt";

faker.seed(1);

const length = 1;

const mockTotalLikes = () =>
  Array.from({ length }, () => ({
    documentId: faker.string.uuid(),
    users_permissions_user: {
      documentId: faker.string.uuid(),
    },
  }));

const authenticatedUserMock = createAuthenticatedUser();
const totalLikesMock = mockTotalLikes();

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useParams: jest
    .fn()
    .mockReturnValue({ documentId: "4136cd0b-d90b-4af7-b485-5d1ded8db252" }),
}));

jest.mock("../../../src/service/articles", () => ({
  likeArticle: jest.fn().mockResolvedValue({
    data: [
      {
        documentId: "4136cd0b-d90b-4af7-b485-5d1ded8db252",
        users_permissions_user: {
          documentId: "4136cd0b-d90b-4af7-b485-5d1ded8db252",
        },
      },
    ],
  }),
  dislikeArticle: jest.fn().mockResolvedValue({
    data: [
      {
        documentId: "4136cd0b-d90b-4af7-b485-5d1ded8db252",
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

describe("ArticleLikeButton", () => {
  describe("User on", () => {
    it("renders in the document", async () => {
      render(
        <ArticleLikeButton
          currentUser={authenticatedUserMock}
          totalLikes={totalLikesMock}
        />
      );
      await act(async () => {
        const likeButtonContainer = screen.getByTestId("halb-user");
        const likeButton = screen.getByTestId("halb-button");
        const thumbsUpIcon = screen.getByTestId("halb-icon-active");
        expect(likeButtonContainer).toBeInTheDocument();
        expect(likeButton).toBeInTheDocument();
        expect(thumbsUpIcon).toBeInTheDocument();
        expect(thumbsUpIcon).toHaveAttribute("aria-hidden", "true");
      });
    });

    it("renders 0 like", async () => {
      render(
        <ArticleLikeButton
          currentUser={authenticatedUserMock}
          totalLikes={[]}
        />
      );
      await act(async () => {
        const likeButton = screen.getByTestId("halb-button");
        expect(likeButton).toHaveTextContent(`0 like`);
      });
    });

    it("renders 1 like", async () => {
      render(
        <ArticleLikeButton
          currentUser={authenticatedUserMock}
          totalLikes={[
            {
              documentId: faker.string.uuid(),
              users_permissions_user: {
                documentId: faker.string.uuid(),
              },
            },
          ]}
        />
      );
      await act(async () => {
        const likeButton = screen.getByTestId("halb-button");
        expect(likeButton).toHaveTextContent(`1 like`);
      });
    });

    it(`renders ${length} likes`, async () => {
      render(
        <ArticleLikeButton
          currentUser={authenticatedUserMock}
          totalLikes={totalLikesMock}
        />
      );
      await act(async () => {
        const likeButton = screen.getByTestId("halb-button");
        expect(likeButton).toHaveTextContent(`${length} like`);
      });
    });

    it("presses button like", async () => {
      render(
        <ArticleLikeButton
          currentUser={authenticatedUserMock}
          totalLikes={totalLikesMock}
        />
      );
      await act(async () => {
        const likeButton = screen.getByTestId("halb-button");
        const thumbsUpIcon = screen.getByTestId("halb-icon-active");
        // User haven't liked the article yet
        expect(likeButton).toHaveTextContent(`${length} like`);
        expect(likeButton).toHaveAttribute("aria-pressed", "false");
        expect(likeButton).toHaveAttribute("aria-label", "Curtir artigo");
        expect(thumbsUpIcon).toHaveClass("fill-blog-foreground-readable");
        // User likes the article
        fireEvent.click(likeButton);
        await waitFor(() =>
          expect(likeButton).toHaveTextContent(`${length + 1} likes`)
        );
        expect(likeButton).toHaveAttribute("aria-pressed", "true");
        expect(likeButton).toHaveAttribute(
          "aria-label",
          "Remover curtida do artigo"
        );
        expect(thumbsUpIcon).toHaveClass("fill-blog-foreground-highlight");
        // User dislikes the article
        fireEvent.click(likeButton);
        await waitFor(() =>
          expect(likeButton).toHaveTextContent(`${length} like`)
        );
        expect(likeButton).toHaveAttribute("aria-pressed", "false");
        expect(likeButton).toHaveAttribute("aria-label", "Curtir artigo");
        expect(thumbsUpIcon).toHaveClass("fill-blog-foreground-readable");
      });
    });

    it("matches the snapshot", async () => {
      const { asFragment } = render(
        <ArticleLikeButton
          currentUser={authenticatedUserMock}
          totalLikes={totalLikesMock}
        />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("User off", () => {
    it("renders in the document", async () => {
      render(
        <ArticleLikeButton
          currentUser={unauthorizedUserMock}
          totalLikes={totalLikesMock}
        />
      );
      await act(async () => {
        const likeButtonContainer = screen.getByTestId("halb");
        expect(likeButtonContainer).toBeInTheDocument();
      });
    });

    it("matches the snapshot", async () => {
      const { asFragment } = render(
        <ArticleLikeButton
          currentUser={unauthorizedUserMock}
          totalLikes={totalLikesMock}
        />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
