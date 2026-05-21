import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TicketsList } from './tickets-list';
import { TicketsService } from '../../../../core/services/tickets';

describe('TicketsList', () => {
  const ticketsServiceMock = {
    getSummary: vi.fn(() =>
      of({ total: 5, open: 2, inProgress: 1, resolved: 1, critical: 1 })
    ),
    getTickets: vi.fn(() => of([])),
    deleteTicket: vi.fn(() => of({}))
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [TicketsList],
      providers: [
        provideRouter([]),
        { provide: TicketsService, useValue: ticketsServiceMock }
      ]
    }).compileComponents();
  });

  it('should load summary and tickets on init', () => {
    const fixture = TestBed.createComponent(TicketsList);

    fixture.detectChanges();

    expect(ticketsServiceMock.getSummary).toHaveBeenCalledTimes(1);
    expect(ticketsServiceMock.getTickets).toHaveBeenCalledTimes(1);
  });

  it('should only reload tickets when applying filters', () => {
    const fixture = TestBed.createComponent(TicketsList);
    const component = fixture.componentInstance;

    fixture.detectChanges();
    ticketsServiceMock.getSummary.mockClear();
    ticketsServiceMock.getTickets.mockClear();

    component.filtersForm.patchValue({
      priority: 'Alta'
    });
    component.applyFilters();

    expect(ticketsServiceMock.getTickets).toHaveBeenCalledTimes(1);
    expect(ticketsServiceMock.getSummary).not.toHaveBeenCalled();
  });
});
