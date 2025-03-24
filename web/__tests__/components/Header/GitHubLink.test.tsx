import { act, render, screen } from "@testing-library/react";
import GitHubLink from "../../../src/components/Header/HeaderContent/GitHubLink";
import { getAbout } from "../../../src/service/about";

jest.mock("../../../src/service/about");

describe("GitHubLink", () => {
  beforeEach(() => {
    (getAbout as jest.Mock).mockResolvedValue({
      data: { github_link: "https://github.com/johndoe" },
    });
  });

  it("renders github link icon component", async () => {
    await act(async () => {
      render(<GitHubLink />);
    });
    const link = screen.getByTestId("header-content-github-link");
    expect(link).toBeInTheDocument();
  });

  it("should handle API error gracefully", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {}); // Silence searchLink console.error from GitHubLink
    (getAbout as jest.Mock).mockRejectedValue(new Error("API Error"));

    await act(async () => {
      render(<GitHubLink />);
    });

    const link = screen.getByTestId("header-content-github-link");
    expect(link).toHaveAttribute("href", "/");
  });

  it("matches the snapshot", async () => {
    await act(async () => {
      const { asFragment } = render(<GitHubLink />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
