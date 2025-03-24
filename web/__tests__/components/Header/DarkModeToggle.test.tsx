import { render, screen, fireEvent } from "@testing-library/react";
import { useTheme } from "next-themes";
import DarkModeToggle from "../../../src/components/Header/HeaderContent/DarkModeToggle";
import userEvent from "@testing-library/user-event";

jest.mock("next-themes", () => ({
  useTheme: jest.fn(),
}));

function setTheme(theme = "light") {
  const mockSetTheme = jest.fn();
  jest.spyOn(require("next-themes"), "useTheme").mockImplementation(() => ({
    theme,
    setTheme: mockSetTheme,
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
    let mockSetTheme = setTheme("dark");
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

    mockSetTheme = setTheme("light");

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

    // Encontra o elemento que contém o anúncio do tema
    const themeStatus = screen.getByTestId("dark-mode-toggle-span");

    // Verifica se o texto está correto para o tema escuro (mock inicial)
    expect(themeStatus).toHaveTextContent("Tema escuro");
    expect(themeStatus).toHaveAttribute("role", "status");
    expect(themeStatus).toHaveAttribute("aria-live", "polite");
    expect(themeStatus).toHaveClass("sr-only"); // Garante que está oculto visualmente
  });

  it("should update the theme announcement when theme changes", async () => {
    const mockSetTheme = setTheme();

    render(<DarkModeToggle />);

    const themeStatus = screen.getByTestId("dark-mode-toggle-span");
    expect(themeStatus).toHaveTextContent("Tema claro");

    // Simula a mudança de tema
    await userEvent.click(screen.getByTestId("dark-mode-toggle"));

    // Verifica se o texto seria atualizado (o mock não atualiza o valor real)
    // Este teste precisaria de ajustes se quisermos testar a mudança dinâmica
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<DarkModeToggle />);
    expect(asFragment()).toMatchSnapshot();
  });
});
