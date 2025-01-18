"use server";

import { StaticBody } from "../components/Body";
import Cards, { LoadingCards } from "../components/Cards";
import { Suspense } from "react";

export default async function HomePage() {
  return (
    <StaticBody>
      <Suspense fallback={<LoadingCards />}>
        <Cards />
      </Suspense>
    </StaticBody>
  );
}
