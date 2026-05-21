export enum TicketCategory {
  HARDWARE = 'Hardware',
  SOFTWARE = 'Software',
  NETWORK = 'Red',
  SERVER = 'Servidor',
  DOCKER = 'Docker',
  LINUX = 'Linux',
  OTHER = 'Otro',
}

export enum TicketPriority {
  LOW = 'Baja',
  MEDIUM = 'Media',
  HIGH = 'Alta',
  CRITICAL = 'Crítica',
}

export enum TicketStatus {
  OPEN = 'Abierta',
  IN_PROGRESS = 'En proceso',
  RESOLVED = 'Resuelta',
  CLOSED = 'Cerrada',
}
