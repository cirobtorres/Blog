import { render, screen, fireEvent } from "@testing-library/react";
import { Popover, PopoverTrigger } from "../../src/components/Shadcnui/popover";
import { providers } from "../../src/config/providers";
import PopoverLoginContent from "../../src/components/Authentication/PopoverLoginContent";

jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  MockLink.displayName = "MockLink";
  return MockLink;
});

jest.mock("../../src/config/providers", () => ({
  providers: [
    { provider: "google", label: "Google", bg: "#dc2626" },
    { provider: "facebook", label: "Meta", bg: "#2563eb" },
    { provider: "github", label: "Github" },
  ],
}));

describe("PopoverLoginContent", () => {
  describe("PopoverLoginContent Component", () => {
    beforeEach(() => {
      process.env.NEXT_PUBLIC_BACKEND_URL = "http://localhost:1337";

      render(
        <Popover>
          <PopoverTrigger>
            <p>Children...</p>
          </PopoverTrigger>
          <PopoverLoginContent />
        </Popover>
      );

      const buttonTrigger = screen.getByRole("button");
      fireEvent.click(buttonTrigger);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("renders correctly with default props", () => {
      const openedPopoverContent = screen.getByTestId("huu-login-screen");
      expect(openedPopoverContent).toBeInTheDocument();

      const header = screen.getByTestId("huu-login-header");
      expect(header).toHaveTextContent(/Faça .*LOGIN/i);

      const emailField = screen.getByLabelText("E-mail");
      expect(emailField).toBeInTheDocument();

      const passField = screen.getByLabelText("Senha");
      expect(passField).toBeInTheDocument();

      const loginButton = screen.getByRole("button", { name: "Login" });
      expect(loginButton).toBeInTheDocument();

      const or = screen.getByText("ou");
      expect(or).toBeInTheDocument();

      providers.forEach((provider) => {
        const providerLabel = screen.getByText(provider.label);
        expect(providerLabel).toBeInTheDocument();
      });

      const footer = screen.getByTestId("huu-login-footer");
      expect(footer).toBeInTheDocument();
    });

    it("renders email input correctly", () => {
      const emailField = screen.getByTestId("floating-login-email-input");
      const passField = screen.getByTestId("floating-login-password-input");
      const emailLabel = screen.getByTestId("floating-login-email-label");
      const passLabel = screen.getByTestId("floating-login-password-label");

      expect(emailField).toHaveAttribute("type", "email");
      expect(emailField).toHaveAttribute("placeholder", "johndoe@email.com");
      expect(emailField).toHaveAttribute("name", "login-email");

      expect(emailLabel).toHaveAttribute("for", "floating-login-email-input");
      expect(emailLabel).toHaveClass(
        `absolute top-1/2 z-10 origin-[0] start-1 px-1 select-none` +
          ` -translate-y-5 scale-75 text-blog-foreground-highlight peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-blog-foreground-highlight` +
          ` peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-blog-foreground-readable` +
          ` text-sm pointer-events-none bg-transparent bg-opacity-50` +
          ` transform transition-top duration-100`
      );
      expect(emailLabel).toHaveTextContent("E-mail");

      expect(passField).toHaveAttribute("type", "password");
      expect(passField).toHaveAttribute("placeholder", " ");
      expect(passField).toHaveAttribute("name", "login-password");

      expect(passLabel).toHaveAttribute("for", "floating-login-password-input");
      expect(passLabel).toHaveClass(
        `absolute top-1/2 z-10 origin-[0] start-1 px-1 select-none` +
          ` -translate-y-5 scale-75 text-blog-foreground-highlight peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-blog-foreground-highlight` +
          ` peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-blog-foreground-readable` +
          ` text-sm pointer-events-none bg-transparent bg-opacity-50` +
          ` transform transition-top duration-100`
      );
      expect(passLabel).toHaveTextContent("Senha");
    });

    it("renders or component correctly", () => {
      const or = screen.getByTestId("floating-login-or");
      expect(or).toBeInTheDocument();
      expect(or).toHaveClass(
        "relative h-6 my-4 items-center grid grid-cols-[1fr_auto_1fr]"
      );

      const span = or.getElementsByTagName("span")[0];
      expect(span).toBeInTheDocument();
      expect(span).toHaveTextContent("ou");
      expect(span).toHaveClass(
        "px-2 text-sm text-[hsl(0,0%,75%)] pointer-events-none select-none"
      );

      const qr = or.querySelectorAll("hr");
      qr.forEach((individualQr) => {
        expect(individualQr).toBeInTheDocument();
        expect(individualQr).toHaveClass("w-full border-blog-border");
      });
    });

    it("renders providers container correctly", () => {
      const providerContainer = screen.getByTestId(
        "floating-login-provider-container"
      );
      expect(providerContainer).toBeInTheDocument();
      expect(providerContainer).toHaveClass(
        `flex flex-col justify-center items-center gap-1 px-2 pb-2` +
          ` [&_a]:transition-colors [&_a]:duration-500` +
          ` [&_a]:flex [&_a]:justify-center [&_a]:items-center [&_a]:gap-2 [&_a]:py-1 [&_a]:px-3` +
          ` [&_a]:text-blog-foreground-readable hover:[&_a]:text-blog-foreground-readable-hover` +
          ` [&_a]:bg-opacity-50 [&_a]:rounded [&_a]:w-full`
      );

      const providerLinks = providerContainer.querySelectorAll("a");

      providerLinks.forEach((providerLink, index) => {
        expect(providerLink).toBeInTheDocument();
        expect(providerLink).toHaveTextContent(providers[index].label);
        expect(providerLink).toHaveAttribute(
          "href",
          `http://localhost:1337/api/connect/${providers[index].provider}`
        );
      });
    });

    describe("Integration Tests", () => {
      it("allows typing in email and password fields", () => {
        const emailInput = screen.getByLabelText("E-mail");
        const passwordInput = screen.getByLabelText("Senha");

        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });

        expect(emailInput).toHaveValue("test@example.com");
        expect(passwordInput).toHaveValue("password123");
      });
    });
  });

  describe("Missing Data", () => {
    it("handles missing backend URL", () => {
      delete process.env.NEXT_PUBLIC_BACKEND_URL;

      render(
        <Popover>
          <PopoverTrigger>
            <p>Children...</p>
          </PopoverTrigger>
          <PopoverLoginContent />
        </Popover>
      );

      const buttonTrigger = screen.getByRole("button");
      fireEvent.click(buttonTrigger);

      const googleLink = screen.getByText("Google");
      expect(googleLink).toHaveAttribute(
        "href",
        "http://localhost:1337/api/connect/google"
      );
    });
  });
});
