"use server";

import Footer from "../Footer";
import { FloatingHeader, StaticHeader } from "../Header";

const DynamicBody = async ({
  documentId,
  children,
}: {
  documentId: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="h-full min-h-screen flex flex-col justify-between">
      <FloatingHeader documentId={documentId} />
      <main className="flex-1 mt-12 halftone">{children}</main>
      <Footer />
    </div>
  );
};

const StaticBody = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full min-h-screen flex flex-col justify-between">
      <StaticHeader />
      <main className="flex flex-col flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export { DynamicBody, StaticBody };
