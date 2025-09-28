"use client";

import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "../../lib/utils";

export interface SwitchProps extends SwitchPrimitives.SwitchProps {}

export const Switch = ({ className, children, ...props }: SwitchProps) => (
  <label className="inline-flex items-center gap-2 text-sm text-foreground">
    <SwitchPrimitives.Root
      className={cn(
        "peer h-5 w-9 shrink-0 rounded-full border border-white/10 bg-surface-elevated transition-colors data-[state=checked]:bg-brand-500/80",
        className
      )}
      {...props}
    >
      <SwitchPrimitives.Thumb className="block h-4 w-4 translate-x-0.5 rounded-full bg-foreground transition-transform data-[state=checked]:translate-x-[18px]" />
    </SwitchPrimitives.Root>
    {children}
  </label>
);
