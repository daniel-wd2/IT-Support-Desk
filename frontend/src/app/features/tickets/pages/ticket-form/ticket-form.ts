import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs/operators';
import {
  CATEGORY_OPTIONS,
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  TicketPayload
} from '../../../../core/models/ticket.model';
import { TicketsService } from '../../../../core/services/tickets';

@Component({
  selector: 'app-ticket-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './ticket-form.html',
  styleUrl: './ticket-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly ticketsService = inject(TicketsService);

  readonly categoryOptions = CATEGORY_OPTIONS;
  readonly priorityOptions = PRIORITY_OPTIONS;
  readonly statusOptions = STATUS_OPTIONS;

  ticketId: number | null = null;
  isEditMode = false;
  loading = false;
  submitting = false;
  errorMessage = '';

  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
    description: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(500)]
    ],
    category: [CATEGORY_OPTIONS[0], [Validators.required]],
    priority: [PRIORITY_OPTIONS[1], [Validators.required]],
    status: [STATUS_OPTIONS[0], [Validators.required]],
    assignedTo: ['']
  });

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      return;
    }

    const ticketId = Number(idParam);

    if (!Number.isInteger(ticketId) || ticketId <= 0) {
      this.errorMessage = 'El identificador de la incidencia no es valido.';
      return;
    }

    this.ticketId = ticketId;
    this.isEditMode = true;
    this.loading = true;

    this.ticketsService
      .getTicket(this.ticketId)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (ticket) => {
          this.form.patchValue({
            title: ticket.title,
            description: ticket.description,
            category: ticket.category,
            priority: ticket.priority,
            status: ticket.status,
            assignedTo: ticket.assignedTo ?? ''
          });
        },
        error: () => {
          this.errorMessage = 'No se pudo cargar la incidencia para editarla.';
        }
      });
  }

  saveTicket() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.buildPayload();
    this.submitting = true;
    this.errorMessage = '';

    const request =
      this.isEditMode && this.ticketId
        ? this.ticketsService.updateTicket(this.ticketId, payload)
        : this.ticketsService.createTicket(payload);

    request
      .pipe(
        finalize(() => {
          this.submitting = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (ticket) => {
          this.router.navigate(['/tickets', ticket.id]);
        },
        error: () => {
          this.errorMessage = 'No se pudo guardar la incidencia.';
        }
      });
  }

  fieldHasError(fieldName: keyof TicketPayload) {
    const field = this.form.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched);
  }

  private buildPayload(): TicketPayload {
    const rawValue = this.form.getRawValue();

    return {
      ...rawValue,
      assignedTo: rawValue.assignedTo.trim() || undefined
    };
  }
}
