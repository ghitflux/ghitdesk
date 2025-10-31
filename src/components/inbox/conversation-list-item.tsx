import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Instagram, Mail, Globe, Send, Twitter } from "lucide-react";
import { formatRelativeTime, getChannelName, getSLAStatus } from "@/lib/utils/formatters";
import type { Conversation } from "@/lib/mocks/conversations";
import { motion } from "framer-motion";

interface ConversationListItemProps {
  conversation: Conversation;
  isSelected?: boolean;
  onClick?: () => void;
}

const channelIcons = {
  whatsapp: MessageCircle,
  instagram: Instagram,
  email: Mail,
  webchat: Globe,
  pinterest: Send,
  x: Twitter,
  threads: Instagram,
  telegram: Send
};

const channelColors = {
  whatsapp: 'text-success',
  instagram: 'text-warning',
  email: 'text-accent',
  webchat: 'text-brand-primary',
  pinterest: 'text-danger',
  x: 'text-foreground',
  threads: 'text-warning',
  telegram: 'text-accent'
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

export function ConversationListItem({ 
  conversation, 
  isSelected = false, 
  onClick 
}: ConversationListItemProps) {
  const ChannelIcon = channelIcons[conversation.channel];
  
  return (
    <motion.div
      className={`p-4 cursor-pointer border-b border-border hover:bg-elevation transition-colors duration-200 ${
        isSelected ? 'bg-brand-primary/5 border-l-2 border-l-brand-primary' : ''
      }`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Conversa com ${conversation.contact.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start gap-3">
        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarImage src={conversation.contact.avatar} alt={conversation.contact.name} />
            <AvatarFallback className="bg-surface text-foreground text-sm">
              {conversation.contact.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className={`absolute -bottom-1 -right-1 p-1 bg-background rounded-full ${channelColors[conversation.channel]}`}>
            <ChannelIcon className="h-3 w-3" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium text-foreground truncate">
              {conversation.contact.name}
            </h3>
            <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
              {formatRelativeTime(conversation.updatedAt)}
            </span>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {conversation.lastMessage}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant={priorityVariants[conversation.priority]} className="text-xs">
                {conversation.priority === 'low' ? 'Baixa' : 
                 conversation.priority === 'medium' ? 'Média' : 'Alta'}
              </Badge>
              <Badge variant={slaVariants[conversation.slaStatus]} className="text-xs">
                SLA {conversation.slaStatus === 'ok' ? 'OK' : 
                     conversation.slaStatus === 'warning' ? 'Atenção' : 'Crítico'}
              </Badge>
            </div>

            {conversation.unreadCount > 0 && (
              <Badge variant="brand" className="text-xs">
                {conversation.unreadCount}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}