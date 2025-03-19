import { render, screen, fireEvent } from "@testing-library/react";
import DarkModeToggle from "../../../src/components/Header/HeaderContent/DarkModeToggle";
import { useTheme } from "next-themes";

jest.mock("next-themes", () => ({
  useTheme: jest.fn(),
}));

describe("DarkModeToggle", () => {
  const setThemeMock = jest.fn();
  (useTheme as jest.Mock).mockReturnValue({
    theme: "light",
    setTheme: setThemeMock,
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders dark mode toggle button", () => {
    render(<DarkModeToggle />);
    const toogleButton = screen.getByTestId("dark-mode-toggle");
    expect(toogleButton).toBeInTheDocument();
  });

  it("switches to dark theme if moon button is clicked", () => {
    render(<DarkModeToggle />);
    const toogleButton = screen.getByTestId("dark-mode-toggle");
    fireEvent.click(toogleButton);
    expect(setThemeMock).toHaveBeenCalledWith("dark");
  });

  it("switches to dark theme if the sun button is clicked", () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: "dark",
      setTheme: setThemeMock,
    });
    render(<DarkModeToggle />);
    const toogleButton = screen.getByTestId("dark-mode-toggle");
    fireEvent.click(toogleButton);
    expect(setThemeMock).toHaveBeenCalledWith("light");
  });

  it("checks the accessibility tools are in place", () => {
    const { getByTestId } = render(<DarkModeToggle />);

    const toogleButtonDark = getByTestId("dark-mode-toggle");
    const toogleButtonSpanDark = getByTestId("dark-mode-toggle-span");
    const moonButtonDark = getByTestId("moon-button");
    const sunButtonDark = getByTestId("sun-button");

    expect(toogleButtonSpanDark).toHaveClass("sr-only");
    expect(toogleButtonSpanDark).toHaveTextContent("Tema escuro");
    expect(toogleButtonDark).toHaveAttribute(
      "aria-label",
      "Alternar entre tema claro e escuro"
    );
    expect(moonButtonDark).toHaveStyle("opacity: 1");
    expect(moonButtonDark).toHaveStyle("transform: rotate(360deg)");
    expect(sunButtonDark).toHaveStyle("opacity: 0");
    expect(sunButtonDark).toHaveStyle("transform: rotate(360deg)");

    (useTheme as jest.Mock).mockReturnValue({
      theme: "light",
      setTheme: setThemeMock,
    });

    fireEvent.click(toogleButtonDark);
    const { getAllByTestId } = render(<DarkModeToggle />);

    const toogleButtonSpanLight = getAllByTestId("dark-mode-toggle-span")[1];
    const moonButtonLight = getAllByTestId("moon-button")[1];
    const sunButtonLight = getAllByTestId("sun-button")[1];

    expect(toogleButtonSpanLight).toHaveTextContent("Tema claro");
    expect(moonButtonLight).toHaveStyle("opacity: 0");
    expect(moonButtonLight).toHaveStyle("transform: rotate(0deg)");
    expect(sunButtonLight).toHaveStyle("opacity: 1");
    expect(sunButtonLight).toHaveStyle("transform: rotate(0deg)");
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<DarkModeToggle />);
    expect(asFragment()).toMatchSnapshot();
  });
});
