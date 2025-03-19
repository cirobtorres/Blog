import Link from "next/link";
import { IoLogoGithub } from "react-icons/io";
import BlogNavigationMenu from "./BlogNavigationMenu";
import DarkModeToggle from "./DarkModeToggle";
import SheetMenu from "./SheetMenu";
import SearchBar from "../SearchBar";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../Shadcnui/tooltip";
import HeaderAuthentication from "./HeaderAuthentication";

const HeaderContent = ({ currentUser }: { currentUser: User }) => {
  return (
    <div
      data-testid="header-content"
      className="h-full px-4 outline outline-[1px] outline-blog-border"
    >
      <nav className="w-full h-full grid grid-cols-12 items-center gap-4 justify-between max-w-screen-2xl mx-auto">
        <div className="col-span-3 h-full flex items-center gap-4 max-[1000px]:col-span-2">
          <div className="flex items-center justify-between max-[1000px]:hidden">
            <Link
              href="/"
              data-testid="header-content-logo-link"
              className="flex items-center justify-between text-sm uppercase font-extrabold h-full transition-colors duration-500 text-blog-foreground-readable hover:text-blog-foreground-readable-hover"
            >
              <Image src="/images/logo.png" alt="logo" width={48} height={48} />
            </Link>
          </div>
          <BlogNavigationMenu />
          <SheetMenu />
        </div>
        <div className="w-full col-span-6 max-[1000px]:col-span-8 max-[650px]:col-span-10">
          <SearchBar />
        </div>
        <ul className="col-span-3 h-full flex items-center gap-4 justify-end max-[1000px]:col-span-2 max-[650px]:hidden max-[650px]:col-span-0">
          <HeaderAuthentication currentUser={currentUser} />
          <li>
            <Link
              data-testid="header-content-github-link"
              href="https://github.com/cirobtorres"
              target="_blank"
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    asChild
                    className="outline-blog-foreground-highlight focus:outline-blog-foreground-highlight"
                  >
                    <IoLogoGithub className="size-8" />
                  </TooltipTrigger>
                  <TooltipContent role="tooltip">
                    <p data-testid="dark-mode-toggle-tooltip-text">
                      https://github.com/cirobtorres
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
          </li>
          <li className="flex justify-center items-center h-full">
            <DarkModeToggle />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HeaderContent;
