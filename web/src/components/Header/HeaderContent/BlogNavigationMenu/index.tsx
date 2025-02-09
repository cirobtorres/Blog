"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../../../Shadcnui/navigation-menu";
import { cn } from "../../../../utils/clsx";
import { usePathname } from "next/navigation";

const BlogNavigationMenu = () => {
  const pathname = usePathname();
  return (
    <NavigationMenu className="max-[1000px]:hidden">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/artigos" legacyBehavior passHref>
            <NavigationMenuLink
              className={`text-sm w-20 ${
                pathname.startsWith("/artigos")
                  ? "text-blog-foreground-highlight "
                  : ""
              } ${navigationMenuTriggerStyle()}`}
            >
              Artigos
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/sobre" legacyBehavior passHref>
            <NavigationMenuLink
              className={`text-sm w-20 ${
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
};

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

export default BlogNavigationMenu;
