import { ApiProperty } from '@nestjs/swagger';

export class TicketStatsDto {
  @ApiProperty({ example: 5 })
  total: number;

  @ApiProperty({ example: 2 })
  open: number;

  @ApiProperty({ example: 1 })
  inProgress: number;

  @ApiProperty({ example: 1 })
  resolved: number;

  @ApiProperty({ example: 1 })
  critical: number;
}
