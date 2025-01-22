"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../../Shadcnui/navigation-menu";
import { LogOut } from "lucide-react";
import { cn } from "../../../utils/clsx";
import { usePathname } from "next/navigation";

// const components: { title: string; href: string; description: string }[] = [
//   {
//     title: "Alert Dialog",
//     href: "/docs/primitives/alert-dialog",
//     description:
//       "A modal dialog that interrupts the user with important content and expects a response.",
//   },
//   {
//     title: "Hover Card",
//     href: "/docs/primitives/hover-card",
//     description:
//       "For sighted users to preview content available behind a link.",
//   },
//   {
//     title: "Progress",
//     href: "/docs/primitives/progress",
//     description:
//       "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
//   },
//   {
//     title: "Scroll-area",
//     href: "/docs/primitives/scroll-area",
//     description: "Visually or semantically separates content.",
//   },
//   {
//     title: "Tabs",
//     href: "/docs/primitives/tabs",
//     description:
//       "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
//   },
//   {
//     title: "Tooltip",
//     href: "/docs/primitives/tooltip",
//     description:
//       "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
//   },
// ];

export function NavigationMenuDemo() {
  const pathname = usePathname();
  return (
    <NavigationMenu className="max-[800px]:hidden">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={`w-32 ${
              pathname.startsWith("/artigos")
                ? "text-blog-foreground-highlight "
                : ""
            }`}
          >
            Artigos
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="flex items-center gap-4 mb-2 mt-4 text-lg font-medium">
                      <LogOut className="h-6 w-6" />
                      PolyCode
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Fique por dentro das últimas novidades!
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              {/* <ListItem href="/artigos" title="Últimos Artigos">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem> */}
              <ListItem
                href="/artigos?category=tecnologia-da-informação"
                title="Tecnologia da Informação"
              >
                Área reservada para Ciências da Computação.
              </ListItem>
              <ListItem href="/artigos?category=blender" title="Modelagem 3D">
                Topologia, UV Wrapping, texturing, rendering, composition e
                mais!
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/sobre" legacyBehavior passHref>
            <NavigationMenuLink
              className={`w-32 ${
                pathname.startsWith("/sobre")
                  ? "text-blog-foreground-highlight "
                  : ""
              } ${navigationMenuTriggerStyle()}`}
            >
              Sobre
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "h-full block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
