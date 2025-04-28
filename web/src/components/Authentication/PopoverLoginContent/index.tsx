import Link from "next/link";
import { useActionState } from "react";
import { CommentLoadingSpinning } from "@/components/Comments/CommentLoading";
import { PopoverContent } from "@/components/Shadcnui/popover";
import { providers } from "@/config/providers";
import { loginEmail } from "@/service/login";
import { usePathname } from "next/navigation";

const PopoverLoginContent = ({
  align = "start",
}: {
  align?: "center" | "end" | "start";
}) => {
  const pathname = usePathname();
  return (
    <PopoverContent
      // huu = header-user-unauthenticated
      id="huu-login-screen"
      data-testid="huu-login-screen"
      align={align}
      className="shadow-xl rounded-xl max-w-96 p-0"
    >
      <div className="p-2 pb-0">
        <LoginEmail redirectTo={pathname} />
        <Or />
      </div>
      <ProviderLogin />
      <LoginFooter />
    </PopoverContent>
  );
};

interface PrevState {
  errors: {
    email?: string[] | undefined;
    password?: string[] | undefined;
    login?: string | undefined;
  };
}

const initialState = {
  errors: {
    email: undefined,
    password: undefined,
    login: undefined,
  },
};

const LoginEmail = ({ redirectTo }: { redirectTo: string }) => {
  const [state, action, pending] = useActionState(
    (state: PrevState | undefined, formData: FormData) => {
      formData.set("redirectTo", redirectTo);
      return loginEmail(state || initialState, formData);
    },
    initialState
  );

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
    <form action={action}>
      <p
        id="huu-login-header"
        data-testid="huu-login-header"
        className="text-center text-sm border-b border-blog-border pb-2"
      >
        Faça{" "}
        <span className="font-extrabold text-blog-foreground-readable-hover">
          LOGIN
        </span>
      </p>
      <FloatingInput {...emailProps} />
      <p className="pl-1 text-sm text-red-500">{state?.errors?.email}</p>
      <FloatingInput {...passProps} />
      <p className="pl-1 text-sm text-red-500">{state?.errors?.password}</p>
      <LoginButton label="Login" pending={pending} />
      <p className="w-fit mt-1 mx-auto text-sm text-red-500">
        {state?.errors?.login}
      </p>
    </form>
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
    <fieldset
      id={`floating-login-${type}-container`}
      data-testid={`floating-login-${type}-container`}
      className="relative mt-2 rounded border border-blog-border bg-blog-background-backdrop group"
    >
      <input
        id={`floating-login-${type}-input`}
        data-testid={`floating-login-${type}-input`}
        type={type}
        name={`login-${type}`}
        placeholder={placeholder}
        className={
          `h-full w-full text-sm` +
          ` px-2 pb-0.5 pt-4` +
          ` appearance-none border-none placeholder:text-transparent placeholder:select-none bg-transparent` +
          ` focus:placeholder:text-[hsl(0,0%,10%)]` +
          ` peer`
        }
      />
      <label
        id={`floating-login-${type}-label`}
        data-testid={`floating-login-${type}-label`}
        htmlFor={`floating-login-${type}-input`}
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

const LoginButton = ({
  label,
  pending,
}: {
  label: string;
  pending: boolean;
}) => {
  return (
    <button
      type="submit"
      disabled={pending}
      className={
        `w-full h-8 mt-2` +
        ` rounded` +
        ` text-white` +
        ` bg-blog-foreground-highlight bg-opacity-50`
      }
    >
      {pending ? <CommentLoadingSpinning /> : label}
    </button>
  );
};

const Or = () => {
  return (
    <div
      id={`floating-login-or`}
      data-testid={`floating-login-or`}
      className="relative h-6 my-4 items-center grid grid-cols-[1fr_auto_1fr]"
    >
      <hr className="w-full border-blog-border" />
      <span className="px-2 text-sm text-[hsl(0,0%,75%)] pointer-events-none select-none">
        ou
      </span>
      <hr className="w-full border-blog-border" />
    </div>
  );
};

// function ProviderLogin({ redirectTo }: { redirectTo: string }) {
function ProviderLogin() {
  // Do NEVER switch URL localhost for IP 127.0.0.1
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:1337";

  const generateProviderUrl = (provider: string) => {
    // Redirect does not work for providers
    // Strapi ignores redirect params
    // The redirect for a provider is hardcoded
    // return `${backendUrl}/api/connect/${provider}/redirect?redirect=${encodeURIComponent(
    //   redirectTo
    // )}`;
    return `${backendUrl}/api/connect/${provider}`;
  };

  return (
    <div
      id={`floating-login-provider-container`}
      data-testid={`floating-login-provider-container`}
      className={
        `flex flex-col justify-center items-center gap-1 px-2 pb-2` +
        ` [&_a]:transition-colors [&_a]:duration-500` +
        ` [&_a]:flex [&_a]:justify-center [&_a]:items-center [&_a]:gap-2 [&_a]:py-1 [&_a]:px-3` +
        ` [&_a]:w-full [&_a]:rounded [&_a]:bg-opacity-50`
      }
    >
      {providers.map((element) => (
        <Link
          id={`key-provider-${element.provider}`}
          data-testid={`key-provider-${element.provider}`}
          key={`key-provider-${element.provider}`}
          href={generateProviderUrl(element.provider)}
          style={{
            color: element.text || "var(--blog-foreground-readable)",
            backgroundColor: element.bg || "var(--blog-background-3)",
          }}
        >
          {element.label}
        </Link>
      ))}
    </div>
  );
}

const LoginFooter = () => {
  return (
    <p
      id="huu-login-footer"
      data-testid="huu-login-footer"
      className="text-center text-sm p-2"
    >
      Crie uma conta{" "}
      <Link href="/" className="text-blog-foreground-highlight">
        aqui
      </Link>
      !
    </p>
  );
};

export default PopoverLoginContent;
