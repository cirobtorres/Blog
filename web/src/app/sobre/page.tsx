"use server";

import Image from "next/image";
import { StaticBody } from "../../components/Body";
import { getAbout } from "../../service/about";
import AboutContent from "@/components/About";
import { cn } from "@/utils/clsx";

export default async function AboutMePage() {
  const { data: about } = await getAbout();

  return (
    <StaticBody>
      <section className="flex flex-col w-full h-full max-w-screen-2xl mx-auto gap-4">
        <AboutHeaderWrapper {...about} />
        <AboutContent about={about} />
      </section>
    </StaticBody>
  );
}

const AboutHeader = (about: About) => {
  return (
    <div className="mt-12 flex flex-col flex-start">
      <SpinningLightAuthorAvatar about={about} size="size-72" />
      {about.display_name && (
        <div className="text-center">
          <p className="font-extrabold text-3xl">{about.display_name}</p>
        </div>
      )}
    </div>
  );
};

const AboutHeaderWrapper = (about: About) => {
  return (
    <>
      {about.title && (
        <div className="flex flex-col items-center w-full text-6xl font-extrabold blog-center-content blog-margin">
          <AboutHeader {...about} />
          <h1>{about.title}</h1>
        </div>
      )}
      {!about.title && <AboutHeader {...about} />}
    </>
  );
};

const SpinningLightAuthorAvatar = ({
  about,
  size,
}: {
  about: About;
  size?: string;
}) => {
  return (
    <div className="h-full flex items-center justify-center">
      <div
        className={cn(
          `
          relative size-44 rounded-full
          before:content-[''] before:absolute before:w-[calc(100%_+_6px)] before:h-[calc(100%_+_6px)]
          before:rounded-full before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2
          before:-z-[1] before:opacity-50 before:blur-xl before:bg-blog-moving-gradient before:animate-border-spin
          after:content-[''] after:absolute after:w-full after:h-full
          after:rounded-full after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2
          after:-z-[1] after:bg-blog-moving-gradient after:animate-border-spin
        `,
          size
        )}
      >
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <Image
            src={
              (about.media?.url &&
                process.env.NEXT_PUBLIC_BACKEND_IP + about.media?.url) ||
              "/images/not-authenticated.png"
            }
            alt={
              about.media
                ? about.media.alternativeText
                : about.display_name
                ? `"Foto de perfil do autor de ${about.display_name}`
                : "Foto de perfil do autor do blog"
            }
            fill
            sizes="176px"
            className="p-1 rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
