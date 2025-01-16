"use server";

import { HomeBody } from "../components/Body";
import Cards, { LoadingCards } from "../components/Cards";
import { Suspense } from "react";

export default async function HomePage() {
  return (
    <HomeBody>
      <Suspense fallback={<LoadingCards />}>
        <Cards />
      </Suspense>
    </HomeBody>
  );
}
