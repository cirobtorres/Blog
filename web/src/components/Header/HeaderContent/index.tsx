import Link from "next/link";
import { IoLogoGithub } from "react-icons/io";
import BlogNavigationMenu from "./BlogNavigationMenu";
import DarkModeToggle from "./DarkModeToggle";
import SheetMenu from "./SheetMenu";
import SearchBar from "../SearchBar";

const HeaderContent = () => {
  return (
    <div className="h-full px-4 outline outline-[1px] outline-blog-border">
      <nav className="w-full h-full flex items-center gap-4 justify-between max-w-screen-2xl mx-auto">
        <div className="h-full flex items-center gap-4">
          <div className="flex items-center justify-between max-[800px]:hidden">
            <Link
              href="/"
              className="flex items-center justify-between text-sm uppercase font-extrabold h-full transition-colors duration-500 text-blog-foreground-readable hover:text-blog-foreground-readable-hover"
            >
              HOME
            </Link>
          </div>
          <BlogNavigationMenu />
          <SheetMenu />
        </div>
        <div className="flex w-full max-w-[600px] mx-auto">
          <SearchBar />
        </div>
        <ul className="h-full flex items-center justify-end gap-2 max-[500px]:hidden">
          <li>
            <Link href="https://github.com/cirobtorres" target="_blank">
              <IoLogoGithub className="size-7" />
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
