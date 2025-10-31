import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Plus,
  User,
  Phone,
  Mail,
  MessageCircle,
  Instagram,
  Globe,
  Eye,
  Edit,
  Star,
  Calendar,
  Tag
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { mockContacts } from "@/lib/mocks/contacts";
import { formatRelativeTime, formatDateTime, formatDocument, formatPhone, getChannelName } from "@/lib/utils/formatters";

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

export default function Contacts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  const filteredContacts = mockContacts.filter(contact => {
    const matchesSearch = !searchQuery || 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone?.includes(searchQuery) ||
      contact.document?.includes(searchQuery);

    const matchesChannel = !selectedChannel || contact.primaryChannel === selectedChannel;

    return matchesSearch && matchesChannel;
  });

  const channels = [
    { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle, count: mockContacts.filter(c => c.primaryChannel === 'whatsapp').length },
    { id: 'email', name: 'E-mail', icon: Mail, count: mockContacts.filter(c => c.primaryChannel === 'email').length },
    { id: 'instagram', name: 'Instagram', icon: Instagram, count: mockContacts.filter(c => c.primaryChannel === 'instagram').length },
    { id: 'webchat', name: 'Chat Web', icon: Globe, count: mockContacts.filter(c => c.primaryChannel === 'webchat').length }
  ];

  const selectedContactData = selectedContact 
    ? mockContacts.find(c => c.id === selectedContact)
    : null;

  return (
    <AppLayout title="Contatos">
      <div className="flex h-full">
        {/* Sidebar - Filtros */}
        <div className="w-64 border-r border-border bg-background flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar contatos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-surface border-border"
                />
              </div>
              <Button className="w-full bg-brand-primary hover:bg-brand-secondary text-primary-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Novo Contato
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Canais */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">Canal Principal</h3>
              <div className="space-y-1">
                <Button
                  variant={selectedChannel === null ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setSelectedChannel(null)}
                >
                  <span>Todos</span>
                  <Badge variant="outline" className="ml-auto">
                    {mockContacts.length}
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

            {/* Tags */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">Tags</h3>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="cursor-pointer hover:bg-surface">
                  vip
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-surface">
                  empresarial
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-surface">
                  recorrente
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-surface">
                  prospecto
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Tabela de Contatos */}
        <div className="flex-1 flex flex-col">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-foreground">
                Contatos ({filteredContacts.length})
              </h2>
              <Button variant="ghost" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contato</TableHead>
                  <TableHead>Documento</TableHead>
                  <TableHead>Canal Principal</TableHead>
                  <TableHead>Última Interação</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Avaliação</TableHead>
                  <TableHead className="w-[50px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.map((contact, index) => {
                  const ChannelIcon = channelIcons[contact.primaryChannel];
                  
                  return (
                    <motion.tr 
                      key={contact.id} 
                      className="hover:bg-surface"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03, duration: 0.2 }}
                      whileHover={{ backgroundColor: "hsl(var(--surface))" }}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={contact.avatar} alt={contact.name} />
                            <AvatarFallback className="bg-surface text-foreground text-xs">
                              {contact.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">{contact.name}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              {contact.email && (
                                <div className="flex items-center gap-1">
                                  <Mail className="h-3 w-3" />
                                  <span>{contact.email}</span>
                                </div>
                              )}
                              {contact.phone && (
                                <div className="flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  <span>{formatPhone(contact.phone)}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-sm">
                          {contact.document ? formatDocument(contact.document) : '-'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <ChannelIcon className={`h-4 w-4 ${channelColors[contact.primaryChannel]}`} />
                          <span className="text-sm">{getChannelName(contact.primaryChannel)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {formatRelativeTime(contact.lastInteraction)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {contact.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {contact.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{contact.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-warning fill-current" />
                          <span className="text-sm">{contact.averageRating.toFixed(1)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedContact(contact.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </SheetTrigger>
                          <SheetContent className="w-[400px] sm:w-[540px]">
                            {selectedContactData && (
                              <>
                                <SheetHeader>
                                  <SheetTitle className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                      <AvatarImage src={selectedContactData.avatar} alt={selectedContactData.name} />
                                      <AvatarFallback className="bg-surface text-foreground">
                                        {selectedContactData.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                      </AvatarFallback>
                                    </Avatar>
                                    {selectedContactData.name}
                                  </SheetTitle>
                                  <SheetDescription>
                                    Detalhes do contato e histórico de interações
                                  </SheetDescription>
                                </SheetHeader>

                                <div className="mt-6 space-y-6">
                                  {/* Informações Básicas */}
                                  <Card className="border-border bg-surface">
                                    <CardHeader className="pb-3">
                                      <CardTitle className="text-sm font-medium">Informações Básicas</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                      {selectedContactData.email && (
                                        <div className="flex items-center gap-3">
                                          <Mail className="h-4 w-4 text-muted-foreground" />
                                          <span className="text-sm">{selectedContactData.email}</span>
                                        </div>
                                      )}
                                      {selectedContactData.phone && (
                                        <div className="flex items-center gap-3">
                                          <Phone className="h-4 w-4 text-muted-foreground" />
                                          <span className="text-sm">{formatPhone(selectedContactData.phone)}</span>
                                        </div>
                                      )}
                                      {selectedContactData.document && (
                                        <div className="flex items-center gap-3">
                                          <User className="h-4 w-4 text-muted-foreground" />
                                          <span className="text-sm font-mono">{formatDocument(selectedContactData.document)}</span>
                                        </div>
                                      )}
                                      <div className="flex items-center gap-3">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                          Cliente desde {formatDateTime(selectedContactData.createdAt)}
                                        </span>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  {/* Estatísticas */}
                                  <Card className="border-border bg-surface">
                                    <CardHeader className="pb-3">
                                      <CardTitle className="text-sm font-medium">Estatísticas</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center">
                                          <div className="text-2xl font-bold text-brand-primary">
                                            {selectedContactData.totalTickets}
                                          </div>
                                          <div className="text-xs text-muted-foreground">Total de Tickets</div>
                                        </div>
                                        <div className="text-center">
                                          <div className="text-2xl font-bold text-success">
                                            {selectedContactData.resolvedTickets}
                                          </div>
                                          <div className="text-xs text-muted-foreground">Resolvidos</div>
                                        </div>
                                        <div className="text-center">
                                          <div className="flex items-center justify-center gap-1">
                                            <Star className="h-4 w-4 text-warning fill-current" />
                                            <span className="text-xl font-bold">
                                              {selectedContactData.averageRating.toFixed(1)}
                                            </span>
                                          </div>
                                          <div className="text-xs text-muted-foreground">Avaliação Média</div>
                                        </div>
                                        <div className="text-center">
                                          <div className="text-xl font-bold text-foreground">
                                            {Math.round((selectedContactData.resolvedTickets / selectedContactData.totalTickets) * 100)}%
                                          </div>
                                          <div className="text-xs text-muted-foreground">Taxa de Resolução</div>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  {/* Tags */}
                                  <Card className="border-border bg-surface">
                                    <CardHeader className="pb-3">
                                      <CardTitle className="text-sm font-medium">Tags</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="flex flex-wrap gap-2">
                                        {selectedContactData.tags.map((tag, index) => (
                                          <Badge key={index} variant="outline">
                                            {tag}
                                          </Badge>
                                        ))}
                                        <Button variant="ghost" size="sm" className="h-6 px-2">
                                          <Plus className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  {/* Notas */}
                                  {selectedContactData.notes && (
                                    <Card className="border-border bg-surface">
                                      <CardHeader className="pb-3">
                                        <CardTitle className="text-sm font-medium">Notas</CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <p className="text-sm text-foreground">
                                          {selectedContactData.notes}
                                        </p>
                                      </CardContent>
                                    </Card>
                                  )}

                                  {/* Campos Customizados */}
                                  {Object.keys(selectedContactData.customFields).length > 0 && (
                                    <Card className="border-border bg-surface">
                                      <CardHeader className="pb-3">
                                        <CardTitle className="text-sm font-medium">Informações Adicionais</CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-2">
                                        {Object.entries(selectedContactData.customFields).map(([key, value]) => (
                                          <div key={key} className="flex justify-between">
                                            <span className="text-sm text-muted-foreground capitalize">{key}:</span>
                                            <span className="text-sm text-foreground">{value}</span>
                                          </div>
                                        ))}
                                      </CardContent>
                                    </Card>
                                  )}
                                </div>
                              </>
                            )}
                          </SheetContent>
                        </Sheet>
                      </TableCell>
                    </motion.tr>
                  );
                })}
              </TableBody>
            </Table>

            {filteredContacts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <User className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium text-foreground mb-2">Nenhum contato encontrado</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Tente ajustar os filtros ou adicione um novo contato.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}