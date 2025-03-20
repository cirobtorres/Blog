import { axe } from "jest-axe";
import { toHaveNoViolations } from "jest-axe";
import { render, screen, waitFor } from "@testing-library/react";
import Footer from "../../src/components/Footer";

describe("Footer", () => {
  it("renders the footer component", async () => {
    render(<Footer />);
    waitFor(() => {
      const footer = screen.getByTestId("footer");
      expect(footer).toBeInTheDocument();
    });
  });

  it("renders the footer attributes", async () => {
    render(<Footer />);
    waitFor(() => {
      const footer = screen.getByTestId("footer");
      expect(footer).toHaveAttribute(
        "aria-label",
        "Footer com link do código fonte"
      );
    });
  });

  it("renders the correct github footer link", async () => {
    render(<Footer />);
    waitFor(() => {
      const link = screen.getByTestId("footer-paragraph")?.querySelector("a");
      expect(link).toHaveTextContent("https://github.com/cirobtorres/blog");
      expect(link).toHaveAttribute(
        "href",
        "https://github.com/cirobtorres/blog"
      );
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link).toHaveAttribute(
        "aria-label",
        "Repositório do Github para o código fonte do blog"
      );
      expect(link).toHaveAttribute(
        "href",
        "https://github.com/cirobtorres/blog"
      );
    });
  });

  it("should be accessible", async () => {
    waitFor(async () => {
      const { container } = render(<Footer />);
      const results = await axe(container);
      expect.extend(toHaveNoViolations);
      expect(results).toHaveNoViolations();
    });
  });

  it("is responsive", () => {
    render(<Footer />);
    waitFor(() => {
      const footerParagraph = screen.getByTestId("footer-paragraph");
      expect(footerParagraph).toHaveClass("text-wrap");
      const link = screen.getByTestId("footer-link");
      expect(link).toHaveClass(
        "break-words text-blog-foreground-highlight hover:text-blog-foreground-readable-hover"
      );
    });
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<Footer />);
    waitFor(() => expect(asFragment()).toMatchSnapshot());
  });
});
