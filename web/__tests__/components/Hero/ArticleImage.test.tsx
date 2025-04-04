import ArticleImage from "@/components/Hero/ArticleImage";
import { requestBackEndNextImage } from "@/utils/mountNextImage";
import { render, screen } from "@testing-library/react";

describe("ArticleImage", () => {
  const mockCover = {
    documentId: "12345",
    url: "/images/test-image.png",
    alternativeText:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus architecto quod obcaecati consequatur delectus necessitatibus, eum, dolor nihil, rem odit blanditiis! Consectetur explicabo sed inventore ex omnis porro quae veritatis.",
    width: 1920,
    height: 1080,
  };
  it("renders article image component", () => {
    render(<ArticleImage cover={mockCover} />);
    const articleImage = screen.getByTestId("hero-article-image");
    expect(articleImage).toBeInTheDocument();
  });

  it("renders article image", () => {
    render(<ArticleImage cover={mockCover} />);
    const image = screen.getByTestId("hero-article-image-cover");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      requestBackEndNextImage(
        "test-image",
        "png",
        "/images/",
        mockCover.width * 2,
        75
      )
    );
  });

  it("renders article image alt text", () => {
    render(<ArticleImage cover={mockCover} />);
    const image = screen.getByTestId("hero-article-image-cover");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("role", "img");
    expect(image).toHaveAttribute("alt", mockCover.alternativeText);
  });

  it("renders article image alt text", () => {
    render(<ArticleImage cover={mockCover} />);
    const caption = screen.getByTestId("hero-article-image-caption");
    expect(caption).toBeInTheDocument();
    expect(caption).toHaveAttribute("role", "doc-figure");
    expect(caption).toHaveTextContent(mockCover.caption);
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<ArticleImage cover={mockCover} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
