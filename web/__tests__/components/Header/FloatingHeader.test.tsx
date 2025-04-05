import { act, render, screen, waitFor } from "@testing-library/react";
import { FloatingHeader } from "../../../src/components/Header";
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
  beforeAll(() => {
    window.scrollTo = jest.fn();
  });

  it("renders the authenticated (user) floating header component", async () => {
    await act(async () => {
      render(<FloatingHeader currentUser={createAuthenticatedUser()} />);
    });
    const floatingHeader = screen.getByTestId("floating-header");
    expect(floatingHeader).toBeInTheDocument();
  });

  it("renders the unauthenticated (user) floating header component", async () => {
    await act(async () => {
      render(<FloatingHeader currentUser={createAuthenticatedUser()} />);
    });
    const floatingHeader = screen.getByTestId("floating-header");
    expect(floatingHeader).toBeInTheDocument();
  });

  it("hides (top:-48px) floating header component when scrolling down beyond threshold and brings it back when scrolling up", async () => {
    await act(async () =>
      render(<FloatingHeader currentUser={createAuthenticatedUser()} />)
    );
    const floatingHeader = screen.getByTestId("floating-header");

    // At top of the page, the header should be visible (top: 0px)
    expect(floatingHeader).toHaveStyle("top: 0px");

    // Rolling down beyond threshold (1000px) should hide the header (top: -48px)
    await act(async () => {
      for (let i = 100; i <= 1100; i += 100) {
        Object.defineProperty(window, "scrollY", {
          value: i,
          configurable: true,
        });
        window.dispatchEvent(new Event("scroll"));
        await new Promise((res) => setTimeout(res, 10));
      }
    });

    await waitFor(() => {
      expect(floatingHeader).toHaveStyle("top: -48px");
    });

    // Rolling up should bring the header back (top: 0px)
    await act(async () => {
      Object.defineProperty(window, "scrollY", {
        value: 1050,
        configurable: true,
      });
      window.dispatchEvent(new Event("scroll"));
    });

    await waitFor(() => {
      expect(floatingHeader).toHaveStyle("top: 0px");
    });

    // Rolling down again to test scrollingDownRef
    await act(async () => {
      for (let i = 100; i <= 3000; i += 100) {
        Object.defineProperty(window, "scrollY", {
          value: i,
          configurable: true,
        });
        window.dispatchEvent(new Event("scroll"));
        await new Promise((res) => setTimeout(res, 10));
      }
    });

    await waitFor(() => {
      expect(floatingHeader).toHaveStyle("top: -48px");
    });

    // Still not at the top of the page (999px)
    await act(async () => {
      for (let i = 3000; i <= 2001; i -= 100) {
        Object.defineProperty(window, "scrollY", {
          value: i,
          configurable: true,
        });
        window.dispatchEvent(new Event("scroll"));
        await new Promise((res) => setTimeout(res, 10));
      }
    });

    await waitFor(() => {
      expect(floatingHeader).toHaveStyle("top: -48px");
    });

    // Should be at the top of the page
    await act(async () => {
      for (let i = 2000; i >= 1999; i -= 1) {
        Object.defineProperty(window, "scrollY", {
          value: i,
          configurable: true,
        });
        window.dispatchEvent(new Event("scroll"));
        await new Promise((res) => setTimeout(res, 10));
      }
    });

    await waitFor(() => {
      expect(floatingHeader).toHaveStyle("top: 0px");
    });
  });

  it("matches the authenticated (user) static header snapshot", async () => {
    await act(async () => {
      const { asFragment } = render(
        <FloatingHeader currentUser={unauthorizedUserMock} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
