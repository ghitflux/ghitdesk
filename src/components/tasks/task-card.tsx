import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, CheckSquare, MessageSquare, Paperclip, Calendar } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils/formatters";
import type { Task } from "@/lib/mocks/tasks";
import { motion } from "framer-motion";

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
  isDragging?: boolean;
}

const priorityVariants = {
  low: 'outline',
  medium: 'warning',
  high: 'danger',
  urgent: 'danger'
} as const;

const priorityColors = {
  low: 'text-muted-foreground',
  medium: 'text-warning',
  high: 'text-danger',
  urgent: 'text-danger'
};

const priorityLabels = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
  urgent: 'Urgente'
};

export function TaskCard({ task, onClick, isDragging = false }: TaskCardProps) {
  const completedChecklist = task.checklist.filter(item => item.completed).length;
  const totalChecklist = task.checklist.length;
  const checklistProgress = totalChecklist > 0 ? (completedChecklist / totalChecklist) * 100 : 0;
  
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'done';
  
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className={`cursor-pointer border-border bg-surface hover:bg-elevation transition-all duration-200 ${
          isDragging ? 'rotate-2 shadow-lg' : ''
        }`}
        onClick={onClick}
      >
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground text-sm line-clamp-2">
                {task.title}
              </h3>
              <Badge variant="outline" className="text-xs font-mono mt-1">
                {task.id}
              </Badge>
            </div>
            <Badge 
              variant={priorityVariants[task.priority]} 
              className="text-xs shrink-0"
            >
              {priorityLabels[task.priority]}
            </Badge>
          </div>

          {/* Labels */}
          {task.labels.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {task.labels.slice(0, 3).map((label, index) => (
                <Badge key={index} variant="outline" className="text-xs px-2 py-0">
                  {label}
                </Badge>
              ))}
              {task.labels.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-0">
                  +{task.labels.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Checklist Progress */}
          {totalChecklist > 0 && (
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckSquare className="h-3 w-3" />
                <span>{completedChecklist}/{totalChecklist}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div 
                  className="bg-brand-primary h-1.5 rounded-full transition-all"
                  style={{ width: `${checklistProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Meta Info */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {task.comments.length > 0 && (
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                <span>{task.comments.length}</span>
              </div>
            )}
            {task.attachments.length > 0 && (
              <div className="flex items-center gap-1">
                <Paperclip className="h-3 w-3" />
                <span>{task.attachments.length}</span>
              </div>
            )}
          </div>

          {/* Due Date */}
          <div className={`flex items-center gap-1 text-xs ${
            isOverdue ? 'text-danger' : 'text-muted-foreground'
          }`}>
            <Calendar className="h-3 w-3" />
            <span>{formatRelativeTime(task.dueDate)}</span>
          </div>

          {/* Assignees */}
          {task.assignees.length > 0 && (
            <div className="flex items-center gap-1">
              <div className="flex -space-x-2">
                {task.assignees.slice(0, 3).map((assignee) => (
                  <Avatar key={assignee.id} className="h-6 w-6 border-2 border-surface">
                    <AvatarImage src={assignee.avatar} alt={assignee.name} />
                    <AvatarFallback className="bg-muted text-xs">
                      {assignee.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {task.assignees.length > 3 && (
                  <div className="h-6 w-6 rounded-full bg-muted border-2 border-surface flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">+{task.assignees.length - 3}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Project */}
          {task.project && (
            <div className="text-xs text-muted-foreground">
              {task.project}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
    </motion.div>
  );
}
