"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "../../lib/utils";

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = ({ className, side = "top", align = "center", ...props }: TooltipPrimitive.TooltipContentProps) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      side={side}
      align={align}
      className={cn(
        "z-50 max-w-xs rounded-md border border-white/10 bg-surface-elevated px-3 py-1.5 text-sm text-foreground shadow-soft",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
);
