"use server";

import { StaticBody } from "../../components/Body";
import { getAbout } from "../../lib/about";

export default async function AboutMePage() {
  const { data: about } = await getAbout();

  return (
    <StaticBody>
      <section className="flex w-full h-full"></section>
    </StaticBody>
  );
}

// const ImageBackground = () => {
//   return (
//     <div className="h-full flex items-center justify-center">
//       <div
//         className={`
//           relative size-44 rounded-full
//           before:content-[''] before:absolute before:w-[calc(100%_+_6px)] before:h-[calc(100%_+_6px)]
//           before:rounded-full before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2
//           before:-z-[1] before:opacity-50 before:blur-xl before:bg-blog-moving-gradient before:animate-border-spin
//           after:content-[''] after:absolute after:w-full after:h-full
//           after:rounded-full after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2
//           after:-z-[1] after:bg-blog-moving-gradient after:animate-border-spin
//         `}
//       >
//         <div className="absolute inset-0 rounded-full overflow-hidden">
//           <Image
//             src="https://placehold.co/160x160/png"
//             alt="Foto de perfil de fulano de tal"
//             fill
//             sizes="176px"
//             className="p-1 rounded-full object-cover"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
