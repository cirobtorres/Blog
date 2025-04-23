"use client";

import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../../../Shadcnui/navigation-menu";
import { usePathname } from "next/navigation";

const BlogNavigationMenu = () => {
  const pathname = usePathname();

  const getCleanPath = (path: string) => {
    const url = new URL(path, "http://example.com");
    return url.pathname;
  };

  const path = getCleanPath(pathname);
  const isArticlesActive = path === "/artigos" || path.startsWith("/artigos/");
  const isAboutActive = path === "/sobre" || path.startsWith("/sobre/");

  return (
    <NavigationMenu
      data-testid="blog-navigation-menu"
      className="max-[1000px]:hidden"
    >
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/artigos"
            className={`text-sm w-20 ${
              isArticlesActive ? "text-blog-foreground-highlight " : ""
            } ${navigationMenuTriggerStyle()}`}
          >
            Artigos
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/sobre"
            className={`text-sm w-20 ${
              isAboutActive ? "text-blog-foreground-highlight " : ""
            } ${navigationMenuTriggerStyle()}`}
          >
            Sobre
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default BlogNavigationMenu;
