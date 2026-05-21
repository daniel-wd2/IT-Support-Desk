import { NotFoundException } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import {
  TicketCategory,
  TicketPriority,
  TicketStatus,
} from './dto/ticket-options.constants';

describe('TicketsService', () => {
  const prismaMock = {
    ticket: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  let service: TicketsService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new TicketsService(prismaMock as never);
  });

  it('should build filters when listing tickets', async () => {
    prismaMock.ticket.findMany.mockResolvedValue([]);

    await service.findAll({
      status: TicketStatus.OPEN,
      priority: TicketPriority.HIGH,
      category: TicketCategory.DOCKER,
    });

    expect(prismaMock.ticket.findMany).toHaveBeenCalledWith({
      where: {
        status: TicketStatus.OPEN,
        priority: TicketPriority.HIGH,
        category: TicketCategory.DOCKER,
      },
      orderBy: [{ createdAt: 'desc' }],
    });
  });

  it('should throw when ticket does not exist', async () => {
    prismaMock.ticket.findUnique.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('should compute summary counts', async () => {
    prismaMock.$transaction.mockResolvedValue([5, 2, 1, 1, 1]);

    await expect(service.getSummary()).resolves.toEqual({
      total: 5,
      open: 2,
      inProgress: 1,
      resolved: 1,
      critical: 1,
    });
  });
});
