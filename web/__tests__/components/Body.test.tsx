import { faker } from "@faker-js/faker";
import { render, screen, waitFor } from "@testing-library/react";
import { DynamicBody, StaticBody } from "../../src/components/Body";
import { getUserMeLoader } from "../../src/service/user-me-loader";
import { resolvedComponentWithProps } from "../../__mocks__/utilities/resolvedComponent";

faker.seed(1); // Snapshot

jest.mock("../../src/service/about", () => ({
  getAbout: jest.fn().mockResolvedValue({
    data: { github_link: "https://github.com/johndoe" },
  }),
}));

jest.mock("next/navigation", () => ({
  // HeaderContent contains multiple nested components.
  // BlogNavigationMenu uses the usePathname hook, so we need to mock it.
  // SearchBar uses the useSearchParams hook, so we need to mock it as well.
  usePathname: jest.fn(() => "/"),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

jest.mock("../../src/service/get-auth-token", () => ({
  getAuthToken: jest.fn().mockResolvedValue("mocked-auth-token"),
}));

jest.mock("../../src/service/user-me-loader", () => ({
  getUserMeLoader: jest.fn(),
}));

(getUserMeLoader as jest.Mock).mockResolvedValue({
  ok: true,
  data: {
    id: 1,
    documentId: "4136cd0b-d90b-4af7-b485-5d1ded8db252",
    username: "johndoe",
    email: "johndoe@email.com",
    provider: "google",
    confirmed: true,
    blocked: false,
    createdAt: "2021-12-03T05:40:44.408Z",
    updatedAt: "2021-12-03T05:40:44.408Z",
    publishedAt: "2021-12-03T05:40:44.408Z",
  },
  error: null,
});

jest.mock("../../src/components/Footer", () => ({
  // Footer has its own tests.
  // Here, it is being mocked because there has been
  // desynchronization between DynamicBody and Footer, both server components
  __esModule: true,
  default: () => <footer data-testid="footer">Mocked Footer</footer>,
}));

describe("Dynamic and Static bodies", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_BACKEND_IP = "http://127.0.0.1:1337";
  });

  it("renders in the document (DynamicBody)", async () => {
    const ResolvedDynamicBody = await resolvedComponentWithProps(DynamicBody, {
      children: <p>Conteúdo...</p>,
    });
    render(<ResolvedDynamicBody />);
    await waitFor(() => {
      const bodyContainer = screen.getByTestId("dyn-body-container");
      const main = screen.getByTestId("dyn-main");
      const paragraph = screen.getByText(/Conteúdo.../i);
      expect(bodyContainer).toBeInTheDocument();
      expect(bodyContainer).toContainElement(main);
      expect(bodyContainer).toHaveClass("flex flex-col justify-between");
      expect(bodyContainer).toHaveClass("h-full min-h-screen");
      expect(main).toBeInTheDocument();
      expect(main).toHaveClass("flex-1 mt-12");
      expect(paragraph).toBeInTheDocument();
    });
  });

  it("renders in the document (StaticBody)", async () => {
    const ResolvedStaticBody = await resolvedComponentWithProps(StaticBody, {
      children: <p>Conteúdo...</p>,
    });
    render(<ResolvedStaticBody />);
    await waitFor(() => {
      const bodyContainer = screen.getByTestId("stc-body-container");
      const main = screen.getByTestId("stc-main");
      const paragraph = screen.getByText(/Conteúdo.../i);
      expect(bodyContainer).toBeInTheDocument();
      expect(bodyContainer).toContainElement(main);
      expect(bodyContainer).toHaveClass("flex flex-col justify-between");
      expect(bodyContainer).toHaveClass("h-full min-h-screen");
      expect(main).toBeInTheDocument();
      expect(main).toHaveClass("flex-1 flex flex-col");
      expect(paragraph).toBeInTheDocument();
    });
  });
});
