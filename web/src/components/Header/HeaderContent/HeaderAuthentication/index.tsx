"use client";

import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../../Shadcnui/hover-card";
import { formatDateMonthAndYear } from "../../../../utils/dates";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../Shadcnui/popover";
import logout from "../../../../service/logout";
import Image from "next/image";

const HeaderAuthentication = ({ currentUser }: { currentUser: User }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return (
    <>
      {currentUser.ok && (
        <HoverCard>
          <HoverCardTrigger>
            <li
              data-testid="header-user-authenticated"
              className="flex justify-center items-center"
            >
              <Popover onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger>
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
                  <form action={logout}>
                    <button
                      type="submit"
                      className="w-full px-4 py-2 text-left cursor-pointer transition-all duration-300 text-blog-foreground-readable hover:text-blog-foreground-readable-hover hover:bg-[hsl(0,0%,14.9%,0.75)]"
                    >
                      Sair
                    </button>
                  </form>
                </PopoverContent>
              </Popover>
            </li>
          </HoverCardTrigger>
          {!isPopoverOpen && (
            <HoverCardContent className="w-full max-w-80">
              <div className="flex gap-2">
                <div className="mt-1 relative size-10 shrink-0 mx-auto overflow-hidden rounded-full">
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
                <div className="flex-1 flex flex-col gap-1">
                  <p className="text-blog-foreground-highlight">
                    @{currentUser.data?.username}
                  </p>
                  <time>
                    <small className="flex gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-calendar-arrow-up inline-block"
                      >
                        <path d="m14 18 4-4 4 4" />
                        <path d="M16 2v4" />
                        <path d="M18 22v-8" />
                        <path d="M21 11.343V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9" />
                        <path d="M3 10h18" />
                        <path d="M8 2v4" />
                      </svg>
                      {formatDateMonthAndYear(
                        currentUser.data?.createdAt as string
                      )}
                    </small>
                  </time>
                </div>
              </div>
            </HoverCardContent>
          )}
        </HoverCard>
      )}
      {!currentUser.ok && (
        <li data-testid="header-user-unauthenticated">
          <button className="w-20 h-9 font-extrabold text-xs uppercase transition-colors duration-500 hover:bg-[hsl(0,0%,14.9%,0.75)] focus-visible:bg-[hsl(0,0%,14.9%,0.75)] hover:text-blog-foreground-readable-hover rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-blog-foreground-readable-hover">
            Login
          </button>
        </li>
      )}
    </>
  );
};

export default HeaderAuthentication;
