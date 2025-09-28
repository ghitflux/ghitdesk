"use client";

import useSWR from "swr";

import { bffFetcher } from "../../lib/bff-fetcher";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

type Ticket = {
  id: number | string;
  reference: string;
  subject: string;
  assignee: { username?: string; first_name?: string; last_name?: string } | string | null;
  priority: "low" | "normal" | "high" | "urgent" | string;
  status: string;
  sla_due_at?: string | null;
};

type TicketCollection = Ticket[];

const priorityVariant: Record<string, "default" | "warning" | "danger"> = {
  urgent: "danger",
  high: "warning",
};

const priorityLabel: Record<string, string> = {
  low: "Baixa",
  normal: "Normal",
  high: "Alta",
  urgent: "Urgente",
};

export function TicketTable() {
  const { data, error, isLoading } = useSWR<TicketCollection>('/api/bff/tickets?limit=25', bffFetcher);

  if (error) {
    return (
      <div className="rounded-md border border-danger-500/40 bg-danger-500/10 p-4 text-sm text-danger-500">
        Falha ao carregar tickets: {error.message}
      </div>
    );
  }

  if (isLoading) {
    return (
      <Table className="animate-pulse opacity-70">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Assunto</TableHead>
            <TableHead>Responsavel</TableHead>
            <TableHead>Prioridade</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 4 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell className="py-6" colSpan={5} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="rounded-lg border border-white/5 bg-surface-elevated p-6 text-sm text-muted">
        Nenhum ticket encontrado. Resolva conversas para criar novos tickets.
      </div>
    );
  }

  return (
    <div id="tickets">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Assunto</TableHead>
            <TableHead>Responsavel</TableHead>
            <TableHead>Prioridade</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((ticket) => {
            const priorityKey = ticket.priority?.toLowerCase() ?? "normal";
            const variant = priorityVariant[priorityKey] ?? "default";
            const label = priorityLabel[priorityKey] ?? ticket.priority;
            const assigneeName = typeof ticket.assignee === "string"
              ? ticket.assignee
              : [ticket.assignee?.first_name, ticket.assignee?.last_name]
                  .filter(Boolean)
                  .join(" ") || ticket.assignee?.username || "-";

            return (
              <TableRow key={ticket.id}>
                <TableCell className="font-mono text-xs text-muted">{ticket.reference}</TableCell>
                <TableCell>{ticket.subject}</TableCell>
                <TableCell>{assigneeName || "-"}</TableCell>
                <TableCell>
                  <Badge variant={variant}>{label}</Badge>
                </TableCell>
                <TableCell>{ticket.status}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableCaption>Tickets com SLA monitorado automaticamente pela rotina de Celery.</TableCaption>
      </Table>
    </div>
  );
}
