import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import {
  createArticleMock,
  mockArticle,
} from "../../../__mocks__/mockArticles";
import { requestBackEndImage } from "../../../__mocks__/utilities/mountNextImage";
import { formatDateToCustomFormat } from "../../../src/utils/dates";
import LastPublishedArticleCard from "../../../src/components/Cards/LastPublishedArticleCard";

faker.seed(5); // Snapshot

const snapshotArticle = createArticleMock();

describe("LastPublishedArticleCard", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_BACKEND_IP = "http://127.0.0.1:1337";
  });

  it("renders last published article card container component", () => {
    render(<LastPublishedArticleCard article={mockArticle} />);
    const container = screen.getByTestId(
      "last-published-article-card-container"
    );
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass(
      "w-full py-4 mb-10 border-y border-blog-border bg-blog-background-2"
    );
  });

  it("renders last published article card link", () => {
    render(<LastPublishedArticleCard article={mockArticle} />);
    const container = screen.getByTestId("last-published-article-card-link");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("w-full");
    expect(container).toHaveAttribute(
      "href",
      `artigos/${mockArticle.documentId}/${mockArticle.slug}`
    );
  });

  it("renders last published article card image", () => {
    render(<LastPublishedArticleCard article={mockArticle} />);
    const container = screen.getByTestId(
      "last-published-article-card-image-container"
    );
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("relative h-[500px]");
    const link = container.querySelector("img");
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass("absolute object-cover");
    expect(link).toHaveAttribute(
      "src",
      requestBackEndImage(mockArticle.cover.url)
    );
    expect(link).toHaveAttribute("alt", mockArticle.cover.alternativeText);
    expect(link).toHaveAttribute("data-nimg", "fill");
    expect(link).toHaveAttribute(
      "sizes",
      `(max-width: ${mockArticle.cover.width}) 100vw`
    );
  });

  it("renders last published article card paragraph container", () => {
    render(<LastPublishedArticleCard article={mockArticle} />);
    const container = screen.getByTestId(
      "last-published-article-card-paragraph-container"
    );
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass(
      "w-full absolute bottom-0 flex flex-col gap-2 px-20 max-[800px]:px-12 max-[500px]:px-4 py-4 backdrop-blur-xl backdrop-brightness-150"
    );
    const [p1, p2, p3] = container.querySelectorAll("p");
    expect(p1).toBeInTheDocument();
    expect(p1).toHaveTextContent(mockArticle.title);
    expect(p1).toHaveClass(
      "text-white font-extrabold text-4xl max-[800px]:text-3xl max-[500px]:text-2xl"
    );
    expect(p2).toBeInTheDocument();
    expect(p2).toHaveTextContent(mockArticle.description);
    expect(p2).toHaveClass(
      "text-white text-xl max-[800px]:text-lg max-[500px]:text-base max-h-[calc(1.75rem_*_3)] line-clamp-3 max-[500px]:max-h-[calc(1.5rem_*_2)] max-[500px]:line-clamp-2"
    );
    expect(p3).toBeInTheDocument();
    const small = p3.querySelector("small");
    expect(small).toBeInTheDocument();
    expect(small).toHaveClass("flex justify-center text-white text-xs");
    const time = small?.querySelector("time");
    expect(time).toBeInTheDocument();
    expect(time).toHaveTextContent(
      formatDateToCustomFormat(mockArticle.createdAt)
    );
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(
      <LastPublishedArticleCard
        article={{
          ...snapshotArticle,
          createdAt: "2021-12-03T05:40:44.408Z",
          updatedAt: "2021-12-03T05:40:44.408Z",
          publishedAt: "2021-12-03T05:40:44.408Z",
        }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
