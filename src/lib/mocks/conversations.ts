export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  phone?: string;
  email?: string;
}

export interface Conversation {
  id: string;
  contact: Contact;
  channel: 'whatsapp' | 'instagram' | 'email' | 'webchat' | 'pinterest' | 'x' | 'threads' | 'telegram';
  lastMessage: string;
  priority: 'low' | 'medium' | 'high';
  slaStatus: 'ok' | 'warning' | 'critical';
  unreadCount: number;
  updatedAt: string;
  status: 'active' | 'resolved' | 'pending';
}

export const mockConversations: Conversation[] = [
  {
    id: '1',
    contact: {
      id: 'c1',
      name: 'Maria Silva',
      phone: '+55 11 99999-1234',
      avatar: '/avatars/maria.jpg'
    },
    channel: 'whatsapp',
    lastMessage: 'Olá, preciso de ajuda com meu pedido #12345. Não consigo acompanhar o status dele.',
    priority: 'high',
    slaStatus: 'warning',
    unreadCount: 3,
    updatedAt: '2024-01-15T10:30:00Z',
    status: 'active'
  },
  {
    id: '2',
    contact: {
      id: 'c2',
      name: 'João Santos',
      email: 'joao@empresa.com'
    },
    channel: 'email',
    lastMessage: 'Gostaria de solicitar o cancelamento da minha assinatura. Como procedo?',
    priority: 'medium',
    slaStatus: 'ok',
    unreadCount: 1,
    updatedAt: '2024-01-15T09:15:00Z',
    status: 'active'
  },
  {
    id: '3',
    contact: {
      id: 'c3',
      name: 'Ana Costa',
      phone: '+55 21 98888-5678'
    },
    channel: 'instagram',
    lastMessage: 'Oi! Vi que vocês têm uma promoção no Instagram. Como faço para participar?',
    priority: 'low',
    slaStatus: 'ok',
    unreadCount: 0,
    updatedAt: '2024-01-15T08:45:00Z',
    status: 'resolved'
  },
  {
    id: '4',
    contact: {
      id: 'c4',
      name: 'Pedro Oliveira',
      email: 'pedro.oliveira@email.com'
    },
    channel: 'webchat',
    lastMessage: 'Estou tentando fazer login na plataforma mas não está funcionando.',
    priority: 'high',
    slaStatus: 'critical',
    unreadCount: 5,
    updatedAt: '2024-01-15T11:20:00Z',
    status: 'active'
  },
  {
    id: '5',
    contact: {
      id: 'c5',
      name: 'Carla Ferreira',
      phone: '+55 11 97777-9999'
    },
    channel: 'whatsapp',
    lastMessage: 'Obrigada pelo atendimento! Problema resolvido.',
    priority: 'low',
    slaStatus: 'ok',
    unreadCount: 0,
    updatedAt: '2024-01-14T16:30:00Z',
    status: 'resolved'
  },
  {
    id: '6',
    contact: {
      id: 'c6',
      name: 'Roberto Lima',
      email: 'roberto@startup.io'
    },
    channel: 'email',
    lastMessage: 'Gostaria de agendar uma demo da plataforma para nossa equipe.',
    priority: 'medium',
    slaStatus: 'ok',
    unreadCount: 2,
    updatedAt: '2024-01-15T07:30:00Z',
    status: 'active'
  },
  {
    id: '7',
    contact: {
      id: 'c7',
      name: 'Fernanda Alves',
      phone: '+55 85 96666-1111'
    },
    channel: 'whatsapp',
    lastMessage: 'Quando sai a nova funcionalidade de relatórios?',
    priority: 'low',
    slaStatus: 'ok',
    unreadCount: 1,
    updatedAt: '2024-01-15T06:15:00Z',
    status: 'active'
  },
  {
    id: '8',
    contact: {
      id: 'c8',
      name: 'Marcos Rodrigues',
      email: 'marcos.r@corporativo.com.br'
    },
    channel: 'email',
    lastMessage: 'Preciso de um relatório detalhado de uso da nossa conta.',
    priority: 'medium',
    slaStatus: 'warning',
    unreadCount: 0,
    updatedAt: '2024-01-14T14:20:00Z',
    status: 'pending'
  },
  {
    id: '9',
    contact: {
      id: 'c9',
      name: 'Laura Santos',
      email: 'laura@example.com',
      phone: '+55 11 98888-7777'
    },
    channel: 'pinterest',
    lastMessage: 'Gostei muito desse produto! Como faço para comprar?',
    priority: 'medium',
    slaStatus: 'ok',
    unreadCount: 1,
    updatedAt: '2024-01-15T12:00:00Z',
    status: 'active'
  },
  {
    id: '10',
    contact: {
      id: 'c10',
      name: 'Diego Martins',
      phone: '+55 11 97777-6666'
    },
    channel: 'x',
    lastMessage: 'Mandei um DM sobre o atendimento',
    priority: 'low',
    slaStatus: 'ok',
    unreadCount: 1,
    updatedAt: '2024-01-15T11:45:00Z',
    status: 'active'
  },
  {
    id: '11',
    contact: {
      id: 'c11',
      name: 'Isabela Costa',
      email: 'isabela@example.com'
    },
    channel: 'threads',
    lastMessage: 'Vi sua publicação e queria saber mais sobre o produto',
    priority: 'low',
    slaStatus: 'ok',
    unreadCount: 2,
    updatedAt: '2024-01-15T11:30:00Z',
    status: 'active'
  },
  {
    id: '12',
    contact: {
      id: 'c12',
      name: 'Rafael Alves',
      phone: '+55 11 96666-5555'
    },
    channel: 'telegram',
    lastMessage: 'Obrigado pelo suporte rápido!',
    priority: 'low',
    slaStatus: 'ok',
    unreadCount: 0,
    updatedAt: '2024-01-14T18:00:00Z',
    status: 'resolved'
  },
  {
    id: '13',
    contact: {
      id: 'c13',
      name: 'Camila Dias',
      email: 'camila@design.com'
    },
    channel: 'threads',
    lastMessage: 'Adorei o conteúdo que vocês compartilharam!',
    priority: 'low',
    slaStatus: 'ok',
    unreadCount: 0,
    updatedAt: '2024-01-14T15:30:00Z',
    status: 'resolved'
  },
  {
    id: '14',
    contact: {
      id: 'c14',
      name: 'Thiago Souza',
      phone: '+55 21 95555-4444'
    },
    channel: 'telegram',
    lastMessage: 'Preciso de informações sobre os planos disponíveis',
    priority: 'medium',
    slaStatus: 'ok',
    unreadCount: 1,
    updatedAt: '2024-01-15T10:00:00Z',
    status: 'active'
  }
];

export interface Message {
  id: string;
  conversationId: string;
  authorId: string;
  authorName: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'audio';
  isMine: boolean;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  attachments?: {
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
  }[];
}

export const mockMessages: { [conversationId: string]: Message[] } = {
  '1': [
    {
      id: 'm1',
      conversationId: '1',
      authorId: 'c1',
      authorName: 'Maria Silva',
      content: 'Olá! Bom dia',
      type: 'text',
      isMine: false,
      timestamp: '2024-01-15T10:00:00Z',
      status: 'read'
    },
    {
      id: 'm2',
      conversationId: '1',
      authorId: 'agent1',
      authorName: 'Você',
      content: 'Olá Maria! Bom dia, em que posso ajudá-la?',
      type: 'text',
      isMine: true,
      timestamp: '2024-01-15T10:02:00Z',
      status: 'read'
    },
    {
      id: 'm3',
      conversationId: '1',
      authorId: 'c1',
      authorName: 'Maria Silva',
      content: 'Preciso de ajuda com meu pedido #12345. Não consigo acompanhar o status dele.',
      type: 'text',
      isMine: false,
      timestamp: '2024-01-15T10:30:00Z',
      status: 'delivered'
    }
  ],
  '4': [
    {
      id: 'm4',
      conversationId: '4',
      authorId: 'c4',
      authorName: 'Pedro Oliveira',
      content: 'Olá, estou com problemas para fazer login',
      type: 'text',
      isMine: false,
      timestamp: '2024-01-15T11:00:00Z',
      status: 'read'
    },
    {
      id: 'm5',
      conversationId: '4',
      authorId: 'c4',
      authorName: 'Pedro Oliveira',
      content: 'Já tentei redefinir a senha mas não funcionou',
      type: 'text',
      isMine: false,
      timestamp: '2024-01-15T11:05:00Z',
      status: 'read'
    },
    {
      id: 'm6',
      conversationId: '4',
      authorId: 'c4',
      authorName: 'Pedro Oliveira',
      content: 'Estou tentando fazer login na plataforma mas não está funcionando.',
      type: 'text',
      isMine: false,
      timestamp: '2024-01-15T11:20:00Z',
      status: 'delivered'
    }
  ]
};