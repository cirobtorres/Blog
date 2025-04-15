import { render, screen, waitFor } from "@testing-library/react";
import RelatedArticles from "../../src/components/RelatedArticles";
import { getArticles } from "../../src/service/articles";
import { mockArticles } from "../../__mocks__/mockArticles";
import { resolvedComponent } from "../../__mocks__/utilities/resolvedComponent";

jest.mock("../../src/service/articles", () => ({
  getArticles: jest.fn(),
}));

jest.mock("embla-carousel-react", () => {
  const mockScrollPrev = jest.fn();
  const mockScrollNext = jest.fn();
  const mockCanScrollPrev = jest.fn().mockReturnValue(true);
  const mockCanScrollNext = jest.fn().mockReturnValue(true);
  const mockOn = jest.fn();
  const mockOff = jest.fn();

  return {
    __esModule: true,
    default: () => [
      jest.fn(),
      {
        scrollPrev: mockScrollPrev,
        scrollNext: mockScrollNext,
        canScrollPrev: mockCanScrollPrev,
        canScrollNext: mockCanScrollNext,
        on: mockOn,
        off: mockOff,
      },
    ],
  };
});

const articlesMock = mockArticles() as ArticleCard[];

describe("RelatedArticles", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_BACKEND_IP = "http://127.0.0.1:1337";
  });

  it("renders in the document (articles.length > 0)", async () => {
    (getArticles as jest.Mock).mockResolvedValue({ data: articlesMock });
    const ResolvedRelatedArticles = await resolvedComponent(RelatedArticles);
    render(<ResolvedRelatedArticles />);
    await waitFor(() => {
      const containerA = screen.getByTestId("ra-container");
      const containerB = screen.getByTestId("rac-container");
      const headerText = containerA.querySelector("h2");
      const headerParent = headerText?.parentElement;
      const headerGrandparent = headerParent?.parentElement;
      expect(containerA).toBeInTheDocument();
      expect(containerA).toHaveClass("flex flex-col justify-center");
      expect(containerA).toHaveClass("py-8");
      expect(containerA).toHaveClass("border-y border-blog-border");
      expect(containerA).toHaveClass("bg-blog-background-3");

      expect(headerText).toBeInTheDocument();
      expect(headerText).toHaveTextContent(/Artigos relacionados/i);

      expect(headerParent).toHaveClass("blog-heading text-center");
      expect(headerParent).toHaveClass("px-8");
      expect(headerParent).toHaveClass("col-start-1 max-lg:px-4");
      expect(headerParent).toHaveClass("blog-heading text-center");

      expect(headerGrandparent).toHaveClass("w-full max-w-screen-lg");
      expect(headerGrandparent).toHaveClass("grid grid-cols-1");
      expect(headerGrandparent).toHaveClass("mx-auto mb-8");

      expect(containerB).toBeInTheDocument();
      expect(containerB).toHaveClass("grid grid-cols-1");
      expect(containerB).toHaveClass("max-w-screen-lg");
      expect(containerB).toHaveClass("mx-auto");

      articlesMock.forEach((articleMock) => {
        const carouselItem = screen.getByTestId(
          `rac-item-${articleMock.documentId}`
        );
        expect(carouselItem).toBeInTheDocument();
        expect(carouselItem).toHaveClass("max-w-96");
        expect(carouselItem).toHaveClass("transition-shadow duration-500");
        expect(carouselItem).toHaveClass("hover:shadow-blog-highlight");
        expect(carouselItem).toHaveClass("rounded-lg");
        expect(carouselItem).toHaveClass("p-2 my-2");
        expect(carouselItem).toHaveClass("group");
      });
    });
  });

  it("renders in the document (articles.length === 0)", async () => {
    (getArticles as jest.Mock).mockResolvedValue({ data: [] });
    const ResolvedRelatedArticles = await resolvedComponent(RelatedArticles);
    render(<ResolvedRelatedArticles />);
    await waitFor(() => {
      const container = screen.queryByTestId("ra-container");
      expect(container).not.toBeInTheDocument();
    });
  });
});
