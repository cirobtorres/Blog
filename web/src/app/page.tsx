"use server";

import BodyComponent from "../components/Body";
import Cards, { LoadingCards } from "../components/Cards";
import { Suspense } from "react";

export default async function HomePage() {
  return (
    <BodyComponent>
      <main className="h-full">
        <Suspense fallback={<LoadingCards />}>
          <Cards />
        </Suspense>
      </main>
    </BodyComponent>
  );
}
