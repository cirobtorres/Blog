import { StaticHeader } from "@/components/Header";
import { act, render, screen } from "@testing-library/react";
import {
  createAuthenticatedUser,
  notFoundUserMock,
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
      createdAt: "2025-03-10T23:11:17.381Z",
      updatedAt: "2025-03-10T23:11:17.381Z",
      publishedAt: "2025-03-10T23:11:17.381Z",
      blocks: [],
    },
  }),
}));

describe("StaticHeader", () => {
  it("renders the authenticated (user) static header component", async () => {
    await act(async () => {
      render(<StaticHeader currentUser={createAuthenticatedUser()} />);
    });
    const staticHeader = screen.getByTestId("static-header");
    expect(staticHeader).toBeInTheDocument();
  });

  it("renders the unauthenticated (user) static header component", async () => {
    await act(async () => {
      render(<StaticHeader currentUser={createAuthenticatedUser()} />);
    });
    const staticHeader = screen.getByTestId("static-header");
    expect(staticHeader).toBeInTheDocument();
  });

  it("matches the classes", async () => {
    await act(async () => {
      render(<StaticHeader currentUser={createAuthenticatedUser()} />);
    });
    const staticHeader = screen.getByTestId("static-header");
    expect(staticHeader).toHaveClass(
      "w-full z-10 h-12 shrink-0 backdrop-blur-sm bg-blog-background-backdrop"
    );
  });

  it("matches the authenticated (user) static header snapshot", async () => {
    await act(async () => {
      const { asFragment } = render(
        <StaticHeader currentUser={notFoundUserMock} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
