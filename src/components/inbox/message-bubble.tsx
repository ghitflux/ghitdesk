import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Check, CheckCheck, Clock } from "lucide-react";
import { formatTime } from "@/lib/utils/formatters";
import type { Message } from "@/lib/mocks/conversations";
import { motion } from "framer-motion";

interface MessageBubbleProps {
  message: Message;
}

const statusIcons = {
  sent: Clock,
  delivered: Check,
  read: CheckCheck
};

const statusColors = {
  sent: 'text-muted-foreground',
  delivered: 'text-muted-foreground',
  read: 'text-brand-primary'
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const StatusIcon = statusIcons[message.status];
  
  return (
    <motion.div 
      className={`flex gap-3 mb-4 ${message.isMine ? 'flex-row-reverse' : 'flex-row'}`}
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {!message.isMine && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarFallback className="bg-surface text-foreground text-xs">
            {message.authorName.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={`flex flex-col ${message.isMine ? 'items-end' : 'items-start'} max-w-[70%]`}>
        {!message.isMine && (
          <span className="text-xs text-muted-foreground mb-1">
            {message.authorName}
          </span>
        )}
        
        <div
          className={`rounded-lg px-3 py-2 ${
            message.isMine
              ? 'bg-brand-primary text-primary-foreground'
              : 'bg-surface border border-border text-foreground'
          }`}
        >
          {message.type === 'text' && (
            <p className="text-sm whitespace-pre-wrap break-words">
              {message.content}
            </p>
          )}
          
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 space-y-2">
              {message.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center gap-2 p-2 rounded bg-black/10 text-xs"
                >
                  <div className="w-2 h-2 bg-current rounded-full"></div>
                  <span className="truncate">{attachment.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {(attachment.size / 1024).toFixed(1)}KB
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className={`flex items-center gap-1 mt-1 ${message.isMine ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="text-xs text-muted-foreground">
            {formatTime(message.timestamp)}
          </span>
          {message.isMine && (
            <StatusIcon className={`h-3 w-3 ${statusColors[message.status]}`} />
          )}
        </div>
      </div>
    </motion.div>
  );
}