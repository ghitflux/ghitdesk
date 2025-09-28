export interface ContactDetails {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  document?: string; // CPF/CNPJ
  avatar?: string;
  tags: string[];
  primaryChannel: 'whatsapp' | 'instagram' | 'email' | 'webchat';
  lastInteraction: string;
  notes: string;
  createdAt: string;
  totalTickets: number;
  resolvedTickets: number;
  averageRating: number;
  preferredLanguage: string;
  timezone: string;
  customFields: Record<string, any>;
}

export const mockContacts: ContactDetails[] = [
  {
    id: 'c1',
    name: 'Maria Silva',
    email: 'maria.silva@email.com',
    phone: '+55 11 99999-1234',
    document: '123.456.789-00',
    avatar: '/avatars/maria.jpg',
    tags: ['vip', 'recorrente'],
    primaryChannel: 'whatsapp',
    lastInteraction: '2024-01-15T10:30:00Z',
    notes: 'Cliente muito satisfeita com o atendimento. Sempre educada e pontual.',
    createdAt: '2023-06-15T14:20:00Z',
    totalTickets: 15,
    resolvedTickets: 14,
    averageRating: 4.8,
    preferredLanguage: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    customFields: {
      plano: 'Premium',
      empresa: 'Silva & Associados'
    }
  },
  {
    id: 'c2',
    name: 'João Santos',
    email: 'joao@empresa.com',
    phone: '+55 11 98888-2345',
    document: '987.654.321-00',
    tags: ['empresarial'],
    primaryChannel: 'email',
    lastInteraction: '2024-01-15T09:15:00Z',
    notes: 'Responsável pelo setor de TI da empresa. Preferência por contato via email.',
    createdAt: '2023-08-22T09:30:00Z',
    totalTickets: 8,
    resolvedTickets: 7,
    averageRating: 4.2,
    preferredLanguage: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    customFields: {
      plano: 'Empresarial',
      empresa: 'TechCorp Ltda',
      cargo: 'Gerente de TI'
    }
  },
  {
    id: 'c3',
    name: 'Ana Costa',
    phone: '+55 21 98888-5678',
    tags: ['jovem', 'social media'],
    primaryChannel: 'instagram',
    lastInteraction: '2024-01-15T08:45:00Z',
    notes: 'Muito ativa nas redes sociais. Gosta de promoções e novidades.',
    createdAt: '2024-01-10T16:45:00Z',
    totalTickets: 2,
    resolvedTickets: 2,
    averageRating: 5.0,
    preferredLanguage: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    customFields: {
      plano: 'Básico',
      idade: 24
    }
  },
  {
    id: 'c4',
    name: 'Pedro Oliveira',
    email: 'pedro.oliveira@email.com',
    phone: '+55 11 97777-1111',
    document: '456.789.123-00',
    tags: ['técnico'],
    primaryChannel: 'webchat',
    lastInteraction: '2024-01-15T11:20:00Z',
    notes: 'Usuário com conhecimento técnico avançado. Problemas costumam ser mais complexos.',
    createdAt: '2023-11-05T10:15:00Z',
    totalTickets: 12,
    resolvedTickets: 10,
    averageRating: 3.8,
    preferredLanguage: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    customFields: {
      plano: 'Pro',
      profissao: 'Desenvolvedor'
    }
  },
  {
    id: 'c5',
    name: 'Carla Ferreira',
    email: 'carla.ferreira@startup.com',
    phone: '+55 11 97777-9999',
    document: '321.654.987-00',
    tags: ['startup', 'satisfeita'],
    primaryChannel: 'whatsapp',
    lastInteraction: '2024-01-14T16:30:00Z',
    notes: 'Fundadora de startup. Sempre muito satisfeita com o atendimento.',
    createdAt: '2023-09-12T13:20:00Z',
    totalTickets: 6,
    resolvedTickets: 6,
    averageRating: 4.9,
    preferredLanguage: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    customFields: {
      plano: 'Startup',
      empresa: 'InnovateTech',
      cargo: 'CEO'
    }
  },
  {
    id: 'c6',
    name: 'Roberto Lima',
    email: 'roberto@startup.io',
    phone: '+55 11 96666-3333',
    tags: ['prospecto', 'vendas'],
    primaryChannel: 'email',
    lastInteraction: '2024-01-15T07:30:00Z',
    notes: 'Interessado em conhecer a plataforma. Empresa em crescimento.',
    createdAt: '2024-01-15T07:30:00Z',
    totalTickets: 1,
    resolvedTickets: 0,
    averageRating: 0,
    preferredLanguage: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    customFields: {
      empresa: 'StartupX',
      interesse: 'Plano Empresarial'
    }
  },
  {
    id: 'c7',
    name: 'Fernanda Alves',
    email: 'fernanda@consultoria.com.br',
    phone: '+55 85 96666-1111',
    document: '789.123.456-00',
    tags: ['consultoria'],
    primaryChannel: 'whatsapp',
    lastInteraction: '2024-01-15T06:15:00Z',
    notes: 'Consultora experiente. Sempre interessada em novas funcionalidades.',
    createdAt: '2023-07-20T11:40:00Z',
    totalTickets: 9,
    resolvedTickets: 8,
    averageRating: 4.4,
    preferredLanguage: 'pt-BR',
    timezone: 'America/Fortaleza',
    customFields: {
      plano: 'Pro',
      empresa: 'Alves Consultoria',
      especialidade: 'Marketing Digital'
    }
  },
  {
    id: 'c8',
    name: 'Marcos Rodrigues',
    email: 'marcos.r@corporativo.com.br',
    phone: '+55 11 95555-4444',
    document: '147.258.369-00',
    tags: ['corporativo', 'auditoria'],
    primaryChannel: 'email',
    lastInteraction: '2024-01-14T14:20:00Z',
    notes: 'Responsável pela auditoria interna. Sempre solicita relatórios detalhados.',
    createdAt: '2023-03-10T08:15:00Z',
    totalTickets: 18,
    resolvedTickets: 16,
    averageRating: 4.1,
    preferredLanguage: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    customFields: {
      plano: 'Corporativo',
      empresa: 'MegaCorp SA',
      cargo: 'Auditor Interno'
    }
  }
];

export const getContactById = (id: string) => {
  return mockContacts.find(contact => contact.id === id);
};