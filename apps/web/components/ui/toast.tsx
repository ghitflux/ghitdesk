"use client";

import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cn } from "../../lib/utils";

const ToastViewport = React.forwardRef<HTMLOListElement, ToastPrimitive.ToastViewportProps>(
  ({ className, ...props }, ref) => (
    <ToastPrimitive.Viewport
      ref={ref}
      className={cn(
        "fixed bottom-0 right-0 z-[100] flex w-full max-w-sm flex-col gap-2 p-4 sm:right-4",
        className
      )}
      {...props}
    />
  )
);
ToastViewport.displayName = ToastPrimitive.Viewport.displayName;

const Toast = React.forwardRef<HTMLDivElement, ToastPrimitive.ToastProps>(
  ({ className, ...props }, ref) => (
    <ToastPrimitive.Root
      ref={ref}
      className={cn(
        "group pointer-events-auto flex w-full items-start gap-3 rounded-md border border-white/10 bg-surface-elevated p-4 text-sm shadow-soft transition-all",
        className
      )}
      {...props}
    />
  )
);
Toast.displayName = ToastPrimitive.Root.displayName;

const ToastTitle = React.forwardRef<HTMLDivElement, ToastPrimitive.ToastTitleProps>(
  ({ className, ...props }, ref) => (
    <ToastPrimitive.Title ref={ref} className={cn("text-sm font-semibold", className)} {...props} />
  )
);
ToastTitle.displayName = ToastPrimitive.Title.displayName;

const ToastDescription = React.forwardRef<HTMLDivElement, ToastPrimitive.ToastDescriptionProps>(
  ({ className, ...props }, ref) => (
    <ToastPrimitive.Description ref={ref} className={cn("text-sm text-muted", className)} {...props} />
  )
);
ToastDescription.displayName = ToastPrimitive.Description.displayName;

const ToastClose = ToastPrimitive.Close;

const ToastProvider = ToastPrimitive.Provider;

export { Toast, ToastViewport, ToastTitle, ToastDescription, ToastClose, ToastProvider };
