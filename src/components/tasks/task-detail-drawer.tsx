import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  CheckSquare,
  MessageSquare,
  Paperclip,
  Trash2,
  Edit,
  Archive
} from "lucide-react";
import { formatRelativeTime } from "@/lib/utils/formatters";
import type { Task } from "@/lib/mocks/tasks";
import { useState } from "react";

interface TaskDetailDrawerProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const priorityLabels = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
  urgent: 'Urgente'
};

const priorityVariants = {
  low: 'outline',
  medium: 'warning',
  high: 'danger',
  urgent: 'danger'
} as const;

const statusLabels = {
  todo: 'A Fazer',
  in_progress: 'Em Progresso',
  review: 'Em Revisão',
  done: 'Concluído'
};

export function TaskDetailDrawer({ task, open, onOpenChange }: TaskDetailDrawerProps) {
  const [newComment, setNewComment] = useState("");
  
  if (!task) return null;

  const completedChecklist = task.checklist.filter(item => item.completed).length;
  const totalChecklist = task.checklist.length;
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'done';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <SheetTitle className="text-xl">{task.title}</SheetTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="font-mono text-xs">
                  {task.id}
                </Badge>
                <Badge variant={priorityVariants[task.priority]} className="text-xs">
                  {priorityLabels[task.priority]}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {statusLabels[task.status]}
                </Badge>
              </div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Archive className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Trash2 className="h-4 w-4 text-danger" />
              </Button>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Description */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2">Descrição</h3>
            <p className="text-sm text-muted-foreground">{task.description}</p>
          </div>

          <Separator />

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Assignees */}
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <User className="h-4 w-4" />
                <span>Responsáveis</span>
              </div>
              {task.assignees.length > 0 ? (
                <div className="space-y-2">
                  {task.assignees.map((assignee) => (
                    <div key={assignee.id} className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={assignee.avatar} alt={assignee.name} />
                        <AvatarFallback className="text-xs">
                          {assignee.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-foreground">{assignee.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">Não atribuído</span>
              )}
            </div>

            {/* Due Date */}
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Calendar className="h-4 w-4" />
                <span>Data de Vencimento</span>
              </div>
              <div className={`text-sm ${isOverdue ? 'text-danger font-medium' : 'text-foreground'}`}>
                {formatRelativeTime(task.dueDate)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {new Date(task.dueDate).toLocaleDateString('pt-BR')}
              </div>
            </div>

            {/* Created */}
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Clock className="h-4 w-4" />
                <span>Criado</span>
              </div>
              <div className="text-sm text-foreground">
                {formatRelativeTime(task.createdAt)}
              </div>
            </div>

            {/* Updated */}
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Clock className="h-4 w-4" />
                <span>Atualizado</span>
              </div>
              <div className="text-sm text-foreground">
                {formatRelativeTime(task.updatedAt)}
              </div>
            </div>
          </div>

          {/* Labels */}
          {task.labels.length > 0 && (
            <>
              <Separator />
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Tag className="h-4 w-4" />
                  <span>Labels</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {task.labels.map((label, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Project */}
          {task.project && (
            <>
              <Separator />
              <div>
                <div className="text-sm text-muted-foreground mb-1">Projeto</div>
                <div className="text-sm text-foreground font-medium">{task.project}</div>
              </div>
            </>
          )}

          {/* Checklist */}
          {task.checklist.length > 0 && (
            <>
              <Separator />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <CheckSquare className="h-4 w-4" />
                    <span>Checklist</span>
                    <Badge variant="outline" className="text-xs">
                      {completedChecklist}/{totalChecklist}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {Math.round((completedChecklist / totalChecklist) * 100)}%
                  </div>
                </div>
                <div className="space-y-2">
                  {task.checklist.map((item) => (
                    <div key={item.id} className="flex items-center gap-2">
                      <Checkbox 
                        id={item.id} 
                        checked={item.completed}
                        className="shrink-0"
                      />
                      <label 
                        htmlFor={item.id}
                        className={`text-sm cursor-pointer flex-1 ${
                          item.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                        }`}
                      >
                        {item.title}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Attachments */}
          {task.attachments.length > 0 && (
            <>
              <Separator />
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                  <Paperclip className="h-4 w-4" />
                  <span>Anexos</span>
                </div>
                <div className="space-y-2">
                  {task.attachments.map((attachment, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-2 p-2 rounded-md bg-muted hover:bg-muted/80 cursor-pointer"
                    >
                      <Paperclip className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{attachment}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Comments */}
          <Separator />
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
              <MessageSquare className="h-4 w-4" />
              <span>Comentários</span>
              <Badge variant="outline" className="text-xs">
                {task.comments.length}
              </Badge>
            </div>

            {/* Comment List */}
            <div className="space-y-4 mb-4">
              {task.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                    <AvatarFallback className="text-xs">
                      {comment.author.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-foreground">
                        {comment.author.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatRelativeTime(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-foreground">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* New Comment */}
            <div className="space-y-2">
              <Textarea
                placeholder="Adicionar comentário..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-20 bg-surface border-border resize-none"
              />
              <div className="flex justify-end">
                <Button size="sm">
                  Comentar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
