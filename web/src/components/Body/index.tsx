import { getUserMeLoader } from "../../service/user-me-loader";
import Footer from "../Footer";
import { FloatingHeader, StaticHeader } from "../Header";

const DynamicBody = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUserMeLoader();
  return (
    <div
      id="dyn-body-container"
      data-testid="dyn-body-container"
      className="h-full min-h-screen flex flex-col justify-between"
    >
      <FloatingHeader currentUser={user} />
      <main id="dyn-main" data-testid="dyn-main" className="flex-1 mt-12">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const StaticBody = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUserMeLoader();
  return (
    <div
      id="stc-container"
      data-testid="stc-container"
      className="h-full min-h-screen flex flex-col justify-between"
    >
      <StaticHeader currentUser={user} />
      <main
        id="stc-main"
        data-testid="stc-main"
        className="flex flex-col flex-1"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export { DynamicBody, StaticBody };
