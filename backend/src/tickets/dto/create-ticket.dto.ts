import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import {
  TicketCategory,
  TicketPriority,
  TicketStatus,
} from './ticket-options.constants';

export class CreateTicketDto {
  @ApiProperty({ example: 'No funciona el acceso a la VPN' })
  @IsString()
  @MinLength(5)
  @MaxLength(120)
  title: string;

  @ApiProperty({
    example: 'El usuario no puede establecer conexion desde su equipo.',
  })
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  description: string;

  @ApiProperty({ enum: TicketCategory, example: TicketCategory.NETWORK })
  @IsEnum(TicketCategory)
  category: TicketCategory;

  @ApiProperty({ enum: TicketPriority, example: TicketPriority.HIGH })
  @IsEnum(TicketPriority)
  priority: TicketPriority;

  @ApiProperty({ enum: TicketStatus, example: TicketStatus.OPEN })
  @IsEnum(TicketStatus)
  status: TicketStatus;

  @ApiProperty({ example: 'Daniel', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  assignedTo?: string;
}
