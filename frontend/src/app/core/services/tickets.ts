import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  Ticket,
  TicketFilters,
  TicketPayload,
  TicketStats
} from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${window.location.protocol}//${window.location.hostname}:3000`;

  getTickets(filters?: TicketFilters) {
    let params = new HttpParams();

    if (filters?.status) {
      params = params.set('status', filters.status);
    }

    if (filters?.priority) {
      params = params.set('priority', filters.priority);
    }

    if (filters?.category) {
      params = params.set('category', filters.category);
    }

    return this.http.get<Ticket[]>(`${this.apiUrl}/tickets`, { params });
  }

  getTicket(id: number) {
    return this.http.get<Ticket>(`${this.apiUrl}/tickets/${id}`);
  }

  getSummary() {
    return this.http.get<TicketStats>(`${this.apiUrl}/tickets/stats/summary`);
  }

  createTicket(payload: TicketPayload) {
    return this.http.post<Ticket>(`${this.apiUrl}/tickets`, payload);
  }

  updateTicket(id: number, payload: Partial<TicketPayload>) {
    return this.http.patch<Ticket>(`${this.apiUrl}/tickets/${id}`, payload);
  }

  deleteTicket(id: number) {
    return this.http.delete<Ticket>(`${this.apiUrl}/tickets/${id}`);
  }
}
