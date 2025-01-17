import { Suspense } from "react";
import { getGlobal } from "../../lib/global";
import { Skeleton } from "../shadcnui/skeleton";
import convertMarkdowToHtmlString from "../../utils/markdown";

const Footer = async () => {
  const {
    data: { footer },
  } = await getGlobal();
  const footerHtml = (await convertMarkdowToHtmlString(footer)).replace(
    /<a(?![^>]*\btarget=)([^>]*)>/gi,
    '<a target="_blank"$1>'
  );

  return (
    <footer className="shrink-0 h-60 bg-blog-background-2">
      <Suspense fallback={<FooterSkeleton />}>
        <div
          dangerouslySetInnerHTML={{ __html: footerHtml }}
          className="h-full flex flex-col justify-center items-center mx-auto max-w-screen-2xl text-base max-[500px]:text-xs [&_a]:text-blog-foreground-highlight"
        />
      </Suspense>
    </footer>
  );
};

const FooterSkeleton = () => {
  return (
    <div className="h-full flex flex-col gap-2 justify-center items-center mx-auto max-w-screen-2xl">
      <Skeleton className="w-96 h-4" />
      <Skeleton className="w-96 h-4" />
    </div>
  );
};

export default Footer;
