import { render, screen, waitFor } from "@testing-library/react";
import ArticleTitle, {
  CountComments,
} from "../../../src/components/Hero/ArticleTitle";
import serverCountComments from "../../../src/service/comments/server";

jest.mock("../../../src/service/comments/server");

describe("ArticleTitle", () => {
  const mockArticle = {
    documentId: "aab18-hbBC5-161gH",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    slug: "lorem-ipsum-dolor-sit-amet-consectetur-adipisicing-elit",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor fugit nihil fugiat. Iusto quas consectetur omnis molestias? Pariatur beatae sed animi? Consequatur rerum sit fugiat, quam tempora fugit assumenda delectus.",
    createdAt: "2025-03-10T23:11:17.381Z",
    updatedAt: "2025-03-10T23:11:17.381Z",
    publishedAt: "2025-03-10T23:11:17.381Z",
    cover: {
      documentId: "kajf8-HJis1-15AJk",
      url: "https://google.com.br",
      alternativeText: "Google",
      caption: "Google",
      width: 1920,
      height: 1080,
    },
    author: {
      documentId: "A165B-adS1S-565Ma",
      name: "JaJ12-MASL1-82HkJ",
      avatar: null,
    },
    category: {
      documentId: "A6AS4-NYHuI-12Ad1",
      name: "Ciência da Computação",
    },
    subCategories: [],
    comments: [
      {
        documentId: "1",
      },
      {
        documentId: "2",
      },
      {
        documentId: "3",
      },
      {
        documentId: "4",
      },
      {
        documentId: "5",
      },
    ],
    tags: [],
    blocks: [],
  };

  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {}); // Silence console.error
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore original console.error after each test
  });

  // it("renders CountComment with 0 commentary", async () => {
  //   // TODO(FIX):
  //   // Jest do not work properly with React Suspense
  //   (serverCountComments as jest.Mock).mockResolvedValue({ data: 0 });
  //   render(<ArticleTitle article={mockArticle} />);
  //   await waitFor(() => {
  //     const countCommentElement = screen.queryByTestId("hero-count-comments");
  //     expect(countCommentElement).toBeInTheDocument();
  //     expect(countCommentElement).toHaveTextContent("1 comentário");
  //   });
  // });

  // it("renders CountComment with 1 commentary", async () => {
  //   // TODO(FIX):
  //   // Jest do not work properly with React Suspense
  //   (serverCountComments as jest.Mock).mockResolvedValue({ data: 1 });
  //   render(<CountComments articleId="1" />);
  //   await waitFor(() => {
  //     const countCommentElement = screen.queryByTestId("hero-count-comments");
  //     expect(countCommentElement).toBeInTheDocument();
  //     expect(countCommentElement).toHaveTextContent("1 comentário");
  //   });
  // });

  // it("renders CountComment with 2 commentaries", async () => {
  //   // TODO(FIX):
  //   // Jest do not work properly with React Suspense
  //   (serverCountComments as jest.Mock).mockResolvedValue({ data: 2 });
  //   render(<CountComments articleId="1" />);
  //   await waitFor(() => {
  //     const countCommentElement = screen.queryByTestId("hero-count-comments");
  //     expect(countCommentElement).toBeInTheDocument();
  //     expect(countCommentElement).toHaveTextContent("1 comentário");
  //   });
  // });

  it("renders ArticleTitle", () => {
    render(<ArticleTitle article={mockArticle} />);
    const title = screen.getByTestId("hero-article-title");
    expect(title).toBeInTheDocument();
  });

  it("renders BreadCrumb", () => {
    render(<ArticleTitle article={mockArticle} />);
    const breadcrumb = screen.getByTestId("breadcrumb");
    expect(breadcrumb).toBeInTheDocument();
  });

  it("renders BreadCrumb", () => {
    render(<ArticleTitle article={mockArticle} />);
    const title = screen.getByTestId("hero-article-title-header");
    const description = screen.getByTestId("hero-article-title-description");
    expect(title).toHaveTextContent(mockArticle.title);
    expect(description).toHaveTextContent(mockArticle.description);
    expect(title).toHaveClass("break-words");
    expect(description).toHaveClass("break-words text-[#808080]");
  });

  // it("renders CountComments", () => {});

  it("matches the snapshot", async () => {
    // TODO(FIX):
    // Find a way to render CountComments instead its loading state
    const { asFragment } = render(<ArticleTitle article={mockArticle} />);
    await waitFor(() => expect(asFragment()).toMatchSnapshot());
  });
});
