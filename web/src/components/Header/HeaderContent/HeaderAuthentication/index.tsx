"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../Shadcnui/popover";
import logout from "../../../../service/logout";
import Image from "next/image";
import PopoverLoginContent from "@/components/Authentication/PopoverLoginContent";

const HeaderAuthentication = ({ currentUser }: { currentUser: User }) => {
  return (
    <>
      {currentUser.ok && (
        // hua = header-user-authenticated
        <li
          id="hua"
          data-testid="hua"
          className="flex justify-center items-center"
        >
          <Popover>
            <PopoverTrigger
              id="hua-logout-trigger"
              data-testid="hua-logout-trigger"
              aria-haspopup="true"
              aria-controls="logout-popover-content"
            >
              <div className="relative flex size-8 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={
                    "/images/not-authenticated.png"
                    // author.avatar
                    //   ? `http://127.0.0.1:1337${author.avatar.url}`
                    // : "/images/not-authenticated.png"
                  }
                  alt={
                    ""
                    // author.avatar
                    // ? author.avatar.alternativeText
                    // : `Avatar de ${author.name}`
                  }
                  fill
                  sizes="(max-width: 40px) 100vw"
                  className="transition-all duration-500 absolute object-cover group-hover:brightness-50"
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-0 overflow-hidden">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  logout();
                }}
              >
                <button
                  data-testid="hua-logout-button"
                  type="submit"
                  className={
                    `w-full px-4 py-2 text-left cursor-pointer transition-all duration-300` +
                    ` text-blog-foreground-readable hover:text-blog-foreground-readable-hover` +
                    ` hover:bg-blog-background-backdrop-hover`
                  }
                >
                  Sair
                </button>
              </form>
            </PopoverContent>
          </Popover>
        </li>
      )}
      {!currentUser.ok && (
        // huu = header-user-unauthenticated
        <li id="huu" data-testid="huu">
          <Popover>
            <PopoverTrigger
              id="huu-login-trigger"
              data-testid="huu-login-trigger"
              className="flex items-center p-0.5 rounded"
            >
              <div className="relative flex size-8 shrink-0 overflow-hidden rounded-full">
                <Image
                  src="/images/not-authenticated.png"
                  alt="Usuário anônimo"
                  fill
                  sizes="(max-width: 40px) 100vw"
                  className="transition-all duration-500 absolute object-cover group-hover:brightness-50"
                />
              </div>
            </PopoverTrigger>
            <PopoverLoginContent align="center" />
          </Popover>
        </li>
      )}
    </>
  );
};

export default HeaderAuthentication;
