import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TicketsService } from './tickets';

describe('TicketsService', () => {
  let service: TicketsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TicketsService, provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(TicketsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should request tickets with filters', () => {
    service.getTickets({ status: 'Abierta', priority: 'Alta' }).subscribe();

    const request = httpMock.expectOne((req) => {
      return (
        req.method === 'GET' &&
        req.url.endsWith('/tickets') &&
        req.params.get('status') === 'Abierta' &&
        req.params.get('priority') === 'Alta'
      );
    });

    request.flush([]);
  });

  it('should create a ticket', () => {
    const payload = {
      title: 'Servidor web no responde',
      description: 'No carga desde el navegador',
      category: 'Servidor' as const,
      priority: 'Alta' as const,
      status: 'Abierta' as const,
      assignedTo: 'Daniel'
    };

    service.createTicket(payload).subscribe();

    const request = httpMock.expectOne((req) => {
      return req.method === 'POST' && req.url.endsWith('/tickets');
    });

    expect(request.request.body).toEqual(payload);
    request.flush({ id: 1, ...payload });
  });
});
