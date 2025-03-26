import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaRedditAlien } from "react-icons/fa";

export default function ProviderLogin() {
  // const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:1337";
  const googlePath = "http://localhost:1337/api/connect/google";
  const githubPath = "http://localhost:1337/api/connect/github";
  const discordPath = "http://localhost:1337/api/connect/discord";
  const redditPath = "http://localhost:1337/api/connect/reddit";

  return (
    <div className="flex flex-col justify-center items-center gap-1 py-6 [&_a]:transition-colors [&_a]:duration-500 [&_a]:flex [&_a]:items-center [&_a]:gap-2 [&_a]:text-blog-foreground-readable hover:[&_a]:text-blog-foreground-readable-hover">
      <Link
        href={new URL(googlePath).href}
        className="rounded py-1 px-3 hover:bg-blog-border focus-visible:bg-blog-border"
      >
        <FaGoogle className="size-5" /> Google
      </Link>
      <Link
        href={new URL(githubPath).href}
        className="rounded py-1 px-3 hover:bg-blog-border focus-visible:bg-blog-border"
      >
        <FaGithub className="size-5" /> Github
      </Link>
      <Link
        href={new URL(discordPath).href}
        className="rounded py-1 px-3 hover:bg-blog-border focus-visible:bg-blog-border"
      >
        <FaDiscord className="size-5" /> Discord
      </Link>
      <Link
        href={new URL(redditPath).href}
        className="rounded py-1 px-3 hover:bg-blog-border focus-visible:bg-blog-border"
      >
        <FaRedditAlien className="size-5" /> Reddit
      </Link>
    </div>
  );
}
