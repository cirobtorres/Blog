import { render, screen, waitFor } from "@testing-library/react";
import { mockArticles } from "../../../__mocks__/mockArticles";
import { getArticles } from "../../../src/service/articles";
import Cards from "../../../src/components/Cards";
import resolvedComponent from "../../../__mocks__/utilities/resolvedComponent";

jest.mock("../../../src/service/articles", () => ({
  getArticles: jest.fn(),
}));

describe("Cards", () => {
  it("renders 'Nenhum artigo publicado ainda' if not article has been published yet (there is no article)", async () => {
    (getArticles as jest.Mock).mockResolvedValue({ data: [] });
    const CardsResolved = await resolvedComponent(Cards);
    render(<CardsResolved />);
    expect(
      await screen.findByText("Nenhum artigo publicado ainda :(")
    ).toBeInTheDocument();
  });

  it("renders 'Mais antigos' in case there are more than 10 articles published", async () => {
    (getArticles as jest.Mock).mockResolvedValue({
      data: mockArticles(11),
    });
    const CardsResolved = await resolvedComponent(Cards);
    render(<CardsResolved />);
    await waitFor(() => {
      const card1 = screen.getByTestId("last-published-article-card-container");
      const card2 = screen.getByTestId("article-card-list");
      expect(card1).toBeInTheDocument();
      expect(card2).toBeInTheDocument();
    });
  });

  it("does not render 'Mais antigos' in case there are less than 10 articles published", async () => {
    const subset = mockArticles().slice(0, 10);
    (getArticles as jest.Mock).mockResolvedValue({ data: subset });
    const CardsResolved = await resolvedComponent(Cards);
    render(<CardsResolved />);
    expect(
      await screen.findByTestId("last-published-article-card-container")
    ).toBeInTheDocument();
    expect(screen.queryByText("Mais antigos")).not.toBeInTheDocument();
  });
});
