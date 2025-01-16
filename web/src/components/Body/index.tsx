"use server";

import Footer from "../Footer";
import { FloatingHeader, StaticHeader } from "../Header";

const ArticleBody = async ({
  documentId,
  children,
}: {
  documentId: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="h-full min-h-screen flex flex-col justify-between">
      <FloatingHeader documentId={documentId} />
      <main className="flex-1 mt-12">{children}</main>
      <Footer />
    </div>
  );
};

const HomeBody = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full min-h-screen flex flex-col justify-between">
      <StaticHeader />
      <main className="h-full flex-1 mb-20">{children}</main>
      <Footer />
    </div>
  );
};

export { ArticleBody, HomeBody };
