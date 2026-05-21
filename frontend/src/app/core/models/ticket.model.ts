export interface Ticket {
  id: number;
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  assignedTo?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TicketPayload {
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  assignedTo?: string;
}

export interface TicketFilters {
  status?: TicketStatus | '';
  priority?: TicketPriority | '';
  category?: TicketCategory | '';
}

export interface TicketStats {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  critical: number;
}

export type TicketCategory =
  | 'Hardware'
  | 'Software'
  | 'Red'
  | 'Servidor'
  | 'Docker'
  | 'Linux'
  | 'Otro';

export type TicketPriority = 'Baja' | 'Media' | 'Alta' | 'Crítica';

export type TicketStatus = 'Abierta' | 'En proceso' | 'Resuelta' | 'Cerrada';

export const CATEGORY_OPTIONS: TicketCategory[] = [
  'Hardware',
  'Software',
  'Red',
  'Servidor',
  'Docker',
  'Linux',
  'Otro'
];

export const PRIORITY_OPTIONS: TicketPriority[] = [
  'Baja',
  'Media',
  'Alta',
  'Crítica'
];

export const STATUS_OPTIONS: TicketStatus[] = [
  'Abierta',
  'En proceso',
  'Resuelta',
  'Cerrada'
];
