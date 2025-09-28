import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Clock, 
  User, 
  MessageCircle, 
  Instagram, 
  Mail, 
  Globe,
  Calendar,
  Tag,
  AlertCircle,
  Edit3,
  Send,
  Paperclip
} from "lucide-react";
import { formatRelativeTime, formatSLATime, getSLAStatus } from "@/lib/utils/formatters";
import type { Ticket } from "@/lib/mocks/tickets";

interface TicketDetailDrawerProps {
  ticket: Ticket | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const channelIcons = {
  whatsapp: MessageCircle,
  instagram: Instagram,
  email: Mail,
  webchat: Globe
};

const channelColors = {
  whatsapp: 'text-success',
  instagram: 'text-warning',
  email: 'text-accent',
  webchat: 'text-brand-primary'
};

const priorityVariants = {
  low: 'outline',
  medium: 'warning',
  high: 'danger'
} as const;

const slaVariants = {
  ok: 'success',
  warning: 'warning',
  critical: 'danger'
} as const;

const statusColors = {
  open: 'bg-warning text-warning-foreground',
  in_progress: 'bg-brand-primary text-primary-foreground',
  waiting_customer: 'bg-accent text-accent-foreground',
  resolved: 'bg-success text-success-foreground'
};

const statusNames = {
  open: 'Aberto',
  in_progress: 'Em andamento',
  waiting_customer: 'Aguardando cliente',
  resolved: 'Resolvido'
};

export function TicketDetailDrawer({ ticket, open, onOpenChange }: TicketDetailDrawerProps) {
  if (!ticket) return null;
  
  const ChannelIcon = channelIcons[ticket.channel];
  const slaStatus = getSLAStatus(ticket.slaDeadline);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[600px] sm:max-w-[600px] bg-surface border-border">
        <SheetHeader className="pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-foreground">Ticket {ticket.id}</SheetTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={statusColors[ticket.status]}>
                {statusNames[ticket.status]}
              </Badge>
              <Button variant="ghost" size="icon">
                <Edit3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-100px)]">
          <div className="space-y-6 pr-4">
            {/* Header Info */}
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-2">{ticket.title}</h2>
                <p className="text-muted-foreground">{ticket.description}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2 ${channelColors[ticket.channel]}`}>
                  <ChannelIcon className="h-4 w-4" />
                  <span className="text-sm">{ticket.channel}</span>
                </div>
                <Badge variant={priorityVariants[ticket.priority]} className="text-xs">
                  {ticket.priority === 'low' ? 'Baixa' : 
                   ticket.priority === 'medium' ? 'Média' : 'Alta'}
                </Badge>
                <Badge variant={slaVariants[slaStatus]} className="text-xs">
                  {formatSLATime(ticket.slaDeadline)}
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Customer Info */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                <User className="h-4 w-4" />
                Solicitante
              </h3>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-elevation border border-border">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={ticket.requester.avatar} alt={ticket.requester.name} />
                  <AvatarFallback className="bg-muted">
                    {ticket.requester.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">{ticket.requester.name}</p>
                  <p className="text-sm text-muted-foreground">{ticket.requester.role}</p>
                </div>
              </div>
            </div>

            {/* Assignment */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">Responsável</h3>
              <div className="space-y-3">
                <Select defaultValue={ticket.assignee?.id || 'unassigned'}>
                  <SelectTrigger className="bg-surface border-border">
                    <SelectValue placeholder="Selecionar responsável" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">Não atribuído</SelectItem>
                    <SelectItem value="a1">Carlos Mendes</SelectItem>
                    <SelectItem value="a2">Ana Beatriz</SelectItem>
                    <SelectItem value="a3">Roberto Silva</SelectItem>
                    <SelectItem value="a4">Patricia Costa</SelectItem>
                  </SelectContent>
                </Select>
                
                {ticket.assignee && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-elevation border border-border">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={ticket.assignee.avatar} alt={ticket.assignee.name} />
                      <AvatarFallback className="bg-muted text-xs">
                        {ticket.assignee.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">{ticket.assignee.name}</p>
                      <p className="text-xs text-muted-foreground">{ticket.assignee.role}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {ticket.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                  <Tag className="h-3 w-3 mr-1" />
                  Adicionar tag
                </Button>
              </div>
            </div>

            {/* SLA Info */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                SLA & Prazos
              </h3>
              <div className="space-y-2 p-3 rounded-lg bg-elevation border border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Prazo de resolução</span>
                  <Badge variant={slaVariants[slaStatus]} className="text-xs">
                    {formatSLATime(ticket.slaDeadline)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status do SLA</span>
                  <span className={`text-xs font-medium ${
                    slaStatus === 'ok' ? 'text-success' : 
                    slaStatus === 'warning' ? 'text-warning' : 'text-danger'
                  }`}>
                    {slaStatus === 'ok' ? 'No prazo' : 
                     slaStatus === 'warning' ? 'Atenção' : 'Crítico'}
                  </span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Histórico
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-elevation border border-border">
                  <div className="w-2 h-2 rounded-full bg-success mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Ticket criado</p>
                    <p className="text-xs text-muted-foreground">
                      Por {ticket.requester.name} • {formatRelativeTime(ticket.createdAt)}
                    </p>
                  </div>
                </div>
                
                {ticket.assignee && (
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-elevation border border-border">
                    <div className="w-2 h-2 rounded-full bg-brand-primary mt-2" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Ticket atribuído</p>
                      <p className="text-xs text-muted-foreground">
                        Para {ticket.assignee.name} • {formatRelativeTime(ticket.updatedAt)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Internal Notes */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">Notas internas</h3>
              <div className="space-y-3">
                <Textarea 
                  placeholder="Adicionar nota interna..."
                  className="bg-surface border-border resize-none"
                  rows={3}
                />
                <div className="flex items-center gap-2">
                  <Button size="sm" className="bg-brand-primary hover:bg-brand-secondary">
                    <Send className="h-4 w-4 mr-2" />
                    Adicionar nota
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Paperclip className="h-4 w-4 mr-2" />
                    Anexar arquivo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}