import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/Editor"), {
  ssr: true,
});

export default function HomePage() {
  return <Editor />;
}
