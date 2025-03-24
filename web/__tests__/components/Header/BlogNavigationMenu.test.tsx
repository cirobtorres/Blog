import { usePathname } from "next/navigation";
import { cleanup, render, screen } from "@testing-library/react";
import BlogNavigationMenu from "../../../src/components/Header/HeaderContent/BlogNavigationMenu";

jest.mock("next/navigation", () => ({
  // HeaderContent contains multiple nested components.
  // BlogNavigationMenu uses the usePathname hook, so we need to mock it.
  // SearchBar uses the useSearchParams hook, so we need to mock it as well.
  usePathname: jest.fn(() => "/"),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

describe("BlogNavigationMenu", () => {
  it("renders blog navigation menu", () => {
    render(<BlogNavigationMenu />);
    const blogNavMenu = screen.getByTestId("blog-navigation-menu");
    expect(blogNavMenu).toBeInTheDocument();
  });

  it('should highlight "Artigos" for nested article paths', () => {
    const testPaths = [
      "/artigos",
      "/artigos/",
      "/artigos/react-testing",
      "/artigos/12345",
      "/artigos?page=2",
    ];

    testPaths.forEach((path) => {
      (usePathname as jest.Mock).mockReturnValue(path);
      render(<BlogNavigationMenu />);
      const articlesItem = screen.getByRole("link", { name: /Artigos/i });
      expect(articlesItem).toHaveClass("text-blog-foreground-highlight");
      cleanup();
    });
  });

  it('should not highlight "Artigos" for unrelated paths', () => {
    const testPaths = ["/artigo", "/artigosss", "/sobre", "/", "/contato"];

    testPaths.forEach((path) => {
      (usePathname as jest.Mock).mockReturnValue(path);
      render(<BlogNavigationMenu />);
      const articlesItem = screen.getByRole("link", { name: /Artigos/i });
      expect(articlesItem).not.toHaveClass("text-blog-foreground-highlight");
      cleanup();
    });
  });

  it('should highlight "Sobre" for nested about paths', () => {
    const testPaths = ["/sobre", "/sobre/", "/sobre/equipe", "/sobre/historia"];

    testPaths.forEach((path) => {
      (usePathname as jest.Mock).mockReturnValue(path);
      render(<BlogNavigationMenu />);
      const aboutItem = screen.getByRole("link", { name: /Sobre/i });
      expect(aboutItem).toHaveClass("text-blog-foreground-highlight");
      cleanup();
    });
  });

  it('should not highlight "Sobre" for unrelated paths', () => {
    const testPaths = ["/sobr", "/sobreee", "/artigos", "/", "/contato"];

    testPaths.forEach((path) => {
      (usePathname as jest.Mock).mockReturnValue(path);
      render(<BlogNavigationMenu />);
      const aboutItem = screen.getByRole("link", { name: /Sobre/i });
      expect(aboutItem).not.toHaveClass("text-blog-foreground-highlight");
      cleanup();
    });
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<BlogNavigationMenu />);
    expect(asFragment()).toMatchSnapshot();
  });
});
