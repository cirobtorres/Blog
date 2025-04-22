"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../Shadcnui/popover";
import logout from "../../../../service/logout";
import Image from "next/image";
import PopoverLoginContent from "@/components/Authentication/PopoverLoginContent";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/Shadcnui/skeleton";
import { usePathname } from "next/navigation";

const HeaderAuthentication = ({ currentUser }: { currentUser: User }) => {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && currentUser.ok && (
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
                  // TODO: Puxar a imagem de avatar dos providers
                  src={
                    currentUser.data?.avatar
                      ? process.env.NEXT_PUBLIC_BACKEND_IP +
                        currentUser.data.avatar.url
                      : "/images/not-authenticated.png"
                  }
                  alt={
                    currentUser.data?.avatar
                      ? currentUser.data.avatar.alternativeText
                      : `Avatar de ${
                          currentUser.data?.username
                            ? currentUser.data?.username
                            : "usuário desconhecido"
                        }`
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
      {mounted && !currentUser.ok && (
        // huu = header-user-unauthenticated
        <li id="huu" data-testid="huu">
          <Popover>
            <PopoverTrigger
              id="huu-login-trigger"
              data-testid="huu-login-trigger"
              className="flex items-center rounded"
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
            <PopoverLoginContent redirectTo={pathname} align="center" />
          </Popover>
        </li>
      )}
      {!mounted && <Skeleton className="size-8 rounded-full" />}
    </>
  );
};

export default HeaderAuthentication;
