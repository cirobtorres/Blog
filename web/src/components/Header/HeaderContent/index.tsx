import Link from "next/link";
import BlogNavigationMenu from "./BlogNavigationMenu";
import DarkModeToggle from "./DarkModeToggle";
import SheetMenu from "./SheetMenu";
import SearchBar from "./SearchBar";
import Image from "next/image";
import HeaderAuthentication from "./HeaderAuthentication";
import GitHubLink from "./GitHubLink";

const HeaderContent = ({ currentUser }: { currentUser: User }) => {
  return (
    <div data-testid="header-content" className="h-full px-4">
      <nav className="w-full h-full grid grid-cols-[minmax(40px,1fr)_repeat(11,minmax(0,1fr))] items-center gap-4 justify-between max-w-screen-2xl mx-auto">
        <div
          className={
            `h-full` +
            ` flex items-center gap-4` +
            ` col-span-3 max-[1000px]:col-span-1` // column grid control
          }
        >
          <div className="flex items-center justify-between max-[1000px]:hidden">
            <Link
              href="/"
              data-testid="header-content-logo-link"
              aria-labelledby="Logo com link de voltar para home"
              className={
                `h-full` +
                ` flex items-center justify-between` +
                ` uppercase font-extrabold text-sm text-blog-foreground-readable hover:text-blog-foreground-readable-hover rounded` +
                ` transition-colors duration-500` +
                ` focus-visible:outline focus-visible:outline-2 focus-visible:outline-blog-foreground-readable-hover`
              }
            >
              <Image
                // TODO: adicionar uma logo ao Global
                src="/images/logo.png"
                alt="Logo"
                width={40}
                height={40}
              />
            </Link>
          </div>
          <BlogNavigationMenu />
          <SheetMenu />
        </div>
        <div
          className={
            ` flex justify-center` +
            ` col-span-6 max-[1000px]:col-span-9 max-[785px]:col-span-11 w-full mx-auto` // column grid control
          }
        >
          <SearchBar />
        </div>
        <ul
          className={
            `h-full` +
            ` flex items-center justify-end gap-1` +
            ` col-span-3 max-[1000px]:col-span-2` + // column grid control
            ` max-[785px]:col-span-0 max-[785px]:hidden`
          }
        >
          <HeaderAuthentication currentUser={currentUser} />
          <li className="flex justify-center items-center">
            <GitHubLink />
          </li>
          <li className="flex justify-center items-center">
            <DarkModeToggle />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HeaderContent;
