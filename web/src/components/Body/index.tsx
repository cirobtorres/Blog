import { getUserMeLoader } from "../../service/user-me-loader";
import Footer from "../Footer";
import { FloatingHeader, StaticHeader } from "../Header";

const DynamicBody = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUserMeLoader();
  return (
    <div className="h-full min-h-screen flex flex-col justify-between">
      <FloatingHeader currentUser={user} />
      <main className="flex-1 mt-12">{children}</main>
      <Footer />
    </div>
  );
};

const StaticBody = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUserMeLoader();
  return (
    <div className="h-full min-h-screen flex flex-col justify-between">
      <StaticHeader currentUser={user} />
      <main className="flex flex-col flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export { DynamicBody, StaticBody };
