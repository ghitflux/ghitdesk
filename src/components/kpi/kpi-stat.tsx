import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface KPIStatProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive?: boolean;
  };
  color?: 'default' | 'success' | 'warning' | 'danger' | 'accent' | 'brand';
  loading?: boolean;
}

export function KPIStat({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'default',
  loading = false
}: KPIStatProps) {
  const colorClasses = {
    default: 'text-brand-primary bg-brand-primary/10',
    success: 'text-success bg-success/10',
    warning: 'text-warning bg-warning/10',
    danger: 'text-danger bg-danger/10',
    accent: 'text-accent bg-accent/10',
    brand: 'text-brand-primary bg-brand-primary/10'
  };

  if (loading) {
    return (
      <Card className="border-border bg-surface hover:bg-elevation transition-colors duration-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-12 w-12 rounded-lg" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border bg-surface hover:bg-elevation transition-colors duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              {title}
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">
                {value}
              </span>
              {trend && (
                <span className={`text-xs font-medium ${
                  trend.isPositive ? 'text-success' : 'text-danger'
                }`}>
                  {trend.isPositive ? '+' : ''}{trend.value}%
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>
          <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${colorClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}