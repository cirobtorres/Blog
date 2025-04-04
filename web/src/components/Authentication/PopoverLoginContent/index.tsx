import { PopoverContent } from "@/components/Shadcnui/popover";
import { providers } from "@/config/providers";
import Link from "next/link";

const PopoverLoginContent = ({
  align = "start",
}: {
  align?: "center" | "end" | "start";
}) => {
  const emailProps = {
    label: "E-mail",
    type: "email",
    placeholder: "johndoe@email.com",
  };

  const passProps = {
    label: "Senha",
    type: "password",
  };

  return (
    <PopoverContent
      data-testid="header-user-unauthenticated-login-screen"
      align={align}
      className="shadow-xl rounded-xl max-w-60 p-0"
    >
      <div className="p-2 pb-0">
        <LoginHeader />
        <FloatingInput {...emailProps} />
        <FloatingInput {...passProps} />
        <LoginButton />
        <Or />
      </div>
      <ProviderLogin />
      <LoginFooter />
    </PopoverContent>
  );
};

const LoginHeader = () => {
  return (
    <p className="text-center text-sm border-b border-blog-border pb-2">
      Faça{" "}
      <span className="font-extrabold text-blog-foreground-readable-hover">
        LOGIN
      </span>
    </p>
  );
};

const FloatingInput = ({
  label,
  type,
  placeholder = " ",
}: {
  label: string;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
}) => {
  return (
    <fieldset className="relative mt-2 rounded border border-blog-border bg-black bg-opacity-50 group">
      <input
        id={`floating-login-${type}`}
        type={type}
        name={`login-${type}`}
        placeholder={placeholder}
        className={
          `h-full w-full text-sm` +
          ` px-2 pb-0.5 pt-4` +
          ` appearance-none border-none placeholder:text-transparent placeholder:select-none bg-transparent` +
          ` focus:placeholder:text-[hsl(0,0%,45%)]` +
          ` peer`
        }
      />
      <label
        htmlFor="floating-login-email"
        className={
          `absolute top-1/2 z-10 origin-[0] start-1 px-1 select-none` +
          ` -translate-y-5 scale-75 text-blog-foreground-highlight peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-blog-foreground-highlight` +
          ` peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-blog-foreground-readable` +
          ` text-sm pointer-events-none bg-transparent bg-opacity-50` +
          ` transform transition-top duration-100`
        }
      >
        {label}
      </label>
    </fieldset>
  );
};

const LoginButton = () => {
  return (
    <button
      type="button"
      className="w-full h-8 mt-2 bg-blog-foreground-highlight text-white bg-opacity-50 rounded"
    >
      Login
    </button>
  );
};

const Or = () => {
  return (
    <div className="relative h-6 my-4 items-center grid grid-cols-[1fr_auto_1fr]">
      <hr className="w-full border-blog-border" />
      <span className="px-2 text-sm text-[hsl(0,0%,75%)] pointer-events-none select-none">
        ou
      </span>
      <hr className="w-full border-blog-border" />
    </div>
  );
};
function ProviderLogin() {
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:1337";

  const generateProviderUrl = (provider: string) => {
    return `${backendUrl}/api/connect/${provider}`;
  };

  return (
    <div
      className={
        `flex flex-col justify-center items-center gap-1 px-2 pb-2` + // Shape
        ` [&_a]:transition-colors [&_a]:duration-500` + // Child transitions
        ` [&_a]:flex [&_a]:justify-center [&_a]:items-center [&_a]:gap-2 [&_a]:py-1 [&_a]:px-3` + // Child layout
        ` [&_a]:text-blog-foreground-readable hover:[&_a]:text-blog-foreground-readable-hover` + // Child colors
        ` [&_a]:bg-opacity-50 [&_a]:rounded [&_a]:w-full`
      }
    >
      {providers.map((provider) => (
        <Link
          key={`key-provider-${provider.provider}`}
          href={generateProviderUrl(provider.provider)}
          className="bg-opacity-50"
          style={{ backgroundColor: provider.bg || "#000" }}
        >
          {provider.label}
        </Link>
      ))}
    </div>
  );
}

const LoginFooter = () => {
  return (
    <p className="text-center text-sm p-2">
      Crie uma conta{" "}
      <Link href="/" className="text-blog-foreground-highlight">
        aqui
      </Link>
      !
    </p>
  );
};

export default PopoverLoginContent;
