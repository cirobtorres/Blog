"use server";

import convertMarkdowToHtmlString from "../../functions/markdown";
import { getGlobal } from "../../lib/global";
import Footer from "../Footer";
import Header from "../Header";

export default async function BodyComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    data: { footer },
  } = await getGlobal();
  const footerHtml = (await convertMarkdowToHtmlString(footer)).replace(
    /<a(?![^>]*\btarget=)([^>]*)>/gi,
    '<a target="_blank"$1>'
  );

  return (
    <div className="h-full min-h-screen flex flex-col justify-between">
      <Header />
      <div className="flex-1 mt-12">{children}</div>
      {global && <Footer footerData={footerHtml} />}
    </div>
  );
}
