import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { useState } from "react";
import { getAllAssignees, type TaskAssignee } from "@/lib/mocks/tasks";
import { cn } from "@/lib/utils";

interface NewTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewTaskDialog({ open, onOpenChange }: NewTaskDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("todo");
  const [dueDate, setDueDate] = useState<Date>();
  const [selectedAssignees, setSelectedAssignees] = useState<TaskAssignee[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [labelInput, setLabelInput] = useState("");
  const [project, setProject] = useState("");

  const assignees = getAllAssignees();

  const handleAddLabel = () => {
    if (labelInput.trim() && !labels.includes(labelInput.trim())) {
      setLabels([...labels, labelInput.trim()]);
      setLabelInput("");
    }
  };

  const handleRemoveLabel = (label: string) => {
    setLabels(labels.filter(l => l !== label));
  };

  const handleToggleAssignee = (assignee: TaskAssignee) => {
    if (selectedAssignees.find(a => a.id === assignee.id)) {
      setSelectedAssignees(selectedAssignees.filter(a => a.id !== assignee.id));
    } else {
      setSelectedAssignees([...selectedAssignees, assignee]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle task creation
    console.log({
      title,
      description,
      priority,
      status,
      dueDate,
      assignees: selectedAssignees,
      labels,
      project
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Tarefa</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              placeholder="Digite o título da tarefa"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="bg-surface border-border"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descreva a tarefa..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-24 bg-surface border-border resize-none"
            />
          </div>

          {/* Priority and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Prioridade</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger id="priority" className="bg-surface border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="urgent">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status" className="bg-surface border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">A Fazer</SelectItem>
                  <SelectItem value="in_progress">Em Progresso</SelectItem>
                  <SelectItem value="review">Em Revisão</SelectItem>
                  <SelectItem value="done">Concluído</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label>Data de Vencimento</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-surface border-border",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? dueDate.toLocaleDateString('pt-BR') : "Selecionar data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Assignees */}
          <div className="space-y-2">
            <Label>Responsáveis</Label>
            <div className="space-y-2">
              {selectedAssignees.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedAssignees.map((assignee) => (
                    <Badge key={assignee.id} variant="secondary" className="gap-1 pr-1">
                      <Avatar className="h-4 w-4">
                        <AvatarImage src={assignee.avatar} alt={assignee.name} />
                        <AvatarFallback className="text-xs">
                          {assignee.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs">{assignee.name}</span>
                      <button
                        type="button"
                        onClick={() => handleToggleAssignee(assignee)}
                        className="ml-1 hover:bg-muted rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              <Select onValueChange={(value) => {
                const assignee = assignees.find(a => a.id === value);
                if (assignee) handleToggleAssignee(assignee);
              }}>
                <SelectTrigger className="bg-surface border-border">
                  <SelectValue placeholder="Selecionar responsável" />
                </SelectTrigger>
                <SelectContent>
                  {assignees.map((assignee) => (
                    <SelectItem key={assignee.id} value={assignee.id}>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={assignee.avatar} alt={assignee.name} />
                          <AvatarFallback className="text-xs">
                            {assignee.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{assignee.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Labels */}
          <div className="space-y-2">
            <Label htmlFor="labels">Labels</Label>
            {labels.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {labels.map((label) => (
                  <Badge key={label} variant="outline" className="gap-1 pr-1">
                    <span className="text-xs">{label}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveLabel(label)}
                      className="ml-1 hover:bg-muted rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <Input
                id="labels"
                placeholder="Digite uma label e pressione Enter"
                value={labelInput}
                onChange={(e) => setLabelInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddLabel();
                  }
                }}
                className="bg-surface border-border"
              />
              <Button type="button" variant="outline" onClick={handleAddLabel}>
                Adicionar
              </Button>
            </div>
          </div>

          {/* Project */}
          <div className="space-y-2">
            <Label htmlFor="project">Projeto</Label>
            <Input
              id="project"
              placeholder="Nome do projeto"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="bg-surface border-border"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Criar Tarefa
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
