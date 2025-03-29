import Link from "next/link";

export default function ProviderLogin() {
  // const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:1337";

  const googlePath = "http://localhost:1337/api/connect/google";
  const facebookPath = "http://localhost:1337/api/connect/facebook";
  const githubPath = `http://localhost:1337/api/connect/github?state=${encodeURIComponent(
    JSON.stringify({
      redirect: window.location.href,
    })
  )}`;
  const discordPath = "http://localhost:1337/api/connect/discord";
  const redditPath = "http://localhost:1337/api/connect/reddit";

  console.log(githubPath);

  return (
    <div
      className={
        `flex flex-col justify-center items-center gap-1 py-2` + // Shape
        ` [&_a]:transition-colors [&_a]:duration-500` + // Child transitions
        ` [&_a]:flex [&_a]:justify-center [&_a]:items-center [&_a]:gap-2 [&_a]:py-1 [&_a]:px-3` + // Child layout
        ` [&_a]:text-blog-foreground-readable hover:[&_a]:text-blog-foreground-readable-hover` // Child colors
      }
    >
      <Link href={new URL(googlePath).href}>Google</Link>
      <Link href={new URL(facebookPath).href}>Meta</Link>
      <Link href={new URL(githubPath).href}>Github</Link>
      <Link href={new URL(discordPath).href}>Discord</Link>
      <Link href={new URL(redditPath).href}>Reddit</Link>
    </div>
  );
}
