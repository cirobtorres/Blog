import { axe } from "jest-axe";
import { toHaveNoViolations } from "jest-axe";
import { act, render, screen, waitFor } from "@testing-library/react";
import Footer from "../../src/components/Footer";
import React from "react";
import { resolvedComponent } from "../../__mocks__/utilities/resolvedComponent";
import { getAbout } from "@/service/about";

jest.mock("../../src/service/about", () => ({
  getAbout: jest.fn(),
}));

function returnMock(props?: {
  documentId?: string;
  title?: string;
  github_link?: string;
  github_blog_link?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  blocks?: ArticleBlocks[];
}) {
  return (getAbout as jest.Mock).mockResolvedValue({
    data: {
      documentId: "12345",
      title: "My Blog",
      github_link: "https://github.com/johndoe",
      github_blog_link: "https://github.com/johndoe/blog",
      createdAt: "2025-03-10T23:11:17.381Z",
      updatedAt: "2025-03-10T23:11:17.381Z",
      publishedAt: "2025-03-10T23:11:17.381Z",
      blocks: [],
      ...props,
    },
  });
}

describe("Footer", () => {
  it("renders the footer component", async () => {
    returnMock();
    const FooterResolved = await resolvedComponent(Footer);
    render(<FooterResolved />);
    await waitFor(() => {
      const footer = screen.getByTestId("footer");
      expect(footer).toBeInTheDocument();
    });
  });

  it("renders the footer attributes", async () => {
    returnMock();
    const FooterResolved = await resolvedComponent(Footer);
    render(<FooterResolved />);
    await waitFor(() => {
      const footer = screen.getByTestId("footer");
      expect(footer).toHaveAttribute(
        "aria-label",
        "Footer com link do código fonte"
      );
    });
  });

  it("renders the correct github footer link", async () => {
    returnMock();
    const FooterResolved = await resolvedComponent(Footer);
    render(<FooterResolved />);
    await waitFor(() => {
      const link = screen.getByTestId("footer-paragraph")?.querySelector("a");
      expect(link).toHaveTextContent("https://github.com/johndoe/blog");
      expect(link).toHaveAttribute("href", "https://github.com/johndoe/blog");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link).toHaveAttribute(
        "aria-label",
        "Repositório do Github para o código fonte do blog"
      );
      expect(link).toHaveAttribute("href", "https://github.com/johndoe/blog");
    });
  });

  it("should be accessible", async () => {
    returnMock();
    const FooterResolved = await resolvedComponent(Footer);
    const { container } = render(<FooterResolved />);
    // Either act or waitFor are necessary here because of changing of states
    await act(async () => {
      const results = await axe(container);
      expect.extend(toHaveNoViolations);
      expect(results).toHaveNoViolations();
    });
  });

  it("is responsive", async () => {
    returnMock();
    const FooterResolved = await resolvedComponent(Footer);
    render(<FooterResolved />);
    await waitFor(() => {
      const footerParagraph = screen.getByTestId("footer-paragraph");
      expect(footerParagraph).toHaveClass("text-wrap");
      const link = screen.getByTestId("footer-link");
      expect(link).toHaveClass(
        "break-words text-blog-foreground-highlight hover:text-blog-foreground-readable-hover"
      );
    });
  });

  it("links to home page if footer link is not set on the server", async () => {
    returnMock({
      github_link: "",
      github_blog_link: "",
    });
    const FooterResolved = await resolvedComponent(Footer);
    render(<FooterResolved />);
    await waitFor(() => {
      const link = screen.getByTestId("footer-link");
      expect(link.getAttribute("href")).toBe("/");
    });
  });

  it("matches the snapshot", async () => {
    returnMock();
    const FooterResolved = await resolvedComponent(Footer);
    const { asFragment } = render(<FooterResolved />);
    await waitFor(() => expect(asFragment()).toMatchSnapshot());
  });
});
