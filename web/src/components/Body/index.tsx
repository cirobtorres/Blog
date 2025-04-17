import { getUserMeLoader } from "../../service/user/user-me-loader";
import { FloatingHeader, StaticHeader } from "../Header";
import Footer from "../Footer";

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
      id="stc-body-container"
      data-testid="stc-body-container"
      className="h-full min-h-screen flex flex-col justify-between"
    >
      <StaticHeader currentUser={user} />
      <main
        id="stc-main"
        data-testid="stc-main"
        className="flex-1 flex flex-col"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export { DynamicBody, StaticBody };
