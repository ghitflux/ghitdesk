import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide",
  {
    variants: {
      variant: {
        default: "border-transparent bg-brand-500/20 text-brand-500",
        success: "border-transparent bg-success-500/20 text-success-500",
        warning: "border-transparent bg-warning-500/20 text-warning-500",
        danger: "border-transparent bg-danger-500/20 text-danger-500",
        outline: "border-brand-500 text-brand-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
