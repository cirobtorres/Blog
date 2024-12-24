import dynamic from "next/dynamic";

const BlogEditor = dynamic(() => import("@/components/BlogEditor"), {
  ssr: true,
});

export default function HomePage() {
  return <BlogEditor />;
}
