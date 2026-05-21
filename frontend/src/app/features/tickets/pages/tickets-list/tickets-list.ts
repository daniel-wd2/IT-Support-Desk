import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  CATEGORY_OPTIONS,
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  Ticket,
  TicketFilters,
  TicketStats
} from '../../../../core/models/ticket.model';
import { TicketsService } from '../../../../core/services/tickets';

@Component({
  selector: 'app-tickets-list',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, DatePipe, NgClass],
  templateUrl: './tickets-list.html',
  styleUrl: './tickets-list.css'
})
export class TicketsList implements OnInit {
  private readonly fb = inject(FormBuilder);
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
    this.loadDashboard();
  }

  loadDashboard() {
    this.loading = true;
    this.errorMessage = '';
    const filters = this.filtersForm.getRawValue() as TicketFilters;

    this.ticketsService.getSummary().subscribe({
      next: (stats) => {
        this.stats = stats;
      },
      error: () => {
        this.errorMessage =
          'No se pudo cargar el resumen de incidencias. Revisa que el backend este activo.';
      }
    });

    this.ticketsService.getTickets(filters).subscribe({
      next: (tickets) => {
        this.tickets = tickets;
        this.loading = false;
      },
      error: () => {
        this.errorMessage =
          'No se pudo cargar el listado. Revisa la conexion con la API.';
        this.loading = false;
      }
    });
  }

  applyFilters() {
    this.loadDashboard();
  }

  clearFilters() {
    this.filtersForm.reset({
      status: '',
      priority: '',
      category: ''
    });
    this.loadDashboard();
  }

  deleteTicket(ticket: Ticket) {
    const confirmed = window.confirm(
      `Vas a eliminar la incidencia "${ticket.title}".`
    );

    if (!confirmed) {
      return;
    }

    this.ticketsService.deleteTicket(ticket.id).subscribe({
      next: () => {
        this.loadDashboard();
      },
      error: () => {
        this.errorMessage = 'No se pudo eliminar la incidencia.';
      }
    });
  }

  badgeClass(value: string) {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z]+/g, '-')
      .replace(/^-|-$/g, '');
  }
}
