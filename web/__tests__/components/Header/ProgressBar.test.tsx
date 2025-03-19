import ProgressBar from "../../../src/components/Header/ProgressBar";
import { render, screen, fireEvent } from "@testing-library/react";

describe("ProgressBar", () => {
  const pageHeight = 5000;

  // beforeEach(() => {});

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("renders bar component with starting width of 0%", () => {
    render(<ProgressBar />);
    const progressBar = screen.getByTestId("progress-bar");
    const progressBarBlur = screen.getByTestId("progress-bar-blur");
    expect(progressBar.style.width).toBe("0%");
    expect(progressBarBlur.style.width).toBe("0%");
  });

  it("renders bar component with accordingly y coordinate scroll", () => {
    render(<ProgressBar />);

    jest
      .spyOn(document.documentElement, "scrollHeight", "get")
      .mockImplementation(() => pageHeight); // Define a page height

    fireEvent.scroll(window, { target: { scrollY: pageHeight / 2 } }); // Scroll below 50% of that page height at least

    const progressBar = screen.getByTestId("progress-bar");
    const progressBarBlur = screen.getByTestId("progress-bar-blur");

    const progressBarPercentage = progressBar.style.width.match(/\d+/); // It is returning a string of a float like: "59.07372400756144%"
    const progressBarBlurPercentage = progressBarBlur.style.width.match(/\d+/); // It is returning a string of a float like: "59.07372400756144%"

    const progressNumber = Number(
      progressBarPercentage && progressBarPercentage.length > 0
        ? progressBarPercentage[0]
        : 0
    );
    const progressBlurNumber = Number(
      progressBarBlurPercentage && progressBarBlurPercentage.length > 0
        ? progressBarBlurPercentage[0]
        : 0
    );

    expect(progressNumber).toBeGreaterThanOrEqual(50);
    expect(progressBlurNumber).toBeGreaterThanOrEqual(50);
    expect(progressNumber).toEqual(progressBlurNumber);
  });

  it("applies and removes event listener when component mounts and unmounts respectively", () => {
    const addEventListenerSpy = jest.spyOn(window, "addEventListener");
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
    const { unmount } = render(<ProgressBar />);
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    ); // Checks if scroll event was added
    removeEventListenerSpy.mockClear(); // Clear component and checks if scroll event was removed
    unmount(); // Unmounting component
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );
  });

  it("renders progress bar with accessibility attributes and classes", () => {
    render(<ProgressBar />);
    const progressDiv = screen.getByTestId("progress");
    expect(progressDiv).toHaveAttribute("role", "progressbar");
    expect(progressDiv).toHaveAttribute("aria-live", "polite");
    expect(progressDiv).toHaveAttribute("aria-labelledby", "progressbar-label");
    expect(progressDiv).toHaveClass(
      "fixed top-[calc(100%_+_1px)] left-0 h-1 w-full inline-grid"
    );

    const progressBar = screen.getByTestId("progress-bar");
    const progressBarBlur = screen.getByTestId("progress-bar-blur");

    // Mobile only
    expect(progressBar).toHaveClass("hidden max-lg:block");
    expect(progressBarBlur).toHaveClass("hidden max-lg:block");

    // Both bars must overlap each other
    expect(progressBar).toHaveClass("col-start-1 row-start-1");
    expect(progressBarBlur).toHaveClass("col-start-1 row-start-1");

    // Progress bar blur must keep any blur class
    expect(progressBarBlur).toHaveClass(/.*blur.*/);
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<ProgressBar />);
    expect(asFragment()).toMatchSnapshot();
  });
});
