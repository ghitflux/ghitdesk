import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { ConversationListItem } from "@/components/inbox/conversation-list-item";
import { MessageBubble } from "@/components/inbox/message-bubble";
import { Composer } from "@/components/inbox/composer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Filter, 
  MessageCircle, 
  Instagram, 
  Mail, 
  Globe,
  User,
  Clock,
  Tag,
  Phone,
  MoreVertical
} from "lucide-react";
import { mockConversations, mockMessages } from "@/lib/mocks/conversations";
import { formatRelativeTime, getChannelName } from "@/lib/utils/formatters";

const channelIcons = {
  whatsapp: MessageCircle,
  instagram: Instagram,
  email: Mail,
  webchat: Globe
};

export default function Inbox() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(
    mockConversations[0]?.id || null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [selectedQueue, setSelectedQueue] = useState<string | null>(null);

  const filteredConversations = useMemo(() => {
    let filtered = mockConversations;

    if (searchQuery) {
      filtered = filtered.filter(conv => 
        conv.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedChannel) {
      filtered = filtered.filter(conv => conv.channel === selectedChannel);
    }

    return filtered.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }, [searchQuery, selectedChannel]);

  const selectedConversation = selectedConversationId 
    ? mockConversations.find(c => c.id === selectedConversationId)
    : null;

  const messages = selectedConversationId 
    ? mockMessages[selectedConversationId] || []
    : [];

  const channels = [
    { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle, count: 8 },
    { id: 'email', name: 'E-mail', icon: Mail, count: 3 },
    { id: 'instagram', name: 'Instagram', icon: Instagram, count: 2 },
    { id: 'webchat', name: 'Chat Web', icon: Globe, count: 1 }
  ];

  const queues = [
    { id: 'support', name: 'Suporte', count: 7 },
    { id: 'sales', name: 'Vendas', count: 3 },
    { id: 'billing', name: 'Financeiro', count: 2 }
  ];

  return (
    <AppLayout title="Inbox">
      <div className="flex h-full">
        {/* Sidebar - Filtros */}
        <div className="w-64 border-r border-border bg-background flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar conversas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-surface border-border"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Canais */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">Canais</h3>
              <div className="space-y-1">
                <Button
                  variant={selectedChannel === null ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setSelectedChannel(null)}
                >
                  <span>Todos</span>
                  <Badge variant="outline" className="ml-auto">
                    {mockConversations.length}
                  </Badge>
                </Button>
                {channels.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <Button
                      key={channel.id}
                      variant={selectedChannel === channel.id ? "secondary" : "ghost"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setSelectedChannel(channel.id)}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      <span>{channel.name}</span>
                      <Badge variant="outline" className="ml-auto">
                        {channel.count}
                      </Badge>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Filas */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">Filas</h3>
              <div className="space-y-1">
                {queues.map((queue) => (
                  <Button
                    key={queue.id}
                    variant={selectedQueue === queue.id ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setSelectedQueue(queue.id)}
                  >
                    <span>{queue.name}</span>
                    <Badge variant="outline" className="ml-auto">
                      {queue.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">Tags</h3>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="cursor-pointer hover:bg-surface">
                  urgente
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-surface">
                  vip
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-surface">
                  bug
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Conversas */}
        <div className="w-96 border-r border-border bg-surface flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-foreground">
                Conversas ({filteredConversations.length})
              </h2>
              <Button variant="ghost" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="p-8 text-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium text-foreground mb-2">Nenhuma conversa encontrada</h3>
                <p className="text-sm text-muted-foreground">
                  Tente ajustar os filtros ou aguarde novas mensagens.
                </p>
              </div>
            ) : (
              filteredConversations.map((conversation) => (
                <ConversationListItem
                  key={conversation.id}
                  conversation={conversation}
                  isSelected={selectedConversationId === conversation.id}
                  onClick={() => setSelectedConversationId(conversation.id)}
                />
              ))
            )}
          </div>
        </div>

        {/* Janela de Mensagens */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Header da Conversa */}
              <div className="p-4 border-b border-border bg-background">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedConversation.contact.avatar} />
                      <AvatarFallback className="bg-surface text-foreground">
                        {selectedConversation.contact.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-foreground">
                        {selectedConversation.contact.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{getChannelName(selectedConversation.channel)}</span>
                        <span>•</span>
                        <span>
                          {selectedConversation.status === 'active' ? 'Ativo' : 'Resolvido'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Mensagens */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Nenhuma mensagem ainda</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                  ))
                )}
              </div>

              {/* Composer */}
              <Composer
                onSendMessage={(content, attachments) => {
                  console.log('Sending message:', content, attachments);
                }}
              />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Selecione uma conversa
                </h3>
                <p className="text-muted-foreground">
                  Escolha uma conversa da lista para começar a responder
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Painel de Detalhes */}
        {selectedConversation && (
          <div className="w-80 border-l border-border bg-background p-4 space-y-6">
            {/* Informações do Contato */}
            <Card className="border-border bg-surface">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Informações do Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">
                    {selectedConversation.contact.name}
                  </span>
                </div>
                {selectedConversation.contact.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">
                      {selectedConversation.contact.phone}
                    </span>
                  </div>
                )}
                {selectedConversation.contact.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">
                      {selectedConversation.contact.email}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">
                    Última atividade {formatRelativeTime(selectedConversation.updatedAt)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Status da Conversa */}
            <Card className="border-border bg-surface">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Prioridade</span>
                  <Badge variant={
                    selectedConversation.priority === 'high' ? 'danger' :
                    selectedConversation.priority === 'medium' ? 'warning' : 'outline'
                  }>
                    {selectedConversation.priority === 'low' ? 'Baixa' :
                     selectedConversation.priority === 'medium' ? 'Média' : 'Alta'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">SLA</span>
                  <Badge variant={
                    selectedConversation.slaStatus === 'critical' ? 'danger' :
                    selectedConversation.slaStatus === 'warning' ? 'warning' : 'success'
                  }>
                    {selectedConversation.slaStatus === 'ok' ? 'No prazo' :
                     selectedConversation.slaStatus === 'warning' ? 'Atenção' : 'Crítico'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Canal</span>
                  <Badge variant="outline">
                    {getChannelName(selectedConversation.channel)}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Ações Rápidas */}
            <Card className="border-border bg-surface">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Ações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Tag className="h-4 w-4 mr-2" />
                  Adicionar Tag
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Atribuir Agente
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Clock className="h-4 w-4 mr-2" />
                  Definir Lembrete
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  );
}