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
import { IoLogoGithub } from "react-icons/io";

export default function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger
        asChild
        data-testid="sheet-menu"
        className="min-[1001px]:hidden"
      >
        <Button variant="ghost">
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
                  className="px-1 rounded focus:ring-2 focus:ring-blog-foreground-highlight focus:outline-none"
                >
                  PolyCode
                </Link>
              </SheetClose>
            </SheetTitle>
          </SheetHeader>
          <SheetDescription className="mt-6">
            On small screens, navigate through PolyCode here!
          </SheetDescription>
          <div className="grid gap-4 py-4 pl-4 [&_a]:transition-colors [&_a]:duration-500 [&_a]:text-blog-foreground-readable hover:[&_a]:text-blog-foreground-readable-hover">
            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>Artigos</AccordionTrigger>
                <AccordionContent className="pl-4">
                  <SheetClose asChild>
                    <Link href="/artigos?page=1">Todos</Link>
                  </SheetClose>
                </AccordionContent>
                <AccordionContent className="pl-4">
                  <SheetClose asChild>
                    <Link href="/artigos?page=1&category=tecnologia-da-informacao">
                      Tecnologia da Informação
                    </Link>
                  </SheetClose>
                </AccordionContent>
                <AccordionContent className="pl-4">
                  <SheetClose asChild>
                    <Link href="/artigos?page=1&category=modelagem-3d">
                      Modelagem 3D
                    </Link>
                  </SheetClose>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <SheetClose asChild>
              <Link href="/sobre">Sobre</Link>
            </SheetClose>
          </div>
        </div>
        <SheetFooter className="flex gap-4">
          <DarkModeToggle />
          <SheetClose asChild>
            <Link
              href="https://github.com/cirobtorres"
              target="_blank"
              className="flex items-center gap-3"
            >
              <IoLogoGithub className="size-7" /> Ciro Torres
            </Link>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
