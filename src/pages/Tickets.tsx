import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { TicketCard } from "@/components/tickets/ticket-card";
import { TicketDetailDrawer } from "@/components/tickets/ticket-detail-drawer";
import { NewTicketDialog } from "@/components/tickets/new-ticket-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  Plus,
  User,
  Clock,
  Tag
} from "lucide-react";
import { mockTickets, getTicketsByStatus, type Ticket } from "@/lib/mocks/tickets";
import { getStatusName } from "@/lib/utils/formatters";

const statusColumns = [
  { id: 'open', name: 'Aberto', color: 'bg-warning/10 border-warning/20' },
  { id: 'in_progress', name: 'Em andamento', color: 'bg-brand-primary/10 border-brand-primary/20' },
  { id: 'waiting_customer', name: 'Aguardando cliente', color: 'bg-accent/10 border-accent/20' },
  { id: 'resolved', name: 'Resolvido', color: 'bg-success/10 border-success/20' }
] as const;

export default function Tickets() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [selectedAssignee, setSelectedAssignee] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isNewTicketDialogOpen, setIsNewTicketDialogOpen] = useState(false);

  const priorities = [
    { id: 'high', name: 'Alta', count: mockTickets.filter(t => t.priority === 'high').length },
    { id: 'medium', name: 'Média', count: mockTickets.filter(t => t.priority === 'medium').length },
    { id: 'low', name: 'Baixa', count: mockTickets.filter(t => t.priority === 'low').length }
  ];

  const assignees = [
    ...new Set(mockTickets.filter(t => t.assignee).map(t => t.assignee!.name))
  ].map(name => ({
    name,
    count: mockTickets.filter(t => t.assignee?.name === name).length
  }));

  const filteredTickets = (status: string) => {
    let tickets = getTicketsByStatus(status as any);

    if (searchQuery) {
      tickets = tickets.filter(ticket => 
        ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.requester.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedPriority) {
      tickets = tickets.filter(ticket => ticket.priority === selectedPriority);
    }

    if (selectedAssignee) {
      tickets = tickets.filter(ticket => ticket.assignee?.name === selectedAssignee);
    }

    return tickets;
  };

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsDetailDrawerOpen(true);
  };

  const handleNewTicket = () => {
    setIsNewTicketDialogOpen(true);
  };

  return (
    <AppLayout title="Tickets">
      <div className="flex h-full">
        {/* Sidebar - Filtros */}
        <div className="w-64 border-r border-border bg-background flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-surface border-border"
                />
              </div>
              <Button 
                className="w-full bg-brand-primary hover:bg-brand-secondary text-primary-foreground"
                onClick={handleNewTicket}
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo Ticket
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Prioridade */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">Prioridade</h3>
              <div className="space-y-1">
                <Button
                  variant={selectedPriority === null ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setSelectedPriority(null)}
                >
                  <span>Todas</span>
                  <Badge variant="outline" className="ml-auto">
                    {mockTickets.length}
                  </Badge>
                </Button>
                {priorities.map((priority) => (
                  <Button
                    key={priority.id}
                    variant={selectedPriority === priority.id ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setSelectedPriority(priority.id)}
                  >
                    <span>{priority.name}</span>
                    <Badge variant="outline" className="ml-auto">
                      {priority.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            {/* Responsáveis */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">Responsáveis</h3>
              <div className="space-y-1">
                <Button
                  variant={selectedAssignee === null ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setSelectedAssignee(null)}
                >
                  <span>Todos</span>
                </Button>
                <Button
                  variant={selectedAssignee === 'unassigned' ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setSelectedAssignee('unassigned')}
                >
                  <User className="h-4 w-4 mr-2" />
                  <span>Não atribuído</span>
                  <Badge variant="outline" className="ml-auto">
                    {mockTickets.filter(t => !t.assignee).length}
                  </Badge>
                </Button>
                {assignees.map((assignee) => (
                  <Button
                    key={assignee.name}
                    variant={selectedAssignee === assignee.name ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setSelectedAssignee(assignee.name)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    <span className="truncate">{assignee.name}</span>
                    <Badge variant="outline" className="ml-auto">
                      {assignee.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">Tags Populares</h3>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="cursor-pointer hover:bg-surface">
                  pedido
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-surface">
                  login
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-surface">
                  cancelamento
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-surface">
                  demo
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="flex-1 overflow-x-auto">
          <motion.div 
            className="flex h-full gap-6 p-6 min-w-max"
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
            {statusColumns.map((column, columnIndex) => {
              const tickets = filteredTickets(column.id);
              
              return (
                <motion.div 
                  key={column.id} 
                  className="flex flex-col w-80"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-foreground">{column.name}</h2>
                      <Badge variant="outline" className="text-xs">
                        {tickets.length}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleNewTicket}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Column Content */}
                  <div className={`flex-1 rounded-lg border-2 border-dashed p-4 ${column.color} min-h-[500px]`}>
                    <AnimatePresence mode="wait">
                      {tickets.length === 0 ? (
                        <motion.div 
                          className="flex flex-col items-center justify-center h-32 text-center"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                        >
                          <div className="w-8 h-8 rounded-full bg-muted/20 flex items-center justify-center mb-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Nenhum ticket {column.name.toLowerCase()}
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div 
                          className="space-y-3"
                          initial="hidden"
                          animate="visible"
                          variants={{
                            visible: {
                              transition: {
                                staggerChildren: 0.05
                              }
                            }
                          }}
                        >
                          {tickets.map((ticket, index) => (
                            <motion.div
                              key={ticket.id}
                              variants={{
                                hidden: { opacity: 0, scale: 0.9, y: 10 },
                                visible: { opacity: 1, scale: 1, y: 0 }
                              }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              transition={{ duration: 0.2 }}
                            >
                              <TicketCard
                                ticket={ticket}
                                onClick={() => handleTicketClick(ticket)}
                              />
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Modals */}
      <TicketDetailDrawer
        ticket={selectedTicket}
        open={isDetailDrawerOpen}
        onOpenChange={setIsDetailDrawerOpen}
      />
      
      <NewTicketDialog
        open={isNewTicketDialogOpen}
        onOpenChange={setIsNewTicketDialogOpen}
      />
    </AppLayout>
  );
}