import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Ticket } from '../../../../core/models/ticket.model';
import { TicketsService } from '../../../../core/services/tickets';

@Component({
  selector: 'app-ticket-detail',
  imports: [CommonModule, RouterLink, DatePipe, NgClass],
  templateUrl: './ticket-detail.html',
  styleUrl: './ticket-detail.css'
})
export class TicketDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly ticketsService = inject(TicketsService);

  ticket: Ticket | null = null;
  loading = true;
  errorMessage = '';

  ngOnInit() {
    const ticketId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTicket(ticketId);
  }

  deleteTicket() {
    if (!this.ticket) {
      return;
    }

    const confirmed = window.confirm(
      `Vas a eliminar la incidencia "${this.ticket.title}".`
    );

    if (!confirmed) {
      return;
    }

    this.ticketsService.deleteTicket(this.ticket.id).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
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

  private loadTicket(ticketId: number) {
    this.ticketsService.getTicket(ticketId).subscribe({
      next: (ticket) => {
        this.ticket = ticket;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudo cargar el detalle de la incidencia.';
        this.loading = false;
      }
    });
  }
}
