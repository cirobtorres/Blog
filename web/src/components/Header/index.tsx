"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import DarkModeToggle from "../DarkModeToggle";
import ProgressBar from "./ProgressBar";
import { NavigationMenuDemo } from "./NavigationMenu";
import {
  Sheet,
  // SheetClose,
  SheetContent,
  // SheetDescription,
  // SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../Shadcnui/sheet";
import { Button } from "../Shadcnui/buttons";
import { IoLogoGithub } from "react-icons/io";
import { Menu } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../Shadcnui/accordion";

const FloatingHeader = ({ documentId }: { documentId: string }) => {
  const headerRef = useRef<HTMLElement>(null);

  const hideNavbarListener = () => {
    let prevScrollPos = window.scrollY;
    const threshold = 400 + 480 + 80; // threshold to maintain header on top, beyond which it is allowed to hide

    const handleScroll = () => {
      const currScrollPos = window.scrollY;
      if (currScrollPos < threshold || currScrollPos < prevScrollPos) {
        if (headerRef.current) headerRef.current.style.top = "0";
      } else {
        if (headerRef.current) headerRef.current.style.top = "-48px"; // 48px = header height
      }
      prevScrollPos = currScrollPos;
    };
    return handleScroll;
  };

  useEffect(() => {
    const handleScroll = hideNavbarListener();
    window.addEventListener("scroll", handleScroll);
    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      id="floating-header"
      className="fixed h-12 w-full backdrop-blur-sm shrink-0 [z-index:10] top-0 transition-[top] duration-300 bg-blog-background-backdrop"
    >
      <HeaderContent />
      <ProgressBar documentId={documentId} />
    </header>
  );
};

const StaticHeader = () => {
  return (
    <header
      id="floating-header"
      className="z-10 h-12 w-full backdrop-blur-sm shrink-0 bg-blog-background-backdrop"
    >
      <HeaderContent />
    </header>
  );
};

const HeaderContent = () => {
  return (
    <div className="h-full px-4 outline outline-[1px] outline-blog-border">
      <nav className="w-full h-full flex items-center justify-between max-w-screen-2xl mx-auto">
        <div className="h-full flex items-center justify-center gap-4">
          <div className="flex items-center justify-between max-[800px]:hidden">
            <Link
              href="/"
              className="flex items-center justify-between text-sm uppercase font-extrabold h-full transition-colors duration-500 text-blog-foreground-readable hover:text-blog-foreground-readable-hover"
            >
              HOME
            </Link>
          </div>
          <NavigationMenuDemo />
          <SheetSide />
        </div>
        <ul className="h-full flex items-center justify-between gap-2">
          <li>
            <Link href="https://github.com/cirobtorres" target="_blank">
              <IoLogoGithub className="size-7" />
            </Link>
          </li>
          <li className="flex justify-center items-center h-full">
            <DarkModeToggle />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export { FloatingHeader, StaticHeader };

export function SheetSide() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="min-[801px]:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-blog-foreground-readable text-2xl font-extrabold">
            PolyCode
          </SheetTitle>
          {/* <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription> */}
        </SheetHeader>
        <div className="grid gap-4 py-4 pl-4 [&_a]:transition-colors [&_a]:duration-500 [&_a]:text-blog-foreground-readable hover:[&_a]:text-blog-foreground-readable-hover">
          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>Artigos</AccordionTrigger>
              <AccordionContent className="pl-4">
                <Link href="/artigos">Todos</Link>
              </AccordionContent>
              <AccordionContent className="pl-4">
                <Link href="/artigos?category=tecnologia-da-informacao">
                  Tecnologia da Informação
                </Link>
              </AccordionContent>
              <AccordionContent className="pl-4">
                <Link href="/artigos?category=modelagem-3d">Modelagem 3D</Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Link href="/sobre">Sobre</Link>
        </div>
        {/* <SheetFooter> */}
        {/* <SheetClose asChild> */}
        {/* <Button type="submit">Save changes</Button> */}
        {/* </SheetClose> */}
        {/* </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
