import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, User, MessageCircle, Instagram, Mail, Globe } from "lucide-react";
import { formatRelativeTime, formatSLATime, getSLAStatus, getChannelName } from "@/lib/utils/formatters";
import type { Ticket } from "@/lib/mocks/tickets";

interface TicketCardProps {
  ticket: Ticket;
  onClick?: () => void;
  isDragging?: boolean;
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
  open: 'text-warning',
  in_progress: 'text-brand-primary',
  waiting_customer: 'text-accent',
  resolved: 'text-success'
};

export function TicketCard({ ticket, onClick, isDragging = false }: TicketCardProps) {
  const ChannelIcon = channelIcons[ticket.channel];
  const slaStatus = getSLAStatus(ticket.slaDeadline);
  
  return (
    <Card 
      className={`cursor-pointer border-border bg-surface hover:bg-elevation transition-all duration-200 ${
        isDragging ? 'rotate-2 shadow-lg' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs font-mono">
                {ticket.id}
              </Badge>
              <div className={`p-1 rounded-full ${channelColors[ticket.channel]}`}>
                <ChannelIcon className="h-3 w-3" />
              </div>
            </div>
            <div className={`w-2 h-2 rounded-full ${statusColors[ticket.status]}`} />
          </div>

          {/* Title */}
          <div>
            <h3 className="font-medium text-foreground line-clamp-2 text-sm">
              {ticket.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
              {ticket.description}
            </p>
          </div>

          {/* Priority and SLA */}
          <div className="flex items-center gap-2">
            <Badge variant={priorityVariants[ticket.priority]} className="text-xs">
              {ticket.priority === 'low' ? 'Baixa' : 
               ticket.priority === 'medium' ? 'Média' : 'Alta'}
            </Badge>
            <Badge variant={slaVariants[slaStatus]} className="text-xs">
              {formatSLATime(ticket.slaDeadline)}
            </Badge>
          </div>

          {/* Customer */}
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={ticket.requester.avatar} alt={ticket.requester.name} />
              <AvatarFallback className="bg-muted text-xs">
                {ticket.requester.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground truncate">
              {ticket.requester.name}
            </span>
          </div>

          {/* Assignee and Updated */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              {ticket.assignee ? (
                <>
                  <User className="h-3 w-3" />
                  <span className="truncate">{ticket.assignee.name}</span>
                </>
              ) : (
                <span className="text-warning">Não atribuído</span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{formatRelativeTime(ticket.updatedAt)}</span>
            </div>
          </div>

          {/* Tags */}
          {ticket.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {ticket.tags.slice(0, 2).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                  {tag}
                </Badge>
              ))}
              {ticket.tags.length > 2 && (
                <Badge variant="outline" className="text-xs px-1 py-0">
                  +{ticket.tags.length - 2}
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}