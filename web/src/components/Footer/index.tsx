import Link from "next/link";

const Footer = () => {
  return (
    <footer
      data-testid="footer"
      aria-label="Footer com link do código fonte"
      className="shrink-0 h-60 border-t border-blog-border bg-blog-background-2"
    >
      <div className="relative h-full flex flex-col justify-center items-center mx-auto max-w-screen-2xl">
        <div className="w-full max-w-44 h-1 absolute inline-grid left-1/2 -translate-x-1/2 top-8">
          <div className="h-full col-start-1 row-start-1 bg-gradient-to-r from-transparent to-blog-foreground-highlight blur-xl rounded-full" />
          <div className="h-full col-start-1 row-start-1 bg-gradient-to-r from-transparent to-blog-foreground-highlight rounded-full" />
        </div>
        <p
          data-testid="footer-paragraph"
          className="max-w-[75%] text-center text-wrap text-sm"
        >
          Encontrou algum mau funcionamento neste site?
          <br />
          <Link
            href="https://github.com/cirobtorres/blog"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Repositório do Github para o código fonte do blog"
            className="break-words transition-colors duration-500 text-blog-foreground-highlight hover:text-blog-foreground-readable-hover"
          >
            https://github.com/cirobtorres/blog
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
