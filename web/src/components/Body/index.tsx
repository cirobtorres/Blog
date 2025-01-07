import Header from "../Header";

export default function BodyComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full min-h-screen flex flex-col justify-between">
      <Header />
      <div className="h-full mt-12">{children}</div>
      {/* <footer className="shrink-0 mt-auto mb-0 h-60 bg-blog-dark-widgets" /> */}
    </div>
  );
}
