import { mountNextImage } from "../../../src/utils/mountNextImage";
import HeaderContent from "../../../src/components/Header/HeaderContent";
import { render, screen, waitFor } from "@testing-library/react";
import { getAbout } from "../../../src/service/about";

jest.mock("next/navigation", () => ({
  // HeaderContent contains multiple nested components.
  // BlogNavigationMenu uses the usePathname hook, so we need to mock it.
  // SearchBar uses the useSearchParams hook, so we need to mock it as well.
  usePathname: jest.fn(() => "/"),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

jest.mock("../../../src/service/about", () => ({
  getAbout: jest.fn(),
}));

describe("HeaderContent", () => {
  const mockUserAuthenticated = {
    ok: true,
    data: {
      id: 1,
      documentId: "Absh1-19AK3-Po24S",
      username: "johndoe",
      email: "johndoe@gmail.com",
      provider: "google",
      confirmed: true,
      blocked: false,
      createdAt: "2025-03-10T23:11:17.381Z",
      updatedAt: "2025-03-10T23:11:17.381Z",
      publishedAt: "2025-03-10T23:11:17.381Z",
    },
    error: null,
  };

  const mockUserUnauthenticated = {
    ok: false,
    data: null,
    error: {
      status: 401,
      name: "Unauthorized",
      message: "User not authenticated",
    },
  };

  const mockGitHubLink = "https://github.com/johndoe";

  beforeEach(() => {
    // jest.spyOn(console, "error").mockImplementation(() => {}); // Silence console.error
    // GitHubLink component error: TypeError: Cannot destructure property 'data' of '(intermediate value)' as it is undefined.
    (getAbout as jest.Mock).mockResolvedValueOnce({
      data: { github_link: mockGitHubLink },
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the header content component", async () => {
    await waitFor(() => {
      render(<HeaderContent currentUser={mockUserAuthenticated} />);
      expect(screen.getByTestId("header-content")).toBeInTheDocument();
    });
  });

  it("does render username if user is authenticated", async () => {
    await waitFor(() => {
      render(<HeaderContent currentUser={mockUserAuthenticated} />);
      const authenticatedLi = screen.getByTestId("header-user-authenticated");
      const unauthenticatedLi = screen.queryByTestId(
        "header-user-unauthenticated"
      );
      expect(authenticatedLi).toBeInTheDocument();
      expect(unauthenticatedLi).not.toBeInTheDocument();
    });
  });

  it("does not render username if user is not authenticated", async () => {
    await waitFor(() => {
      render(<HeaderContent currentUser={mockUserUnauthenticated} />);
      const authenticatedLi = screen.queryByTestId("header-user-authenticated");
      const unauthenticatedLi = screen.getByTestId(
        "header-user-unauthenticated"
      );
      expect(authenticatedLi).not.toBeInTheDocument();
      expect(unauthenticatedLi).toBeInTheDocument();
    });
  });

  it("renders with darkmode button toggle", async () => {
    await waitFor(() => {
      render(<HeaderContent currentUser={mockUserUnauthenticated} />);
      const darkmodeButtonToggle = screen.getByTestId("dark-mode-toggle");
      expect(darkmodeButtonToggle).toBeInTheDocument();
    });
  });

  it("renders with search bar trigger", async () => {
    await waitFor(() => {
      render(<HeaderContent currentUser={mockUserUnauthenticated} />);
      const searchBarTrigger = screen.getByTestId("search-bar-trigger");
      expect(searchBarTrigger).toBeInTheDocument();
    });
  });

  it("renders with blog navigation menu", async () => {
    await waitFor(() => {
      render(<HeaderContent currentUser={mockUserUnauthenticated} />);
      const blogNavigationMenu = screen.getByTestId("blog-navigation-menu");
      expect(blogNavigationMenu).toBeInTheDocument();
    });
  });

  it("renders link and image logo", async () => {
    await waitFor(() => {
      render(<HeaderContent currentUser={mockUserUnauthenticated} />);
      const logoLink = screen.getByTestId("header-content-logo-link");
      expect(logoLink).toHaveAttribute("href", "/");

      const nextOptimizedImage = mountNextImage({
        imageFilename: "logo",
        imageFileExtension: "png",
        path: "/images/",
        width: 96,
        quality: 75,
      });

      const logoImage = logoLink.querySelector("img");
      expect(logoImage).toHaveAttribute("src", nextOptimizedImage);
    });
  });

  it("renders with GitHub link", async () => {
    await waitFor(() => {
      render(<HeaderContent currentUser={mockUserUnauthenticated} />);
      const githubLink = screen.getByTestId("header-content-github-link");
      expect(githubLink).toHaveAttribute("href", mockGitHubLink);
    });
  });
});
