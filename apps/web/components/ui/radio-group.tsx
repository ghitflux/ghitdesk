"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "../../lib/utils";

export const RadioGroup = ({ className, ...props }: RadioGroupPrimitive.RadioGroupProps) => (
  <RadioGroupPrimitive.Root className={cn("grid gap-2", className)} {...props} />
);

export const RadioGroupItem = ({ className, ...props }: RadioGroupPrimitive.RadioGroupItemProps) => (
  <RadioGroupPrimitive.Item
    className={cn(
      "aspect-square h-4 w-4 rounded-full border border-white/20 text-brand-500 ring-offset-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70",
      className
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      <div className="h-2 w-2 rounded-full bg-brand-500" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
);
