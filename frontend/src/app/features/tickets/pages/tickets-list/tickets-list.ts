import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {
  CATEGORY_OPTIONS,
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  Ticket,
  TicketFilters,
  TicketStats
} from '../../../../core/models/ticket.model';
import { TicketsService } from '../../../../core/services/tickets';
import { getBadgeClass } from '../../../../core/utils/ticket-ui';

@Component({
  selector: 'app-tickets-list',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, DatePipe, NgClass],
  templateUrl: './tickets-list.html',
  styleUrl: './tickets-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketsList implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly ticketsService = inject(TicketsService);

  readonly categoryOptions = CATEGORY_OPTIONS;
  readonly priorityOptions = PRIORITY_OPTIONS;
  readonly statusOptions = STATUS_OPTIONS;

  readonly filtersForm = this.fb.nonNullable.group({
    status: [''],
    priority: [''],
    category: ['']
  });

  tickets: Ticket[] = [];
  stats: TicketStats | null = null;
  loading = false;
  errorMessage = '';

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    this.loading = true;
    this.errorMessage = '';

    forkJoin({
      stats: this.ticketsService.getSummary(),
      tickets: this.ticketsService.getTickets(this.getFilters())
    })
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: ({ stats, tickets }) => {
          this.stats = stats;
          this.tickets = tickets;
        },
        error: () => {
          this.stats = null;
          this.tickets = [];
          this.errorMessage =
            'No se pudo cargar el dashboard. Revisa que backend y base de datos esten activos.';
        }
      });
  }

  loadTickets() {
    this.loading = true;
    this.errorMessage = '';

    this.ticketsService
      .getTickets(this.getFilters())
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (tickets) => {
          this.tickets = tickets;
        },
        error: () => {
          this.tickets = [];
          this.errorMessage =
            'No se pudo cargar el listado. Revisa la conexion con la API.';
        }
      });
  }

  refreshAfterMutation() {
    this.loading = true;
    this.errorMessage = '';

    forkJoin({
      stats: this.ticketsService.getSummary(),
      tickets: this.ticketsService.getTickets(this.getFilters())
    })
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: ({ stats, tickets }) => {
          this.stats = stats;
          this.tickets = tickets;
        },
        error: () => {
          this.errorMessage =
            'No se pudo refrescar el dashboard despues del cambio.';
        }
      });
  }

  applyFilters() {
    this.loadTickets();
  }

  clearFilters() {
    this.filtersForm.reset({
      status: '',
      priority: '',
      category: ''
    });
    this.loadTickets();
  }

  deleteTicket(ticket: Ticket) {
    const confirmed = window.confirm(
      `Vas a eliminar la incidencia "${ticket.title}".`
    );

    if (!confirmed) {
      return;
    }

    this.ticketsService
      .deleteTicket(ticket.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.refreshAfterMutation();
        },
        error: () => {
          this.errorMessage = 'No se pudo eliminar la incidencia.';
        }
      });
  }

  badgeClass(value: string) {
    return getBadgeClass(value);
  }

  trackByTicketId(_index: number, ticket: Ticket) {
    return ticket.id;
  }

  private getFilters(): TicketFilters {
    return this.filtersForm.getRawValue() as TicketFilters;
  }
}
