import { Routes } from '@angular/router';
import { TicketDetail } from './features/tickets/pages/ticket-detail/ticket-detail';
import { TicketForm } from './features/tickets/pages/ticket-form/ticket-form';
import { TicketsList } from './features/tickets/pages/tickets-list/tickets-list';

export const routes: Routes = [
  {
    path: '',
    component: TicketsList
  },
  {
    path: 'tickets',
    component: TicketsList
  },
  {
    path: 'tickets/new',
    component: TicketForm
  },
  {
    path: 'tickets/:id',
    component: TicketDetail
  },
  {
    path: 'tickets/:id/edit',
    component: TicketForm
  },
  {
    path: '**',
    redirectTo: ''
  }
];
