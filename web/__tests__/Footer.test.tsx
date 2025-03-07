import "@testing-library/jest-dom";
import { axe } from "jest-axe";
import { toHaveNoViolations } from "jest-axe";
import { act, render, screen } from "@testing-library/react";
import Footer from "../src/components/Footer";

describe("Footer", () => {
  it("renders a footer <footer></footer> within the component", () => {
    render(<Footer />);
    const footerRole = screen.getByRole("contentinfo");
    expect(footerRole).toBeInTheDocument();
  });

  it("renders the footer text", () => {
    render(<Footer />);
    const footerText = screen.getByText(/Source code here!/i);
    expect(footerText).toBeInTheDocument();
  });

  it("renders the correct github footer link", () => {
    render(<Footer />);
    const link = screen.getByRole("link", {
      name: /https:\/\/github.com\/cirobtorres\/blog/i,
    });
    expect(link).toBeInTheDocument();
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
});
