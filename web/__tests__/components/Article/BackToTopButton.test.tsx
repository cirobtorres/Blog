import { BackToTopButton } from "@/components/Article/BackToTopButton";
import { fireEvent, render, screen } from "@testing-library/react";

Object.defineProperty(window, "scrollTo", {
  value: jest.fn(),
  writable: true,
});

describe("BackToTopButton", () => {
  it("renders in the document", () => {
    const diameterMock = 75;
    const strokeWidthMock = 7;
    const innerRadiusMock = diameterMock / 2 - strokeWidthMock * 2;
    const circunferenceMock = 2 * Math.PI * innerRadiusMock;
    render(<BackToTopButton />);
    const btnContainer = screen.getByTestId("btt-btn-container");
    const btn = screen.getByTestId("btt-btn");
    const svg = btn.querySelector("svg") as SVGSVGElement;
    const [circleBackground, circleProgress, circleBlur] =
      svg.querySelectorAll("circle");
    const bttArrowUp = screen.getByTestId("btt-arrow-up");

    // btnContainer--------------------------------------------------------------
    expect(btnContainer).toBeInTheDocument();
    expect(btnContainer).toHaveClass(
      "self-start sticky mx-auto top-1/2 -translate-y-1/2"
    );

    // btn-----------------------------------------------------------------------
    expect(btn).toHaveClass(
      `relative` +
        ` rounded` +
        ` flex` +
        ` focus-visible:outline` +
        ` focus-visible:outline-2` +
        ` focus-visible:outline-blog-foreground-readable-hover` +
        ` group`
    );
    expect(btn).toHaveAttribute("aria-label", "Voltar ao topo da página");
    expect(btn).toHaveAttribute("title", "Voltar ao topo da página");
    expect(getComputedStyle(btn).height).toBe("75px");

    // svg-----------------------------------------------------------------------
    expect(svg).toHaveClass("relative -rotate-90");
    expect(svg).toHaveAttribute("role", "presentation");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveAttribute("focusable", "false");
    expect(getComputedStyle(svg).height).toBe("75px");
    expect(getComputedStyle(svg).width).toBe("75px");

    // circleBackground----------------------------------------------------------
    expect(circleBackground).toHaveClass(
      "w-fit h-fit fill-none stroke-blog-background-2"
    );
    expect(circleBackground).toHaveAttribute("cx", `${diameterMock / 2}`);
    expect(circleBackground).toHaveAttribute("cy", `${diameterMock / 2}`);
    expect(circleBackground).toHaveAttribute("r", `${innerRadiusMock}px`);
    expect(circleBackground).toHaveAttribute(
      "stroke-dasharray",
      `${circunferenceMock}`
    );
    expect(getComputedStyle(circleBackground).strokeDashoffset).toBe("0");

    // circleProgress------------------------------------------------------------
    expect(circleProgress).toHaveAttribute("cx", `${diameterMock / 2}`);
    expect(circleProgress).toHaveAttribute("cy", `${diameterMock / 2}`);
    expect(circleProgress).toHaveAttribute("r", `${innerRadiusMock}px`);
    expect(circleProgress).toHaveAttribute(
      "stroke-dasharray",
      `${circunferenceMock}`
    );
    expect(getComputedStyle(circleProgress).strokeDashoffset).toBe(
      `${circunferenceMock}`
    );
    expect(circleProgress).toHaveClass(
      "w-fit h-fit fill-none stroke-blog-foreground-highlight"
    );

    // circleBlur----------------------------------------------------------------
    expect(circleBlur).toHaveAttribute("cx", `${diameterMock / 2}`);
    expect(circleBlur).toHaveAttribute("cy", `${diameterMock / 2}`);
    expect(circleBlur).toHaveAttribute("r", `${innerRadiusMock}px`);
    expect(circleBlur).toHaveAttribute(
      "stroke-dasharray",
      `${circunferenceMock}`
    );
    expect(getComputedStyle(circleBlur).strokeDashoffset).toBe(
      `${circunferenceMock}`
    );
    expect(circleBlur).toHaveClass(
      "w-fit h-fit fill-none stroke-blog-foreground-highlight blur-sm"
    );

    // bttArrowUp----------------------------------------------------------------
    expect(bttArrowUp).toHaveClass(
      "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-xl group-hover:animate-bouncing-arrow-up"
    );
    expect(bttArrowUp).toHaveAttribute("aria-hidden", "true");
    expect(bttArrowUp).toHaveAttribute("focusable", "false");
  });

  it("scrolls to top of the page when clicked", () => {
    render(<BackToTopButton />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it("updates circles based on scroll", () => {
    render(<BackToTopButton />);

    const progressCircle = screen.getByTestId("progress-circle")!;
    const blurCircle = screen.getByTestId("progress-circle-blur")!;

    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 500,
    });

    Object.defineProperty(document.documentElement, "scrollHeight", {
      writable: true,
      configurable: true,
      value: 2000,
    });

    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 1000,
    });

    fireEvent.scroll(window);

    expect(progressCircle.style.strokeDashoffset).not.toBe("");
    expect(blurCircle.style.strokeDashoffset).toBe(
      progressCircle.style.strokeDashoffset
    );
  });
});
