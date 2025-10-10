import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { TaskCard } from "@/components/tasks/task-card";
import { TaskDetailDrawer } from "@/components/tasks/task-detail-drawer";
import { NewTaskDialog } from "@/components/tasks/new-task-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Plus,
  User,
  ListTodo
} from "lucide-react";
import { mockTasks, getTasksByStatus, getAllAssignees, type Task } from "@/lib/mocks/tasks";

const statusColumns = [
  { id: 'todo', name: 'A Fazer', color: 'bg-muted/10 border-muted/20' },
  { id: 'in_progress', name: 'Em Progresso', color: 'bg-brand-primary/10 border-brand-primary/20' },
  { id: 'review', name: 'Em Revisão', color: 'bg-accent/10 border-accent/20' },
  { id: 'done', name: 'Concluído', color: 'bg-success/10 border-success/20' }
] as const;

export default function Tasks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [selectedAssignee, setSelectedAssignee] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false);

  const priorities = [
    { id: 'urgent', name: 'Urgente', count: mockTasks.filter(t => t.priority === 'urgent').length },
    { id: 'high', name: 'Alta', count: mockTasks.filter(t => t.priority === 'high').length },
    { id: 'medium', name: 'Média', count: mockTasks.filter(t => t.priority === 'medium').length },
    { id: 'low', name: 'Baixa', count: mockTasks.filter(t => t.priority === 'low').length }
  ];

  const assignees = getAllAssignees().map(assignee => ({
    ...assignee,
    count: mockTasks.filter(t => t.assignees.some(a => a.id === assignee.id)).length
  }));

  const allLabels = Array.from(new Set(mockTasks.flatMap(t => t.labels)));
  const popularLabels = allLabels.slice(0, 8);

  const filteredTasks = (status: string) => {
    let tasks = getTasksByStatus(status as any);

    if (searchQuery) {
      tasks = tasks.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedPriority) {
      tasks = tasks.filter(task => task.priority === selectedPriority);
    }

    if (selectedAssignee) {
      if (selectedAssignee === 'unassigned') {
        tasks = tasks.filter(task => task.assignees.length === 0);
      } else {
        tasks = tasks.filter(task => task.assignees.some(a => a.id === selectedAssignee));
      }
    }

    if (selectedLabel) {
      tasks = tasks.filter(task => task.labels.includes(selectedLabel));
    }

    return tasks;
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsDetailDrawerOpen(true);
  };

  const handleNewTask = () => {
    setIsNewTaskDialogOpen(true);
  };

  return (
    <AppLayout title="Tarefas">
      <div className="flex h-full">
        {/* Sidebar - Filtros */}
        <div className="w-64 border-r border-border bg-background flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar tarefas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-surface border-border"
                />
              </div>
              <Button 
                className="w-full bg-brand-primary hover:bg-brand-secondary text-primary-foreground"
                onClick={handleNewTask}
              >
                <Plus className="h-4 w-4 mr-2" />
                Nova Tarefa
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
                    {mockTasks.length}
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
                    {mockTasks.filter(t => t.assignees.length === 0).length}
                  </Badge>
                </Button>
                {assignees.map((assignee) => (
                  <Button
                    key={assignee.id}
                    variant={selectedAssignee === assignee.id ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setSelectedAssignee(assignee.id)}
                  >
                    <Avatar className="h-4 w-4 mr-2">
                      <AvatarImage src={assignee.avatar} alt={assignee.name} />
                      <AvatarFallback className="text-xs">
                        {assignee.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="truncate">{assignee.name}</span>
                    <Badge variant="outline" className="ml-auto">
                      {assignee.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            {/* Labels */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">Labels Populares</h3>
              <div className="space-y-1">
                <Button
                  variant={selectedLabel === null ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setSelectedLabel(null)}
                >
                  <span>Todas</span>
                </Button>
                {popularLabels.map((label) => (
                  <Button
                    key={label}
                    variant={selectedLabel === label ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setSelectedLabel(label)}
                  >
                    <span className="truncate">{label}</span>
                    <Badge variant="outline" className="ml-auto">
                      {mockTasks.filter(t => t.labels.includes(label)).length}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="flex-1 overflow-x-auto">
          <div className="flex h-full gap-6 p-6 min-w-max">
            {statusColumns.map((column) => {
              const tasks = filteredTasks(column.id);
              
              return (
                <div key={column.id} className="flex flex-col w-80">
                  {/* Column Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-foreground">{column.name}</h2>
                      <Badge variant="outline" className="text-xs">
                        {tasks.length}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleNewTask}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Column Content */}
                  <div className={`flex-1 rounded-lg border-2 border-dashed p-4 ${column.color} min-h-[500px]`}>
                    {tasks.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-32 text-center">
                        <div className="w-8 h-8 rounded-full bg-muted/20 flex items-center justify-center mb-2">
                          <ListTodo className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Nenhuma tarefa {column.name.toLowerCase()}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {tasks.map((task) => (
                          <TaskCard
                            key={task.id}
                            task={task}
                            onClick={() => handleTaskClick(task)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modals */}
      <TaskDetailDrawer
        task={selectedTask}
        open={isDetailDrawerOpen}
        onOpenChange={setIsDetailDrawerOpen}
      />
      
      <NewTaskDialog
        open={isNewTaskDialogOpen}
        onOpenChange={setIsNewTaskDialogOpen}
      />
    </AppLayout>
  );
}
