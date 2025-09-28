import * as React from "react";
import { cn } from "../../lib/utils";

export function Avatar({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-brand-500/20 text-sm font-semibold text-brand-500",
        className
      )}
    >
      {children}
    </span>
  );
}

export const AvatarFallback = Avatar;
