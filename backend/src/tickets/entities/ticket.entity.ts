import { ApiProperty } from '@nestjs/swagger';
import {
  TicketCategory,
  TicketPriority,
  TicketStatus,
} from '../dto/ticket-options.constants';

export class TicketEntity {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Servidor web no responde' })
  title: string;

  @ApiProperty({
    example: 'El servicio devuelve timeout desde varios puestos de trabajo.',
  })
  description: string;

  @ApiProperty({ enum: TicketCategory, example: TicketCategory.SERVER })
  category: TicketCategory;

  @ApiProperty({ enum: TicketPriority, example: TicketPriority.HIGH })
  priority: TicketPriority;

  @ApiProperty({ enum: TicketStatus, example: TicketStatus.OPEN })
  status: TicketStatus;

  @ApiProperty({ example: 'Daniel', nullable: true, required: false })
  assignedTo?: string | null;

  @ApiProperty({ example: '2026-05-22T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-05-22T00:30:00.000Z' })
  updatedAt: Date;
}
