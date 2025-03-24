import { act, render, screen, waitFor } from "@testing-library/react";
import { FloatingHeader } from "../../../src/components/Header";

jest.mock("next/navigation", () => ({
  // HeaderContent contains multiple nested components.
  // BlogNavigationMenu uses the usePathname hook, so we need to mock it.
  // SearchBar uses the useSearchParams hook, so we need to mock it as well.
  usePathname: jest.fn(() => "/"),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

jest.mock("../../../src/service/about", () => ({
  getAbout: jest.fn().mockResolvedValue({
    data: {
      documentId: "12345",
      title: "My Blog",
      github_link: "https://github.com/johndoe",
      github_blog_link: "https://github.com/johndoe/blog",
      createdAt: "2022-01-01",
      updatedAt: "2022-01-02",
      publishedAt: "2022-01-01",
      blocks: [],
    },
  }),
}));

describe("FloatingHeader", () => {
  const mockAuthUser = {
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

  const mockUnauthUser = {
    ok: false,
    data: null,
    error: {
      status: 404,
      name: "",
      message: "Not Found",
    },
  };

  beforeAll(() => {
    window.scrollTo = jest.fn();
  });

  it("renders the authenticated (user) floating header component", async () => {
    await act(async () => {
      render(<FloatingHeader currentUser={mockAuthUser} />);
    });
    const floatingHeader = screen.getByTestId("floating-header");
    expect(floatingHeader).toBeInTheDocument();
  });

  it("renders the unauthenticated (user) floating header component", async () => {
    await act(async () => {
      render(<FloatingHeader currentUser={mockAuthUser} />);
    });
    const floatingHeader = screen.getByTestId("floating-header");
    expect(floatingHeader).toBeInTheDocument();
  });

  it("hides (top:-49px) floating header component when scroll down viewport beyond threshold and bring it back if scroll it up (top:0px)", async () => {
    await act(async () =>
      render(<FloatingHeader currentUser={mockAuthUser} />)
    );
    const floatingHeader = screen.getByTestId("floating-header");

    expect(floatingHeader).toHaveStyle("top: 0px");

    // Scrolls downward (beyond threshold: 400 + 480 + 80 = 960)
    await act(async () => {
      Object.defineProperty(window, "scrollY", { value: 1000, writable: true });
      window.dispatchEvent(new Event("scroll"));
    });

    // Check if its hidden (moved -49px upwards viewport)
    await waitFor(() => {
      expect(floatingHeader).toHaveStyle("top: -49px");
    });

    // Scrolls upward
    await act(async () => {
      Object.defineProperty(window, "scrollY", { value: 500, writable: true });
      window.dispatchEvent(new Event("scroll"));
    });

    // Checks if header is back!
    await waitFor(() => {
      expect(floatingHeader).toHaveStyle("top: 0px");
    });
  });

  it("matches the authenticated (user) static header snapshot", async () => {
    await act(async () => {
      const { asFragment } = render(
        <FloatingHeader currentUser={mockUnauthUser} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
