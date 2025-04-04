import { render, screen, fireEvent } from "@testing-library/react";
import * as nextThemes from "next-themes";
import DarkModeToggle from "../../../src/components/Header/HeaderContent/DarkModeToggle";
import userEvent from "@testing-library/user-event";

jest.mock("next-themes", () => ({
  useTheme: jest.fn(),
}));

function setTheme(theme = "light") {
  const mockSetTheme = jest.fn();

  jest.spyOn(nextThemes, "useTheme").mockImplementation(() => ({
    theme,
    setTheme: mockSetTheme,
    themes: ["light", "dark"],
  }));
  return mockSetTheme;
}

describe("DarkModeToggle", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders dark mode toggle button", () => {
    setTheme();
    render(<DarkModeToggle />);
    const toogleButton = screen.getByTestId("dark-mode-toggle");
    expect(toogleButton).toBeInTheDocument();
  });

  it("switches to dark theme if moon button is clicked", () => {
    const mockSetTheme = setTheme();
    render(<DarkModeToggle />);
    const toogleButton = screen.getByTestId("dark-mode-toggle");
    fireEvent.click(toogleButton);
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("switches to dark theme if the sun button is clicked", () => {
    const mockSetTheme = setTheme("dark");
    render(<DarkModeToggle />);
    const toogleButton = screen.getByTestId("dark-mode-toggle");
    fireEvent.click(toogleButton);
    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });

  it("checks the accessibility tools are in place", () => {
    setTheme("dark");
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

    setTheme("light");

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

  it("should correctly announce the current theme for screen readers", () => {
    setTheme("dark");
    render(<DarkModeToggle />);
    const themeStatus = screen.getByTestId("dark-mode-toggle-span");
    expect(themeStatus).toHaveTextContent("Tema escuro");
    expect(themeStatus).toHaveAttribute("role", "status");
    expect(themeStatus).toHaveAttribute("aria-live", "polite");
    expect(themeStatus).toHaveClass("sr-only");
  });

  it("should update the theme announcement when theme changes", async () => {
    const mockSetTheme = setTheme();
    render(<DarkModeToggle />);
    const themeStatus = screen.getByTestId("dark-mode-toggle-span");
    expect(themeStatus).toHaveTextContent("Tema claro");
    await userEvent.click(screen.getByTestId("dark-mode-toggle"));
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<DarkModeToggle />);
    expect(asFragment()).toMatchSnapshot();
  });
});
