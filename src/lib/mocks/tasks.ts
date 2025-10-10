export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done';

export interface TaskAssignee {
  id: string;
  name: string;
  avatar?: string;
}

export interface TaskComment {
  id: string;
  author: TaskAssignee;
  content: string;
  createdAt: Date;
}

export interface TaskChecklist {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignees: TaskAssignee[];
  labels: string[];
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  checklist: TaskChecklist[];
  comments: TaskComment[];
  attachments: string[];
  project?: string;
}

// Mock assignees
const assignees: TaskAssignee[] = [
  { id: '1', name: 'Ana Silva', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana' },
  { id: '2', name: 'Bruno Costa', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bruno' },
  { id: '3', name: 'Carla Santos', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carla' },
  { id: '4', name: 'Diego Alves', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diego' },
  { id: '5', name: 'Elena Ferreira', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena' },
];

// Mock tasks
export const mockTasks: Task[] = [
  {
    id: 'TASK-001',
    title: 'Implementar autenticação com 2FA',
    description: 'Adicionar autenticação de dois fatores para aumentar a segurança da plataforma',
    status: 'in_progress',
    priority: 'high',
    assignees: [assignees[0], assignees[1]],
    labels: ['desenvolvimento', 'segurança'],
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    checklist: [
      { id: '1', title: 'Implementar backend', completed: true },
      { id: '2', title: 'Criar interface de usuário', completed: true },
      { id: '3', title: 'Testes de integração', completed: false },
    ],
    comments: [
      {
        id: '1',
        author: assignees[0],
        content: 'Backend já implementado, iniciando frontend',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
    ],
    attachments: ['design-2fa.pdf'],
    project: 'GhitDesk Core',
  },
  {
    id: 'TASK-002',
    title: 'Revisar documentação da API',
    description: 'Atualizar a documentação com os novos endpoints criados no último sprint',
    status: 'review',
    priority: 'medium',
    assignees: [assignees[2]],
    labels: ['documentação'],
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000),
    checklist: [
      { id: '1', title: 'Listar endpoints novos', completed: true },
      { id: '2', title: 'Escrever exemplos', completed: true },
      { id: '3', title: 'Revisão do time', completed: false },
    ],
    comments: [],
    attachments: [],
    project: 'GhitDesk Core',
  },
  {
    id: 'TASK-003',
    title: 'Corrigir bug no filtro de tickets',
    description: 'Filtro por data não está funcionando corretamente',
    status: 'todo',
    priority: 'urgent',
    assignees: [assignees[3]],
    labels: ['bug', 'tickets'],
    dueDate: new Date(Date.now() + 0.5 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    checklist: [
      { id: '1', title: 'Reproduzir o bug', completed: false },
      { id: '2', title: 'Identificar causa raiz', completed: false },
      { id: '3', title: 'Implementar correção', completed: false },
    ],
    comments: [],
    attachments: ['bug-report.png'],
    project: 'GhitDesk Core',
  },
  {
    id: 'TASK-004',
    title: 'Design do dashboard v2',
    description: 'Criar protótipo do novo dashboard com métricas avançadas',
    status: 'in_progress',
    priority: 'medium',
    assignees: [assignees[4]],
    labels: ['design', 'ui/ux'],
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    checklist: [
      { id: '1', title: 'Wireframes', completed: true },
      { id: '2', title: 'Protótipo de alta fidelidade', completed: false },
      { id: '3', title: 'Validação com stakeholders', completed: false },
    ],
    comments: [
      {
        id: '1',
        author: assignees[4],
        content: 'Wireframes aprovados, começando protótipo',
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      },
    ],
    attachments: ['wireframes-v2.fig'],
    project: 'GhitDesk UI',
  },
  {
    id: 'TASK-005',
    title: 'Configurar CI/CD',
    description: 'Configurar pipeline de integração e deploy contínuo',
    status: 'done',
    priority: 'high',
    assignees: [assignees[1]],
    labels: ['devops', 'infraestrutura'],
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    checklist: [
      { id: '1', title: 'Configurar GitHub Actions', completed: true },
      { id: '2', title: 'Testes automatizados', completed: true },
      { id: '3', title: 'Deploy staging', completed: true },
    ],
    comments: [],
    attachments: [],
    project: 'GhitDesk Core',
  },
  {
    id: 'TASK-006',
    title: 'Implementar busca global',
    description: 'Adicionar campo de busca global que pesquisa em tickets, contatos e conversas',
    status: 'todo',
    priority: 'medium',
    assignees: [assignees[0]],
    labels: ['feature', 'busca'],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    checklist: [],
    comments: [],
    attachments: [],
    project: 'GhitDesk Core',
  },
  {
    id: 'TASK-007',
    title: 'Otimizar performance do inbox',
    description: 'Melhorar tempo de carregamento e renderização da lista de conversas',
    status: 'todo',
    priority: 'low',
    assignees: [],
    labels: ['performance', 'otimização'],
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    checklist: [],
    comments: [],
    attachments: [],
    project: 'GhitDesk Core',
  },
  {
    id: 'TASK-008',
    title: 'Integração com Slack',
    description: 'Permitir notificações e respostas através do Slack',
    status: 'review',
    priority: 'low',
    assignees: [assignees[3], assignees[1]],
    labels: ['integração', 'feature'],
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    checklist: [
      { id: '1', title: 'Configurar OAuth', completed: true },
      { id: '2', title: 'Webhook de notificações', completed: true },
      { id: '3', title: 'Testes de integração', completed: true },
    ],
    comments: [],
    attachments: [],
    project: 'GhitDesk Integrations',
  },
  {
    id: 'TASK-009',
    title: 'Relatório de SLA mensal',
    description: 'Criar relatório automático de métricas de SLA',
    status: 'in_progress',
    priority: 'medium',
    assignees: [assignees[2]],
    labels: ['relatórios', 'analytics'],
    dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    checklist: [
      { id: '1', title: 'Definir métricas', completed: true },
      { id: '2', title: 'Criar queries', completed: false },
      { id: '3', title: 'Template do relatório', completed: false },
    ],
    comments: [],
    attachments: [],
    project: 'GhitDesk Analytics',
  },
  {
    id: 'TASK-010',
    title: 'Teste de carga da API',
    description: 'Realizar testes de carga para validar escalabilidade',
    status: 'todo',
    priority: 'high',
    assignees: [assignees[1]],
    labels: ['testes', 'performance'],
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    checklist: [],
    comments: [],
    attachments: [],
    project: 'GhitDesk Core',
  },
  {
    id: 'TASK-011',
    title: 'Atualizar dependências do projeto',
    description: 'Atualizar todas as bibliotecas para versões mais recentes',
    status: 'done',
    priority: 'low',
    assignees: [assignees[0]],
    labels: ['manutenção'],
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    checklist: [
      { id: '1', title: 'Verificar breaking changes', completed: true },
      { id: '2', title: 'Atualizar packages', completed: true },
      { id: '3', title: 'Testar aplicação', completed: true },
    ],
    comments: [],
    attachments: [],
    project: 'GhitDesk Core',
  },
  {
    id: 'TASK-012',
    title: 'Implementar tema customizável',
    description: 'Permitir que usuários personalizem cores do tema',
    status: 'todo',
    priority: 'low',
    assignees: [],
    labels: ['feature', 'ui/ux'],
    dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    checklist: [],
    comments: [],
    attachments: [],
    project: 'GhitDesk UI',
  },
];

export const getTasksByStatus = (status: TaskStatus): Task[] => {
  return mockTasks.filter((task) => task.status === status);
};

export const getTaskById = (id: string): Task | undefined => {
  return mockTasks.find((task) => task.id === id);
};

export const getAllAssignees = (): TaskAssignee[] => {
  return assignees;
};
