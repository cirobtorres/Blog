import ArticleImage from "@/components/Hero/ArticleImage";
import { requestBackEndImage } from "../../../__mocks__/utilities/mountNextImage";
import { render, screen } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import { createArticleMock } from "../../../__mocks__/mockArticles";

faker.seed(1); // Snapshot

const mockArticle = createArticleMock();

describe("ArticleImage", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_BACKEND_IP = "http://127.0.0.1:1337";
  });

  it("renders article image component", () => {
    render(<ArticleImage article={mockArticle} />);
    const articleImage = screen.getByTestId("hero-article-image");
    expect(articleImage).toBeInTheDocument();
  });

  it("renders article image", () => {
    render(<ArticleImage article={mockArticle} />);
    const image = screen.getByTestId("hero-article-image-cover");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      requestBackEndImage(mockArticle.cover.url)
    );
  });

  it("renders article image alt text", () => {
    render(<ArticleImage article={mockArticle} />);
    const image = screen.getByTestId("hero-article-image-cover");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("role", "img");
    expect(image).toHaveAttribute("alt", mockArticle.cover.alternativeText);
  });

  it("renders article image alt text", () => {
    render(<ArticleImage article={mockArticle} />);
    const caption = screen.getByTestId("hero-article-image-caption");
    expect(caption).toBeInTheDocument();
    expect(caption).toHaveAttribute("role", "doc-figure");
    expect(caption).toHaveTextContent(mockArticle.cover.caption);
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<ArticleImage article={mockArticle} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
