"use server";

import { StaticBody } from "../../components/Body";

export default async function AboutMePage() {
  return (
    <StaticBody>
      <section className="max-w-screen-2xl mx-auto">
        <p>Sobre</p>
      </section>
    </StaticBody>
  );
}
