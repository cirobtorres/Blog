import { cn } from "../../utils/clsx";

const HazardBackground = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "shrink-0 w-10 border-x border-blog-border bg-[image:repeating-linear-gradient(315deg,_var(--blog-border)_0,_var(--blog-border)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed",
        className
      )}
    >
      {children}
    </div>
  );
};

const DotBackground = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative rounded-lg bg-fixed bg-gray-950/[2.5%] bg-[size:10px_10px] bg-[image:radial-gradient(hsl(0,_0%,_12%)_1px,_transparent_0)] after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:inset-ring after:inset-ring-gray-950/5",
        className
      )}
    >
      {children}
    </div>
  );
};

const GridBackground = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "bg-[size:95px_95px] bg-[image:linear-gradient(hsl(0,_0%,_12%)_1px,_transparent_1px),_linear-gradient(to_right,_hsl(0,_0%,_12%)_1px,_transparent_1px)]",
        className
      )}
    >
      {children}
    </div>
  );
};

export { HazardBackground, GridBackground, DotBackground };
