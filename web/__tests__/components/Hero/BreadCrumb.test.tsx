import { render, screen } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import { randomInt } from "../../../__mocks__/utilities/randomInt";
import { createBreadcrumbMock } from "../../../__mocks__/mockBreadcrumb";
import BreadCrumb from "../../../src/components/Hero/ArticleTitle/BreadCrumb";

faker.seed(5); // Snapshot

const titleMock = faker.lorem.sentence(randomInt(5, 12));
const breadcrumbMock = createBreadcrumbMock();

describe("BreadCrumb", () => {
  it("renders every link correctly", () => {
    render(<BreadCrumb title={titleMock} topic={breadcrumbMock} />);
    const linkA = screen.getByTestId("breadcrumb-home");
    const linkB = screen.getByTestId("breadcrumb-article");
    const linkC = screen.getByTestId("breadcrumb-article-topic");

    expect(linkA).toHaveAttribute("href", "/");
    expect(linkB).toHaveAttribute("href", "/artigos");
    expect(linkC).toHaveAttribute(
      "href",
      `/artigos?topic=${breadcrumbMock.slug}`
    );
  });

  it("renders BreadCrumb current page correctly", () => {
    render(<BreadCrumb title={titleMock} topic={breadcrumbMock} />);
    const currentRoute = screen.getByTestId("breadcrumb-article-title");
    expect(currentRoute).toHaveClass("after:to-blog-foreground-highlight");
    expect(currentRoute).toHaveTextContent(titleMock);
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(
      <BreadCrumb title={titleMock} topic={breadcrumbMock} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
