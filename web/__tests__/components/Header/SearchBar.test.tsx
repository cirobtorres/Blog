import "@testing-library/jest-dom";
import SearchBar from "../../../src/components/Header/SearchBar";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getArticles } from "../../../src/service/articles";
import { useSearchParams } from "next/navigation";

jest.mock("../../../src/service/articles");

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

describe("SearchBar", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the search bar component", () => {
    render(<SearchBar />);
    const searchBar = screen.getByTestId("search-bar-trigger");
    expect(searchBar).toBeInTheDocument();
  });

  it("does not render input query dialog box", () => {
    render(<SearchBar />);
    const submitButton = screen.queryByTestId("search-bar-input-query");
    expect(submitButton).not.toBeInTheDocument();
  });

  it("clicks DialogTrigger to open InputQuery and searches article on ResultQuery", async () => {
    (getArticles as jest.Mock).mockResolvedValue({
      data: [
        {
          documentId: "1",
          title: "Article 1",
          slug: "article-1",
          cover: {
            documentId: "1",
            url: "/path/to/image1.jpg",
            alternativeText: "Article 1",
          },
        },
      ],
    });

    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue("article-1"),
    });

    render(<SearchBar />);

    const buttonTrigger = screen.getByTestId("search-bar-trigger-button");
    fireEvent.click(buttonTrigger);
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());

    const inputQuery = await waitFor(() =>
      screen.getByTestId("search-bar-query")
    );
    expect(inputQuery).toBeInTheDocument();

    await waitFor(() => userEvent.type(inputQuery, "Article 1"));
    await waitFor(() =>
      expect(screen.getByText("Article 1")).toBeInTheDocument()
    );
  });

  it("displays 'No articles found' message when no results are returned", async () => {
    (getArticles as jest.Mock).mockResolvedValue({ data: [] }); // Mock: no article on database

    render(<SearchBar />);

    // Clicks the trigger and await for it to open the dialog box
    const buttonTrigger = screen.getByTestId("search-bar-trigger-button");
    fireEvent.click(buttonTrigger);
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());

    // Clears the input, just to make sure, and type in "Article X"
    const inputQuery = await waitFor(() =>
      screen.getByTestId("search-bar-query")
    );
    await waitFor(() => userEvent.clear(inputQuery));
    await waitFor(() => userEvent.type(inputQuery, "Article X"));

    // Await for server to respond its call
    await waitFor(() =>
      expect(getArticles).toHaveBeenCalledWith("createdAt:desc", "article-x")
    );

    // Make assertion
    const inputField = await waitFor(() =>
      screen.getByTestId("search-bar-none-found")
    );
    expect(inputField).toHaveTextContent("Nenhum artigo encontrado");
  });

  it("calls the handleSearch function with debounced value", async () => {
    jest.useFakeTimers();
    (getArticles as jest.Mock).mockResolvedValue({
      data: [
        {
          documentId: "2",
          title: "Article 2",
          slug: "article-2",
          cover: {
            documentId: "2",
            url: "/path/to/image2.jpg",
            alternativeText: "Article 2",
          },
        },
      ],
    });

    render(<SearchBar />);

    const buttonTrigger = screen.getByTestId("search-bar-trigger-button");
    fireEvent.click(buttonTrigger);
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());

    const inputQuery = screen.getByTestId("search-bar-query");

    await act(async () => {
      userEvent.clear(inputQuery);
      userEvent.type(inputQuery, "Article 2");
      jest.advanceTimersByTime(500); // Advance time according to useDebouncedCallback
    });

    await waitFor(() => expect(inputQuery).toHaveValue("Article 2")); // Guarantees that inputQuery has "Article 2" as text input before following to next assertions
    await waitFor(() => expect(getArticles).toHaveBeenCalled());
    await waitFor(() =>
      expect(getArticles).toHaveBeenCalledWith("createdAt:desc", "article-2")
    );

    jest.useRealTimers();
  });

  it("closes the dialog when ESC is pressed", async () => {
    render(<SearchBar />);

    const buttonTrigger = screen.getByTestId("search-bar-trigger-button");
    fireEvent.click(buttonTrigger);
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());

    const closeButton = screen.getByTestId("search-bar-close");
    fireEvent.click(closeButton);
    expect(screen.queryByTestId("search-bar-trigger")).toBeInTheDocument();
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<SearchBar />);
    expect(asFragment()).toMatchSnapshot();
  });
});
