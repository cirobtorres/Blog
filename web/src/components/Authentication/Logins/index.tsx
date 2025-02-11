import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

export default function ProviderLogin() {
  // const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:1337";
  const googlePath = "http://localhost:1337/api/connect/google";
  const githubPath = "http://localhost:1337/api/connect/github";

  return (
    <form className="flex justify-center gap-4 [&_a]:transition-colors [&_a]:duration-500 [&_a]:flex [&_a]:items-center [&_a]:gap-2 hover:[&_a]:text-blog-foreground-readable-hover">
      <Link href={new URL(googlePath).href}>
        <FaGoogle /> Google
      </Link>
      <Link href={new URL(githubPath).href}>
        <FaGithub /> Github
      </Link>
    </form>
  );
}
