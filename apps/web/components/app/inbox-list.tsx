"use client";

import useSWR from "swr";

import { bffFetcher } from "../../lib/bff-fetcher";
import { Avatar } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";

type Conversation = {
  id: number | string;
  reference: string;
  channel: string;
  status: string;
  ticket_reference?: string;
  opened_at: string;
  contact: {
    name: string;
    channel: string;
  };
  messages?: Array<{
    id: number | string;
    role: string;
    sender: string;
    content: string;
    sent_at: string;
  }>;
};

type ConversationCollection = Conversation[];

export function InboxList() {
  const { data, error, isLoading } = useSWR<ConversationCollection>(
    "/api/bff/conversations?limit=25",
    bffFetcher
  );

  if (error) {
    return (
      <div className="rounded-md border border-danger-500/40 bg-danger-500/10 p-4 text-sm text-danger-500">
        Falha ao carregar conversas: {error.message}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-2" aria-busy="true">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-16 animate-pulse rounded-lg border border-white/5 bg-surface-elevated"
          />
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="rounded-lg border border-white/5 bg-surface-elevated p-6 text-sm text-muted">
        Nenhuma conversa encontrada para o tenant atual.
      </div>
    );
  }

  return (
    <div className="space-y-2" id="inbox">
      {data.map((conv) => {
        const lastMessage = conv.messages?.[conv.messages.length - 1];
        const preview = lastMessage?.content ?? "-";
        const priorityLabel = conv.ticket_reference ? "Com ticket" : "Sem ticket";

        return (
          <article
            key={conv.id}
            className={cn(
              "flex items-center justify-between rounded-lg border border-white/5 bg-surface-elevated px-4 py-3 transition hover:border-brand-500/60 hover:shadow-soft"
            )}
          >
            <div className="flex flex-1 items-center gap-3">
              <Avatar>{conv.contact?.name?.charAt(0) ?? "?"}</Avatar>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">
                  {conv.contact?.name ?? conv.reference}
                  <span className="text-muted"> - {conv.channel}</span>
                </p>
                <p className="text-sm text-muted truncate">{preview}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{conv.status}</Badge>
              <Badge variant={conv.ticket_reference ? "success" : "outline"}>{priorityLabel}</Badge>
            </div>
          </article>
        );
      })}
    </div>
  );
}

