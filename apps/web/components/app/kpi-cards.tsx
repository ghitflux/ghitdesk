import { TrendingDown, TrendingUp, Timer } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

const metrics = [
  {
    title: "TMA",
    description: "Tempo médio de atendimento nas últimas 24h",
    value: "02m 31s",
    trend: "-12%",
    icon: TrendingDown,
    tone: "success" as const,
  },
  {
    title: "SLA",
    description: "Dentro do SLO (WhatsApp - Gold)",
    value: "98%",
    trend: "+2%",
    icon: TrendingUp,
    tone: "success" as const,
  },
  {
    title: "Backlog",
    description: "Tickets aguardando triagem",
    value: "14",
    trend: "3 urgente",
    icon: Timer,
    tone: "warning" as const,
  },
];

export function KpiCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {metrics.map((metric) => (
        <Card key={metric.title} className="relative overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <CardTitle>{metric.title}</CardTitle>
              <Badge variant={metric.tone}>{metric.trend}</Badge>
            </div>
            <CardDescription>{metric.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <p className="text-3xl font-semibold text-foreground">{metric.value}</p>
            <metric.icon className="h-10 w-10 text-brand-500" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
