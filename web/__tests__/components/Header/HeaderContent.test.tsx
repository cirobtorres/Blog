import HeaderContent from "../../../src/components/Header/HeaderContent";
import { mountLocalImage } from "../../../__mocks__/utilities/mountNextImage";
import { act, render, screen, waitFor } from "@testing-library/react";
import { getAbout } from "../../../src/service/about";
import {
  createAuthenticatedUser,
  unauthorizedUserMock,
} from "../../../__mocks__/mockUser";

jest.mock("next/navigation", () => ({
  // HeaderContent contains multiple nested components.
  // BlogNavigationMenu uses the usePathname hook, so we need to mock it.
  // SearchBar uses the useSearchParams hook, so we need to mock it as well.
  usePathname: jest.fn(() => "/"),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

jest.mock("../../../src/service/about");

const authenticatedUserMock = createAuthenticatedUser();

describe("HeaderContent", () => {
  beforeEach(() => {
    (getAbout as jest.Mock).mockResolvedValue({
      data: { github_link: "https://github.com/johndoe" },
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the header content component", async () => {
    await act(async () => {
      render(<HeaderContent currentUser={authenticatedUserMock} />);
    });
    await waitFor(() => {
      expect(screen.getByTestId("header-content")).toBeInTheDocument();
    });
  });

  it("does render username if user is authenticated", async () => {
    await act(async () => {
      render(<HeaderContent currentUser={authenticatedUserMock} />);
    });
    await waitFor(() => {
      const authenticatedLi = screen.getByTestId("hua"); // hua = header-user-authenticated
      const unauthenticatedLi = screen.queryByTestId("huu");
      expect(authenticatedLi).toBeInTheDocument();
      expect(unauthenticatedLi).not.toBeInTheDocument();
    });
  });

  it("does not render username if user is not authenticated", async () => {
    await act(async () => {
      render(<HeaderContent currentUser={unauthorizedUserMock} />);
    });
    await waitFor(() => {
      const authenticatedLi = screen.queryByTestId("hua"); // hua = header-user-authenticated
      const unauthenticatedLi = screen.getByTestId("huu");
      expect(authenticatedLi).not.toBeInTheDocument();
      expect(unauthenticatedLi).toBeInTheDocument();
    });
  });

  it("renders with darkmode button toggle", async () => {
    await act(async () => {
      render(<HeaderContent currentUser={unauthorizedUserMock} />);
    });
    await waitFor(() => {
      const darkmodeButtonToggle = screen.getByTestId("dark-mode-toggle");
      expect(darkmodeButtonToggle).toBeInTheDocument();
    });
  });

  it("renders with search bar trigger", async () => {
    await act(async () => {
      render(<HeaderContent currentUser={unauthorizedUserMock} />);
    });
    await waitFor(() => {
      const searchBarTrigger = screen.getByTestId("search-bar-trigger");
      expect(searchBarTrigger).toBeInTheDocument();
    });
  });

  it("renders with blog navigation menu as visible", async () => {
    await act(async () => {
      render(<HeaderContent currentUser={unauthorizedUserMock} />);
    });
    await waitFor(() => {
      const blogNavigationMenu = screen.getByTestId("blog-navigation-menu");
      const style = window.getComputedStyle(blogNavigationMenu);
      expect(blogNavigationMenu).toBeInTheDocument();
      expect(style.display).toBe("block");
    });
  });

  it("renders link and image logo", async () => {
    await act(async () => {
      render(<HeaderContent currentUser={unauthorizedUserMock} />);
    });
    await waitFor(() => {
      const logoLink = screen.getByTestId("header-content-logo-link");
      expect(logoLink).toHaveAttribute("href", "/");
      const nextOptimizedImage = mountLocalImage({
        imageFilename: "logo",
        imageFileExtension: "png",
        path: "/images/",
        width: 96,
      });
      const logoImage = logoLink.querySelector("img");
      expect(logoImage).toHaveAttribute("src", nextOptimizedImage);
    });
  });

  it("matches the snapshot", async () => {
    await act(async () => {
      const { asFragment } = render(
        <HeaderContent currentUser={unauthorizedUserMock} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
