import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { AppShell } from "../components/layout/app-shell";
import { AiSuggestion } from "../components/app/ai-suggestion";
import { InboxList } from "../components/app/inbox-list";
import { KpiCards } from "../components/app/kpi-cards";
import { TicketTable } from "../components/app/ticket-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Switch } from "../components/ui/switch";
import { authOptions } from "../lib/auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <AppShell session={session}>
      <div className="space-y-8">
        <header className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Omnichannel Command Center</h1>
            <p className="text-sm text-muted">
              Inbox em tempo real com SLA monitorado, IA contextual e governança multi-tenant.
            </p>
          </div>
          <Switch defaultChecked>Modo produtivo</Switch>
        </header>

        <KpiCards />

        <Tabs defaultValue="inbox">
          <TabsList>
            <TabsTrigger value="inbox">Inbox</TabsTrigger>
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
            <TabsTrigger value="ai">Ghoat</TabsTrigger>
          </TabsList>
          <TabsContent value="inbox" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Conversas recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <InboxList />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tickets">
            <Card>
              <CardHeader>
                <CardTitle>Fila crítica</CardTitle>
              </CardHeader>
              <CardContent>
                <TicketTable />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="ai">
            <Card>
              <CardHeader>
                <CardTitle>Assistente Ghoat</CardTitle>
              </CardHeader>
              <CardContent>
                <AiSuggestion />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
