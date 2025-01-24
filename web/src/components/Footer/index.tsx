import Link from "next/link";

const Footer = () => {
  return (
    <footer className="shrink-0 h-60 border-t border-blog-border bg-blog-background-2">
      <div className="relative h-full flex flex-col justify-center items-center mx-auto max-w-screen-2xl">
        <div className="w-full max-w-44 h-1 absolute inline-grid left-1/2 -translate-x-1/2 top-8">
          <div className="h-full col-start-1 row-start-1 bg-gradient-to-r from-transparent to-blog-foreground-highlight blur-xl rounded-full" />
          <div className="h-full col-start-1 row-start-1 bg-gradient-to-r from-transparent to-blog-foreground-highlight rounded-full" />
        </div>
        <p className="max-w-[75%] text-center text-wrap text-sm">
          Would you like to address any issue you&apos;ve found within this
          site?
          <br />
          Source code here!{" "}
          <Link
            href="https://github.com/cirobtorres/blog"
            className="transition-colors duration-500 text-blog-foreground-highlight hover:text-blog-foreground-readable-hover break-words"
          >
            https://github.com/cirobtorres/blog
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
