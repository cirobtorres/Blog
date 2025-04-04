"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/utils/clsx";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        `z-50 w-72 p-4 border border-blog-border rounded-md shadow-md outline-none` + // Shape
          ` text-blog-foreground-readable backdrop-blur-md bg-blog-background-backdrop` + // Colors
          ` data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95` + // Open animations
          ` data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95` + // Close animations
          ` data-[side=bottom]:slide-in-from-top-2` + // Responsiveness
          ` data-[side=left]:slide-in-from-right-2` + // Responsiveness
          ` data-[side=right]:slide-in-from-left-2` + // Responsiveness
          ` data-[side=top]:slide-in-from-bottom-2`, // Responsiveness
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
