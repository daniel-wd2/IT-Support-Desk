import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { QueryTicketsDto } from './dto/query-tickets.dto';
import {
  TicketPriority,
  TicketStatus,
} from './dto/ticket-options.constants';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(query: QueryTicketsDto) {
    const where = {
      ...(query.status ? { status: query.status } : {}),
      ...(query.priority ? { priority: query.priority } : {}),
      ...(query.category ? { category: query.category } : {}),
    };

    return this.prisma.ticket.findMany({
      where,
      orderBy: [{ createdAt: 'desc' }],
    });
  }

  async findOne(id: number) {
    const ticket = await this.prisma.ticket.findUnique({ where: { id } });

    if (!ticket) {
      throw new NotFoundException(`Ticket with id ${id} was not found`);
    }

    return ticket;
  }

  create(createTicketDto: CreateTicketDto) {
    return this.prisma.ticket.create({
      data: createTicketDto,
    });
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    await this.findOne(id);

    return this.prisma.ticket.update({
      where: { id },
      data: updateTicketDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.ticket.delete({
      where: { id },
    });
  }

  async getSummary() {
    const [total, open, inProgress, resolved, critical] =
      await this.prisma.$transaction([
        this.prisma.ticket.count(),
        this.prisma.ticket.count({ where: { status: TicketStatus.OPEN } }),
        this.prisma.ticket.count({
          where: { status: TicketStatus.IN_PROGRESS },
        }),
        this.prisma.ticket.count({ where: { status: TicketStatus.RESOLVED } }),
        this.prisma.ticket.count({
          where: { priority: TicketPriority.CRITICAL },
        }),
      ]);

    return {
      total,
      open,
      inProgress,
      resolved,
      critical,
    };
  }
}
