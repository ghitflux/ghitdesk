export interface User {
  id: string;
  name: string;
  avatar?: string;
  role: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'waiting_customer' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  assignee?: User;
  requester: User;
  channel: 'whatsapp' | 'instagram' | 'email' | 'webchat';
  tags: string[];
  slaDeadline: string;
  slaStatus: 'ok' | 'warning' | 'critical';
  createdAt: string;
  updatedAt: string;
  conversationId?: string;
}

export const mockTickets: Ticket[] = [
  {
    id: 'T-001',
    title: 'Problema com pedido #12345',
    description: 'Cliente não consegue acompanhar o status do pedido',
    status: 'open',
    priority: 'high',
    assignee: {
      id: 'a1',
      name: 'Carlos Mendes',
      avatar: '/avatars/carlos.jpg',
      role: 'Agente'
    },
    requester: {
      id: 'c1',
      name: 'Maria Silva',
      avatar: '/avatars/maria.jpg',
      role: 'Cliente'
    },
    channel: 'whatsapp',
    tags: ['pedido', 'tracking'],
    slaDeadline: '2024-01-15T14:00:00Z',
    slaStatus: 'warning',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    conversationId: '1'
  },
  {
    id: 'T-002',
    title: 'Solicitação de cancelamento de assinatura',
    description: 'Cliente deseja cancelar assinatura do plano Premium',
    status: 'in_progress',
    priority: 'medium',
    assignee: {
      id: 'a2',
      name: 'Ana Beatriz',
      avatar: '/avatars/ana.jpg',
      role: 'Agente'
    },
    requester: {
      id: 'c2',
      name: 'João Santos',
      role: 'Cliente'
    },
    channel: 'email',
    tags: ['cancelamento', 'assinatura'],
    slaDeadline: '2024-01-16T09:15:00Z',
    slaStatus: 'ok',
    createdAt: '2024-01-15T09:15:00Z',
    updatedAt: '2024-01-15T11:45:00Z',
    conversationId: '2'
  },
  {
    id: 'T-003',
    title: 'Erro de login na plataforma',
    description: 'Usuário não consegue fazer login mesmo após redefinir senha',
    status: 'open',
    priority: 'high',
    requester: {
      id: 'c4',
      name: 'Pedro Oliveira',
      role: 'Cliente'
    },
    channel: 'webchat',
    tags: ['login', 'erro técnico'],
    slaDeadline: '2024-01-15T13:20:00Z',
    slaStatus: 'critical',
    createdAt: '2024-01-15T11:20:00Z',
    updatedAt: '2024-01-15T11:20:00Z',
    conversationId: '4'
  },
  {
    id: 'T-004',
    title: 'Dúvida sobre funcionalidade de relatórios',
    description: 'Cliente quer saber quando será lançada nova funcionalidade',
    status: 'waiting_customer',
    priority: 'low',
    assignee: {
      id: 'a3',
      name: 'Roberto Silva',
      avatar: '/avatars/roberto.jpg',
      role: 'Agente'
    },
    requester: {
      id: 'c7',
      name: 'Fernanda Alves',
      role: 'Cliente'
    },
    channel: 'whatsapp',
    tags: ['funcionalidade', 'relatórios'],
    slaDeadline: '2024-01-16T06:15:00Z',
    slaStatus: 'ok',
    createdAt: '2024-01-15T06:15:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    conversationId: '7'
  },
  {
    id: 'T-005',
    title: 'Solicitação de demo da plataforma',
    description: 'Empresa interessada quer agendar apresentação',
    status: 'in_progress',
    priority: 'medium',
    assignee: {
      id: 'a4',
      name: 'Patricia Costa',
      avatar: '/avatars/patricia.jpg',
      role: 'Vendas'
    },
    requester: {
      id: 'c6',
      name: 'Roberto Lima',
      role: 'Prospecto'
    },
    channel: 'email',
    tags: ['demo', 'vendas'],
    slaDeadline: '2024-01-16T07:30:00Z',
    slaStatus: 'ok',
    createdAt: '2024-01-15T07:30:00Z',
    updatedAt: '2024-01-15T09:15:00Z',
    conversationId: '6'
  },
  {
    id: 'T-006',
    title: 'Relatório de uso da conta corporativa',
    description: 'Cliente precisa de relatório detalhado para auditoria',
    status: 'waiting_customer',
    priority: 'medium',
    assignee: {
      id: 'a1',
      name: 'Carlos Mendes',
      avatar: '/avatars/carlos.jpg',
      role: 'Agente'
    },
    requester: {
      id: 'c8',
      name: 'Marcos Rodrigues',
      role: 'Cliente'
    },
    channel: 'email',
    tags: ['relatório', 'corporativo'],
    slaDeadline: '2024-01-16T14:20:00Z',
    slaStatus: 'warning',
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-15T08:30:00Z',
    conversationId: '8'
  },
  {
    id: 'T-007',
    title: 'Participação em promoção Instagram',
    description: 'Cliente quer participar de promoção divulgada na rede social',
    status: 'resolved',
    priority: 'low',
    assignee: {
      id: 'a2',
      name: 'Ana Beatriz',
      avatar: '/avatars/ana.jpg',
      role: 'Agente'
    },
    requester: {
      id: 'c3',
      name: 'Ana Costa',
      role: 'Cliente'
    },
    channel: 'instagram',
    tags: ['promoção', 'instagram'],
    slaDeadline: '2024-01-15T10:45:00Z',
    slaStatus: 'ok',
    createdAt: '2024-01-15T08:45:00Z',
    updatedAt: '2024-01-15T09:30:00Z',
    conversationId: '3'
  }
];

export const getTicketsByStatus = (status: Ticket['status']) => {
  return mockTickets.filter(ticket => ticket.status === status);
};