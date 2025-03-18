import "@testing-library/jest-dom";
import { axe } from "jest-axe";
import { toHaveNoViolations } from "jest-axe";
import { act, render, screen } from "@testing-library/react";
import Footer from "../../src/components/Footer";

describe("Footer", () => {
  it("matches the snapshot", () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the footer component", () => {
    render(<Footer />);
    const footer = screen.getByTestId("footer");
    expect(footer).toBeInTheDocument();
  });

  it("renders the footer attributes", () => {
    render(<Footer />);
    const footer = screen.getByTestId("footer");
    expect(footer).toHaveAttribute(
      "aria-label",
      "Footer com link do código fonte"
    );
  });

  it("renders the correct github footer link", () => {
    render(<Footer />);
    const link = screen.getByTestId("footer-paragraph")?.querySelector("a");
    expect(link).toHaveTextContent("https://github.com/cirobtorres/blog");
    expect(link).toHaveAttribute("href", "https://github.com/cirobtorres/blog");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveAttribute(
      "aria-label",
      "Repositório do Github para o código fonte do blog"
    );
    expect(link).toHaveAttribute("href", "https://github.com/cirobtorres/blog");
  });

  it("should be accessible", async () => {
    await act(async () => {
      const { container } = render(<Footer />);
      const results = await axe(container);
      expect.extend(toHaveNoViolations);
      expect(results).toHaveNoViolations();
    });
  });

  it("is responsive", () => {
    render(<Footer />);
    const footerParagraph = screen.getByTestId("footer-paragraph");
    expect(footerParagraph).toHaveClass("text-wrap");

    const link = footerParagraph?.querySelector("a");
    expect(link).toHaveClass(
      "break-words text-blog-foreground-highlight hover:text-blog-foreground-readable-hover"
    );
  });
});
