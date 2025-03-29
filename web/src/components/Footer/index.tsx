import { getAbout } from "@/service/about";
import Link from "next/link";

const Footer = async () => {
  const {
    data: { github_blog_link: link },
  } = await getAbout();
  return (
    <footer
      data-testid="footer"
      aria-label="Footer com link do código fonte"
      className="shrink-0 h-60 border-y border-blog-border bg-blog-background-2"
    >
      <div className="h-full flex flex-col justify-center items-center gap-4 mx-auto max-w-screen-2xl">
        <div className="flex justify-center">
          <p
            data-testid="footer-paragraph"
            className="max-w-[75%] text-center text-wrap text-sm"
          >
            Encontrou algum mau funcionamento neste site?
            <br />
            <Link
              data-testid="footer-link"
              href={link || "/"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Repositório do Github para o código fonte do blog"
              className="break-words transition-colors duration-500 text-blog-foreground-highlight hover:text-blog-foreground-readable-hover"
            >
              {link || "/"}
            </Link>
          </p>
        </div>
        <div className="w-full max-w-44 h-1 inline-grid">
          <div className="h-full col-start-1 row-start-1 bg-gradient-to-r from-transparent to-blog-foreground-highlight blur-lg rounded-full" />
          <div className="h-full col-start-1 row-start-1 bg-gradient-to-r from-transparent to-blog-foreground-highlight rounded-full" />
        </div>
      </div>
      <div className="py-1">
        <p className="text-center text-xs text-[#5a5a5a]">
          Powered by Strapi & Next.js
        </p>
      </div>
    </footer>
  );
};

export default Footer;
