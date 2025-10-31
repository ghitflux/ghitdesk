import { MessageCircle, Clock, TrendingUp, Star } from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";
import { KPIStat } from "@/components/kpi/kpi-stat";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatRelativeTime } from "@/lib/utils/formatters";
import { motion } from "framer-motion";

export default function Dashboard() {
  const recentActivities = [
    {
      id: '1',
      type: 'conversation',
      title: 'Nova conversa no WhatsApp',
      description: 'Maria Silva iniciou uma conversa',
      time: '2024-01-15T11:30:00Z',
      badge: 'WhatsApp'
    },
    {
      id: '2',
      type: 'ticket',
      title: 'Ticket resolvido',
      description: 'T-007 foi marcado como resolvido',
      time: '2024-01-15T11:15:00Z',
      badge: 'Resolvido'
    },
    {
      id: '3',
      type: 'sla',
      title: 'SLA a vencer',
      description: 'T-003 vence em 5 minutos',
      time: '2024-01-15T11:00:00Z',
      badge: 'Crítico'
    }
  ];

  const quickActions = [
    {
      title: 'Abrir Inbox',
      description: 'Visualizar conversas pendentes',
      href: '/inbox',
      color: 'bg-brand-primary'
    },
    {
      title: 'Criar Ticket',
      description: 'Abrir novo ticket de suporte',
      href: '/tickets',
      color: 'bg-accent'
    },
    {
      title: 'Conectar WhatsApp',
      description: 'Configurar canal WhatsApp',
      href: '/settings',
      color: 'bg-success'
    }
  ];

  return (
    <AppLayout title="Dashboard">
      <motion.div 
        className="p-6 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* KPI Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <KPIStat
              title="Conversas Ativas"
              value={12}
              subtitle="3 não lidas"
              icon={MessageCircle}
              color="brand"
              trend={{ value: 15, isPositive: true }}
            />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <KPIStat
              title="SLA a Vencer"
              value={3}
              subtitle="próximas 2 horas"
              icon={Clock}
              color="warning"
              trend={{ value: 2, isPositive: false }}
            />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <KPIStat
              title="TMA"
              value="2h 15min"
              subtitle="tempo médio de atendimento"
              icon={TrendingUp}
              color="accent"
              trend={{ value: 8, isPositive: true }}
            />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <KPIStat
              title="Satisfação"
              value="4.8"
              subtitle="avaliação média"
              icon={Star}
              color="success"
              trend={{ value: 3, isPositive: true }}
            />
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          {/* Volume por Canal */}
          <Card className="lg:col-span-2 border-border bg-surface">
            <CardHeader>
              <CardTitle className="text-foreground">Volume por Canal</CardTitle>
              <CardDescription>Conversas recebidas por canal nas últimas 24 horas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-brand-primary"></div>
                    <span className="text-sm font-medium text-foreground">WhatsApp</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-surface rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-brand-primary rounded-full"></div>
                    </div>
                    <span className="text-sm text-muted-foreground w-8">24</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-accent"></div>
                    <span className="text-sm font-medium text-foreground">E-mail</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-surface rounded-full overflow-hidden">
                      <div className="w-1/2 h-full bg-accent rounded-full"></div>
                    </div>
                    <span className="text-sm text-muted-foreground w-8">16</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-warning"></div>
                    <span className="text-sm font-medium text-foreground">Instagram</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-surface rounded-full overflow-hidden">
                      <div className="w-1/4 h-full bg-warning rounded-full"></div>
                    </div>
                    <span className="text-sm text-muted-foreground w-8">8</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-success"></div>
                    <span className="text-sm font-medium text-foreground">Chat Web</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-surface rounded-full overflow-hidden">
                      <div className="w-1/6 h-full bg-success rounded-full"></div>
                    </div>
                    <span className="text-sm text-muted-foreground w-8">4</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Atividades Recentes */}
          <Card className="border-border bg-surface">
            <CardHeader>
              <CardTitle className="text-foreground">Atividades Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-brand-primary mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {activity.badge}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatRelativeTime(activity.time)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Ações Rápidas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <Card className="border-border bg-surface">
          <CardHeader>
            <CardTitle className="text-foreground">Ações Rápidas</CardTitle>
            <CardDescription>Acesse rapidamente as funcionalidades mais usadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start gap-2 hover:bg-elevation border-border"
                  asChild
                >
                  <a href={action.href}>
                    <div className={`w-8 h-8 rounded-lg ${action.color} flex items-center justify-center mb-2`}>
                      <div className="w-4 h-4 bg-white rounded-sm"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </a>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        </motion.div>
      </motion.div>
    </AppLayout>
  );
}