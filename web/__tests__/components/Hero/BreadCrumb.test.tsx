import { render, screen } from "@testing-library/react";
import BreadCrumb from "../../../src/components/Hero/ArticleTitle/BreadCrumb";
import slugify from "../../../src/utils/slugify";

describe("BreadCrumb", () => {
  const mockedTitle =
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit.";
  const mockedBreadCrumb = { documentId: "11", name: "Ciência da Computação" };

  it("matches the snapshot", () => {
    const { asFragment } = render(
      <BreadCrumb title={mockedTitle} category={mockedBreadCrumb} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders every link correctly", () => {
    render(<BreadCrumb title={mockedTitle} category={mockedBreadCrumb} />);
    const linkA = screen.getByTestId("breadcrumb-home");
    const linkB = screen.getByTestId("breadcrumb-article");
    const linkC = screen.getByTestId("breadcrumb-article-category");

    expect(linkA).toHaveAttribute("href", "/");
    expect(linkB).toHaveAttribute("href", "/artigos");
    expect(linkC).toHaveAttribute(
      "href",
      `/artigos?category=${slugify(mockedBreadCrumb.name)}`
    );
  });

  it("renders BreadCrumb current page correctly", () => {
    render(<BreadCrumb title={mockedTitle} category={mockedBreadCrumb} />);
    const currentRoute = screen.getByTestId("breadcrumb-article-title");
    expect(currentRoute).toHaveClass("after:to-blog-foreground-highlight");
    expect(currentRoute).toHaveTextContent(mockedTitle);
  });
});
