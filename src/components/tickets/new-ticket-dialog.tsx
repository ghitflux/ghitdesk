import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  User, 
  MessageCircle, 
  Instagram, 
  Mail, 
  Globe,
  Tag,
  Plus,
  X,
  Search
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const priorityOptions = ["low", "medium", "high"] as const;
const channelOptions = ["whatsapp", "instagram", "email", "webchat"] as const;

const ticketSchema = z.object({
  title: z.string().min(1, "Título é obrigatório").max(100, "Máximo 100 caracteres"),
  description: z.string().min(1, "Descrição é obrigatória").max(1000, "Máximo 1000 caracteres"),
  priority: z.enum(priorityOptions),
  channel: z.enum(channelOptions),
  assignee: z.string().optional(),
  requesterId: z.string().min(1, "Selecione um solicitante"),
});

type TicketFormData = z.infer<typeof ticketSchema>;

interface NewTicketDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockContacts = [
  { id: 'c1', name: 'Maria Silva', avatar: '/avatars/maria.jpg', email: 'maria@email.com' },
  { id: 'c2', name: 'João Santos', email: 'joao@email.com' },
  { id: 'c3', name: 'Ana Costa', email: 'ana@email.com' },
  { id: 'c4', name: 'Pedro Oliveira', email: 'pedro@email.com' },
];

const mockAgents = [
  { id: 'a1', name: 'Carlos Mendes', avatar: '/avatars/carlos.jpg', role: 'Agente' },
  { id: 'a2', name: 'Ana Beatriz', avatar: '/avatars/ana.jpg', role: 'Agente' },
  { id: 'a3', name: 'Roberto Silva', avatar: '/avatars/roberto.jpg', role: 'Agente' },
  { id: 'a4', name: 'Patricia Costa', avatar: '/avatars/patricia.jpg', role: 'Vendas' },
];

const channelIcons = {
  whatsapp: MessageCircle,
  instagram: Instagram,
  email: Mail,
  webchat: Globe
};

const channelNames = {
  whatsapp: 'WhatsApp',
  instagram: 'Instagram',
  email: 'E-mail',
  webchat: 'Chat do site'
};

const priorityNames = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta'
};

export function NewTicketDialog({ open, onOpenChange }: NewTicketDialogProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [contactSearch, setContactSearch] = useState("");
  const { toast } = useToast();

  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      channel: "whatsapp",
      assignee: "",
      requesterId: "",
    },
  });

  const onSubmit = (data: TicketFormData) => {
    console.log({ ...data, tags });
    toast({
      title: "Ticket criado com sucesso!",
      description: `Ticket ${data.title} foi criado e atribuído.`,
    });
    form.reset();
    setTags([]);
    onOpenChange(false);
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
    contact.email.toLowerCase().includes(contactSearch.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] bg-surface border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Novo Ticket</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pr-4">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className="text-foreground">Título</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Descreva o problema brevemente..."
                          className="bg-elevation border-border"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Prioridade</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-elevation border-border">
                            <SelectValue placeholder="Selecionar prioridade" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                              Baixa
                            </div>
                          </SelectItem>
                          <SelectItem value="medium">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-warning" />
                              Média
                            </div>
                          </SelectItem>
                          <SelectItem value="high">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-danger" />
                              Alta
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="channel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Canal</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-elevation border-border">
                            <SelectValue placeholder="Selecionar canal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(channelNames).map(([value, name]) => {
                            const Icon = channelIcons[value as keyof typeof channelIcons];
                            return (
                              <SelectItem key={value} value={value}>
                                <div className="flex items-center gap-2">
                                  <Icon className="h-4 w-4" />
                                  {name}
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Descrição</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva o problema detalhadamente..."
                        className="bg-elevation border-border resize-none"
                        rows={4}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              {/* Contact Selection */}
              <FormField
                control={form.control}
                name="requesterId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Solicitante
                    </FormLabel>
                    <div className="space-y-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Buscar contato..."
                          value={contactSearch}
                          onChange={(e) => setContactSearch(e.target.value)}
                          className="pl-10 bg-elevation border-border"
                        />
                      </div>
                      <div className="max-h-40 overflow-y-auto space-y-2">
                        {filteredContacts.map((contact) => (
                          <div
                            key={contact.id}
                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                              field.value === contact.id
                                ? 'bg-brand-primary/10 border-brand-primary/20'
                                : 'bg-elevation border-border hover:bg-elevation/80'
                            }`}
                            onClick={() => field.onChange(contact.id)}
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={contact.avatar} alt={contact.name} />
                              <AvatarFallback className="bg-muted text-xs">
                                {contact.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground">{contact.name}</p>
                              <p className="text-xs text-muted-foreground">{contact.email}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Assignment */}
              <FormField
                control={form.control}
                name="assignee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Responsável (opcional)</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-elevation border-border">
                          <SelectValue placeholder="Atribuir a um agente..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">Não atribuído</SelectItem>
                        {mockAgents.map((agent) => (
                          <SelectItem key={agent.id} value={agent.id}>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={agent.avatar} alt={agent.name} />
                                <AvatarFallback className="bg-muted text-xs">
                                  {agent.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{agent.name}</p>
                                <p className="text-xs text-muted-foreground">{agent.role}</p>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tags */}
              <div>
                <FormLabel className="text-foreground flex items-center gap-2 mb-3">
                  <Tag className="h-4 w-4" />
                  Tags
                </FormLabel>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Adicionar tag..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="bg-elevation border-border"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" variant="outline" size="icon" onClick={addTag}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-brand-primary hover:bg-brand-secondary"
                >
                  Criar Ticket
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}