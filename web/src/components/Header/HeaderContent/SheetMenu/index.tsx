"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../Shadcnui/sheet";
import { Button } from "../../../Shadcnui/buttons";
import { Menu } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../Shadcnui/accordion";
import DarkModeToggle from "../DarkModeToggle";
import GitHubLink from "../GitHubLink";

export default function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger
        asChild
        data-testid="sheet-menu"
        className="size-8 min-[1001px]:hidden"
      >
        <Button variant="ghost" className="transition-none px-0">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col justify-between">
        <div>
          <SheetHeader>
            <SheetTitle className="text-blog-foreground-readable text-2xl font-extrabold">
              <SheetClose asChild>
                <Link
                  href="/"
                  className="px-1 rounded focus:ring-2 focus:ring-blog-foreground-readable-hover focus:outline-none"
                >
                  PolyCode
                </Link>
              </SheetClose>
            </SheetTitle>
          </SheetHeader>
          <SheetDescription className="mt-6">
            On small screens, navigate through PolyCode here!
          </SheetDescription>
          <div className="grid py-4 pl-2 [&_a]:transition-colors [&_a]:duration-500 [&_a]:text-blog-foreground-readable hover:[&_a]:text-blog-foreground-readable-hover">
            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger className="px-2 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-blog-foreground-readable-hover">
                  Artigos
                </AccordionTrigger>
                <AccordionContent className="flex items-center pl-4">
                  <SheetClose asChild>
                    <Link
                      href="/artigos?page=1"
                      className="my-1 py-2 px-2 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-blog-foreground-readable-hover"
                    >
                      Todos
                    </Link>
                  </SheetClose>
                </AccordionContent>
                <AccordionContent className="flex items-center pl-4">
                  <SheetClose asChild>
                    <Link
                      href="/artigos?page=1&topic=tecnologia-da-informacao"
                      className="my-1 py-2 px-2 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-blog-foreground-readable-hover"
                    >
                      Tecnologia da Informação
                    </Link>
                  </SheetClose>
                </AccordionContent>
                <AccordionContent className="flex items-center pl-4">
                  <SheetClose asChild>
                    <Link
                      href="/artigos?page=1&topic=modelagem-3d"
                      className="my-1 py-2 px-2 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-blog-foreground-readable-hover"
                    >
                      Modelagem 3D
                    </Link>
                  </SheetClose>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <SheetClose asChild>
              <Link
                href="/sobre"
                className="py-4 px-2 rounded focus:ring-2 focus:ring-blog-foreground-readable-hover focus:outline-none"
              >
                Sobre
              </Link>
            </SheetClose>
          </div>
        </div>
        <SheetFooter className="flex gap-1">
          <DarkModeToggle />
          <SheetClose asChild>
            <GitHubLink />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
