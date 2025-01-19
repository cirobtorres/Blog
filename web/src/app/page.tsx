"use server";

import { StaticBody } from "../components/Body";
import Cards from "../components/Cards";
import { Suspense } from "react";
import { Skeleton } from "../components/Shadcnui/skeleton";

export default async function HomePage() {
  return (
    <StaticBody>
      <Suspense fallback={<LoadingCards />}>
        <Cards />
      </Suspense>
    </StaticBody>
  );
}

const LoadingCards = () => {
  return (
    <>
      <div className="relative max-w-screen-2xl mx-auto h-[400px] flex items-center mb-10">
        <Skeleton className="w-full h-full rounded" />
      </div>
      <div className="max-w-screen-2xl mx-auto flex items-center mb-10">
        <ul className="w-full grid grid-cols-3 max-[800px]:grid-cols-2 max-[500px]:grid-cols-1 gap-4">
          {Array.from({ length: 3 }, (_, key) => key).map((_, key: number) => (
            <li key={key}>
              <Skeleton className="w-full h-[200px] mb-2 rounded" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
