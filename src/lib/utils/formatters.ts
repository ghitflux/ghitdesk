import { formatDistanceToNow, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatRelativeTime = (date: string | Date) => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: ptBR
  });
};

export const formatDateTime = (date: string | Date) => {
  return format(new Date(date), "dd/MM/yyyy 'às' HH:mm", {
    locale: ptBR
  });
};

export const formatDate = (date: string | Date) => {
  return format(new Date(date), "dd/MM/yyyy", {
    locale: ptBR
  });
};

export const formatTime = (date: string | Date) => {
  return format(new Date(date), "HH:mm", {
    locale: ptBR
  });
};

export const formatDocument = (document: string) => {
  // Remove all non-numeric characters
  const cleaned = document.replace(/\D/g, '');
  
  // Format as CPF (xxx.xxx.xxx-xx)
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
  
  // Format as CNPJ (xx.xxx.xxx/xxxx-xx)
  if (cleaned.length === 14) {
    return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
  
  return document;
};

export const formatPhone = (phone: string) => {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format Brazilian phone number
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '+55 $1 $2-$3');
  }
  
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '+55 $1 $2-$3');
  }
  
  return phone;
};

export const getChannelName = (channel: string) => {
  const channels = {
    whatsapp: 'WhatsApp',
    instagram: 'Instagram',
    email: 'E-mail',
    webchat: 'Chat Web'
  };
  
  return channels[channel as keyof typeof channels] || channel;
};

export const getPriorityName = (priority: string) => {
  const priorities = {
    low: 'Baixa',
    medium: 'Média',
    high: 'Alta'
  };
  
  return priorities[priority as keyof typeof priorities] || priority;
};

export const getStatusName = (status: string) => {
  const statuses = {
    open: 'Aberto',
    in_progress: 'Em andamento',
    waiting_customer: 'Aguardando cliente',
    resolved: 'Resolvido',
    active: 'Ativo',
    pending: 'Pendente'
  };
  
  return statuses[status as keyof typeof statuses] || status;
};

export const getSLAStatus = (deadline: string | Date) => {
  const now = new Date();
  const slaTime = new Date(deadline);
  const diff = slaTime.getTime() - now.getTime();
  const hoursLeft = diff / (1000 * 60 * 60);
  
  if (hoursLeft < 0) return 'critical';
  if (hoursLeft < 2) return 'warning';
  return 'ok';
};

export const formatSLATime = (deadline: string | Date) => {
  const now = new Date();
  const slaTime = new Date(deadline);
  const diff = slaTime.getTime() - now.getTime();
  
  if (diff < 0) {
    return 'Vencido';
  }
  
  const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
  const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hoursLeft > 0) {
    return `${hoursLeft}h ${minutesLeft}min`;
  }
  
  return `${minutesLeft}min`;
};