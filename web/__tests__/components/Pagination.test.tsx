import { render, screen } from "@testing-library/react";
import ArticlesPages from "../../src/components/Pagination";

describe("ArticlesPages", () => {
  it("renders the page it should be rendered, and does not render pages that should be hidden", () => {
    render(<ArticlesPages page={5} articlesCount={10} />);
    expect(screen.queryByText("1")).toBeInTheDocument();
    expect(screen.queryByText("2")).not.toBeInTheDocument();
    expect(screen.queryByText("3")).not.toBeInTheDocument();
    expect(screen.queryByText("4")).toBeInTheDocument();
    expect(screen.queryByText("5")).toBeInTheDocument();
    expect(screen.queryByText("6")).toBeInTheDocument();
    expect(screen.queryByText("7")).not.toBeInTheDocument();
    expect(screen.queryByText("8")).not.toBeInTheDocument();
    expect(screen.queryByText("9")).not.toBeInTheDocument();
    expect(screen.queryByText("10")).toBeInTheDocument();
  });

  it("renders two ellipses, one before and another after the current page", () => {
    render(<ArticlesPages page={5} articlesCount={10} />);

    const ellipses = screen.queryAllByText("More pages");
    expect(ellipses.length).toBe(2);

    const [firstEllipsis, secondEllipsis] = ellipses;
    const page4 = screen.getByText("4");
    const page6 = screen.getByText("6");

    expect(
      firstEllipsis.compareDocumentPosition(page4) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    expect(
      secondEllipsis.compareDocumentPosition(page6) &
        Node.DOCUMENT_POSITION_PRECEDING
    ).toBeTruthy();
  });

  it("renders aria-current=page to the corresponding page", () => {
    render(<ArticlesPages page={5} articlesCount={10} />);
    expect(screen.queryByText("1")).not.toHaveAttribute("aria-current", "page");
    expect(screen.queryByText("4")).not.toHaveAttribute("aria-current", "page");
    expect(screen.queryByText("5")).toHaveAttribute("aria-current", "page");
    expect(screen.queryByText("6")).not.toHaveAttribute("aria-current", "page");
    expect(screen.queryByText("10")).not.toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(
      <ArticlesPages page={5} articlesCount={10} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
