import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/Shadcnui/tooltip";
import Link from "next/link";
import { IoLogoGithub } from "react-icons/io";
import { getAbout } from "@/service/about";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/Shadcnui/skeleton";

const GitHubLink = () => {
  const [link, setLink] = useState("/");
  const [loading, setLoading] = useState(true);

  async function searchLink() {
    try {
      setLoading(true);
      const { data } = await getAbout();
      if (data && data.github_link) setLink(data.github_link);
    } catch (error) {
      console.error("GitHubLink component error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    searchLink();
  }, []);

  return loading ? (
    <Skeleton
      aria-label="Carregando botão de link do github"
      className="size-8 rounded-full"
    />
  ) : (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          asChild
          className="rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-blog-foreground-readable-hover"
        >
          <Link
            data-testid="header-content-github-link"
            href={link}
            target="_blank"
          >
            <IoLogoGithub className="size-8" />
          </Link>
        </TooltipTrigger>
        <TooltipContent role="tooltip">
          <p data-testid="dark-mode-toggle-tooltip-text">{link}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default GitHubLink;
