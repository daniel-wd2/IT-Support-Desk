import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Ticket } from '../../../../core/models/ticket.model';
import { TicketsService } from '../../../../core/services/tickets';
import { getBadgeClass } from '../../../../core/utils/ticket-ui';

@Component({
  selector: 'app-ticket-detail',
  imports: [CommonModule, RouterLink, DatePipe, NgClass],
  templateUrl: './ticket-detail.html',
  styleUrl: './ticket-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketDetail implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly ticketsService = inject(TicketsService);

  ticket: Ticket | null = null;
  loading = true;
  errorMessage = '';

  ngOnInit() {
    const ticketId = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(ticketId) || ticketId <= 0) {
      this.errorMessage = 'El identificador de la incidencia no es valido.';
      this.loading = false;
      return;
    }

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

    this.ticketsService
      .deleteTicket(this.ticket.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/');
        },
        error: () => {
          this.errorMessage = 'No se pudo eliminar la incidencia.';
        }
      });
  }

  badgeClass(value: string) {
    return getBadgeClass(value);
  }

  private loadTicket(ticketId: number) {
    this.ticketsService
      .getTicket(ticketId)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (ticket) => {
          this.ticket = ticket;
        },
        error: () => {
          this.errorMessage = 'No se pudo cargar el detalle de la incidencia.';
        }
      });
  }
}
