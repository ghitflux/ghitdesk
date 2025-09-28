import type { ReactNode } from "react";
import { CircleUserRound, Inbox, MessageCircle, Settings, Sparkles, Users } from "lucide-react";
import Link from "next/link";
import type { Session } from "next-auth";

import { cn } from "../../lib/utils";

const navItems = [
  { href: "#inbox", label: "Inbox", icon: Inbox },
  { href: "#tickets", label: "Tickets", icon: MessageCircle },
  { href: "#contacts", label: "Contatos", icon: Users },
  { href: "#automation", label: "Automação", icon: Sparkles },
  { href: "#admin", label: "Admin", icon: Settings },
];

type Props = {
  children: ReactNode;
  session?: Session;
};

export function AppShell({ children, session }: Props) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 flex-col border-r border-white/5 bg-surface-elevated/70 p-4 lg:flex">
        <div className="mb-6">
          <span className="text-xs uppercase tracking-widest text-muted">GhitDesk</span>
          <h1 className="text-xl font-semibold">Agent Console</h1>
        </div>
        <nav className="space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2 rounded-md px-2 py-2 text-sm text-muted transition hover:bg-brand-500/10 hover:text-brand-500"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto space-y-3">
          {session?.user ? (
            <div className="flex items-center gap-3 rounded-md border border-white/5 bg-surface p-3">
              <CircleUserRound className="h-6 w-6 text-brand-500" />
              <div className="text-sm">
                <p className="font-semibold text-foreground">{session.user.name ?? session.user.email}</p>
                <p className="text-muted">Tenant: {session.user.tenant ?? "-"}</p>
              </div>
            </div>
          ) : null}
          <div className="rounded-md border border-white/5 bg-surface p-3 text-xs text-muted">
            <p className="font-semibold text-foreground">Status SLA</p>
            <p>fila WhatsApp: 97% dentro do SLO</p>
          </div>
        </div>
      </aside>
      <main className="flex-1 bg-surface p-6">{children}</main>
    </div>
  );
}
