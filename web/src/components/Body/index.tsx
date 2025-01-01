export default function BodyComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full min-h-screen flex flex-col justify-between">
      <header className="mt-0 mb-auto h-14 bg-blog-dark-widgets" />
      {children}
      <footer className="mt-auto mb-0 h-60 bg-blog-dark-widgets" />
    </div>
  );
}
