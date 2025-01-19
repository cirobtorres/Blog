"use server";

import Image from "next/image";
// import Image from "next/image";
import { StaticBody } from "../../components/Body";
import { getAbout } from "../../lib/about";

export default async function AboutMePage() {
  const { data: about } = await getAbout();

  return (
    <StaticBody>
      <section className="h-full max-w-screen-2xl mx-auto">
        <A />
      </section>
    </StaticBody>
  );
}

const A = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div
        className={`
          relative size-44 rounded-full 
          before:content-[''] before:absolute before:w-[calc(100%_+_6px)] before:h-[calc(100%_+_6px)] 
          before:rounded-full before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 
          before:-z-[1] before:opacity-50 before:blur-xl before:bg-blog-moving-gradient before:animate-border-spin 
          after:content-[''] after:absolute after:w-full after:h-full 
          after:rounded-full after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 
          after:-z-[1] after:bg-blog-moving-gradient after:animate-border-spin 
        `}
      >
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <Image
            src="https://placehold.co/160x160/png"
            alt="Foto de perfil de fulano de tal"
            fill
            sizes="176px"
            className="p-1 rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

const FlowingPipe = () => {
  return (
    <div className="relative max-w-[50%]">
      <svg
        width="100%"
        viewBox="0 0 2673 395"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
      >
        <path
          d="M0 2H977.508V103H1651.39V59H2074.26V2H2678"
          stroke="#252525"
          strokeWidth="6"
        />
      </svg>
      <svg
        width="100%"
        viewBox="0 0 2673 395"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
      >
        <defs>
          <linearGradient id="gradient">
            <stop offset="0" stopColor="white" stopOpacity="0" />
            <stop offset="0.8" stopColor="white" stopOpacity="1" />
            <stop offset="0.8" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="gradient-mask">
            <rect
              className="animate-mask-rect"
              x="-50%"
              y="0"
              width="12.5%"
              height="100%"
              fill="url(#gradient)"
            />
          </mask>
        </defs>
        <path
          d="M0 2H977.508V103H1651.39V59H2074.26V2H2678"
          // stroke="#1F1F1F"
          strokeWidth="6"
          mask="url(#gradient-mask)"
          className="stroke-blog-foreground-highlight"
        />
      </svg>
    </div>
  );
};
