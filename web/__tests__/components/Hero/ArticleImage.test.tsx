import ArticleImage from "@/components/Hero/ArticleImage";
import { requestBackEndImage } from "../../../__mocks__/utilities/mountNextImage";
import { render, screen } from "@testing-library/react";
import { createCoverMock } from "../../../__mocks__/mockCover";
import { faker } from "@faker-js/faker";

faker.seed(1); // Snapshot

const mockCover = createCoverMock(512, 512);

describe("ArticleImage", () => {
  it("renders article image component", () => {
    render(<ArticleImage cover={mockCover} />);
    const articleImage = screen.getByTestId("hero-article-image");
    expect(articleImage).toBeInTheDocument();
  });

  it("renders article image", () => {
    render(<ArticleImage cover={mockCover} />);
    const image = screen.getByTestId("hero-article-image-cover");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", requestBackEndImage(mockCover.url));
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
