export default function Footer({ footerData }: { footerData: string }) {
  return (
    <footer className="shrink-0 h-60 bg-blog-background-2">
      <div
        dangerouslySetInnerHTML={{ __html: footerData }}
        className="h-full flex flex-col justify-center items-center mx-auto max-w-screen-2xl [&_a]:text-blog-foreground-highlight"
      />
    </footer>
  );
}
