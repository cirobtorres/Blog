import { faker } from "@faker-js/faker";
import { act, render, screen, waitFor } from "@testing-library/react";
import { DynamicBody } from "../../src/components/Body";
import { getUserMeLoader } from "../../src/service/user-me-loader";
import { resolvedComponentWithProps } from "../../__mocks__/utilities/resolvedComponent";

faker.seed(1); // Snapshot

jest.mock("next/navigation", () => ({
  // HeaderContent contains multiple nested components.
  // BlogNavigationMenu uses the usePathname hook, so we need to mock it.
  // SearchBar uses the useSearchParams hook, so we need to mock it as well.
  usePathname: jest.fn(() => "/"),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

jest.mock("../../src/service/about", () => ({
  getAbout: jest.fn().mockResolvedValue({
    data: {
      documentId: "4136cd0b-d90b-4af7-b485-5d1ded8db252",
      title: "Blog",
      github_link: "https://github.com/johndoe",
      github_blog_link: "https://github.com/johndoe/blog",
      createdAt: "2021-12-03T05:40:44.408Z",
      updatedAt: "2021-12-04T11:09:36.667Z",
      publishedAt: "2021-12-03T05:40:44.408Z",
      blocks: [],
    },
  }),
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

describe("DynamicBody", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_BACKEND_IP = "http://127.0.0.1:1337";
  });

  it("renders in the document", async () => {
    const ResolvedDynamicBody = await resolvedComponentWithProps(DynamicBody, {
      children: <p>Conteúdo...</p>,
    });

    await act(() => render(<ResolvedDynamicBody />));

    await waitFor(() => {
      const bodyContainer = screen.getByTestId("dyn-body-container");
      const main = screen.getByTestId("dyn-main");
      const paragraph = screen.getByText(/Conteúdo.../i);
      expect(bodyContainer).toBeInTheDocument();
      expect(main).toBeInTheDocument();
      expect(paragraph).toBeInTheDocument();
      expect(bodyContainer).toContainElement(main);
    });
  });
});
